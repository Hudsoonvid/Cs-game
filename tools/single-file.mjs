// Packs the whole game into ONE html file (the page, style.css, game-config.js and dist/game.js), for
// hosts that want a single file, sharing in Google Classroom/Drive, or opening straight from a computer.
//   npm run build && node tools/single-file.mjs        → locked-out.html
// The fonts still come from Google Fonts (they fall back to built-in fonts offline). Your clips and
// photos in assets/clips/ are packed in too. The museum website packs this same file into itself
// (tools/website.mjs), with a few settings of its own (`config`, run after game-config.js).
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const read = (f) => readFileSync(new URL('../' + f, import.meta.url), 'utf8');
// a script or style can't contain its own closing tag
const safe = (code, tag) => code.replace(new RegExp(`</(${tag})`, 'gi'), '<\\/$1');

export function packGame({ config = '' } = {}) {
  let html = read('index.html');
  const swap = (tag, inline) => {
    if (!html.includes(tag)) throw new Error('index.html no longer has: ' + tag);
    html = html.replace(tag, () => inline);
  };
  swap('<link rel="stylesheet" href="style.css">', `<style>\n${safe(read('style.css'), 'style')}\n</style>`);
  // clips and photos, as data: URLs the game finds by file name
  const TYPES = { mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime', m4a: 'audio/mp4', mp3: 'audio/mpeg', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
  const packed = {};
  for (const f of readdirSync(new URL('../assets/clips/', import.meta.url))) {
    const ext = f.split('.').pop().toLowerCase();
    if (TYPES[ext]) packed[f] = `data:${TYPES[ext]};base64,` + readFileSync(new URL('../assets/clips/' + f, import.meta.url)).toString('base64');
  }
  swap('<script src="game-config.js"></script>', `<script>\n${safe(read('game-config.js'), 'script')}\nwindow.LOCKED_OUT_CLIPS = ${JSON.stringify(packed)};${config ? '\n' + safe(config, 'script') : ''}\n</script>`);
  swap('<script src="dist/game.js"></script>', `<script>\n${safe(read('dist/game.js'), 'script')}\n</script>`);
  return { html, clips: Object.keys(packed).length };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { html, clips } = packGame();
  const out = process.argv[2] || 'locked-out.html';
  writeFileSync(new URL('../' + out, import.meta.url), html);
  console.log(`wrote ${out}: ${(Buffer.byteLength(html) / 1e6).toFixed(2)} MB, ${clips} clips packed in`);
}
