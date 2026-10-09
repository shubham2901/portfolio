# River portfolio: story and world

Date: 9 Oct 2026
Status: story locked. Art style open until the feasibility check. Design and build come after.

## Why we're rebuilding

The current site is a resume on a web page. Dark navy, a particle background, a scroll timeline. It shows the facts but says nothing about the person.

The new site should feel like a small world you travel through, not a page you read. Two kinds of visitors need to be happy:

- People who enjoy the trip: founders, design-minded people, AI folks. The site itself shows taste and the ability to ship.
- Recruiters with 30 seconds. They need the plain resume one click away, at all times.

Hosting stays on Vercel. The tech stack is open.

## The idea in one paragraph

You sit in a small sailboat behind a sea otter who steers it. It's sunrise. The river carries you past one town for each step of Shubham's life, from college to his current job. Each town has a gate arch over the river. In the job towns, the buildings Shubham built can be clicked, and each one has a foundation stone that tells you what he did there. The trip ends at Zluri. That town is still under construction, Shubham is there building it, and logs in the water stop the boat.

## Point of view and camera

- Everything is first person. The visitor is never seen. Only the direction they look changes.
- The view faces forward down the river. The boat sits near the bottom of the screen (its top edge about 20% up from the bottom), so 80% of the screen shows what's ahead. You see more future than past, and you can still go back.
- The scenery is built like a toy theater: flat drawn cutouts set at different depths. The code moves the camera, and the art stays 2D. No Blender and no 3D modeling.
- Towns start small near the horizon and grow as the boat gets close.

## Characters

There are only three.

| Who | What they are | What they do |
|---|---|---|
| Visitor | Invisible. It's their eyes. | Looks forward while sailing, and looks around a town at port. |
| Sea otter | The helmsman. Cute, with a big head, small limbs, and a tiny stepping stool at the wheel so it can reach. No name, never talks. Always carries its favorite rock. | Steers while sailing. Has small idle habits at port. Takes the message bottle. |
| Shubham | An avatar in the same art style as the otter. | Only appears at Zluri, working on a building. |

Otter habits at port (first pass, can change): ties the rope to the dock, floats on its back, cracks a shell on its rock, waves at birds, sometimes glances back at the visitor.

## The journey

### Time of day

- On load, it's dawn, with the sun rising ahead over the river or behind the mountains and an orange sky.
- The sky moves forward as you sail. By Zluri it's about 10 to 11am.
- The point: it's still morning, and most of the day is ahead.

### Along the river

Natural life between towns: birds, breeze, the sail moving. It's calm, with nothing loud.

### Towns, in order

Each town has its own theme, the way each island in One Piece has its own look. Each one has a **kamaan** (a gate arch) stretched across the river with the town's name on it. The boat sails under it to arrive.

| # | Town | Kind | Theme (first pass) | What you can click |
|---|---|---|---|---|
| 1 | COEP, Pune | College | Students, engineering workshops | Honor board, hostel window |
| 2 | Barclays | Job | Old, sturdy finance town | 2 buildings |
| 3 | IIM Calcutta | College | Business school campus | Honor board, hostel window |
| 4 | Microsoft | Job | Busy tech port | 3 buildings |
| 5 | Allen | Job | Education hub | 6 buildings |
| 6 | Zluri | Job, last stop | Under construction | Buildings being built, Shubham's avatar |

### College towns: "I was here"

Shubham didn't build anything at college, so these towns say "I was here" instead:

- **Honor board** in the main hall. Wooden, with gold letters: name, degree, branch, years. You can read it at a glance.
- **Lit hostel window** with a name plate. A small detail that rewards people who look around.

### Job towns: "I built this"

- Only the buildings Shubham built can be clicked. They should look clearly interactive, not lit up. The exact visual cue gets decided in design.
- Each one has a **foundation stone** with a short text: what it is, what he did, how it worked, skills, impact.
- Board and stone copy are short. Final wording comes later. For now we use the text from the current site, with dummy text for Zluri.

### The last town: Zluri

- Logs and construction gear float across the river, so the boat can't go further. The visitor can only go back.
- Scaffolding and half-built buildings. Shubham's avatar is at work on one of them.
- Zluri's projects are the buildings under construction.
- Nothing past Zluri is shown or explained.

