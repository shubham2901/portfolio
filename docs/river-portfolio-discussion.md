# River portfolio: running discussion

A living log of decisions and open questions after the story spec (`docs/superpowers/specs/2026-10-09-river-portfolio-story.md`, on branch `worktree-river-story-spec`). Newest stuff at the bottom of each section. When something here settles, it moves into the spec.

Last updated: 12 Oct 2026

## How the site works now (changed from the spec)

The spec had one camera gliding down a continuous river. We changed that.

- **River view is live code.** Sky, sun and water are drawn by code. Banks, hills and trees are AI images layered on top. The boat crawls on its own and speeds up when you scroll or click. Repetitive banks are fine.
- **Towns:** life towns on the left (COEP, Barclays, IIM Calcutta, Microsoft, Allen, Zluri). Project towns on the right (SpecBuilder, PenFight).
- **Visiting a town:** a spot on the dock glows. Click it and a quick cartoon whip pan swings to the town. No real camera turn, too fiddly.
- **Town view:** a looping AI video you just watch (smoke, a cat, flags), plus 3 random little moments. A notice board you can click. A notice opens full page with the background dimmed, showing that place's details as real text. Close or Esc goes back to the town, another button goes back to the river.
- **No clickable buildings.** One notice board per town, for colleges and jobs alike.
- **The sun moves gradually** on the river, driven by code. Each town is drawn in the light of the spot where it sits, and you look sideways at a town, so the sun is never in frame there.
- **Arch:** dropped. Use a ghat (stone steps down to the water) with a wooden name board on a post. Project towns get a small jetty with the same kind of board.
- **Zluri:** a small toy-like figure of Shubham, drawn in the same cartoon style (not LEGO, trademark), working on a building. The name tag is added by code, because AI video garbles text.
- **Bottle:** lies on the boat deck all trip and on the Zluri dock. Clicking opens a letter signed "To Shubham" that emails him. The throwing and bonk animation comes later.

## Art style

- **Ghibli is out.** The comedy doesn't land on soft painted backgrounds, and the otter looked pasted on.
- **New style: Natural Habitat Shorts plus Clash-A-Rama.** Black hand-inked lines, flat soft colors, comic hatching for shade, deadpan animals. Far things get lighter colored lines and paler colors. Near things get bold black lines.
- **The otter is the sea otter v3:** pale head, dark brown body, deadpan face. Sheet: `~/Downloads/river-refs/out/otter-sheet-v3.png`. Every later image uses it as the reference.
- **The boat** is ChatGPT's first-person bow (`boat-pov-v1.png`), cut out. The rope and the message bottle are part of it.
- **Tip that worked:** ask ChatGPT for land only, with sky and water in solid magenta (#FF00FF). Code fills those areas and the cutout is clean.

## Tools

Researched 10 Oct 2026 by two agents. Some of these model names are newer than Claude's own knowledge, so confirm prices on the official pages before paying.

- **Images: ChatGPT (GPT Image 2.5).** It tops the blind-vote leaderboards for making and editing images. Backup: Google Nano Banana 2.1.
- **Video: not bought yet.** Run a roughly $5 bake-off on fal (pay per use) with the same otter poses through Kling 3.0, Seedance 2.0 and MiniMax H3. Buy the winner. If it's a tie, take Kling.
- **Video gotchas:** using the same start and end frame in one clip kills the motion, so make each act as two clips (rest to action, action back to rest). No tool outputs a see-through background, so generate on flat green and cut it out.

## ChatGPT API key (open, 12 Oct)

- **Why:** right now every drawing is a round trip through Shubham. With the API, Claude makes the image, checks it lines up with the otter, retries, cuts it out and drops it in, all in one pass. The API also gives real see-through backgrounds and bigger images, which towns need.
- **Cost:** billed separately from ChatGPT Plus, per image. About $0.21 per image for the top model (agent research, not yet checked on OpenAI's page). One animation is roughly 2 to 6 images, so about $1 to $3. Set a monthly cap on the OpenAI billing page, for example $20.
- **Handover:** never paste the key in chat. Copy it, then run `! pbpaste > ~/.claude/secrets/openai-key.txt` and `! chmod 600 ~/.claude/secrets/openai-key.txt`. Claude reads it only inside scripts, never prints it, and never commits it.
- **Status:** waiting on Shubham.

## Otter animations

The otter is a code puppet: its back-view drawing split into a body and a tail tip. Acts that need a new pose swap in extra drawings of the same otter, Natural Habitat style, holding poses rather than smooth motion.

| Animation | Needs | Status |
|---|---|---|
| Breathing, swaying, tail swish | Code | Done |
| Steering the wheel | Code | Done |
| Looking at the birds | Code | Done |
| Hip shake | Code | Removed, Shubham didn't want it |
| Butt scratch | 2 drawings: paw high, paw low | Code ready, waiting on drawings |
| Ear flick, tail twitch, big sigh | Code | Proposed |
| Glancing back at the viewer | 1 drawing: head turned, one eye showing | Proposed, high laugh value |
| Dozing off, waking with a jolt | 2 drawings | Proposed, high laugh value |
| Yawn and stretch | 1 or 2 drawings | Proposed |
| Sniffing the air | 1 drawing | Proposed |

Prompt for the scratch drawings (same chat as the otter sheet): "Take the back view of this exact otter (top right of the sheet). Make two new images of it, each on the same plain off-white background, same size, same position, same outlines and colors, nothing else changed. Image 1: its right paw reaches behind and scratches its bum, paw high on the bum. Image 2: identical to image 1 but the paw is lower, mid-scratch. Keep the head, ears, body shape and tail exactly as in the original back view."

## Prototype

- `prototypes/river-pov/index.html` on branch `worktree-river-pov-prototype`. Open it with `python3 -m http.server 8765 --directory prototypes/river-pov` and go to `http://localhost:8765`.
- What it has: the ink-style land, a code sky, a sun behind the hills, white wave lines drifting toward the boat, the sun streak shimmering in place, the ChatGPT boat bow, Claude's ink-style wheel and stool, and the otter puppet.
- Lesson: when an image changes, give it a new file name, or the browser shows the old one.

## Known weak spots

- The wheel and stool are drawn by Claude. Their lines are cleaner than the hand-inked art. They could be replaced with ChatGPT drawings.
- On a phone, the top half is empty sky and the banks crop out. Phones need a tall version of the land image.
- The clouds are simple code shapes. ChatGPT clouds in ink style on magenta would look better.

## Risks to keep an eye on

- **Updating it in a year.** New AI models may not reproduce this style. Keep a style pack from day one: prompts, reference images and every finished asset.
- **Page weight.** 8 towns with several clips each, plus the otter. Load each town only when it's coming up.
- **Phone scrolling.** Swiping to move the boat can fight the page's own scrolling. Test it early.
- **Recruiters and Google.** Every fact must exist as plain text: the notices, the manifest, and a link per town (like `/allen`) for sharing.
- **Bottle spam.** A public email form needs a rate limit and a hidden spam check.
- **Content.** Zluri's role and projects, and the copy for every notice. Usually the slowest part.
