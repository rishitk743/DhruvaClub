const https = require('https');

const projectId = "dhruva-7c184";
const apiKey = "AIzaSyDS7leZONMPWe1UItrShq2NxFrMCFJqTjs";

function toFirestoreFields(obj) {
  const fields = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val === undefined || val === null) continue;
    if (typeof val === "string") {
      fields[key] = { stringValue: val };
    } else if (typeof val === "number") {
      fields[key] = { integerValue: String(Math.round(val)) };
    } else if (typeof val === "boolean") {
      fields[key] = { booleanValue: val };
    } else if (Array.isArray(val)) {
      fields[key] = {
        arrayValue: {
          values: val.map(item => {
            if (typeof item === 'object') {
              return { mapValue: { fields: toFirestoreFields(item) } };
            }
            return { stringValue: String(item) };
          })
        }
      };
    } else if (typeof val === "object") {
      fields[key] = { mapValue: { fields: toFirestoreFields(val) } };
    }
  }
  return fields;
}

async function computeAndSaveStats() {
  console.log("Fetching all documents from dhruva_test_submissions...");
  
  // List documents (with pagination if needed)
  let allDocs = [];
  let pageToken = null;

  do {
    let url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/dhruva_test_submissions?pageSize=300&key=${apiKey}`;
    if (pageToken) url += `&pageToken=${pageToken}`;

    const res = await fetch(url);
    const data = await res.json();
    if (data.documents) {
      allDocs = allDocs.concat(data.documents);
    }
    pageToken = data.nextPageToken;
  } while (pageToken);

  console.log(`Fetched total ${allDocs.length} submissions.`);

  let totalRegistered = 0;
  let totalJoined = 0;
  let totalJoinLater = 0;
  let totalMale = 0;
  let totalFemale = 0;
  let notJoinedList = [];

  allDocs.forEach(d => {
    const f = d.fields || {};
    const name = f.fullName?.stringValue || "Unknown";
    const phone = f.whatsappNumber?.stringValue || "";
    const gender = (f.gender?.stringValue || "").toLowerCase();
    const commStatus = (f.whatsappCommunityStatus?.stringValue || "").toLowerCase();
    const status = f.status?.stringValue || "completed";

    totalRegistered++;

    if (gender === "male") totalMale++;
    else if (gender === "female") totalFemale++;

    if (commStatus === "joined") {
      totalJoined++;
    } else {
      totalJoinLater++;
      notJoinedList.push({
        fullName: name,
        whatsappNumber: phone,
        gender: f.gender?.stringValue || "Unspecified",
        status: status,
        submittedAt: f.submittedAt?.stringValue || f.timestamp?.stringValue || ""
      });
    }
  });

  const statsDoc = {
    totalRegistered,
    totalJoined,
    totalJoinLater,
    totalMale,
    totalFemale,
    notJoinedCount: notJoinedList.length,
    notJoinedList,
    lastUpdated: new Date().toISOString()
  };

  console.log("Stats computed:", {
    totalRegistered,
    totalJoined,
    totalJoinLater,
    totalMale,
    totalFemale,
    notJoinedCount: notJoinedList.length
  });

  // Write to dhruva_test_stats/summary via PATCH/POST
  const saveUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/dhruva_test_stats/summary?key=${apiKey}`;
  const saveRes = await fetch(saveUrl, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields: toFirestoreFields(statsDoc) })
  });

  console.log("Stats save status:", saveRes.status);
  const result = await saveRes.json();
  console.log("Stats document created in Firestore:", result.name);
}

computeAndSaveStats().catch(console.error);
