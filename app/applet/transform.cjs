const fs = require('fs');
const path = './src/pages/AdminDashboard.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/\btext-white\b(?!\/)/g, 'text-ink');
content = content.replace(/\btext-white\/[0-9]+\b/g, 'text-muted');

content = content.replace(/\bbg-black\b(?!\/)/g, 'bg-paper');
content = content.replace(/\bbg-\[\#050505\]\b/g, 'bg-paper');

content = content.replace(/\bbg-white\/[0-9]+\b/g, 'bg-accent/10');
content = content.replace(/\bbg-white\/\[[0-9.]+\]\b/g, 'bg-accent/10');

content = content.replace(/\bborder-white\/[0-9]+\b/g, 'border-ink/10');

content = content.replace(/\btext-black\b(?!\/)/g, 'text-paper');

content = content.replace(/\bhover:text-white\b(?!\/)/g, 'hover:text-ink');
content = content.replace(/\bhover:bg-white\/[0-9]+\b/g, 'hover:bg-accent/20');
content = content.replace(/\bborder-white\b(?!\/)/g, 'border-ink');

// Let's also ensure `bg-black/80` (used in overlay) -> `bg-ink/80`
content = content.replace(/\bbg-black\/[0-9]+\b/g, 'bg-ink/80');

fs.writeFileSync(path, content, 'utf8');
console.log('Transformation complete!');
