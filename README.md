# BITM CPS - Official MBA CV Builder

Official Placement CV Builder for **Balaji Institute of Technology & Management (BITM)**, Sri Balaji University, Pune (SBUP).

Built strictly following the official format of `b cv u (1).pdf` and `CV format-Freshers (5).docx`.

---

## 🌟 Key Features

- **Live Two-Way Synchronization**: Keystroke-by-keystroke editing in the left form panel instantly reflects in the right live preview paper.
- **Strict Format Adherence**:
  - Official BITM Letterhead & crest logos.
  - Microsoft Word PageBorder framing with exact margin spacing.
  - Deep Navy Blue (`#0e3860`) uppercase section headers.
  - Exact 5-column Personal Information grid.
  - Languages Known with centered tick marks (`✓`).
  - Academic Details with degree, stream, board, institute, year (`2026–28`), marks (`Pursuing`), and director certification note.
  - Summer Internship with pipe date separator (`| (Mar 2026)`) and bulleted deliverables.
  - Key Projects (Research Projects & Other Projects separated by borders).
  - Certifications, Positions of Responsibility & Achievements, Extra-Curricular Activities, and Hobbies.
  - Official 3-tier signature block (`SIGNATURE OF STUDENT`, `COUNTERSIGNED`, `PLACE:PUNE / STAMP & SIGNATURE OF DIRECTOR`).
- **High-Fidelity PDF Export**:
  - **📥 Download PDF**: Uses client-side `html2pdf.js` for direct vector/canvas PDF download without printer driver margin shifts.
  - **🖨️ Print (A4)**: Configured with `@page { size: A4 portrait; margin: 0; }` and `-webkit-print-color-adjust: exact` for native A4 output.
- **✨ AI Resume Copilot**:
  - Integrated with OpenRouter (`openai/gpt-4o-mini`) to polish bullet points, apply the STAR method, and verify BITM placement guidelines.
- **Pure Vanilla Web Stack**: Pure HTML, CSS, and Vanilla JavaScript—no complex framework dependencies, build steps, or loading delays.

---

## 🚀 Getting Started

Simply open `index.html` in any web browser, or serve locally:

```bash
# Using Python
python3 -m http.server 3000
```

Navigate to `http://localhost:3000` to start editing and exporting.

---

## 🎓 Placement Guidelines Included

The application includes an in-app **📘 CV Instructions** modal detailing all 15 BITM placement formatting rules (Arial font, 14pt bold name, 11pt body text, MBA Pursuing notations, photo specs, right-aligned dates, and percentage formatting).
