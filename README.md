# Pomodoro Timer

A simple Pomodoro timer built with plain `HTML`, `CSS`, and `JavaScript`.

This project is intentionally lightweight so it is easy to understand, easy to maintain, and easy to deploy on GitHub Pages without a build step.

## Project Goal

Build a productivity timer that helps a user:

- start, pause, resume, and reset a session
- move between work sessions and breaks
- track completed work sessions
- customize default durations
- hear a sound cue when a session ends

The app follows a classic Pomodoro setup by default:

- `25` minute work session
- `5` minute short break
- `15` minute long break
- long break after every `4` completed work sessions

## Tech Stack

- `HTML` for page structure
- `CSS` for layout and styling
- `JavaScript` for timer behavior and state management
- `localStorage` for saving settings in the browser

There is no framework, backend, or package build process in this version.

## Current Features

- Single-page timer layout
- Work, short break, and long break session types
- Start, pause, resume, and reset controls
- Completed work session counter
- Editable session settings
- Automatic session switching
- Browser-persisted settings
- Accessible status updates
- Responsive design for desktop and mobile
- Lightweight end-of-session sound using the Web Audio API

## Project Structure

```text
pomodoro-timer/
  index.html
  styles.css
  script.js
  README.md
```

### File Responsibilities

- `index.html`: semantic structure, content, controls, and settings form
- `styles.css`: theme, responsive layout, and component styling
- `script.js`: timer state, countdown logic, settings persistence, and session transitions

## How It Works

The app tracks:

- current session type
- timer status: `idle`, `running`, or `paused`
- completed work sessions
- remaining time in seconds
- user settings for durations and long-break interval

When a work session ends:

- the completed work count increases by `1`
- the app checks whether the next break should be short or long
- the next session is prepared automatically

When a break ends:

- the app returns to a work session

## Running Locally

Because this is a static app, there are two easy ways to run it.

### Option 1

Open `index.html` directly in your browser.

### Option 2

Serve the directory with a lightweight local server.

Example:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying To GitHub Pages

This repository is already structured to work well with GitHub Pages.

### Recommended Steps

1. Push the repository to GitHub.
2. Open the repository on GitHub.
3. Go to `Settings`.
4. Open the `Pages` section.
5. Under `Build and deployment`, choose `Deploy from a branch`.
6. Select your main branch.
7. Choose the `/ (root)` folder.
8. Save.

After GitHub finishes publishing, your app will be available at your GitHub Pages URL.

## Why This Is GitHub Pages Friendly

- no install step
- no compile step
- no backend dependency
- static files live at the repository root
- asset references use relative paths

## Accessibility Notes

The current version includes:

- semantic headings and labels
- keyboard-accessible controls
- live status messaging for timer updates
- responsive spacing and readable contrast

## Next Improvement Ideas

- add a visual progress ring
- add session history for the day
- add theme switching
- allow custom notification sounds
- add automated browser-based tests

## Lessons Learned

- A static frontend is a strong first version when clarity and deployment simplicity matter.
- Separating structure, styling, and logic keeps the project easier to grow.
- Defining timer state early makes the session behavior much simpler to implement.