## Moving through it

| Action | What happens |
|---|---|
| Page load | Dawn and sunrise on screen. A prompt asks for a tap to start. |
| First tap or click | Starts the trip and starts the sound. Browsers block sound until a tap, click or key press, and scrolling doesn't count, so this tap is needed. |
| Scroll forward or back | The boat sails ahead or back. |
| Click ahead on the river or behind | The boat moves ahead or back. |
| Next button | Jumps straight to the next port. Also the way to skip a town. |
| Reaching a town | The boat slows, sails under the kamaan, and drifts to the dock. |
| Scroll ahead while docked | The visitor climbs onto the dock. |
| On the dock, moving the mouse | Looks around the town. Mouse only, no sailing. |
| On the dock, scrolling back past a set amount | The visitor gets back in the boat. |
| Scroll ahead after getting back in | The boat sails on to the next town. It does not dock again. |

## On the deck

- **Ship's manifest:** a clipboard by the wheel. It opens a standard, plain resume page. The visitor can download a PDF or copy a share link. This is the recruiter shortcut, and it's always one click away.
- **Message in a bottle:** sits on deck the whole trip. Click it, write a note, and the otter tosses the bottle into the river. Behind the scenes, this sends Shubham an email. It's the only contact path.
- **Side project tools (on hold):** SpecBuilder as a net and PenFight as a game. Only these two. We'll design and build them later.

## Sound

- On by default, starting with the first tap. There's an off button.
- Always light: soft breeze, the sail, birds chirping.
- When the otter does something, a small soft sound plays. Never loud or bold.

## Phones

Vertical layout. Forward-facing views like this one already fit a tall screen. The details get worked out in design.

## Content for now (from the current site)

**COEP, Pune.** B.Tech, Information Technology, 2013 to 2017.

**Barclays.** Software Developer, 2017 to 2019. Cut costs 25%, saved 190 hours a week.
- Cloud Migration: led the AWS move, set up CI/CD pipelines.
- Contract Lifecycle Tool: built a tool to manage contracts worth $3Bn+ in revenue.

**IIM Calcutta.** MBA, 2019 to 2021. Moved from engineering to product management.

**Microsoft.** Product Manager 2, 2021 to 2023. 250M MAU, 2% better search success, 25M new adoption.
- Search Success: better ranking in Outlook, Teams and Edge using user history.
- B2B Evangelization: outreach to 50K+ developers for Embedded Search.
- Edge Inferencing: ONNX models on 250M devices, latency down from 300ms to 60ms.

**Allen.** Senior Product Manager, 2023 onward. 5Mn MAU, $500Mn revenue, 36% retention lift.
- 0-to-1 Online Class Platform: scaled to 1Mn MAU.
- AI Proctoring: a vision model that flags suspicious activity.
- Multimodal Eval: LLM homework grading, 80% faster.
- Vision Models: in-class attentiveness tracking with Google MediaPipe.
- HTML Whiteboard: in-house whiteboard, 80% less data. Patent pending.
- B2B Onboarding: 500+ partner schools, INR 100Cr ARR.

**Zluri.** Dummy for now: role, years, 2 or 3 project buildings. To be filled in.

## Still open

1. **Art style.** Five options: (1) flat color with bold outlines, (2) pencil or rubber-hose cartoon, (3) clean flat vector (those three come from the reference images), (4) Ghibli-style painting, (5) pixel art. We pick after the feasibility check. The check judges each style for this toy-theater, first-person setup on four things: staying consistent, how hard the otter is to animate, how well it works as flat cutouts, and whether one person can make it look high quality.
2. **"What I'm looking for."** It was on the original content list but has no home in the story now, since nothing past Zluri is shown. Decide whether it lives in the manifest, or nowhere.
3. **Zluri content.** Real role, dates and projects.
4. **Board and stone copy.** Final short texts for every building and honor board.
5. **Deck tools.** SpecBuilder net and PenFight game, on hold.
6. **Town themes.** The first-pass themes above need detail in design.
7. **How the clickable buildings look.** Decided in design.

## Next steps

1. Feasibility check on the five art styles.
2. Pick the art style.
3. Design: town looks, the otter, the UI for boards, the manifest and the bottle, the phone layout.
4. Then how to build it: implementation plan.
