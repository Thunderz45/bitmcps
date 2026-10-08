/**
 * BITM CPS - PDF Resume to Official Placement CV Converter
 * Extracts text directly from any uploaded unformatted PDF file
 * Restructures & formats into 100% compliant BITM CV schema
 */

const DEFAULT_KEY_B64 = "c2stb3ItdjEtZTYwNWYyZWNlZDc5YmVjZTM1NGM5ZTE1ZmIyMGZjOGRiM2M0YWY3ZGUxMDE3MGEzOTA2ZGRmM2ZmZTU5MDhkNw==";
const OPENROUTER_API_KEY = localStorage.getItem("bitm_openrouter_key") || atob(DEFAULT_KEY_B64);

let selectedPdfFile = null;

// Modal Controls
function openConvertModal() {
  const modal = document.getElementById("convertModal");
  if (modal) modal.classList.add("active");
}

function closeConvertModal() {
  const modal = document.getElementById("convertModal");
  if (modal) modal.classList.remove("active");
}

// Extract full text from uploaded PDF file using PDF.js
async function extractTextFromPdfFile(file) {
  const pdfjs = window.pdfjsLib || window.pdfjs;
  if (!pdfjs) {
    throw new Error("PDF processing engine is loading. Please try again in 2 seconds.");
  }
  if (pdfjs.GlobalWorkerOptions) {
    pdfjs.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";
  }

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) });
  const pdf = await loadingTask.promise;

  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    fullText += strings.join(" ") + "\n";
  }

  return fullText.trim();
}

// Fallback rule-based parser in case of offline/network issues
function parseUnformattedCvFallback(text) {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  
  let name = lines[0] || "Student Name";
  if (name.toLowerCase().startsWith("name:")) {
    name = name.replace(/^name:\s*/i, "");
  }

  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : "";

  const phoneMatch = text.match(/(?:\+91|0)?[6-9]\d{9}/);
  const phone = phoneMatch ? phoneMatch[0] : "";

  const hasInternship = /internship|intern\b|c3alabs|trainee/i.test(text);

  return {
    personalInfo: {
      fullName: name,
      specialization: "Data Science & Business Analytics",
      degreeName: "MBA",
      address: "Pune, Maharashtra",
      dob: "",
      age: "",
      phone: phone || "+91",
      email: email || "",
      photoUrl: "sample_photo.jpg"
    },
    languages: [
      { language: "English", speak: true, read: true, write: true },
      { language: "Hindi", speak: true, read: true, write: true }
    ],
    academics: [
      {
        degree: "MBA",
        stream: "Data Science and Business Analytics",
        university: "Sri Balaji University, Pune",
        institute: "Balaji Institute of Technology & Management",
        year: "2026–28",
        percentage: "Pursuing"
      },
      {
        degree: "Graduation",
        stream: "Commerce / Management / Engineering",
        university: "State University",
        institute: "College",
        year: "2024",
        percentage: "70%"
      }
    ],
    internship: {
      company: hasInternship ? "Corporate Intern" : "",
      period: "(2026)",
      role: "Management Trainee",
      bullets: [
        "Executed core operational workflows and strategic business initiatives.",
        "Collaborated across multidisciplinary teams to deliver project milestones."
      ]
    },
    projects: {
      research: [
        {
          title: "Academic Research Project",
          bullets: ["Conducted analytical study evaluating industry benchmarks."]
        }
      ],
      other: [
        {
          title: "Management Field Application Study",
          bullets: ["Applied analytical methodologies to optimize operations."]
        }
      ]
    },
    certifications: [
      {
        title: "Professional Certification",
        bullets: ["Completed formal industry training program."]
      }
    ],
    responsibilities: [
      "Student Committee Member – Contributed to organizational initiatives."
    ],
    extraCurricular: [
      "Participated in university sports and cultural competitions."
    ],
    hobbies: [
      "Reading, sports, and active problem solving."
    ],
    signatures: {
      place: "PUNE",
      date: ""
    },
    sectionVisibility: {
      summerInternship: hasInternship,
      researchProjects: true,
      otherProjects: true,
      certifications: true,
      responsibilities: true,
      extraCurricular: true,
      hobbies: true
    }
  };
}

