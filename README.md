# Cottage Restoration — Project Reference

A static single-file project tracker for home renovation work. Open `index.html` directly in a browser — no build step, no server, no dependencies.

## Projects

- **Cottage Restoration** — 200-year-old Yorkshire stone cottage: render removal, lime repointing, limewash, French drain
- **Living Room** — wall stripping, fireplace opening, replastering

## Usage

Open `index.html` in a browser. Use the project tabs to switch between projects. Each project has its own progress bar and section nav.

To mark a task complete, add the `done` class to its `<li class="task">` element:

```html
<li class="task done">
```

To add a new project, add a `<div class="project" id="project-yourname" hidden>` block in `index.html` and register it in the `PROJECTS` config in `js/app.js`.

## Structure

```
index.html        — all content
css/styles.css    — all styles
js/app.js         — project switching, progress, scroll spy
```
