const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const dirFiles = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  dirFiles.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.jsx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

const files = getAllFiles('src/views');
let totalMatches = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Regex to match div/span/section/button className="..."
  // that contains 'bg-white' or 'bg-white/90' and 'rounded-' and 'shadow-'
  // and doesn't already have 'global-card'
  const regex = /className=(?:\{`|'|")([^`'"]*bg-white[^`'"]*rounded-[^`'"]*shadow-[^`'"]*)(?:`\}|'|")/g;
  
  content = content.replace(regex, (match, classNames) => {
    if (classNames.includes('global-card')) return match;
    
    // We append global-card
    totalMatches++;
    const newClasses = classNames + ' global-card';
    return match.replace(classNames, newClasses);
  });

  // Also replace Dashboard layout cards (they might be dark mode only or slightly different)
  // Let's catch elements with "bg-[#071426]/75 backdrop-blur" or similar if they miss it.
  const regex2 = /className=(?:\{`|'|")([^`'"]*rounded-(?:xl|2xl|3xl|2rem)[^`'"]*border[^`'"]*)(?:`\}|'|")/g;
  content = content.replace(regex2, (match, classNames) => {
    if (classNames.includes('global-card')) return match;
    // only if it looks like a card (has bg-, rounded, border, p-)
    if (classNames.includes('bg-') && classNames.includes('border') && !classNames.includes('absolute')) {
       // totalMatches++;
       // let's stick to the first regex for safety
    }
    return match;
  });

  if (content !== fs.readFileSync(file, 'utf8')) {
    fs.writeFileSync(file, content);
  }
});

console.log('Added global-card to', totalMatches, 'elements.');
