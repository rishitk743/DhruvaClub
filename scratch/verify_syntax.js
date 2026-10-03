const fs = require('fs');

console.log('Testing JS syntax...');

try {
  const contentJs = fs.readFileSync('js/content.js', 'utf8');
  new Function(contentJs);
  console.log('✅ js/content.js syntax OK');
} catch (e) {
  console.error('❌ js/content.js syntax error:', e);
}

try {
  const firebaseConfigJs = fs.readFileSync('js/firebase-config.js', 'utf8');
  new Function(firebaseConfigJs);
  console.log('✅ js/firebase-config.js syntax OK');
} catch (e) {
  console.error('❌ js/firebase-config.js syntax error:', e);
}

try {
  const securityJs = fs.readFileSync('js/security.js', 'utf8');
  new Function(securityJs);
  console.log('✅ js/security.js syntax OK');
} catch (e) {
  console.error('❌ js/security.js syntax error:', e);
}

try {
  const appJs = fs.readFileSync('js/app.js', 'utf8');
  new Function(appJs);
  console.log('✅ js/app.js syntax OK');
} catch (e) {
  console.error('❌ js/app.js syntax error:', e);
}

// Check steps
const window = {};
eval(fs.readFileSync('js/content.js', 'utf8'));
console.log('Steps registered:', window.DHRUVA_CONFIG.steps.map(s => s.id));
