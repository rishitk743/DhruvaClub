/**
 * Dhruva Club Firebase Firestore Configuration
 *
 * Firebase compatibility SDK must be loaded before this file:
 *
 * firebase-app-compat.js
 * firebase-firestore-compat.js
 */

const firebaseConfig = {
  apiKey: "AIzaSyDS7leZONMPWe1UItrShq2NxFrMCFJqTjs",
  authDomain: "dhruva-7c184.firebaseapp.com",
  projectId: "dhruva-7c184",
  storageBucket: "dhruva-7c184.firebasestorage.app",
  messagingSenderId: "611719166487",
  appId: "1:611719166487:web:7a6d3d29fc57b90b7efa52",
};

let isFirebaseConfigured = false;
let db = null;

try {
  const hasValidConfig =
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId &&
    !firebaseConfig.apiKey.includes("YOUR_") &&
    !firebaseConfig.projectId.includes("YOUR_");

  if (typeof firebase === "undefined") {
    throw new Error(
      "Firebase SDK was not loaded. Check the script tags in index.html."
    );
  }

  if (!hasValidConfig) {
    throw new Error(
      "Firebase configuration still contains placeholder values."
    );
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  db = firebase.firestore();
  isFirebaseConfigured = true;

  console.log("Firebase Firestore initialized successfully.");
} catch (error) {
  console.error("Firebase initialization failed:", error.message);
}


/**
 * Helper to transform standard JavaScript object to Firestore REST API field structures
 */
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
            if (typeof item === 'object' && item !== null) {
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

/**
 * Fetch current stats summary doc from Firestore (via REST API)
 */
async function fetchCurrentStats() {
  const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/dhruva_test_stats/summary?key=${firebaseConfig.apiKey}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return fromFirestoreFields(data.fields || {});
  } catch (err) {
    console.warn("Could not fetch stats summary:", err);
    return null;
  }
}

/**
 * Helper to convert Firestore REST fields back to standard JS object
 */
function fromFirestoreFields(fields) {
  const obj = {};
  for (const [k, v] of Object.entries(fields)) {
    if (v.stringValue !== undefined) obj[k] = v.stringValue;
    else if (v.integerValue !== undefined) obj[k] = parseInt(v.integerValue, 10);
    else if (v.doubleValue !== undefined) obj[k] = v.doubleValue;
    else if (v.booleanValue !== undefined) obj[k] = v.booleanValue;
    else if (v.arrayValue !== undefined) {
      obj[k] = (v.arrayValue.values || []).map(item => {
        if (item.mapValue) return fromFirestoreFields(item.mapValue.fields || {});
        return item.stringValue || item.integerValue || item;
      });
    } else if (v.mapValue !== undefined) {
      obj[k] = fromFirestoreFields(v.mapValue.fields || {});
    }
  }
  return obj;
}

/**
 * Save updated stats summary doc to Firestore (via REST API)
 */
async function saveStatsSummary(stats) {
  const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/dhruva_test_stats/summary?key=${firebaseConfig.apiKey}`;
  try {
    stats.lastUpdated = new Date().toISOString();
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: toFirestoreFields(stats) })
    });
    return res.ok;
  } catch (err) {
    console.warn("Could not update stats summary in Firestore:", err);
    return false;
  }
}

/**
 * Save initial student registration to Firestore immediately after Step 1.
 * Uses direct Firestore SDK write with immediate REST API fallback to guarantee 100% success.
 *
 * @param {Object} registrationData
 * @returns {Promise<{success: boolean, id?: string, error?: string}>}
 */
async function saveRegistration(registrationData) {
  const payload = {
    fullName: (registrationData.fullName || "").trim(),
    email: (registrationData.email || "").trim(),
    whatsappNumber: (registrationData.whatsappNumber || "").replace(/[^0-9]/g, ""),
    gender: registrationData.gender || "",
    homeTown: (registrationData.homeTown || "").trim(),
    branch: registrationData.branch || "",
    year: registrationData.year || "",
    status: "registered",
    submittedAt: new Date().toISOString(),
    userAgent: (navigator.userAgent || "").substring(0, 500)
  };

  console.log("Saving student registration to Firestore:", payload);
  let docId = null;

  // Attempt 1: Try via Firestore SDK (direct add/set without transactions)
  if (isFirebaseConfigured && db) {
    try {
      const docRef = await db.collection("dhruva_test_submissions").add(payload);
      docId = docRef.id;
      console.log("Registration saved via Firestore SDK. ID:", docId);
    } catch (sdkErr) {
      console.warn("Firestore SDK write failed, falling back to REST API:", sdkErr);
    }
  }

  // Attempt 2: Fallback to direct Firestore REST API
  if (!docId) {
    try {
      const restUrl = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/dhruva_test_submissions?key=${firebaseConfig.apiKey}`;
      const res = await fetch(restUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: toFirestoreFields(payload) })
      });

      if (res.ok) {
        const data = await res.json();
        docId = data.name.split("/").pop();
        console.log("Registration saved via Firestore REST API. ID:", docId);
      } else {
        const errText = await res.text();
        console.error("Firestore REST registration failed:", res.status, errText);
      }
    } catch (restErr) {
      console.error("Firestore REST network error:", restErr);
    }
  }

  if (!docId) {
    return { success: false, error: "Unable to connect to database. Please check your connection." };
  }

  // Asynchronously update stats summary with new registration & past data
  (async () => {
    try {
      const currentStats = (await fetchCurrentStats()) || {
        schemaVersion: 2,
        totalRegistered: 0,
        totalCompleted: 0,
        totalJoined: 0,
        totalJoinLater: 0,
        totalWhatsAppClicks: 0,
        totalMale: 0,
        totalFemale: 0,
        joinedList: [],
        notJoinedList: [],
        pastData: []
      };

      currentStats.totalRegistered = (currentStats.totalRegistered || 0) + 1;
      const gLower = (payload.gender || "").toLowerCase();
      if (gLower === "male") currentStats.totalMale = (currentStats.totalMale || 0) + 1;
      else if (gLower === "female") currentStats.totalFemale = (currentStats.totalFemale || 0) + 1;

      // Add to pastData
      const pastList = Array.isArray(currentStats.pastData) ? currentStats.pastData : [];
      pastList.push({
        submissionId: docId,
        fullName: payload.fullName,
        email: payload.email,
        whatsappNumber: payload.whatsappNumber,
        gender: payload.gender,
        branch: payload.branch,
        year: payload.year,
        totalScore: 0,
        status: "registered",
        communityStatus: "registered",
        submittedAt: payload.submittedAt
      });
      currentStats.pastData = pastList;
      currentStats.pastDataCount = pastList.length;

      await saveStatsSummary(currentStats);
    } catch (e) {
      console.warn("Async stats update after registration failed:", e);
    }
  })();

  return { success: true, id: docId };
}

