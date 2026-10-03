async function checkStats() {
  const url = 'https://firestore.googleapis.com/v1/projects/dhruva-7c184/databases/(default)/documents/dhruva_test_stats/summary?key=AIzaSyDS7leZONMPWe1UItrShq2NxFrMCFJqTjs';
  const res = await fetch(url);
  const data = await res.json();
  const f = data.fields;

  console.log('=== DHRUVA TEST STATS IN FIRESTORE ===');
  console.log('Document Path:', data.name);
  console.log('Total Registered:', f.totalRegistered.integerValue);
  console.log('Total Joined Community:', f.totalJoined.integerValue);
  console.log('Total Not Joined Yet:', f.totalJoinLater.integerValue);
  console.log('Total Males:', f.totalMale.integerValue);
  console.log('Total Females:', f.totalFemale.integerValue);
  console.log('Total Students in Not-Joined List:', (f.notJoinedList.arrayValue.values || []).length);

  console.log('\n--- First 5 Students Who Have Not Joined (Name & Phone) ---');
  (f.notJoinedList.arrayValue.values || []).slice(0, 5).forEach((item, idx) => {
    const s = item.mapValue.fields;
    console.log(`${idx + 1}. Name: ${s.fullName.stringValue} | Phone: ${s.whatsappNumber.stringValue} | Gender: ${s.gender.stringValue}`);
  });
}

checkStats();
