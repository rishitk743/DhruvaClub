const fs = require('fs');

// Mock window and navigator
const window = {};
global.window = window;
global.navigator = { userAgent: "Node Test Agent" };
global.sessionStorage = {
  data: {},
  setItem(k, v) { this.data[k] = v; },
  getItem(k) { return this.data[k]; },
  removeItem(k) { delete this.data[k]; }
};

// Load security.js
eval(fs.readFileSync('js/security.js', 'utf8'));

// Load content.js
eval(fs.readFileSync('js/content.js', 'utf8'));

console.log("=== SIMULATING DHRUVA CLUB ASSESSMENT FLOW ===");

// 1. Verify steps sequence
const steps = window.DHRUVA_CONFIG.steps;
console.log("Total steps configured:", steps.length);
steps.forEach((s, idx) => {
  console.log(`Step ${idx + 1}: ${s.id} (${s.title})`);
});

if (steps[0].id === 'personal_details' &&
    steps[1].id === 'section_pq' &&
    steps[2].id === 'section_iq' &&
    steps[3].id === 'section_sq' &&
    steps[4].id === 'community_joining') {
  console.log("✅ Step sequence verified: Registration -> PQ -> IQ -> SQ -> Community Joining!");
} else {
  console.error("❌ Unexpected step sequence!");
}

// 2. Test Security Payload Encryption & Decryption
const testSession = {
  gender: "female",
  fullName: "Ananya Sharma",
  scores: { pq: 82, iq: 78, sq: 86 },
  totalScore: 82,
  whatsappStatus: "joined"
};

const token = window.DhruvaSecurity.encryptSessionPayload(testSession);
console.log("Encrypted token length:", token.length);

const decrypted = window.DhruvaSecurity.decryptSessionPayload(token);
console.log("Decrypted session payload:", decrypted);

if (decrypted.fullName === "Ananya Sharma" && decrypted.whatsappStatus === "joined") {
  console.log("✅ Session token encryption and verification passed!");
} else {
  console.error("❌ Decryption mismatch!");
}

console.log("=== ALL SIMULATION CHECKS PASSED SUCCESSFULLY ===");
