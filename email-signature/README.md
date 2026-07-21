# KLUB404 Email Signature

A lightweight, on-brand Gmail signature for the KLUB404 Google Workspace. The logo plays a short one-time assembly animation (mirrors the site's hero motion — "KLUB" and "404" sliding together with a strike-through) and then holds still, so it never gets distracting in a long thread.

## What's in here

- `template.html` — the signature markup. Has `{{NAME}}` and `{{TITLE}}` placeholders to fill in per person.
- Logo assets live in `public/email-signature/` in this repo:
  - `logo.gif` (~11 KB) — the animated version, shown in Gmail, Apple Mail, and most clients.
  - `logo-static.png` (~3 KB) — a static fallback shown only in Outlook (which doesn't animate signature images).
  - These are served from `https://klub-404.com/email-signature/logo.gif` once this branch is merged and deployed. **The signature won't show a logo until then** — if you need it working today, ask to have these two files deployed first, or temporarily swap the `<img src>` in `template.html` for a different hosted copy.

## One-time setup (per person)

1. Open **Gmail → Settings (gear icon) → See all settings → General tab → Signature**.
2. Click **Create new**, name it "KLUB404".
3. Open `template.html` from this folder in a text editor. Replace:
   - `{{NAME}}` → your full name
   - `{{TITLE}}` → your role (e.g. "Founder", "Creative Director")
4. Copy the **rendered HTML**, not the raw text — the easiest way:
   - Open `template.html` in a browser (double-click it, or drag it into a Chrome tab).
   - Select the whole signature block, copy it (⌘C).
   - Paste directly into the Gmail signature editor box (⌘V). Gmail preserves the formatting because it's copying rendered HTML, not source code.
5. Set this signature as default for new emails and replies/forwards.
6. Scroll down and click **Save Changes**.

That's it — no HTML editing inside Gmail itself.

## Rolling it out to the whole team (optional, admin)

If you'd rather not have each person paste this manually, a Google Workspace admin can push a shared signature org-wide:

1. Go to **admin.google.com → Apps → Google Workspace → Gmail → Compliance** (or **Layouts**, depending on your Workspace edition) → **Append footer**.
2. Paste the same HTML there, using mail merge fields Google provides (`%%displayName%%`, `%%organizationTitle%%`, etc.) instead of `{{NAME}}` / `{{TITLE}}` if you want it fully automatic per employee.
3. Note: Workspace-level "append footer" appends to the *outgoing message*, not the compose window — people won't see it while typing, only recipients will. If you want it visible while composing too, the per-person Gmail signature setup above is still the way to go.

## Regenerating the logo animation

The GIF was built by:
1. Rendering the wordmark (Noto Sans Display, the same font as the site) in a browser with the KLUB/404 slide + strike-through animation, sampled frame-by-frame.
2. Compiling those frames into an animated GIF with `sharp` (already a project dependency — no new tools needed).

If the brand mark ever changes, regenerate by re-rendering frames and re-running the same `sharp`-based GIF assembly (join frames with `{ join: { animated: true, across: 1 } }` then `.gif()`). Ping in this repo if you need the build script re-created.