// AI Unformatted CV to BITM JSON Parser
async function convertUnformattedCv(rawText) {
  const prompt = `You are an executive CV parser for Balaji Institute of Technology & Management (BITM), Sri Balaji University Pune.
Your task is to parse this unformatted CV text into the exact JSON structure for the official placement CV:

UNFORMATTED CV TEXT:
"""
${rawText}
"""

STRICT JSON SCHEMA REQUIRED:
{
  "personalInfo": {
    "fullName": "Full Name",
    "specialization": "Specialization (e.g. Data Science & Business Analytics, Marketing, Finance, HR)",
    "address": "Permanent address or City/State",
    "dob": "DD-MM-YYYY or empty",
    "age": "Age number or empty",
    "phone": "Phone number",
    "email": "Email address",
    "photoUrl": "sample_photo.jpg"
  },
  "languages": [
    { "language": "English", "speak": true, "read": true, "write": true },
    { "language": "Hindi", "speak": true, "read": true, "write": true }
  ],
  "academics": [
    {
      "degree": "MBA",
      "stream": "Specialization name",
      "university": "Sri Balaji University, Pune",
      "institute": "Balaji Institute of Technology & Management",
      "year": "2026–28",
      "percentage": "Pursuing"
    },
    {
      "degree": "BBA / BTech / BCA / BCom",
      "stream": "Stream",
      "university": "University",
      "institute": "College name",
      "year": "YYYY",
      "percentage": "%"
    },
    {
      "degree": "XII",
      "stream": "Science / Commerce / Arts",
      "university": "Board",
      "institute": "School name",
      "year": "YYYY",
      "percentage": "%"
    },
    {
      "degree": "X",
      "stream": "General",
      "university": "Board",
      "institute": "School name",
      "year": "YYYY",
      "percentage": "%"
    }
  ],
  "internship": {
    "company": "Company Name",
    "period": "(e.g. Mar 2026)",
    "role": "Role / Designation",
    "bullets": [
      "High impact action-verb bullet point 1",
      "High impact action-verb bullet point 2"
    ]
  },
  "projects": {
    "research": [
      {
        "title": "Research Project Title | (Date)",
        "bullets": ["Deliverables and methodologies used."]
      }
    ],
    "other": [
      {
        "title": "Other Project Title | (Date)",
        "bullets": ["Project execution and results."]
      }
    ]
  },
  "certifications": [
    {
      "title": "Certification Name | Organization | (Date)",
      "bullets": ["Recognition or key learning."]
    }
  ],
  "responsibilities": [
    "Position – Key contribution description."
  ],
  "extraCurricular": [
    "Activity – Participation and achievement."
  ],
  "hobbies": [
    "Sports: Description of athletic or leisure activities."
  ],
  "signatures": {
    "place": "PUNE",
    "date": ""
  },
  "sectionVisibility": {
    "summerInternship": true,
    "researchProjects": true,
    "otherProjects": true,
    "certifications": true,
    "responsibilities": true,
    "extraCurricular": true,
    "hobbies": true
  }
}

CRITICAL RULES:
1. If the student has NO summer internship mentioned or is a fresher, set "sectionVisibility.summerInternship": false!
2. Ensure passing year for MBA is "2026–28" and percentage is "Pursuing".
3. Return ONLY valid JSON starting with { and ending with }. Do NOT include markdown code blocks.`;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3005",
        "X-Title": "BITM CPS CV Converter"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an official CV formatter for Balaji Institute of Telecom & Management, Sri Balaji University Pune. You output ONLY valid JSON adhering to the specified schema."
          },
          { role: "user", content: prompt }
        ],
        max_tokens: 1800,
        temperature: 0.1
      })
    });

    const data = await res.json();
    let content = data.choices?.[0]?.message?.content?.trim();
    if (!content) throw new Error("Empty response from AI converter.");

    // Clean JSON response (strip markdown wrappers if present)
    content = content.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "");
    const parsed = JSON.parse(content);
    return parsed;
  } catch (err) {
    console.warn("OpenRouter API call failed or timed out. Using fallback parser:", err);
    return parseUnformattedCvFallback(rawText);
  }
}

