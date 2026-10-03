// Test writing to Firestore via REST API
const https = require('https');

const projectId = "dhruva-7c184";
const apiKey = "AIzaSyDS7leZONMPWe1UItrShq2NxFrMCFJqTjs";

const testDoc = {
  fields: {
    fullName: { stringValue: "Test Runner" },
    email: { stringValue: "test@example.com" },
    whatsappNumber: { stringValue: "9999999999" },
    gender: { stringValue: "Male" },
    homeTown: { stringValue: "Pune" },
    branch: { stringValue: "Computer Engineering" },
    year: { stringValue: "FY - Div A" },
    status: { stringValue: "registered" },
    submittedAt: { stringValue: new Date().toISOString() }
  }
};

const data = JSON.stringify(testDoc);

const options = {
  hostname: 'firestore.googleapis.com',
  port: 443,
  path: `/v1/projects/${projectId}/databases/(default)/documents/dhruva_test_submissions?key=${apiKey}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (d) => { body += d; });
  res.on('end', () => {
    console.log(`Status code: ${res.statusCode}`);
    console.log('Response:', body);
  });
});

req.on('error', (e) => {
  console.error('Error:', e);
});

req.write(data);
req.end();
