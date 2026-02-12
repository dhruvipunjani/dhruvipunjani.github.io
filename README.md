# Dhruvi Punjani – Portfolio

Equity research & finance portfolio site. Single-page, no build step.

## Run locally

1. Open the folder in a terminal.
2. Serve the site (any static server), for example:
   - **Python 3:** `python3 -m http.server 8000`
   - **Node (npx):** `npx serve .`
3. Open `http://localhost:8000` (or the port shown) in your browser.

Or double-click `index.html` to open in the browser (some features may work better with a local server).

## Contents

- **About** – Summary, CFA L2, FLAME Merit Scholarship, portfolio stats
- **Experience** – Rigi, Aditya Finoptions, New Cambridge College, Spitze, Pukka Media
- **Education** – FLAME University, S.N. Kansagra
- **Projects** – Portfolio management, Netweb Technologies, Tata Elxsi, ratio analysis, cost sheet, bond analysis, presentations; link to full gallery on Google Sites
- **Skills** – Research, Bloomberg/Reuters, tools, interests
- **Contact** – Email, phone, LinkedIn, E-Portfolio

## Deploy

Upload the contents of this folder to any static host (Netlify, Vercel, GitHub Pages, etc.) or replace the existing Google Site content.

## Attach your reports (PDF / XLSX)

1. Put your files into:
   - `assets/reports/`
2. Keep filenames matching the buttons already wired in `index.html` (or I can rename them for you).

Buttons currently look for:
- `assets/reports/IA_Assignment4.xlsx`
- `assets/reports/Midcap_Fund.xlsx`
- `assets/reports/Netweb_Technologies_Presentation.pdf`
- `assets/reports/Tata_Elxsi_Research_Report.pdf`
- `assets/reports/Ratio_Analysis_Indigo_Paints.pdf`
- `assets/reports/Cost_Sheet.pdf`
- `assets/reports/Government_Bond_Data_Analysis.pdf`
- `assets/reports/Cochin_Shipyard.pdf`
- `assets/reports/Fooled_by_Randomness.pdf`

If a file isn’t there yet, the site shows a small message telling you what to upload.