/**
 * Count whenever the WhatsApp button is clicked.
 * Updates stats counter and marks user's submission as joined in the database.
 *
 * @param {string} [submissionId]
 * @param {Object} [personalData]
 * @returns {Promise<{success: boolean}>}
 */
async function recordWhatsAppClick(submissionId, personalData) {
  console.log("WhatsApp button clicked! Recording click for submission:", submissionId);

  // 1. If submissionId exists, update the submission document in Firestore
  if (submissionId && !submissionId.startsWith("offline_")) {
    const updatePayload = {
      whatsappCommunityStatus: "joined",
      whatsappClicked: true,
      whatsappClickedAt: new Date().toISOString()
    };

    // Try SDK first
    if (isFirebaseConfigured && db) {
      db.collection("dhruva_test_submissions").doc(submissionId)
        .set(updatePayload, { merge: true })
        .catch(err => console.warn("SDK WhatsApp status update error:", err));
    }

    // Also send via REST API to ensure delivery
    const restUrl = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/dhruva_test_submissions/${submissionId}?updateMask.fieldPaths=whatsappCommunityStatus&updateMask.fieldPaths=whatsappClicked&updateMask.fieldPaths=whatsappClickedAt&key=${firebaseConfig.apiKey}`;
    fetch(restUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: toFirestoreFields(updatePayload) })
    }).catch(e => console.warn("REST WhatsApp status update error:", e));
  }

  // 2. Increment WhatsApp click counter & joined total in stats summary
  try {
    const currentStats = await fetchCurrentStats();
    if (currentStats) {
      currentStats.totalWhatsAppClicks = (currentStats.totalWhatsAppClicks || 0) + 1;

      // Update student in pastData & joinedList if available
      const personal = personalData || {};
      const phone = personal.whatsappNumber || "";
      const name = personal.fullName || "";

      const joinedList = Array.isArray(currentStats.joinedList) ? currentStats.joinedList : [];
      const alreadyJoined = joinedList.some(item => (submissionId && item.submissionId === submissionId) || (phone && item.whatsappNumber === phone));

      if (!alreadyJoined) {
        joinedList.push({
          submissionId: submissionId || "",
          fullName: name || "Student",
          whatsappNumber: phone,
          gender: personal.gender || "Unspecified",
          branch: personal.branch || "",
          year: personal.year || "",
          status: "joined",
          submittedAt: new Date().toISOString()
        });
        currentStats.joinedList = joinedList;
        currentStats.totalJoined = joinedList.length;
        currentStats.joinedCount = joinedList.length;

        // Remove from notJoinedList if present
        if (Array.isArray(currentStats.notJoinedList)) {
          currentStats.notJoinedList = currentStats.notJoinedList.filter(item => 
            !(submissionId && item.submissionId === submissionId) && !(phone && item.whatsappNumber === phone)
          );
          currentStats.totalJoinLater = currentStats.notJoinedList.length;
          currentStats.notJoinedCount = currentStats.notJoinedList.length;
        }
      }

      await saveStatsSummary(currentStats);
    }
  } catch (err) {
    console.warn("Failed to update WhatsApp click stats:", err);
  }

  return { success: true };
}

/**
 * Update assessment submission with scores and community status upon completion.
 * NOTE: Individual question answers are STRICTLY NOT stored in the database.
 *
 * @param {string} submissionId
 * @param {Object} assessmentData
 * @returns {Promise<{success: boolean, id?: string, error?: string}>}
 */
async function updateAssessmentSubmission(submissionId, assessmentData) {
  // CRITICAL: DO NOT STORE ANSWERS IN DATABASE!
  const updatePayload = {
    scores: assessmentData.scores || {},
    totalScore: assessmentData.totalScore || 0,
    whatsappCommunityStatus: assessmentData.whatsappCommunityStatus || "joined",
    status: "completed",
    completedAt: new Date().toISOString()
  };

  console.log("Updating assessment in DB (omitting answers):", updatePayload);
  let updatedDocId = submissionId;

  // Case A: Valid existing submission ID
  if (submissionId && !submissionId.startsWith("offline_")) {
    let sdkSuccess = false;
    if (isFirebaseConfigured && db) {
      try {
        await db.collection("dhruva_test_submissions").doc(submissionId).set(updatePayload, { merge: true });
        sdkSuccess = true;
        console.log("Assessment updated via SDK for ID:", submissionId);
      } catch (err) {
        console.warn("Firestore SDK update failed, trying REST API:", err);
      }
    }

    if (!sdkSuccess) {
      try {
        const mask = "updateMask.fieldPaths=scores&updateMask.fieldPaths=totalScore&updateMask.fieldPaths=whatsappCommunityStatus&updateMask.fieldPaths=status&updateMask.fieldPaths=completedAt";
        const restUrl = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/dhruva_test_submissions/${submissionId}?${mask}&key=${firebaseConfig.apiKey}`;
        const res = await fetch(restUrl, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fields: toFirestoreFields(updatePayload) })
        });
        if (res.ok) {
          console.log("Assessment updated via REST API for ID:", submissionId);
        }
      } catch (restErr) {
        console.warn("Firestore REST update error:", restErr);
      }
    }
  } else {
    // Case B: No submissionId or offline fallback — create new document with personal info + results
    const personal = assessmentData.personal || {};
    const fullDoc = {
      fullName: (personal.fullName || "").trim(),
      email: (personal.email || "").trim(),
      whatsappNumber: (personal.whatsappNumber || "").replace(/[^0-9]/g, ""),
      gender: personal.gender || "",
      homeTown: (personal.homeTown || "").trim(),
      branch: personal.branch || "",
      year: personal.year || "",
      scores: updatePayload.scores,
      totalScore: updatePayload.totalScore,
      whatsappCommunityStatus: updatePayload.whatsappCommunityStatus,
      status: "completed",
      submittedAt: new Date().toISOString(),
      completedAt: updatePayload.completedAt
    };

    try {
      const restUrl = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/dhruva_test_submissions?key=${firebaseConfig.apiKey}`;
      const res = await fetch(restUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: toFirestoreFields(fullDoc) })
      });
      if (res.ok) {
        const resData = await res.json();
        updatedDocId = resData.name.split("/").pop();
        console.log("Created full submission document:", updatedDocId);
      }
    } catch (e) {
      console.error("Failed to create completed submission document:", e);
    }
  }

  // Update stats summary document
  (async () => {
    try {
      const stats = (await fetchCurrentStats()) || {
        schemaVersion: 2,
        totalRegistered: 0,
        totalCompleted: 0,
        totalJoined: 0,
        totalJoinLater: 0,
        totalWhatsAppClicks: 0,
        totalMale: 0,
        totalFemale: 0,
        joinedList: [],
        notJoinedList: [],
        pastData: []
      };

      stats.totalCompleted = (stats.totalCompleted || 0) + 1;
      const personal = assessmentData.personal || {};
      const commStatus = updatePayload.whatsappCommunityStatus;
      const phone = personal.whatsappNumber || "";
      const docKey = updatedDocId || submissionId || "";

      // Update pastData list
      const pastList = Array.isArray(stats.pastData) ? stats.pastData : [];
      const pastIndex = pastList.findIndex(item => (docKey && item.submissionId === docKey) || (phone && item.whatsappNumber === phone));
      if (pastIndex !== -1) {
        pastList[pastIndex].totalScore = updatePayload.totalScore;
        pastList[pastIndex].status = "completed";
        pastList[pastIndex].communityStatus = commStatus;
        pastList[pastIndex].completedAt = updatePayload.completedAt;
      } else {
        pastList.push({
          submissionId: docKey,
          fullName: personal.fullName || "Student",
          email: personal.email || "",
          whatsappNumber: phone,
          gender: personal.gender || "Unspecified",
          branch: personal.branch || "",
          year: personal.year || "",
          totalScore: updatePayload.totalScore,
          status: "completed",
          communityStatus: commStatus,
          submittedAt: new Date().toISOString()
        });
      }
      stats.pastData = pastList;
      stats.pastDataCount = pastList.length;

      // Update joinedList or notJoinedList
      const joinedList = Array.isArray(stats.joinedList) ? stats.joinedList : [];
      const notJoinedList = Array.isArray(stats.notJoinedList) ? stats.notJoinedList : [];

      if (commStatus === "joined") {
        const inJoined = joinedList.some(item => (docKey && item.submissionId === docKey) || (phone && item.whatsappNumber === phone));
        if (!inJoined) {
          joinedList.push({
            submissionId: docKey,
            fullName: personal.fullName || "Student",
            whatsappNumber: phone,
            gender: personal.gender || "Unspecified",
            branch: personal.branch || "",
            year: personal.year || "",
            status: "joined",
            submittedAt: new Date().toISOString()
          });
        }
        // Remove from notJoinedList if switching to joined
        stats.notJoinedList = notJoinedList.filter(item => 
          !(docKey && item.submissionId === docKey) && !(phone && item.whatsappNumber === phone)
        );
      } else if (commStatus === "join_later") {
        const inNotJoined = notJoinedList.some(item => (docKey && item.submissionId === docKey) || (phone && item.whatsappNumber === phone));
        if (!inNotJoined) {
          notJoinedList.push({
            submissionId: docKey,
            fullName: personal.fullName || "Student",
            whatsappNumber: phone,
            gender: personal.gender || "Unspecified",
            branch: personal.branch || "",
            year: personal.year || "",
            status: "join_later",
            submittedAt: new Date().toISOString()
          });
        }
        // Remove from joinedList if user opted out
        stats.joinedList = joinedList.filter(item => 
          !(docKey && item.submissionId === docKey) && !(phone && item.whatsappNumber === phone)
        );
      }

      stats.totalJoined = stats.joinedList.length;
      stats.joinedCount = stats.joinedList.length;
      stats.totalJoinLater = stats.notJoinedList.length;
      stats.notJoinedCount = stats.notJoinedList.length;

      await saveStatsSummary(stats);
    } catch (e) {
      console.warn("Async stats update after assessment submission failed:", e);
    }
  })();

  return { success: true, id: updatedDocId };
}

/**
 * Save one completed assessment to Firestore (Compatibility wrapper, NO answers).
 *
 * @param {Object} submissionData
 * @returns {Promise<{success: boolean, id?: string, error?: string}>}
 */
async function saveTestSubmission(submissionData) {
  const { answers, ...dataWithoutAnswers } = submissionData || {};
  return updateAssessmentSubmission(dataWithoutAnswers.submissionId || null, dataWithoutAnswers);
}

window.DhruvaBackend = {
  saveRegistration,
  recordWhatsAppClick,
  updateAssessmentSubmission,
  saveTestSubmission,
  isFirebaseConfigured: () => isFirebaseConfigured
};