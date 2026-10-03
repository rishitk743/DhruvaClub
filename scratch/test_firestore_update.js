// Test updating Firestore via REST API
const https = require('https');

const projectId = "dhruva-7c184";
const apiKey = "AIzaSyDS7leZONMPWe1UItrShq2NxFrMCFJqTjs";
const docPath = "iKb00cfXOlsbHwdpOG2r";

const updateDoc = {
  fields: {
    status: { stringValue: "completed" },
    totalScore: { integerValue: "85" },
    completedAt: { stringValue: new Date().toISOString() }
  }
};

const data = JSON.stringify(updateDoc);

const options = {
  hostname: 'firestore.googleapis.com',
  port: 443,
  path: `/v1/projects/${projectId}/databases/(default)/documents/dhruva_test_submissions/${docPath}?updateMask.fieldPaths=status&updateMask.fieldPaths=totalScore&updateMask.fieldPaths=completedAt&key=${apiKey}`,
  method: 'PATCH',
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
