# LOCKED OUT: notes for Claude

## Recorded lines (the line booths)

The user records lines on their phone in two booths (claude.ai artifacts), one take per line:
- **Dev Line Booth** (every line with `who: 'dev'` in `src/game/script.js`):
  https://claude.ai/artifact/J4vx5CogrEcAVMdTSpHkHe, built by `npm run recorder` (writes `dev-recorder.html`)
- **Guard & Aaron Booth** (`who: 'guard'` and `who: 'aaron'`, a tab each):
  https://claude.ai/artifact/CdeEAKvxMzDMYkgDCytkjA, built by `npm run recorder:cast` (writes `cast-recorder.html`)

Both come from `tools/booth.template.html` via `tools/booth.mjs` and are published with the capabilities
`assets`, `db` and `user`. Each take is an asset; each booth's `takes` collection holds one document per
line: `{ asset, hash, text, mime, size, at }`.

- **Whenever a recorded character's line is added or its text changes:** rebuild that booth and republish it
  to the same URL (the takes stay), then remind the user to record the new or changed lines
  (`npm run clips-todo` lists them for every booth) and give them the link. When a text change only fixes
  the subtitle to match the existing recording, update that line's `hash` in `assets/clips/recorded.json`
  instead, so it stays "in the game".
- **Bringing takes into the game:** `ArtifactData` `list` the `takes` collection on the booth's URL. For each
  take whose `asset` differs from its entry in `assets/clips/recorded.json`, download it with the `Artifact`
  tool (`action: "read"`, `path` = the asset id, one call per asset). The user ad-libs, so **transcribe every
  take** (Whisper: `pip install sherpa-onnx`, model `sherpa-onnx-whisper-small.en` from the k2-fsa/sherpa-onnx
  GitHub releases, `asr-models` tag) and change the line's text in `script.js` to what was actually said.
  When the user says they're done recording, lines they skipped are removed (with their uses, e.g. in
  `menu.js`); ask first if removing one would break the story. Then write a `takes.json` of
  `{ "<lineId>": { "file", "hash", "text", "asset" } }` with the hash of the new text (`hash` from
  `tools/booth.mjs`), run `node tools/import-clips.mjs takes.json <download folder>` (needs ffmpeg; a black
  video, camera covered, becomes a voice-only `.mp3` and the cartoon talks along), then `npm run build`,
  check a line plays in the game, rebuild and republish the booth, and commit `assets/clips/` with the rest.
  Tell the user which words were hard to make out.
- The one-file build (`npm run single`, attached to every release) packs `assets/clips/` in, so students
  see the clips there too.
- Recorded lines only play when *Settings → Recorded voices* is on (`settings.recorded`, off by default);
  otherwise lines use the *Character voices* setting. Check a line plays with it turned on.

## Credits on GitHub

The user doesn't want Claude showing up on GitHub. Don't add `Co-Authored-By`, `Claude-Session` or any other
Claude or Claude Code lines to commit messages, and no "Generated with Claude Code" line or session link in pull
request descriptions. Only comment on GitHub when it's really needed.
