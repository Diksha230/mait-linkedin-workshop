# Tailored prompt: LinkedIn workshop at MAIT

Build a full-screen workshop presentation that looks like a landing page, for a 60-minute LinkedIn workshop run by Diksha Singhal for about 200 1st-year BBA students at MAIT, hosted by the Eventura society. It is projected from a MacBook over HDMI and driven by a presentation clicker. The same deck runs for 2 back-to-back sessions. Use React, TypeScript, Vite, Tailwind CSS 4 and Framer Motion. No other UI libraries.

Central idea: "Your LinkedIn is already saying something about you. Even when you have posted nothing." The humour comes from students recognising their own behaviour, never from pasted slang.

---

WHAT CHANGED FROM THE MAINFRAME PROMPT, AND WHY

- It is a deck, not a scrolling page. The clicker (PageDown, PageUp, arrow keys) reveals 1 beat at a time, because the talk is delivered live.
- It must work with no internet. College Wi-Fi is not trusted, so everything is bundled and the web fonts load without blocking.
- Type is sized for the back row of a hall and for low-resolution projectors (1024x768 and 1280x720 must fit without scrolling).
- The background video is replaced. There is no video for this talk, so the mouse scrub drives an empty student profile that fills in as the mouse moves right. The video scrub still exists: put an mp4 in /public and set its path in `src/chapters/Hero.tsx`.
- The logo is "Diksha Singhal ✳︎" (no registered mark). The centre nav shows the current chapter title. "Get in touch" becomes "Chapters", which opens the overlay menu at every screen size.

---

FONTS

Load the 2 stylesheet links from the original prompt in `index.html`, with `media="print" onload="this.media='all'"` so a slow connection never blocks the page. Keep the same CSS variables:

```css
--font-heading: 'HelveticaNowDisplay-Medium', 'Helvetica Neue', Arial, sans-serif;
--font-body: 'HelveticaNowDisplayW01-Rg', 'Helvetica Neue', Arial, sans-serif;
```

Body uses `--font-body`. Big statements, the logo and chapter names use `--font-heading` at weight 500, because Medium reads better from the back of a hall. Offline, macOS falls back to Helvetica Neue, which looks near identical.

Type scale, each size capped by both width and height:
- hero: `clamp(22px, min(3.3vw, 6vh), 64px)`, line-height 1.35
- display: `clamp(34px, min(5.4vw, 9.4vh), 112px)`, line-height 1.02, tracking -0.03em
- statement: `clamp(27px, min(3.8vw, 6.8vh), 78px)`, line-height 1.08, tracking -0.02em
- body: `clamp(18px, min(1.9vw, 3.4vh), 38px)`, line-height 1.3
- small: `clamp(14px, min(1.3vw, 2.3vh), 25px)`
Headings use `text-wrap: balance`.

---

COLOUR AND THE ONE BOLD IDEA

- True black `#000000`, true white `#FFFFFF`, coral `#FF6B4A`. No cream, no tinted near-black, no gradients.
- Black means "where you are now". White means "what to do about it".
- Each chapter has a turn step. When the clicker reaches it, a full-screen coral panel sweeps left to right in 640ms, and the colours flip from black to white at the midpoint, while the screen is fully covered. Going back across the turn sweeps again and returns to black.
- Coral appears only in 3 places: the sweep, a selected character card, and a ticked checkbox.
- Between chapters, the old screen fades out (280ms), the colours change, then the new screen fades in.

MOTION LANGUAGE: caught in 4K

Every revealed beat comes into focus from a blur: `opacity 0 -> 1` and `blur(14px) -> 0` over 550ms. Hidden beats keep their space, so the layout never jumps on a projector. Respect reduced motion (no blur, no sweep, no typewriter).

---

PRESENTER CONTROLS

- Next beat: PageDown, Right, Down, Space, Enter. Previous: PageUp, Left, Up.
- B or full stop: blank the screen. The next click only unblanks it.
- F: full screen. Home: back to the start. Esc: close the menu.
- The URL keeps the place as `#chapter-step`, so a refresh lands on the same beat, and typing `#12-0` jumps there.
- While typing in an input, keys stay in the input. PageDown still advances. Enter leaves the input.

---

NAVBAR (fixed, z-index 10): as in the original prompt, with the logo, the centre title and the hamburger animation unchanged. The overlay (z-index 9, `bg-(--bg)/90 backdrop-blur-md`) lists all 23 chapters, numbered from 0, in 2 columns on desktop.

