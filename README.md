# eDreams Plus Services Business Case - README

Thank you for taking the time to review my business case and for my consideration for this role. 

This assignment has been written in a markdown file that is rendered as a Web component at runtime. It can be consulted in both formats.

- Main page: `index-full.html`
- Markdown source: `PM-Business-Case.md`
- Prototype pages:
  - `sac-prototype.html`
  - `carryover-prototype.html`

While the HTML is purposed for the presentation interview, it can be used beforehand as it provides an easier interface. In the unfortunate event that the live server functionality doesn't work, please rely on the markdown file to review the content prior to the meeting.

## How To Run

Do not open `index-full.html` directly with `file://`.
The page fetches `PM-Business-Case.md`, so you must serve the folder with a local web server.

### Option 1 (VS Code Live Server)

- Open `index-full.html` in VS Code.
- Start Live Server.
- Use the URL opened by the extension.

### Option 2 (Python)

From `edreams-pm-business-case` run:

```powershell
python -m http.server 5500
```

Then open:

- <http://localhost:5500/index-full.html>

### Option 3 (Node)

From `edreams-pm-business-case` run:

```powershell
npx serve . -l 5500
```

Then open:

- <http://localhost:5500/index-full.html>


## How Rendering Works

`index-full.html` + `index-full-loader.js` + `tabs.js` work together:

- Loads `PM-Business-Case.md` via `fetch`.
- Uses the markdown `#` as page title and intro text as subtitle.
- Uses each `##` section as a left navigation tab.
- Renders section content into the active tab panel.
- Converts in-table bullet markers (`•`) into real HTML bullet lists in table cells.
- Converts each `###` subsection into collapsible sections.
- Any further header is rendered as well for easier readability.

## How To Navigate The Page

On `index-full.html`:

- Left panel (`Table of Contents`): click a tab to open a major section.
- Keyboard tab navigation:
  - `ArrowUp` / `ArrowDown` or `ArrowLeft` / `ArrowRight`
  - `Home` to go first tab
  - `End` to go last tab
- In content:
  - `Collapse all` / `Expand all` controls all collapsible blocks in the active tab.
- Top links let you open:
  - SAC prototype
  - Next-Leg prototype
  - Markdown source document

## Notes

- Active tab and fold state are stored in browser local storage.
- If updates do not appear, hard refresh the page (`Ctrl+F5`).
- If markdown fails to load, verify you are running through `http://localhost` and that `PM-Business-Case.md` exists in the same folder.
