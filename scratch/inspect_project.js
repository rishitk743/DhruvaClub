const fs = require('fs');

// Read content.js
const content = fs.readFileSync('js/content.js', 'utf8');

// Quick analysis of steps and questions
const stepsMatch = content.match(/id:\s*"([^"]+)"/g) || [];
console.log('Detected IDs:', stepsMatch);

// Load DHRUVA_CONFIG by evaluating content.js in simulated window
const window = {};
eval(content);
const cfg = window.DHRUVA_CONFIG;

console.log('--- DHRUVA CONFIG SUMMARY ---');
console.log('Club Name:', cfg.club?.name);
console.log('Total Steps:', cfg.steps?.length);
cfg.steps.forEach((s, idx) => {
  console.log(`Step ${idx + 1}: [${s.id}] "${s.title}" - Questions: ${s.questions ? s.questions.length : (s.fields ? s.fields.length + ' fields' : 0)}`);
  if (s.questions) {
    const withImages = s.questions.filter(q => q.image).length;
    console.log(`   (With images: ${withImages})`);
  }
});
console.log('WhatsApp links:', cfg.whatsappLinks);
console.log('Score Insights Dimensions:', Object.keys(cfg.scoreInsights || {}));