Bottom right: previous and next chevron buttons around "3 of 22" ("Start" on the hero). On phones it gets a solid background.

---

CHAPTERS. 23 screens, and the running order matters: her introduction comes first, the old hero becomes the pivot at 7, then the teaching.

0. Why listen to me (black). "Fair question first. Why should you listen to me?" / "I am not a professor. I am not 40. I am a few years ahead of you." / "Same city, same phone, no degree in any of this. So here are my receipts, fast. Then we get back to you." Her words, their language. This is the handover into the introduction.

1. How I started (black). Her timeline, 1 beat per click, with her photo: joined in 2023 right after 12th and hated it; the account sat for 6 months and she decided the app was useless; in 2024 she learned digital marketing from posts on that same app and ran a 100-day challenge; day 7, a post went viral; agencies messaged her with jobs and she passed every one on; 6 months to the first client, Europe, Diwali 2024, ₹4,000; 2 months later she ended it and lost every client at once, and "it hurt more than a breakup".

2. Not for the job (black, turns white). "Nobody in my family knows what LinkedIn is." TURN: ₹4,000 next to ₹17.6 lakh ($20,000+, Canada), then "LinkedIn is not for the job." and "If LinkedIn shut down tomorrow, I would be sitting at nothing." The theme of the talk.

3. You are just 19 (black, turns white). What people actually said to her at 18 and 19, then "That is where the insecurity starts. Mine did." TURN: her real comeback, "I was born into social media. You were not." Then "You cannot argue with 'too young'. You can only show proof."

4. What clients say (white). 3 client screenshots, 1 per click, names blurred.

5. What it has produced (white). 5 figures, rupee value first: ₹16.4 lakh from 3 coaches outside India, ₹4.98 lakh largest deal, ₹33 lakh closed by 1 coach from 21 booked calls, 421 webinar signups, 6,000+ followers. Then "This is what a profile is worth once it shows proof." Last click shows the dashboard and the public thank you.

6. Times Square, 3 times (white). 3 real photos, then "None of this needed permission from anybody." and the open loop into the 19-year-old story.

7. THE PIVOT, the old hero (black). Blurred label (blur 4px), the typewriter line "Your LinkedIn is already saying something about you. Even when you have posted nothing.", the white pill blocks of their own behaviour, and the profile card that fills in as the mouse moves right. Everything before this is her. Everything after it is them.

8. Caught in 4K (black). The search bar with an editable name, 4 results 1 per click, then "Your future recruiter will stalk you." / "Please give them better material."

9. Which LinkedIn character are you? (black). 5 cards with Visibility and Proof meters, 1 per click, clickable to select.

10. Phones out (white). Search your own name on Google, open LinkedIn, hand up if you have no account, and a 30-second timer.

11. Why we ignore LinkedIn. 4 excuses, then "“Later” usually means 3 weeks before placements." TURN: opportunities create experience.

12. The opportunity timeline (white). Year 1, 2, 3, then "The profile you need in Year 3 is built in Year 1."

13. Your profile is your trailer. The 4 things in 10 seconds, then 3 headlines with reactions, TURN on the 3rd.

14. The no-experience starter pack. 8 pills, then the before and after, then "Same student. Better proof."

15. Networking without being weird. The "Hi sir" chat, then the 5 steps, the connection note with a copy button, then "No “kindly revert.”"

16. What will I post? The influencer line, then 5 things they can post, then the 2 posts and "Certificate posted. Skill still loading."

17. From posting to opportunities. Profile + Proof + Relationships = Opportunities.

18. Freelancing at 19. "“Who will hire someone my age?”" TURN: the $3,000 reveal, told out loud.

19. AI fixes words, not proof. The AI About box, "Bro, you joined college 6 weeks ago.", the 5 rules and the prompt with a copy button.

20. Live profile audit. 3 rounds, the 10-second timer, the tickable rebuild, then the before and after cards.

21. What I wish I knew at 19 (white). 5 lines from her own story.

22. The final challenge. Tonight and this week, then "You need to look like someone who is learning on purpose."

---

COPY RULES

English only. Digits, never number words ("3 weeks", "1st-year"). No em dashes. Sentence case. No all-caps labels, no middle-dot separators, no arrows appended to buttons. Numbers appear only on real sequences (steps, rounds, chapters).

