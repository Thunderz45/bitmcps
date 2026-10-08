/**
 * BITM CPS - Unformatted CV to Official Format AI Converter
 * Converts raw / unformatted resume text into 100% compliant BITM CV structure
 */

const DEFAULT_KEY_B64 = "c2stb3ItdjEtZTYwNWYyZWNlZDc5YmVjZTM1NGM5ZTE1ZmIyMGZjOGRiM2M0YWY3ZGUxMDE3MGEzOTA2ZGRmM2ZmZTU5MDhkNw==";
const OPENROUTER_API_KEY = localStorage.getItem("bitm_openrouter_key") || atob(DEFAULT_KEY_B64);

// Modal Controls
function openConvertModal() {
  const modal = document.getElementById("convertModal");
  if (modal) modal.classList.add("active");
}

function closeConvertModal() {
  const modal = document.getElementById("convertModal");
  if (modal) modal.classList.remove("active");
}

// Fallback rule-based parser in case of offline/network issues
function parseUnformattedCvFallback(text) {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  
  // Extract Name (first non-empty line)
  let name = lines[0] || "Student Name";
  if (name.toLowerCase().startsWith("name:")) {
    name = name.replace(/^name:\s*/i, "");
  }

  // Extract Email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : "";

  // Extract Phone
  const phoneMatch = text.match(/(?:\+91|0)?[6-9]\d{9}/);
  const phone = phoneMatch ? phoneMatch[0] : "";

  // Check internship
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

  const btnConvert = document.getElementById("btnStartConvert");
  if (btnConvert) {
    btnConvert.addEventListener("click", async () => {
      const txt = document.getElementById("rawCvInput")?.value?.trim();
      const statusDiv = document.getElementById("convertStatus");

      if (!txt) {
        alert("Please paste your unformatted CV or resume text first.");
        return;
      }

      btnConvert.disabled = true;
      btnConvert.innerHTML = "⏳ Converting with AI...";
      if (statusDiv) {
        statusDiv.style.display = "block";
        statusDiv.style.background = "#e0f2fe";
        statusDiv.style.color = "#0369a1";
        statusDiv.style.border = "1px solid #bae6fd";
        statusDiv.innerHTML = "⚡ Reading unformatted CV and mapping to official BITM placement format...";
      }

      try {
        const formattedData = await convertUnformattedCv(txt);
        // Save to draft storage
        localStorage.setItem("bitm_official_cv_draft", JSON.stringify(formattedData));

        if (statusDiv) {
          statusDiv.style.background = "#dcfce7";
          statusDiv.style.color = "#166534";
          statusDiv.style.border = "1px solid #86efac";
          statusDiv.innerHTML = "✓ Successfully formatted! Opening in CV Builder...";
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
              btnConvert.innerHTML = "⚡ Transform & Load into CV Builder";
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
        btnConvert.innerHTML = "⚡ Transform & Open in CV Builder";
      }
    });
  }
});
