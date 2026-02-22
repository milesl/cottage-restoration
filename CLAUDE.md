# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-file static HTML project: a personal project tracker for restoring a 200-year-old Yorkshire stone cottage (render removal, lime repointing, limewash). Open `cottage-project.html` directly in a browser — no build step, no dependencies, no server required.

## Architecture

Everything lives in `cottage-project.html`:

- **CSS** (lines 8–659): Embedded `<style>` block using CSS custom properties (`--stone`, `--accent`, etc.) as a design token system. Sections are clearly delimited with `/* ─── SECTION NAME ─── */` comments.
- **HTML** (lines 661–1340): Structured as header → progress bar → sticky nav → main content sections → footer. Main sections correspond to nav anchor IDs: `#order`, `#milestones`, `#quickref`, `#materials`, `#shopping`, `#safety`, `#tips`.
- **JavaScript** (lines 1342–1386): Three features — progress auto-calculation, smooth scroll nav, scroll spy for active nav link.

## Updating Tasks and Progress

Progress percentage is **calculated automatically** by counting `.task.done` vs all `.task` elements. To mark a task complete, add the `done` class to its `<li class="task">` element.

To mark a milestone as initially open, add the `open` class to its `.milestone` div.

Milestone status badges use `.status-done`, `.status-active`, or `.status-pending` classes. The milestone number circle uses `.done`, `.active`, or no modifier.

## Key Patterns

- **Info cards**: `.info-card` with optional modifier classes `.warning`, `.tip`, `.note`, `.spec` for colored left-border variants.
- **Work order timeline**: `.work-step` elements with `.done` or `.active` state for the dot indicator.
- **Shopping items**: `.shop-item` with `.purchased` to strike through bought items.
- **Milestone accordion**: toggled by `this.classList.toggle('open')` on click; inner `.milestone-body` uses `onclick="event.stopPropagation()"` to prevent collapse when clicking task content.
