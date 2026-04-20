const fs = require('fs');
const path = './src/pages/AdminDashboard.tsx';
let content = fs.readFileSync(path, 'utf8');

// text-white -> text-ink
content = content.replace(/\btext-white\b(?!\/)/g, 'text-ink');
// text-white/XX -> text-muted
content = content.replace(/\btext-white\/[0-9]+\b/g, 'text-muted');

// bg-black -> bg-paper
content = content.replace(/\bbg-black\b(?!\/)/g, 'bg-paper');
// bg-[#050505] -> bg-paper
content = content.replace(/\bbg-\[\#050505\]\b/g, 'bg-paper');

// bg-white/XX -> bg-accent\/10
content = content.replace(/\bbg-white\/[0-9]+\b/g, 'bg-accent/10');
content = content.replace(/\bbg-white\/\[[0-9.]+\]\b/g, 'bg-accent/10');

// border-white/XX -> border-ink/10
content = content.replace(/\bborder-white\/[0-9]+\b/g, 'border-ink/10');

// text-black -> text-paper (on gold buttons mainly)
content = content.replace(/\btext-black\b(?!\/)/g, 'text-paper');

// hover:text-white -> hover:text-ink
content = content.replace(/\bhover:text-white\b(?!\/)/g, 'hover:text-ink');

// hover:bg-white/XX -> hover:bg-accent/20
content = content.replace(/\bhover:bg-white\/[0-9]+\b/g, 'hover:bg-accent/20');

// border-white -> border-ink
content = content.replace(/\bborder-white\b(?!\/)/g, 'border-ink');

fs.writeFileSync(path, content, 'utf8');
console.log('Transformation complete!');
