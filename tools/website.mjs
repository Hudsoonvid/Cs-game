// The museum website is one file to paste into Google Sites. This writes four things into website/index.html:
// the photos (website/photos/*.webp, taken inside the game), the answers to its puzzles (as hashes), the
// staff-only area (below, scrambled with the staff password, so reading the page's code gives none of the
// secrets away), and then the whole game, packed in (gzipped), which makes museum-website.html: the copy to
// paste. website/index.html itself stays without the game, so the repo doesn't fill up with copies of it.
//   npm run website   (builds the game first; every GitHub release gets a museum-website.html too)
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { packGame } from './single-file.mjs';

const root = new URL('../', import.meta.url);
const page = new URL('website/index.html', root);
const full = new URL('museum-website.html', root);
const photoDir = new URL('website/photos/', root);

// the same hash the page uses (cyrb53)
function hash(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) { ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

// the website's puzzles: the Dinosaur Hall word, the Roman number, and the staff password
// (the game's five fragments, then fragment six: the word and the number)
const ANSWERS = { dino: 'SHIFT', rome: '47', five: 'REXMUMMY1974ZAPDONUT', pw: 'REXMUMMY1974ZAPDONUTSHIFT47' };

// The staff-only area, shown after signing in to the staff portal. Photos in it use data-photo like the
// rest of the page.
const STAFF = `
<span class="label muted">MUSE-OS · Signed in as NIGHT_GUARD</span>
<h2 style="margin:8px 0 12px">Welcome back</h2>
<p class="lede">The password was REX, MUMMY, 1974, ZAP, DONUT and SHIFT47. The last piece was your own shift number. IT thought that was hilarious.</p>

<h3 style="margin-top:30px">Security cameras, last night</h3>
<div class="cams">
  <figure class="cam"><img data-photo="noffice" alt="The security office at night"><figcaption>CAM 1 · SECURITY OFFICE · 23:52</figcaption></figure>
  <figure class="cam"><img data-photo="ndino" alt="The Dinosaur Hall at night"><figcaption>CAM 2 · DINOSAUR HALL · 00:03</figcaption></figure>
  <figure class="cam"><img data-photo="nlobby" alt="The lobby at night"><figcaption>CAM 4 · LOBBY · 01:02</figcaption></figure>
  <figure class="cam"><img data-photo="archive" alt="The archives"><figcaption>CAM 5 · ARCHIVES · NO SIGNAL</figcaption></figure>
</div>

<div class="staff-cols">
  <section class="log">
    <h3>Night shift log, shift #47</h3>
    <ul>
      <li><b>11:52 PM</b> Got logged out. donut123 doesn't work anymore. The screen just says SOLVE THE PUZZLES. Thanks, IT.</li>
      <li><b>12:00 AM</b> Did the panel in the Dino Hall. Got REX. Turned around. The T-Rex was GONE.</li>
      <li><b>12:40 AM</b> Followed the footprints to Egypt. Did the pillars, did the lock, got MUMMY. Then the mummy woke up and I had to give him a donut. Not putting that in the real report.</li>
      <li><b>1:02 AM</b> Roman Hall. The code was 1974. Then the T-Rex was right behind me so I ran.</li>
      <li><b>1:10 AM</b> Hid in the archives. ZAP. DONUT. Kept going. Found a Christmas tree. No fragment six.</li>
      <li><b>???</b> Fell asleep.</li>
      <li><b>7:00 AM</b> Woke up in the Dino Hall. The T-Rex is back. It has my hat. Aaron saw everything.</li>
    </ul>
  </section>
  <div class="board">
    <span class="note">All passwords were changed at 11:52 PM. If you're locked out, that's kind of the point. Come see us 9 to 5.<small>- Kevin, IT</small></span>
    <span class="note pink" style="--r:2deg">Employee of the Month: Aaron. Twelve months in a row. We are starting to think it's rigged.</span>
    <span class="note blue" style="--r:-1deg">Parade day! Night staff leave by the side door. The front is full of floats.</span>
    <span class="note green" style="--r:1.5deg">Whoever left a hat in the T-Rex: it's in lost and found. We have questions.<small>- front desk</small></span>
    <span class="note" style="--r:-2deg">You found the secret staff area! Thanks for playing LOCKED OUT. If you liked it or found a bug, fill out the comment card. I read every one.<small>- Hudson</small></span>
  </div>
</div>
`;

function scramble(text, pw) {
  let seed = hash(pw, 1974) >>> 0;
  const rnd = () => { seed = (seed + 0x6D2B79F5) >>> 0; let t = seed; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) & 255; };
  const bytes = Buffer.from(text, 'utf8');
  for (let i = 0; i < bytes.length; i++) bytes[i] ^= rnd();
  return bytes.toString('base64');
}

const photos = {};
for (const f of readdirSync(photoDir).filter((n) => n.endsWith('.webp')).sort()) {
  photos[f.replace(/\.webp$/, '')] = 'data:image/webp;base64,' + readFileSync(new URL(f, photoDir)).toString('base64');
}
const hashes = Object.fromEntries(Object.entries(ANSWERS).map(([k, v]) => [k, hash(v, 47)]));
let html = readFileSync(page, 'utf8');
const swap = (name, value) => {
  const re = new RegExp(`/\\*${name}\\*/[\\s\\S]*?/\\*END\\*/`);
  if (!re.test(html)) throw new Error(`no /*${name}*/ … /*END*/ in website/index.html`);
  html = html.replace(re, () => `/*${name}*/${value}/*END*/`);
};
swap('PHOTOS', JSON.stringify(photos));
swap('ANSWERS', JSON.stringify(hashes));
swap('STAFF', JSON.stringify(scramble(STAFF.trim(), ANSWERS.pw)));
swap('GAMEV', '""');
swap('GAME', '');
writeFileSync(page, html);
console.log(`wrote website/index.html: ${(html.length / 1024).toFixed(0)} KB (${Object.keys(photos).length} photos, staff area ${(STAFF.length / 1024).toFixed(1)} KB scrambled)`);

// The game, the same as locked-out.html with the website's settings for it: no outside link to play it,
// no "newer version" note (a new version comes with a new copy of the website), and "Play in its own tab"
// comes back to the website (it calls the page when it can, and posts a message when a locked-down frame
// keeps them apart).
const SITE_CONFIG = `window.LOCKED_OUT_CONFIG = Object.assign(window.LOCKED_OUT_CONFIG || {}, { playUrl: '', checkUpdates: false, popout: window.parent !== window ? function () { try { if (window.parent.cmPopout) return window.parent.cmPopout(); } catch (e) { /* another origin */ } window.parent.postMessage({ cmPopout: 1 }, '*'); } : null });`;
const version = 'v' + JSON.parse(readFileSync(new URL('package.json', root), 'utf8')).version;
const game = packGame({ config: SITE_CONFIG }).html;
const packed = gzipSync(game, { level: 9 }).toString('base64');
swap('GAMEV', JSON.stringify(version));
swap('GAME', packed);
writeFileSync(full, html);
console.log(`wrote museum-website.html: ${(Buffer.byteLength(html) / 1e6).toFixed(2)} MB, with the game (${version}, ${(Buffer.byteLength(game) / 1e6).toFixed(2)} MB) packed in`);
