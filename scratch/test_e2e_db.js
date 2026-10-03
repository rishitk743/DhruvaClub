const fs = require('fs');

async function testE2E() {
  console.log("--- STARTING E2E REGISTRATION & SUBMISSION TEST ---");

  // Load firebase-config.js in simulated window
  const window = {};
  global.window = window;
  global.navigator = { userAgent: "E2E Test Browser" };
  global.localStorage = {
    data: {},
    setItem(k, v) { this.data[k] = v; },
    getItem(k) { return this.data[k]; }
  };

  eval(fs.readFileSync('js/firebase-config.js', 'utf8'));

  const registrationData = {
    fullName: "Aryan Kulkarni",
    email: "aryan.kulkarni@example.com",
    whatsappNumber: "9823456789",
    gender: "Male",
    homeTown: "Pune",
    branch: "Computer Engineering",
    year: "FY - Div A"
  };

  // 1. Step 1: Save Registration immediately to database
  console.log("Step 1: Saving registration directly to Firestore...");
  const regResult = await window.DhruvaBackend.saveRegistration(registrationData);
  console.log("Save registration result:", regResult);

  if (!regResult.success || !regResult.id || regResult.offline) {
    throw new Error("Failed to save registration to Firestore!");
  }

  const docId = regResult.id;
  console.log("✅ Registration document successfully created in Firestore with ID:", docId);

  // 2. Fetch the created document from Firestore to verify its fields
  const getUrl = `https://firestore.googleapis.com/v1/projects/dhruva-7c184/databases/(default)/documents/dhruva_test_submissions/${docId}?key=AIzaSyDS7leZONMPWe1UItrShq2NxFrMCFJqTjs`;
  const getRes = await fetch(getUrl);
  const createdDoc = await getRes.json();
  console.log("Verified created document fields in DB:", Object.keys(createdDoc.fields));

  if (!createdDoc.fields.fullName || createdDoc.fields.status.stringValue !== 'registered') {
    throw new Error("Created doc missing expected registration fields!");
  }
  console.log("✅ Registration confirmed in DB with status: 'registered'!");

  // 3. Step 5: Complete assessment (WITHOUT answers)
  console.log("\nStep 2: Submitting completed assessment (WITHOUT answers)...");
  const assessmentData = {
    personal: registrationData,
    scores: { pq: 85, iq: 80, sq: 90 },
    totalScore: 85,
    whatsappCommunityStatus: "joined"
  };

  const updateResult = await window.DhruvaBackend.updateAssessmentSubmission(docId, assessmentData);
  console.log("Update assessment result:", updateResult);

  // 4. Fetch the updated document from Firestore to verify answers are NOT present
  const updatedRes = await fetch(getUrl);
  const updatedDoc = await updatedRes.json();
  const fields = Object.keys(updatedDoc.fields);
  console.log("Updated document fields in DB:", fields);

  if (fields.includes("answers")) {
    throw new Error("FAILED: 'answers' was found in the database document!");
  } else {
    console.log("✅ CONFIRMED: 'answers' is STRICTLY NOT stored in the database!");
  }

  if (updatedDoc.fields.status.stringValue === "completed" && updatedDoc.fields.whatsappCommunityStatus.stringValue === "joined") {
    console.log("✅ CONFIRMED: Assessment status updated to 'completed' with community status!");
  }

  // 5. Clean up the test document
  await fetch(getUrl, { method: "DELETE" });
  console.log("🧹 Test document cleaned up from database successfully.");
  console.log("--- ALL TESTS PASSED SUCCESSFULLY! ---");
}

testE2E().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