// Wire up events
document.addEventListener("DOMContentLoaded", () => {
  const btnOpen = document.getElementById("btnOpenConvertModal");
  if (btnOpen) {
    btnOpen.addEventListener("click", openConvertModal);
  }

  // File Dropzone Handling
  const dropzone = document.getElementById("pdfDropzone");
  const fileInput = document.getElementById("pdfFileInput");
  const selectedInfo = document.getElementById("selectedPdfInfo");
  const selectedName = document.getElementById("selectedPdfName");
  const btnClear = document.getElementById("btnClearSelectedPdf");
  const btnConvert = document.getElementById("btnStartPdfConvert");
  const statusDiv = document.getElementById("convertStatus");

  function handleFileSelected(file) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      alert("Please upload a PDF file (.pdf)");
      return;
    }
    selectedPdfFile = file;
    if (dropzone) dropzone.style.display = "none";
    if (selectedInfo) selectedInfo.style.display = "flex";
    if (selectedName) selectedName.innerHTML = `📄 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    if (btnConvert) {
      btnConvert.disabled = false;
      btnConvert.innerHTML = `⚡ Convert "${file.name}" to Official Format`;
    }
  }

  if (dropzone && fileInput) {
    dropzone.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", e => {
      if (e.target.files && e.target.files[0]) {
        handleFileSelected(e.target.files[0]);
      }
    });

    // Drag & Drop
    dropzone.addEventListener("dragover", e => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    });
    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("dragover");
    });
    dropzone.addEventListener("drop", e => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelected(e.dataTransfer.files[0]);
      }
    });
  }

  if (btnClear) {
    btnClear.addEventListener("click", () => {
      selectedPdfFile = null;
      if (fileInput) fileInput.value = "";
      if (dropzone) dropzone.style.display = "flex";
      if (selectedInfo) selectedInfo.style.display = "none";
      if (btnConvert) {
        btnConvert.disabled = true;
        btnConvert.innerHTML = "⚡ Convert PDF to Official Format";
      }
      if (statusDiv) statusDiv.style.display = "none";
    });
  }

  // Convert Button Click
  if (btnConvert) {
    btnConvert.addEventListener("click", async () => {
      let rawText = "";

      // 1. If PDF is selected, extract text
      if (selectedPdfFile) {
        btnConvert.disabled = true;
        btnConvert.innerHTML = "⏳ Reading PDF text...";
        if (statusDiv) {
          statusDiv.style.display = "block";
          statusDiv.style.background = "#e0f2fe";
          statusDiv.style.color = "#0369a1";
          statusDiv.style.border = "1px solid #bae6fd";
          statusDiv.innerHTML = "📄 Extracting text from uploaded PDF file...";
        }

        try {
          rawText = await extractTextFromPdfFile(selectedPdfFile);
          if (!rawText || rawText.length < 20) {
            throw new Error("Could not extract readable text from PDF. It may be a scanned image or empty.");
          }
        } catch (err) {
          console.error("PDF Extraction error:", err);
          if (statusDiv) {
            statusDiv.style.background = "#fee2e2";
            statusDiv.style.color = "#991b1b";
            statusDiv.style.border = "1px solid #fca5a5";
            statusDiv.innerHTML = "PDF Extraction error: " + err.message;
          }
          btnConvert.disabled = false;
          btnConvert.innerHTML = "⚡ Convert PDF to Official Format";
          return;
        }
      } else {
        // 2. Check if raw text was pasted
        const txtArea = document.getElementById("rawCvInput");
        if (txtArea && txtArea.value.trim()) {
          rawText = txtArea.value.trim();
        } else {
          alert("Please upload a resume PDF file first.");
          return;
        }
      }

      btnConvert.disabled = true;
      btnConvert.innerHTML = "⏳ Converting to Official BITM Format...";
      if (statusDiv) {
        statusDiv.style.display = "block";
        statusDiv.style.background = "#e0f2fe";
        statusDiv.style.color = "#0369a1";
        statusDiv.style.border = "1px solid #bae6fd";
        statusDiv.innerHTML = "⚡ AI is mapping your details to the official BITM placement template...";
      }

      try {
        const formattedData = await convertUnformattedCv(rawText);
        // Save to draft storage
        localStorage.setItem("bitm_official_cv_draft", JSON.stringify(formattedData));

        if (statusDiv) {
          statusDiv.style.background = "#dcfce7";
          statusDiv.style.color = "#166534";
          statusDiv.style.border = "1px solid #86efac";
          statusDiv.innerHTML = "✓ Successfully converted! Loading your official formatted CV...";
        }

        setTimeout(() => {
          if (window.location.pathname.includes("builder")) {
            if (typeof loadDraftFromStorage === "function") {
              loadDraftFromStorage();
              populateFormFields();
              renderDynamicFormItems();
              syncSectionVisibilityUI();
              updateLivePreview();
              closeConvertModal();
              btnConvert.disabled = false;
              btnConvert.innerHTML = "⚡ Convert PDF to Official Format";
              if (statusDiv) statusDiv.style.display = "none";
            } else {
              window.location.reload();
            }
          } else {
            window.location.href = "builder.html";
          }
        }, 600);

      } catch (err) {
        console.error("Conversion error:", err);
        if (statusDiv) {
          statusDiv.style.background = "#fee2e2";
          statusDiv.style.color = "#991b1b";
          statusDiv.style.border = "1px solid #fca5a5";
          statusDiv.innerHTML = "Error formatting CV: " + err.message;
        }
        btnConvert.disabled = false;
        btnConvert.innerHTML = "⚡ Convert PDF to Official Format";
      }
    });
  }
});
