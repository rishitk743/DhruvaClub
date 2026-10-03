const https = require('https');

const projectId = "dhruva-7c184";
const apiKey = "AIzaSyDS7leZONMPWe1UItrShq2NxFrMCFJqTjs";

const options = {
  hostname: 'firestore.googleapis.com',
  port: 443,
  path: `/v1/projects/${projectId}/databases/(default)/documents/dhruva_test_submissions?key=${apiKey}`,
  method: 'GET'
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (d) => { body += d; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    try {
      const parsed = JSON.parse(body);
      console.log('Total documents in dhruva_test_submissions:', (parsed.documents || []).length);
      (parsed.documents || []).forEach((doc, idx) => {
        console.log(`Doc ${idx + 1}: ${doc.name.split('/').pop()}`);
        console.log('Fields:', JSON.stringify(doc.fields, null, 2));
      });
    } catch (e) {
      console.log('Body:', body);
    }
  });
});

req.on('error', (e) => {
  console.error('Error:', e);
});

req.end();
