# LinkedIn workshop at MAIT

A 23-chapter presentation for the Eventura × MAIT LinkedIn workshop. It looks like a landing page and is clicked through like slides. It works with no internet.

## On the day

```
cd ~/Projects/mait-linkedin-workshop
npm run present
```

That builds the site and opens it in the browser. Press F for full screen.

## Clicker and keyboard

| Key | What it does |
| --- | --- |
| PageDown, Right, Down, Space | Next beat |
| PageUp, Left, Up | Previous beat |
| B or full stop | Blank the screen (next click brings it back) |
| F | Full screen |
| Home | Back to the start |
| Chapters (top right) | Jump to any chapter |

- **Refreshed by accident?** The page reopens on the same beat.
- **Chapter 8, Caught in 4K:** click the search bar, type a volunteer's name, press Enter, then keep clicking. Their name appears in every search result.
- **Chapter 7, the pivot screen:** move the mouse left and right and the empty profile fills in, then empties again.
- **Chapter 20, the live audit:** click the 10 to start the timer. Click each rebuild item as you fix it on the student's profile.

## The running order

Your introduction opens the talk. Chapter 7 is the old slide 0, and it is the pivot: it turns the talk from you to them.

| # | Chapter | What it does |
| --- | --- | --- |
| 0 | Why listen to me | "Fair question first. Why should you listen to me?" in their language |
| 1 | How I started | Your timeline from 2023: the hate, day 7, ₹4,000, losing every client |
| 2 | Not for the job | ₹4,000 next to ₹17.6 lakh, then the theme of the talk |
| 3 | You are just 19 | What people said to you, the insecurity, and your comeback line |
| 4 | What clients say | 3 anonymised screenshots |
| 5 | What it has produced | 5 figures in rupees, plus the webinar receipts |
| 6 | Times Square | 3 billboard photos, then the tease of the 19-year-old story |
| 7 | **The pivot** | The typewriter line and the pill blocks: now it is about them |
| 8 to 19 | The teaching | Caught in 4K, the character quiz, phones out, and the rest |
| 20 | Live profile audit | The transformation moment |
| 21 | What I wish I knew at 19 | The 5 lines, just before the challenge |
| 22 | The final challenge | Tonight and this week, then the closing line |

Every figure in chapter 5 comes from your own client-wise receipt sheet (July 2025 to February 2026), the webinar dashboard and your profile. Dollars are converted at about ₹88.

## Files

- `PROMPT.md`: the tailored build prompt, to rebuild or change this in another tool.
- `src/chapters/`: 1 file per chapter. Edit the text there.
