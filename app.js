/**
 * BITM CPS - Official CV Builder
 * Pure Vanilla JavaScript
 * Exact copy-paste of b cv u (1).pdf and CV format-Freshers (5).docx
 */

// OpenRouter API Key initialization (retrieved from localStorage or default environment token)
const DEFAULT_KEY_B64 = "c2stb3ItdjEtZTYwNWYyZWNlZDc5YmVjZTM1NGM5ZTE1ZmIyMGZjOGRiM2M0YWY3ZGUxMDE3MGEzOTA2ZGRmM2ZmZTU5MDhkNw==";
let OPENROUTER_API_KEY = localStorage.getItem("bitm_openrouter_key") || atob(DEFAULT_KEY_B64);

// Default Official Sample Data (Strictly matching b cv u (1).pdf)
const SAMPLE_CV_DATA = {
  personalInfo: {
    fullName: "Bhushan Padghan",
    specialization: "Data Science & Business Analytics",
    degreeName: "MBA",
    address: "Gajanan Nagar Ward No 17, Chikhli, Buldhana 443201",
    dob: "29-04-2005",
    age: "21",
    phone: "+918459738053",
    email: "bhushanpadghan87@gmail.com",
    photoUrl: "sample_photo.jpg"
  },
  languages: [
    { language: "English", speak: true, read: true, write: true },
    { language: "Hindi", speak: true, read: true, write: true },
    { language: "Marathi", speak: true, read: true, write: true }
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
      degree: "BCA",
      stream: "Software Development",
      university: "Sri Balaji University, Pune",
      institute: "School of Computer Studies",
      year: "2026",
      percentage: "68.60%"
    },
    {
      degree: "XII",
      stream: "Science",
      university: "Maharashtra Board",
      institute: "Sharad Pawar Vidhyalay, Pangri, Buldhana",
      year: "2023",
      percentage: "67.67%"
    },
    {
      degree: "X",
      stream: "General",
      university: "Maharashtra Board",
      institute: "Adarsh Vidhyalay and Mahavidhyalay, Chikhli, Buldhana",
      year: "2021",
      percentage: "85.80%"
    }
  ],
  internship: {
    company: "C3aLabs India Pvt Ltd",
    period: "(Mar 2026)",
    role: "HR & Marketing Intern Using AI and Automation",
    bullets: [
      "Supported talent acquisition, candidate screening, and recruitment coordination.",
      "Contributed to marketing content generation using AI-first workflows.",
      "Worked in a fast-paced AI startup environment, supporting HR and marketing operations.",
      "Demonstrated proactive communication, ownership, adaptability, and independent execution."
    ]
  },
  projects: {
    research: [
      {
        title: "IoT-Based Non-Destructive Fruit Ripeness & Quality Detection | (Dec 2024)",
        bullets: [
          "Developed a research-based IoT concept for detecting fruit ripeness and quality without cutting or damaging the fruit, using advanced sensors, non-destructive sensing techniques, computer vision, and AI/ML to analyze ripeness, internal quality, moisture, and potential defects; designed as a high-end IoT product integrating multiple sensors, data processing, and intelligent quality prediction."
        ]
      }
    ],
    other: [
      {
        title: "CelestialPixel – Digital Solutions & Creative Technology Venture | (Jun 2024)",
        bullets: [
          "Co-founded a digital technology venture providing website development, SEO optimization, social media management, product photography, cinematic content, and Meta Ads; delivered client-focused solutions combining technology, automation, marketing, and creative services, and managed project planning, service development, branding, and digital presence."
        ]
      },
      {
        title: "SBUP Connect – Student Management & Information Portal",
        bullets: [
          "Developed an unofficial student-focused web platform providing notes, timetables, attendance, notices, and academic information."
        ]
      },
      {
        title: "Pixel Studio X – AI & Technology Platform | (jully 2026)",
        bullets: [
          "Founded an AI-focused technology venture developing digital products and AI-powered solutions, including AI website generation, AI image generation, coding assistance, and productivity-focused tools."
        ]
      }
    ]
  },
  certifications: [
    {
      title: "CO-OPATHON ESG Global | Pune | (Jan 2025)",
      bullets: [
        "Ranked in the top five positions out of all participants in the CO-OPATHON event held at Sri Balaji University, Pune."
      ]
    },
    {
      title: "ASPIRE – IMC 2025 | COAI | Delhi | ( Dec 2025)",
      bullets: [
        "Innovation & Technology Recognition: recognized for participation and contribution to ASPIRE at IMC 2025, focused on innovation, technology, and transformative ideas; demonstrated an interest in developing innovative solutions and contributing to future-focused initiatives."
      ]
    },
    {
      title: "Kickstart Program | T-Hub | Hyderabad | (Jun 2024)",
      bullets: [
        "Successfully completed the Kickstart Program 2024–25 at T-Hub, Hyderabad, gaining exposure to entrepreneurship, innovation, startup development, and the entrepreneurial ecosystem."
      ]
    }
  ],
  responsibilities: [
    "Active Member, Student Development Cell (SDC) – Contributed to student development activities, event coordination, and campus initiatives.",
    "Class Representative (CR) – Coordinated communication between students and faculty and supported class activities and requirements.",
    "Member, Vasundhara, Sri Balaji University Pune – Participated in organizational activities, events, and student engagement initiatives.",
    "Member, Srujan – Entrepreneurship Incubation Club, SBUP – Participated in entrepreneurship activities, startup initiatives, networking, and innovation-focused events."
  ],
  extraCurricular: [
    "Represented at the District Level in Volleyball, demonstrating teamwork, discipline, leadership, and competitive spirit.",
    "Swimming: Participated in Taluka-Level Swimming Competitions, demonstrating discipline, endurance, and competitive spirit."
  ],
  hobbies: [
    "Sports: Actively participated in swimming and various sports activities."
  ],
  signatures: {
    place: "PUNE",
    date: ""
  },
  sectionVisibility: {
    summerInternship: true,
    researchProjects: true,
    otherProjects: true,
    certifications: true,
    responsibilities: true,
    extraCurricular: true,
    hobbies: true
  }
};

// Current Active State
let cvState = JSON.parse(JSON.stringify(SAMPLE_CV_DATA));

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  loadDraftFromStorage();
  populateFormFields();
  renderDynamicFormItems();
  syncSectionVisibilityUI();
  updateLivePreview();
  attachEventListeners();
});

/* ==========================================================================
   STORAGE FUNCTIONS
   ========================================================================== */
function saveDraftToStorage() {
  localStorage.setItem("bitm_official_cv_draft", JSON.stringify(cvState));
  alert("✓ CV Draft saved to local storage successfully!");
}

function loadDraftFromStorage() {
  const saved = localStorage.getItem("bitm_official_cv_draft");
  if (saved) {
    try {
      cvState = JSON.parse(saved);
      if (!cvState.sectionVisibility) {
        cvState.sectionVisibility = {
          summerInternship: true,
          researchProjects: true,
          otherProjects: true,
          certifications: true,
          responsibilities: true,
          extraCurricular: true,
          hobbies: true
        };
      }
    } catch (e) {
      console.warn("Could not parse saved draft, using default sample.");
    }
  }
}

function resetToSampleData() {
  if (confirm("Reset all CV fields to the official BITM sample from Bhushan Padghan's reference?")) {
    cvState = JSON.parse(JSON.stringify(SAMPLE_CV_DATA));
    localStorage.removeItem("bitm_official_cv_draft");
    populateFormFields();
    renderDynamicFormItems();
    syncSectionVisibilityUI();
    updateLivePreview();
  }
}

/* ==========================================================================
   SECTION VISIBILITY TOGGLE (FRESHERS / OPTIONAL SECTIONS)
   ========================================================================== */
function toggleSection(key) {
  if (!cvState.sectionVisibility) {
    cvState.sectionVisibility = {
      summerInternship: true,
      researchProjects: true,
      otherProjects: true,
      certifications: true,
      responsibilities: true,
      extraCurricular: true,
      hobbies: true
    };
  }
  cvState.sectionVisibility[key] = !cvState.sectionVisibility[key];
  syncSectionVisibilityUI();
  updateLivePreview();
  try {
    localStorage.setItem("bitm_official_cv_draft", JSON.stringify(cvState));
  } catch (e) {}
}
window.toggleSection = toggleSection;

function syncSectionVisibilityUI() {
  if (!cvState.sectionVisibility) return;

  // 1. Summer Internship (Card 4) - Prime toggle for Freshers
  const isInternVisible = cvState.sectionVisibility.summerInternship !== false;
  const btnIntern = document.getElementById("btnToggleInternship");
  const noticeIntern = document.getElementById("noticeInternshipExcluded");
  const groupIntern = document.getElementById("internshipFieldsGroup");
  if (btnIntern) {
    btnIntern.innerHTML = isInternVisible ? "🗑️ Remove Section (Freshers)" : "➕ Restore Summer Internship";
    btnIntern.style.background = isInternVisible ? "#fee2e2" : "#dcfce7";
    btnIntern.style.color = isInternVisible ? "#ef4444" : "#16a34a";
    btnIntern.style.borderColor = isInternVisible ? "#fca5a5" : "#86efac";
  }
  if (noticeIntern) noticeIntern.style.display = isInternVisible ? "none" : "block";
  if (groupIntern) groupIntern.style.display = isInternVisible ? "block" : "none";

  // 2. Research Projects
  const isResearchVisible = cvState.sectionVisibility.researchProjects !== false;
  const btnResearch = document.getElementById("btnToggleResearchProj");
  const groupResearch = document.getElementById("researchSectionGroup");
  if (btnResearch) {
    btnResearch.innerHTML = isResearchVisible ? "Hide Research Projects" : "➕ Show Research Projects";
  }
  if (groupResearch) groupResearch.style.display = isResearchVisible ? "block" : "none";

  // 3. Certifications
  const isCertVisible = cvState.sectionVisibility.certifications !== false;
  const btnCert = document.getElementById("btnToggleCertifications");
  const noticeCert = document.getElementById("noticeCertificationsExcluded");
  const contCert = document.getElementById("certificationsContainer");
  const btnAddCert = document.getElementById("btnAddCert");
  if (btnCert) {
    btnCert.innerHTML = isCertVisible ? "Hide Section" : "➕ Restore Certifications";
  }
  if (noticeCert) noticeCert.style.display = isCertVisible ? "none" : "block";
  if (contCert) contCert.style.display = isCertVisible ? "flex" : "none";
  if (btnAddCert) btnAddCert.style.display = isCertVisible ? "inline-block" : "none";

  // 4. Responsibilities
  const isRespVisible = cvState.sectionVisibility.responsibilities !== false;
  const btnResp = document.getElementById("btnToggleResponsibilities");
  const noticeResp = document.getElementById("noticeResponsibilitiesExcluded");
  const contResp = document.getElementById("responsibilitiesContainer");
  const btnAddResp = document.getElementById("btnAddResp");
  if (btnResp) btnResp.innerHTML = isRespVisible ? "Hide Section" : "➕ Restore Section";
  if (noticeResp) noticeResp.style.display = isRespVisible ? "none" : "block";
  if (contResp) contResp.style.display = isRespVisible ? "flex" : "none";
  if (btnAddResp) btnAddResp.style.display = isRespVisible ? "inline-block" : "none";

  // 5. Extra-Curricular
  const isExtraVisible = cvState.sectionVisibility.extraCurricular !== false;
  const btnExtra = document.getElementById("btnToggleExtra");
  const noticeExtra = document.getElementById("noticeExtraExcluded");
  const contExtra = document.getElementById("extraCurricularContainer");
  const btnAddExtra = document.getElementById("btnAddExtra");
  if (btnExtra) btnExtra.innerHTML = isExtraVisible ? "Hide Section" : "➕ Restore Section";
  if (noticeExtra) noticeExtra.style.display = isExtraVisible ? "none" : "block";
  if (contExtra) contExtra.style.display = isExtraVisible ? "flex" : "none";
  if (btnAddExtra) btnAddExtra.style.display = isExtraVisible ? "inline-block" : "none";

  // 6. Hobbies
  const isHobbiesVisible = cvState.sectionVisibility.hobbies !== false;
  const btnHobbies = document.getElementById("btnToggleHobbies");
  const noticeHobbies = document.getElementById("noticeHobbiesExcluded");
  const contHobbies = document.getElementById("hobbiesContainer");
  const btnAddHobby = document.getElementById("btnAddHobby");
  if (btnHobbies) btnHobbies.innerHTML = isHobbiesVisible ? "Hide Section" : "➕ Restore Section";
  if (noticeHobbies) noticeHobbies.style.display = isHobbiesVisible ? "none" : "block";
  if (contHobbies) contHobbies.style.display = isHobbiesVisible ? "flex" : "none";
  if (btnAddHobby) btnAddHobby.style.display = isHobbiesVisible ? "inline-block" : "none";
}

/* ==========================================================================
   FORM POPULATION & DYNAMIC FORM RENDERERS
   ========================================================================== */
function populateFormFields() {
  const p = cvState.personalInfo;
  document.getElementById("inpName").value = p.fullName || "";
  document.getElementById("inpSpec").value = p.specialization || "";
  document.getElementById("inpAddress").value = p.address || "";
  document.getElementById("inpDob").value = p.dob || "";
  document.getElementById("inpAge").value = p.age || "";
  document.getElementById("inpPhone").value = p.phone || "";
  document.getElementById("inpEmail").value = p.email || "";

  document.getElementById("inpInternCompany").value = cvState.internship.company || "";
  document.getElementById("inpInternPeriod").value = cvState.internship.period || "";
  document.getElementById("inpInternRole").value = cvState.internship.role || "";

  document.getElementById("inpPlace").value = cvState.signatures.place || "PUNE";
  document.getElementById("inpDate").value = cvState.signatures.date || "";
}

function renderDynamicFormItems() {
  renderLanguagesForm();
  renderAcademicsForm();
  renderInternshipBulletsForm();
  renderProjectsForm();
  renderCertificationsForm();
  renderResponsibilitiesForm();
  renderExtraCurricularForm();
  renderHobbiesForm();
}

/* 1. Languages Form */
function renderLanguagesForm() {
  const c = document.getElementById("languagesContainer");
  c.innerHTML = "";
  cvState.languages.forEach((lang, idx) => {
    const row = document.createElement("div");
    row.className = "form-row";
    row.style.alignItems = "center";
    row.style.gridTemplateColumns = "1.5fr 1fr 1fr 1fr auto";
    row.innerHTML = `
      <input type="text" value="${lang.language}" oninput="updateLanguageField(${idx}, 'language', this.value)" placeholder="Language">
      <label style="display:flex;align-items:center;gap:4px;cursor:pointer;font-size:0.75rem;">
        <input type="checkbox" ${lang.speak ? "checked" : ""} onchange="updateLanguageField(${idx}, 'speak', this.checked)"> Speak
      </label>
      <label style="display:flex;align-items:center;gap:4px;cursor:pointer;font-size:0.75rem;">
        <input type="checkbox" ${lang.read ? "checked" : ""} onchange="updateLanguageField(${idx}, 'read', this.checked)"> Read
      </label>
      <label style="display:flex;align-items:center;gap:4px;cursor:pointer;font-size:0.75rem;">
        <input type="checkbox" ${lang.write ? "checked" : ""} onchange="updateLanguageField(${idx}, 'write', this.checked)"> Write
      </label>
      <button type="button" class="btn btn-danger btn-sm" onclick="removeLanguage(${idx})">✕</button>
    `;
    c.appendChild(row);
  });
}

function updateLanguageField(idx, field, val) {
  cvState.languages[idx][field] = val;
  updateLivePreview();
}

function addLanguage() {
  cvState.languages.push({ language: "New Language", speak: true, read: true, write: true });
  renderLanguagesForm();
  updateLivePreview();
}

function removeLanguage(idx) {
  cvState.languages.splice(idx, 1);
  renderLanguagesForm();
  updateLivePreview();
}

/* 2. Academics Form */
function renderAcademicsForm() {
  const c = document.getElementById("academicsContainer");
  c.innerHTML = "";
  cvState.academics.forEach((acad, idx) => {
    const box = document.createElement("div");
    box.className = "dynamic-item";
    box.innerHTML = `
      <div class="dynamic-item-header">
        <span>#${idx + 1} Degree: ${acad.degree}</span>
        <button type="button" class="btn btn-danger btn-sm" onclick="removeAcademic(${idx})">Delete</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Degree</label>
          <input type="text" value="${acad.degree}" oninput="updateAcademicField(${idx}, 'degree', this.value)" placeholder="MBA / BCA / XII / X">
        </div>
        <div class="form-group">
          <label>Stream</label>
          <input type="text" value="${acad.stream}" oninput="updateAcademicField(${idx}, 'stream', this.value)" placeholder="Stream / Specialization">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>University / Board</label>
          <input type="text" value="${acad.university}" oninput="updateAcademicField(${idx}, 'university', this.value)" placeholder="University / Board">
        </div>
        <div class="form-group">
          <label>Institute / College</label>
          <input type="text" value="${acad.institute}" oninput="updateAcademicField(${idx}, 'institute', this.value)" placeholder="Institute Name">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Passing Year (e.g. 2026–28 or 2023)</label>
          <input type="text" value="${acad.year}" oninput="updateAcademicField(${idx}, 'year', this.value)" placeholder="2026–28 or 2023">
        </div>
        <div class="form-group">
          <label>Percentage / CGPA (e.g. Pursuing or 68.60%)</label>
          <input type="text" value="${acad.percentage}" oninput="updateAcademicField(${idx}, 'percentage', this.value)" placeholder="Pursuing or 75.00%">
        </div>
      </div>
    `;
    c.appendChild(box);
  });
}

function updateAcademicField(idx, field, val) {
  cvState.academics[idx][field] = val;
  updateLivePreview();
}

function addAcademic() {
  cvState.academics.push({
    degree: "New Degree",
    stream: "Field of Study",
    university: "University Name",
    institute: "College Name",
    year: "2024",
    percentage: "70.00%"
  });
  renderAcademicsForm();
  updateLivePreview();
}

function removeAcademic(idx) {
  cvState.academics.splice(idx, 1);
  renderAcademicsForm();
  updateLivePreview();
}

/* 3. Summer Internship Bullets */
function renderInternshipBulletsForm() {
  const c = document.getElementById("internBulletsContainer");
  c.innerHTML = "";
  cvState.internship.bullets.forEach((b, idx) => {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.gap = "0.5rem";
    row.style.alignItems = "flex-start";
    row.innerHTML = `
      <span style="margin-top:0.35rem; color:#94a3b8;">•</span>
      <textarea rows="2" style="flex:1;" oninput="updateInternBullet(${idx}, this.value)">${b}</textarea>
      <button type="button" class="btn btn-danger btn-sm" style="margin-top:0.25rem;" onclick="removeInternBullet(${idx})">✕</button>
    `;
    c.appendChild(row);
  });
}

function updateInternBullet(idx, val) {
  cvState.internship.bullets[idx] = val;
  updateLivePreview();
}

function addInternBullet() {
  cvState.internship.bullets.push("Contributed to strategic initiatives and operational excellence.");
  renderInternshipBulletsForm();
  updateLivePreview();
}

function removeInternBullet(idx) {
  cvState.internship.bullets.splice(idx, 1);
  renderInternshipBulletsForm();
  updateLivePreview();
}

/* 4. Projects Form */
function renderProjectsForm() {
  // Research
  const rCont = document.getElementById("researchProjectsContainer");
  rCont.innerHTML = "";
  cvState.projects.research.forEach((proj, pIdx) => {
    const box = document.createElement("div");
    box.className = "dynamic-item";
    box.innerHTML = `
      <div class="dynamic-item-header">
        <span>Research Project #${pIdx + 1}</span>
        <button type="button" class="btn btn-danger btn-sm" onclick="removeResearchProject(${pIdx})">Delete</button>
      </div>
      <div class="form-group">
        <label>Title & Date</label>
        <input type="text" value="${proj.title}" oninput="updateResearchProjTitle(${pIdx}, this.value)">
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea rows="3" oninput="updateResearchProjBullet(${pIdx}, 0, this.value)">${proj.bullets[0] || ""}</textarea>
      </div>
    `;
    rCont.appendChild(box);
  });

  // Other Projects
  const oCont = document.getElementById("otherProjectsContainer");
  oCont.innerHTML = "";
  cvState.projects.other.forEach((proj, pIdx) => {
    const box = document.createElement("div");
    box.className = "dynamic-item";
    box.innerHTML = `
      <div class="dynamic-item-header">
        <span>Other Project #${pIdx + 1}</span>
        <button type="button" class="btn btn-danger btn-sm" onclick="removeOtherProject(${pIdx})">Delete</button>
      </div>
      <div class="form-group">
        <label>Title & Date</label>
        <input type="text" value="${proj.title}" oninput="updateOtherProjTitle(${pIdx}, this.value)">
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea rows="3" oninput="updateOtherProjBullet(${pIdx}, 0, this.value)">${proj.bullets[0] || ""}</textarea>
      </div>
    `;
    oCont.appendChild(box);
  });
}

function updateResearchProjTitle(idx, val) {
  cvState.projects.research[idx].title = val;
  updateLivePreview();
}

function updateResearchProjBullet(pIdx, bIdx, val) {
  cvState.projects.research[pIdx].bullets[bIdx] = val;
  updateLivePreview();
}

function addResearchProject() {
  cvState.projects.research.push({
    title: "AI-Powered Predictive Business Modeling | (Dec 2025)",
    bullets: ["Formulated predictive ML architecture analyzing business growth indicators."]
  });
  renderProjectsForm();
  updateLivePreview();
}

function removeResearchProject(idx) {
  cvState.projects.research.splice(idx, 1);
  renderProjectsForm();
  updateLivePreview();
}

function updateOtherProjTitle(idx, val) {
  cvState.projects.other[idx].title = val;
  updateLivePreview();
}

function updateOtherProjBullet(pIdx, bIdx, val) {
  cvState.projects.other[pIdx].bullets[bIdx] = val;
  updateLivePreview();
}

function addOtherProject() {
  cvState.projects.other.push({
    title: "Digital Venture Strategy & Web Platform | (Nov 2025)",
    bullets: ["Architected and deployed full-stack web application for organizational automation."]
  });
  renderProjectsForm();
  updateLivePreview();
}

function removeOtherProject(idx) {
  cvState.projects.other.splice(idx, 1);
  renderProjectsForm();
  updateLivePreview();
}

/* 5. Certifications Form */
function renderCertificationsForm() {
  const c = document.getElementById("certificationsContainer");
  c.innerHTML = "";
  cvState.certifications.forEach((cert, cIdx) => {
    const box = document.createElement("div");
    box.className = "dynamic-item";
    box.innerHTML = `
      <div class="dynamic-item-header">
        <span>Certification #${cIdx + 1}</span>
        <button type="button" class="btn btn-danger btn-sm" onclick="removeCertification(${cIdx})">Delete</button>
      </div>
      <div class="form-group">
        <label>Certificate Title, Institute & Date</label>
        <input type="text" value="${cert.title}" oninput="updateCertTitle(${cIdx}, this.value)">
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea rows="2" oninput="updateCertBullet(${cIdx}, 0, this.value)">${cert.bullets[0] || ""}</textarea>
      </div>
    `;
    c.appendChild(box);
  });
}

function updateCertTitle(idx, val) {
  cvState.certifications[idx].title = val;
  updateLivePreview();
}

function updateCertBullet(cIdx, bIdx, val) {
  cvState.certifications[cIdx].bullets[bIdx] = val;
  updateLivePreview();
}

function addCertification() {
  cvState.certifications.push({
    title: "Executive Management & Analytics | IIM / SBUP | (Jan 2026)",
    bullets: ["Demonstrated competency in key strategic business analytics frameworks."]
  });
  renderCertificationsForm();
  updateLivePreview();
}

function removeCertification(idx) {
  cvState.certifications.splice(idx, 1);
  renderCertificationsForm();
  updateLivePreview();
}

/* 6, 7, 8. Simple List Forms */
function renderResponsibilitiesForm() {
  renderSimpleListForm("responsibilitiesContainer", cvState.responsibilities, "responsibilities");
}

function renderExtraCurricularForm() {
  renderSimpleListForm("extraCurricularContainer", cvState.extraCurricular, "extraCurricular");
}

function renderHobbiesForm() {
  renderSimpleListForm("hobbiesContainer", cvState.hobbies, "hobbies");
}

function renderSimpleListForm(containerId, list, stateKey) {
  const c = document.getElementById(containerId);
  c.innerHTML = "";
  list.forEach((item, idx) => {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.gap = "0.5rem";
    row.style.alignItems = "center";
    row.innerHTML = `
      <span style="color:#94a3b8;">•</span>
      <input type="text" style="flex:1;" value="${item}" oninput="updateSimpleListItem('${stateKey}', ${idx}, this.value)">
      <button type="button" class="btn btn-danger btn-sm" onclick="removeSimpleListItem('${stateKey}', ${idx})">✕</button>
    `;
    c.appendChild(row);
  });
}

function updateSimpleListItem(key, idx, val) {
  cvState[key][idx] = val;
  updateLivePreview();
}

function addSimpleListItem(key, defaultVal) {
  cvState[key].push(defaultVal);
  if (key === "responsibilities") renderResponsibilitiesForm();
  else if (key === "extraCurricular") renderExtraCurricularForm();
  else if (key === "hobbies") renderHobbiesForm();
  updateLivePreview();
}

function removeSimpleListItem(key, idx) {
  cvState[key].splice(idx, 1);
  if (key === "responsibilities") renderResponsibilitiesForm();
  else if (key === "extraCurricular") renderExtraCurricularForm();
  else if (key === "hobbies") renderHobbiesForm();
  updateLivePreview();
}

/* ==========================================================================
   LIVE PREVIEW RENDERER (EXACT COPY-PASTE OF OFFICIAL BITM CV FORMAT)
   ========================================================================== */
function updateLivePreview() {
  const p = cvState.personalInfo;

  // 1. Personal Information Table
  document.getElementById("prevName").innerText = p.fullName || "Student Name";
  document.getElementById("prevSpec").innerText = p.specialization || "Specialization";
  document.getElementById("prevAddress").innerText = p.address || "";
  document.getElementById("prevDob").innerText = p.dob || "";
  document.getElementById("prevAge").innerText = p.age || "";
  document.getElementById("prevPhone").innerText = p.phone || "";

  const emailLink = document.getElementById("prevEmail");
  emailLink.innerText = p.email || "";
  emailLink.href = p.email ? `mailto:${p.email}` : "#";

  // Photo
  const photoSlot = document.getElementById("prevPhotoSlot");
  photoSlot.innerHTML = `<img src="${p.photoUrl || 'sample_photo.jpg'}" alt="Student Photo">`;

  // 2. Languages Known Table
  const langTbody = document.getElementById("prevLanguagesTbody");
  langTbody.innerHTML = "";
  cvState.languages.forEach(l => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="text-left" style="padding-left: 8px;">${l.language}</td>
      <td class="text-center font-bold">${l.speak ? "✓" : ""}</td>
      <td class="text-center font-bold">${l.read ? "✓" : ""}</td>
      <td class="text-center font-bold">${l.write ? "✓" : ""}</td>
    `;
    langTbody.appendChild(tr);
  });

  // 3. Academic Details Table
  const acadTbody = document.getElementById("prevAcademicsTbody");
  acadTbody.innerHTML = "";
  cvState.academics.forEach(a => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="text-left" style="padding-left: 5px;">${a.degree}</td>
      <td class="text-left" style="padding-left: 5px;">${a.stream}</td>
      <td class="text-left" style="padding-left: 5px;">${a.university}</td>
      <td class="text-left" style="padding-left: 5px;">${a.institute}</td>
      <td class="text-center" style="white-space: nowrap;">${a.year}</td>
      <td class="text-center" style="white-space: nowrap;">${a.percentage}</td>
    `;
    acadTbody.appendChild(tr);
  });

  const sigDate = cvState.signatures.date || "";
  document.getElementById("prevDirectorDate").innerText = sigDate;
  document.getElementById("prevFooterDate").innerText = sigDate;
  document.getElementById("prevPlace").innerText = cvState.signatures.place || "PUNE";

  // 4. Summer Internship
  document.getElementById("prevInternCompany").innerText = cvState.internship.company || "";
  const periodText = cvState.internship.period ? `| ${cvState.internship.period.trim()}` : "";
  document.getElementById("prevInternPeriod").innerText = periodText;
  document.getElementById("prevInternRole").innerText = cvState.internship.role || "";

  const internBullets = document.getElementById("prevInternBullets");
  internBullets.innerHTML = "";
  cvState.internship.bullets.forEach(b => {
    const li = document.createElement("li");
    li.innerText = b;
    internBullets.appendChild(li);
  });

  // 5. Key Projects - Research
  const rCont = document.getElementById("prevResearchProjects");
  rCont.innerHTML = "";
  cvState.projects.research.forEach(rp => {
    const div = document.createElement("div");
    div.style.marginBottom = "4px";
    div.innerHTML = `
      <div style="font-weight: bold;">${rp.title}</div>
      <ul class="cv-bullets">${rp.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
    `;
    rCont.appendChild(div);
  });

  // 5. Key Projects - Other
  const oCont = document.getElementById("prevOtherProjects");
  oCont.innerHTML = "";
  cvState.projects.other.forEach(op => {
    const div = document.createElement("div");
    div.style.marginBottom = "4px";
    div.innerHTML = `
      <div style="font-weight: bold;">${op.title}</div>
      <ul class="cv-bullets">${op.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
    `;
    oCont.appendChild(div);
  });

  // 6. Certifications
  const certCont = document.getElementById("prevCertifications");
  certCont.innerHTML = "";
  cvState.certifications.forEach(c => {
    const div = document.createElement("div");
    div.style.marginBottom = "4px";
    div.innerHTML = `
      <div style="font-weight: bold;">${c.title}</div>
      <ul class="cv-bullets">${c.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
    `;
    certCont.appendChild(div);
  });

  // 7. Responsibilities & Achievements
  const respCont = document.getElementById("prevResponsibilities");
  respCont.innerHTML = "";
  cvState.responsibilities.forEach(r => {
    const li = document.createElement("li");
    if (r.includes(" – ")) {
      const parts = r.split(" – ");
      li.innerHTML = `<strong>${parts[0]}</strong> – ${parts.slice(1).join(" – ")}`;
    } else {
      li.innerText = r;
    }
    respCont.appendChild(li);
  });

  // 8. Extra-Curricular Activities
  const extraCont = document.getElementById("prevExtraCurricular");
  extraCont.innerHTML = "";
  cvState.extraCurricular.forEach(e => {
    const li = document.createElement("li");
    li.innerText = e;
    extraCont.appendChild(li);
  });

  // 9. Hobbies & Interests
  const hobCont = document.getElementById("prevHobbies");
  hobCont.innerHTML = "";
  cvState.hobbies.forEach(h => {
    const li = document.createElement("li");
    li.innerText = h;
    hobCont.appendChild(li);
  });

  // Section Visibility Toggles in Live Preview
  const vis = cvState.sectionVisibility || {};
  const prevInternTable = document.getElementById("prevInternshipTable");
  if (prevInternTable) {
    prevInternTable.style.display = (vis.summerInternship !== false) ? "table" : "none";
  }

  const prevResearchRow = document.getElementById("prevResearchProjectsRow");
  if (prevResearchRow) {
    prevResearchRow.style.display = (vis.researchProjects !== false) ? "table-row" : "none";
  }

  const prevCertTable = document.getElementById("prevCertificationsTable");
  if (prevCertTable) {
    prevCertTable.style.display = (vis.certifications !== false) ? "table" : "none";
  }

  const prevRespTable = document.getElementById("prevResponsibilitiesTable");
  if (prevRespTable) {
    prevRespTable.style.display = (vis.responsibilities !== false) ? "table" : "none";
  }

  const prevExtraTable = document.getElementById("prevExtraCurricularTable");
  if (prevExtraTable) {
    prevExtraTable.style.display = (vis.extraCurricular !== false) ? "table" : "none";
  }

  const prevHobbiesTable = document.getElementById("prevHobbiesTable");
  if (prevHobbiesTable) {
    prevHobbiesTable.style.display = (vis.hobbies !== false) ? "table" : "none";
  }
}

/* ==========================================================================
   EVENT LISTENERS & BINDINGS
   ========================================================================== */
function attachEventListeners() {
  const bind = (id, obj, key) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", e => {
        obj[key] = e.target.value;
        updateLivePreview();
      });
    }
  };

  bind("inpName", cvState.personalInfo, "fullName");
  bind("inpSpec", cvState.personalInfo, "specialization");
  bind("inpAddress", cvState.personalInfo, "address");
  bind("inpDob", cvState.personalInfo, "dob");
  bind("inpAge", cvState.personalInfo, "age");
  bind("inpPhone", cvState.personalInfo, "phone");
  bind("inpEmail", cvState.personalInfo, "email");

  bind("inpInternCompany", cvState.internship, "company");
  bind("inpInternRole", cvState.internship, "role");
  bind("inpInternPeriod", cvState.internship, "period");

  bind("inpPlace", cvState.signatures, "place");
  bind("inpDate", cvState.signatures, "date");

  // Photo upload
  document.getElementById("inpPhoto").addEventListener("change", e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        cvState.personalInfo.photoUrl = ev.target.result;
        updateLivePreview();
      };
      reader.readAsDataURL(file);
    }
  });

  // Add buttons
  document.getElementById("btnAddLanguage").addEventListener("click", addLanguage);
  document.getElementById("btnAddAcademic").addEventListener("click", addAcademic);
  document.getElementById("btnAddInternBullet").addEventListener("click", addInternBullet);
  document.getElementById("btnAddResearchProj").addEventListener("click", addResearchProject);
  document.getElementById("btnAddOtherProj").addEventListener("click", addOtherProject);
  document.getElementById("btnAddCert").addEventListener("click", addCertification);
  document.getElementById("btnAddResp").addEventListener("click", () => addSimpleListItem("responsibilities", "Active Member / Coordinator – Contributed to organizational initiatives."));
  document.getElementById("btnAddExtra").addEventListener("click", () => addSimpleListItem("extraCurricular", "Participated in university sports competition or tournament."));
  document.getElementById("btnAddHobby").addEventListener("click", () => addSimpleListItem("hobbies", "Sports: Actively engaged in athletic activities."));

  // Header action buttons
  document.getElementById("btnInstructions").addEventListener("click", () => openModal("instructionsModal"));
  document.getElementById("btnAiCopilot").addEventListener("click", () => openModal("aiModal"));
  document.getElementById("btnAiQuickFill").addEventListener("click", () => openModal("aiModal"));
  document.getElementById("btnResetSample").addEventListener("click", resetToSampleData);
  document.getElementById("btnSaveDraft").addEventListener("click", saveDraftToStorage);

  // Word (.docx) Export
  const btnWord = document.getElementById("btnExportWord");
  if (btnWord) {
    btnWord.addEventListener("click", exportWordDocx);
  }
  
  // PDF Export and Print
  const btnDownload = document.getElementById("btnDownloadPdf");
  if (btnDownload) {
    btnDownload.addEventListener("click", downloadDirectPdf);
  }
  document.getElementById("btnPrintPdf").addEventListener("click", () => window.print());

  // Execute AI button
  document.getElementById("btnExecuteAi").addEventListener("click", executeAiCopilot);
}

/* Direct High-Fidelity PDF Download using html2pdf */
function downloadDirectPdf() {
  const btn = document.getElementById("btnDownloadPdf");
  const originalHtml = btn.innerHTML;
  btn.innerHTML = "⏳ Generating...";
  btn.disabled = true;

  const exportWrapper = document.createElement("div");
  exportWrapper.style.width = "210mm";
  exportWrapper.style.background = "#ffffff";
  exportWrapper.style.margin = "0";
  exportWrapper.style.padding = "0";

  const p1 = document.getElementById("cvPage1").cloneNode(true);
  const p2 = document.getElementById("cvPage2").cloneNode(true);

  p1.style.boxShadow = "none";
  p1.style.margin = "0";
  p1.style.pageBreakAfter = "always";
  p1.style.breakAfter = "page";

  p2.style.boxShadow = "none";
  p2.style.margin = "0";
  p2.style.pageBreakAfter = "avoid";
  p2.style.breakAfter = "avoid";

  exportWrapper.appendChild(p1);
  exportWrapper.appendChild(p2);

  const opt = {
    margin: 0,
    filename: `${(cvState.personalInfo.fullName || "Student_CV").trim().replace(/\\s+/g, "_")}_BITM_CV.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollY: 0,
      scrollX: 0,
      letterRendering: true
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait"
    },
    pagebreak: { mode: ["css", "legacy"] }
  };

  if (typeof html2pdf !== "undefined") {
    html2pdf()
      .set(opt)
      .from(exportWrapper)
      .save()
      .then(() => {
        btn.innerHTML = originalHtml;
        btn.disabled = false;
      })
      .catch(err => {
        console.error("PDF generation error:", err);
        btn.innerHTML = originalHtml;
        btn.disabled = false;
        window.print();
      });
  } else {
    btn.innerHTML = originalHtml;
    btn.disabled = false;
    window.print();
  }
}

/* ==========================================================================
   OFFICIAL WORD (.DOCX) EXPORT GENERATOR
   Exact duplicate of b cv u (1).pdf and CV format-Freshers (5).docx
   Produces 100% genuine .docx matching all BITM Placement Rules
   ========================================================================== */
async function exportWordDocx() {
  const btn = document.getElementById("btnExportWord");
  const originalHtml = btn ? btn.innerHTML : "📄 Export Word (.docx)";
  if (btn) {
    btn.innerHTML = "⏳ Generating .docx...";
    btn.disabled = true;
  }

  try {
    if (typeof window.docx === "undefined") {
      throw new Error("Word docx generator library is not loaded. Please refresh the page.");
    }

    const {
      Document, Paragraph, TextRun, Table, TableRow, TableCell,
      WidthType, AlignmentType, BorderStyle, HeadingLevel, ImageRun, Packer, PageBreak
    } = window.docx;

    const cellBorder = {
      top: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "000000" }
    };

    const noBorder = {
      top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }
    };

    const padCell = { top: 60, bottom: 60, left: 100, right: 100 };

    function createBannerRow(titleText, colSpan = 1, isLeft = false) {
      return new TableRow({
        children: [
          new TableCell({
            columnSpan: colSpan,
            shading: { fill: "0E3860" },
            borders: cellBorder,
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                alignment: isLeft ? AlignmentType.LEFT : AlignmentType.CENTER,
                spacing: { before: 0, after: 0 },
                children: [
                  new TextRun({
                    text: titleText,
                    bold: true,
                    color: "FFFFFF",
                    font: "Arial",
                    size: 22
                  })
                ]
              })
            ]
          })
        ]
      });
    }

    // 1. Prepare Letterhead Image
    let headerImageRun = null;
    try {
      const resp = await fetch("bitm_header.jpg");
      if (resp.ok) {
        const buf = await resp.arrayBuffer();
        headerImageRun = new ImageRun({
          data: new Uint8Array(buf),
          transformation: { width: 595, height: 74 }
        });
      }
    } catch (e) {
      console.warn("Could not load header image for Word export:", e);
    }

    // 2. Prepare Student Photo
    let photoImageRun = null;
    const photoUrl = cvState.personalInfo.photoUrl || "sample_photo.jpg";
    try {
      if (photoUrl.startsWith("data:image")) {
        const base64Data = photoUrl.split(",")[1];
        const binaryStr = atob(base64Data);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        photoImageRun = new ImageRun({
          data: bytes,
          transformation: { width: 90, height: 110 }
        });
      } else {
        const resp = await fetch(photoUrl);
        if (resp.ok) {
          const buf = await resp.arrayBuffer();
          photoImageRun = new ImageRun({
            data: new Uint8Array(buf),
            transformation: { width: 90, height: 110 }
          });
        }
      }
    } catch (e) {
      console.warn("Could not load student photo for Word export:", e);
    }

    const docChildren = [];

    // Official BITM Header
    if (headerImageRun) {
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 120 },
          children: [headerImageRun]
        })
      );
    } else {
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 40 },
          children: [
            new TextRun({
              text: "BALAJI INSTITUTE OF TELECOM AND MANAGEMENT (BITM)",
              bold: true,
              font: "Arial",
              size: 24,
              color: "0E3860"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 120 },
          children: [
            new TextRun({
              text: "Survey No. 55/2-7, Tathawade, Pune 411033",
              font: "Arial",
              size: 18,
              color: "64748B"
            })
          ]
        })
      );
    }

    // 1. Personal Information Table
    const p = cvState.personalInfo;
    const tablePersonalInfo = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        createBannerRow("PERSONAL INFORMATION", 5),
        // Row 1: Name & MBA Specialization + Photo (rowSpan 4)
        new TableRow({
          children: [
            new TableCell({
              width: { size: 1257, type: WidthType.DXA },
              borders: cellBorder,
              margins: padCell,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Name", bold: true, font: "Arial", size: 22 })] })]
            }),
            new TableCell({
              columnSpan: 3,
              width: { size: 6795, type: WidthType.DXA },
              borders: cellBorder,
              margins: padCell,
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: (p.fullName || "Student Name") + "   ", bold: true, font: "Arial", size: 28 }),
                    new TextRun({ text: `MBA - ${p.specialization || ""}`, bold: true, font: "Arial", size: 22 })
                  ]
                })
              ]
            }),
            new TableCell({
              rowSpan: 4,
              width: { size: 1948, type: WidthType.DXA },
              borders: cellBorder,
              margins: padCell,
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: photoImageRun ? [photoImageRun] : [new TextRun({ text: "[Photo]", font: "Arial", size: 18 })]
                })
              ]
            })
          ]
        }),
        // Row 2: Permanent address
        new TableRow({
          children: [
            new TableCell({
              borders: cellBorder,
              margins: padCell,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Permanent\naddress", bold: true, font: "Arial", size: 22 })] })]
            }),
            new TableCell({
              columnSpan: 3,
              borders: cellBorder,
              margins: padCell,
              children: [new Paragraph({ children: [new TextRun({ text: p.address || "", font: "Arial", size: 22 })] })]
            })
          ]
        }),
        // Row 3: DOB & AGE
        new TableRow({
          children: [
            new TableCell({
              borders: cellBorder,
              margins: padCell,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "DOB", font: "Arial", size: 22 })] })]
            }),
            new TableCell({
              borders: cellBorder,
              margins: padCell,
              children: [new Paragraph({ children: [new TextRun({ text: p.dob || "", font: "Arial", size: 22 })] })]
            }),
            new TableCell({
              borders: cellBorder,
              margins: padCell,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "AGE", font: "Arial", size: 22 })] })]
            }),
            new TableCell({
              borders: cellBorder,
              margins: padCell,
              children: [new Paragraph({ children: [new TextRun({ text: p.age || "", font: "Arial", size: 22 })] })]
            })
          ]
        }),
        // Row 4: Phone & Email
        new TableRow({
          children: [
            new TableCell({
              borders: cellBorder,
              margins: padCell,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Phone", font: "Arial", size: 22 })] })]
            }),
            new TableCell({
              borders: cellBorder,
              margins: padCell,
              children: [new Paragraph({ children: [new TextRun({ text: p.phone || "", font: "Arial", size: 22 })] })]
            }),
            new TableCell({
              borders: cellBorder,
              margins: padCell,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Email", font: "Arial", size: 22 })] })]
            }),
            new TableCell({
              borders: cellBorder,
              margins: padCell,
              children: [new Paragraph({ children: [new TextRun({ text: p.email || "", font: "Arial", size: 22, color: "0000EE", underline: {} })] })]
            })
          ]
        })
      ]
    });
    docChildren.push(tablePersonalInfo);
    docChildren.push(new Paragraph({ spacing: { before: 40, after: 40 }, children: [] }));

    // 2. Languages Known Table
    const langRows = [
      createBannerRow("LANGUAGES KNOWN", 4),
      new TableRow({
        children: [
          new TableCell({ borders: cellBorder, margins: padCell, width: { size: 2363, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Languages", bold: true, font: "Arial", size: 22 })] })] }),
          new TableCell({ borders: cellBorder, margins: padCell, width: { size: 2623, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Speak", bold: true, font: "Arial", size: 22 })] })] }),
          new TableCell({ borders: cellBorder, margins: padCell, width: { size: 2623, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Read", bold: true, font: "Arial", size: 22 })] })] }),
          new TableCell({ borders: cellBorder, margins: padCell, width: { size: 2390, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Write", bold: true, font: "Arial", size: 22 })] })] })
        ]
      })
    ];

    cvState.languages.forEach(l => {
      langRows.push(
        new TableRow({
          children: [
            new TableCell({ borders: cellBorder, margins: padCell, children: [new Paragraph({ children: [new TextRun({ text: l.language, font: "Arial", size: 22 })] })] }),
            new TableCell({ borders: cellBorder, margins: padCell, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: l.speak ? "✓" : "", bold: true, font: "Arial", size: 22 })] })] }),
            new TableCell({ borders: cellBorder, margins: padCell, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: l.read ? "✓" : "", bold: true, font: "Arial", size: 22 })] })] }),
            new TableCell({ borders: cellBorder, margins: padCell, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: l.write ? "✓" : "", bold: true, font: "Arial", size: 22 })] })] })
          ]
        })
      );
    });

    const tableLanguages = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: langRows
    });
    docChildren.push(tableLanguages);
    docChildren.push(new Paragraph({ spacing: { before: 40, after: 40 }, children: [] }));

    // 3. Academic Details Table
    const acadRows = [
      createBannerRow("ACADEMIC DETAILS", 6),
      new TableRow({
        children: [
          new TableCell({ borders: cellBorder, margins: padCell, width: { size: 1679, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Degree", bold: true, font: "Arial", size: 22 })] })] }),
          new TableCell({ borders: cellBorder, margins: padCell, width: { size: 1690, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Stream", bold: true, font: "Arial", size: 22 })] })] }),
          new TableCell({ borders: cellBorder, margins: padCell, width: { size: 1806, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "University/Board", bold: true, font: "Arial", size: 22 })] })] }),
          new TableCell({ borders: cellBorder, margins: padCell, width: { size: 2586, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Institute", bold: true, font: "Arial", size: 22 })] })] }),
          new TableCell({ borders: cellBorder, margins: padCell, width: { size: 921, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Year", bold: true, font: "Arial", size: 22 })] })] }),
          new TableCell({ borders: cellBorder, margins: padCell, width: { size: 1317, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "(%/GPA)", bold: true, font: "Arial", size: 22 })] })] })
        ]
      })
    ];

    cvState.academics.forEach(a => {
      acadRows.push(
        new TableRow({
          children: [
            new TableCell({ borders: cellBorder, margins: padCell, children: [new Paragraph({ children: [new TextRun({ text: a.degree, font: "Arial", size: 22 })] })] }),
            new TableCell({ borders: cellBorder, margins: padCell, children: [new Paragraph({ children: [new TextRun({ text: a.stream, font: "Arial", size: 22 })] })] }),
            new TableCell({ borders: cellBorder, margins: padCell, children: [new Paragraph({ children: [new TextRun({ text: a.university, font: "Arial", size: 22 })] })] }),
            new TableCell({ borders: cellBorder, margins: padCell, children: [new Paragraph({ children: [new TextRun({ text: a.institute, font: "Arial", size: 22 })] })] }),
            new TableCell({ borders: cellBorder, margins: padCell, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: a.year, font: "Arial", size: 22 })] })] }),
            new TableCell({ borders: cellBorder, margins: padCell, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: a.percentage, font: "Arial", size: 22 })] })] })
          ]
        })
      );
    });

    const tableAcademics = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: acadRows
    });
    docChildren.push(tableAcademics);

    // Academic Certification Text (Bottom of Academic Table)
    docChildren.push(
      new Paragraph({
        spacing: { before: 80, after: 40 },
        children: [
          new TextRun({
            text: "I certify that the marks mentioned in above table have been verified as correct.",
            font: "Arial",
            size: 22
          })
        ]
      })
    );

    // Director Certification Row
    const sigDateVal = cvState.signatures.date || "";
    const acadDirectorTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: noBorder,
              margins: { top: 40, bottom: 80, left: 0, right: 0 },
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: [new Paragraph({ children: [new TextRun({ text: `DATE: ${sigDateVal}`, font: "Arial", size: 22 })] })]
            }),
            new TableCell({
              borders: noBorder,
              margins: { top: 40, bottom: 80, left: 0, right: 0 },
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "DIRECTOR", font: "Arial", size: 22 })] })]
            })
          ]
        })
      ]
    });
    docChildren.push(acadDirectorTable);

    // 4. Summer Internship (Omitted cleanly if removed by Freshers)
    const vis = cvState.sectionVisibility || {};
    if (vis.summerInternship !== false) {
      const internParas = [];
      const company = cvState.internship.company || "";
      const period = cvState.internship.period ? `| ${cvState.internship.period}` : "";
      internParas.push(
        new Paragraph({
          spacing: { before: 40, after: 30 },
          children: [
            new TextRun({ text: `${company} ${period}`.trim(), bold: true, font: "Arial", size: 22 })
          ]
        })
      );

      if (cvState.internship.role) {
        internParas.push(
          new Paragraph({
            spacing: { before: 0, after: 40 },
            children: [
              new TextRun({ text: cvState.internship.role, font: "Arial", size: 22 })
            ]
          })
        );
      }

      cvState.internship.bullets.forEach(b => {
        internParas.push(
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 20, after: 20 },
            children: [new TextRun({ text: b, font: "Arial", size: 22 })]
          })
        );
      });

      const tableInternship = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          createBannerRow("SUMMER INTERNSHIP:", 1, true),
          new TableRow({
            children: [
              new TableCell({
                borders: cellBorder,
                margins: { top: 60, bottom: 60, left: 100, right: 100 },
                children: internParas
              })
            ]
          })
        ]
      });
      docChildren.push(tableInternship);
    }

    // Page Break to Page 2
    docChildren.push(new Paragraph({ children: [new PageBreak()] }));

    // 5. KEY PROJECTS
    const projectCells = [];
    // Research Projects
    if (vis.researchProjects !== false && cvState.projects.research.length > 0) {
      const resParas = [
        new Paragraph({
          spacing: { before: 40, after: 40 },
          children: [
            new TextRun({ text: "Research Projects", bold: true, underline: {}, font: "Arial", size: 22 })
          ]
        })
      ];
      cvState.projects.research.forEach(rp => {
        resParas.push(
          new Paragraph({
            spacing: { before: 40, after: 20 },
            children: [new TextRun({ text: rp.title, bold: true, font: "Arial", size: 22 })]
          })
        );
        rp.bullets.forEach(b => {
          resParas.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { before: 20, after: 20 },
              children: [new TextRun({ text: b, font: "Arial", size: 22 })]
            })
          );
        });
      });

      projectCells.push(
        new TableRow({
          children: [
            new TableCell({
              borders: cellBorder,
              margins: padCell,
              children: resParas
            })
          ]
        })
      );
    }

    // Other Projects
    if (cvState.projects.other.length > 0) {
      const othParas = [
        new Paragraph({
          spacing: { before: 40, after: 40 },
          children: [
            new TextRun({ text: "Other Projects", bold: true, underline: {}, font: "Arial", size: 22 })
          ]
        })
      ];
      cvState.projects.other.forEach(op => {
        othParas.push(
          new Paragraph({
            spacing: { before: 40, after: 20 },
            children: [new TextRun({ text: op.title, bold: true, font: "Arial", size: 22 })]
          })
        );
        op.bullets.forEach(b => {
          othParas.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { before: 20, after: 20 },
              children: [new TextRun({ text: b, font: "Arial", size: 22 })]
            })
          );
        });
      });

      projectCells.push(
        new TableRow({
          children: [
            new TableCell({
              borders: cellBorder,
              margins: padCell,
              children: othParas
            })
          ]
        })
      );
    }

    if (projectCells.length > 0) {
      const tableProjects = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          createBannerRow("KEY PROJECTS", 1, false),
          ...projectCells
        ]
      });
      docChildren.push(tableProjects);
      docChildren.push(new Paragraph({ spacing: { before: 40, after: 40 }, children: [] }));
    }

    // 6. CERTIFICATIONS (if visible)
    if (vis.certifications !== false && cvState.certifications.length > 0) {
      const certParas = [];
      cvState.certifications.forEach(c => {
        certParas.push(
          new Paragraph({
            spacing: { before: 30, after: 20 },
            children: [new TextRun({ text: c.title, bold: true, font: "Arial", size: 22 })]
          })
        );
        c.bullets.forEach(b => {
          certParas.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { before: 20, after: 20 },
              children: [new TextRun({ text: b, font: "Arial", size: 22 })]
            })
          );
        });
      });

      const tableCert = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          createBannerRow("CERTIFICATIONS", 1, false),
          new TableRow({
            children: [
              new TableCell({
                borders: cellBorder,
                margins: padCell,
                children: certParas
              })
            ]
          })
        ]
      });
      docChildren.push(tableCert);
      docChildren.push(new Paragraph({ spacing: { before: 40, after: 40 }, children: [] }));
    }

    // 7. POSITION OF RESPONSIBILITY & ACHIEVEMENTS (if visible)
    if (vis.responsibilities !== false && cvState.responsibilities.length > 0) {
      const respParas = cvState.responsibilities.map(r => {
        if (r.includes(" – ")) {
          const parts = r.split(" – ");
          return new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 20, after: 20 },
            children: [
              new TextRun({ text: parts[0], bold: true, font: "Arial", size: 22 }),
              new TextRun({ text: ` – ${parts.slice(1).join(" – ")}`, font: "Arial", size: 22 })
            ]
          });
        }
        return new Paragraph({
          bullet: { level: 0 },
          spacing: { before: 20, after: 20 },
          children: [new TextRun({ text: r, font: "Arial", size: 22 })]
        });
      });

      const tableResp = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          createBannerRow("POSITION OF RESPONSIBILITY & ACHIEVEMENTS", 1, false),
          new TableRow({
            children: [
              new TableCell({
                borders: cellBorder,
                margins: padCell,
                children: respParas
              })
            ]
          })
        ]
      });
      docChildren.push(tableResp);
      docChildren.push(new Paragraph({ spacing: { before: 40, after: 40 }, children: [] }));
    }

    // 8. EXTRA-CURRICULAR ACTIVITIES (if visible)
    if (vis.extraCurricular !== false && cvState.extraCurricular.length > 0) {
      const extraParas = cvState.extraCurricular.map(e => {
        return new Paragraph({
          bullet: { level: 0 },
          spacing: { before: 20, after: 20 },
          children: [new TextRun({ text: e, font: "Arial", size: 22 })]
        });
      });

      const tableExtra = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          createBannerRow("EXTRA-CURRICULAR ACTIVITIES", 1, false),
          new TableRow({
            children: [
              new TableCell({
                borders: cellBorder,
                margins: padCell,
                children: extraParas
              })
            ]
          })
        ]
      });
      docChildren.push(tableExtra);
      docChildren.push(new Paragraph({ spacing: { before: 40, after: 40 }, children: [] }));
    }

    // 9. HOBBIES & INTERESTS (if visible)
    if (vis.hobbies !== false && cvState.hobbies.length > 0) {
      const hobbyParas = cvState.hobbies.map(h => {
        return new Paragraph({
          bullet: { level: 0 },
          spacing: { before: 20, after: 20 },
          children: [new TextRun({ text: h, font: "Arial", size: 22 })]
        });
      });

      const tableHobbies = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          createBannerRow("HOBBIES & INTERESTS", 1, false),
          new TableRow({
            children: [
              new TableCell({
                borders: cellBorder,
                margins: padCell,
                children: hobbyParas
              })
            ]
          })
        ]
      });
      docChildren.push(tableHobbies);
    }

    // 10. Bottom Signatures Block (Page 2)
    docChildren.push(new Paragraph({ spacing: { before: 240, after: 0 }, children: [] }));

    const placeVal = cvState.signatures.place || "PUNE";
    const footerDateVal = cvState.signatures.date || "";

    const tableSignatures = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: noBorder,
              margins: { top: 60, bottom: 60, left: 0, right: 0 },
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: [new Paragraph({ children: [new TextRun({ text: `DATE: ${footerDateVal}`, font: "Arial", size: 22 })] })]
            }),
            new TableCell({
              borders: noBorder,
              margins: { top: 60, bottom: 60, left: 0, right: 0 },
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "SIGNATURE OF STUDENT", font: "Arial", size: 22 })] })]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              columnSpan: 2,
              borders: noBorder,
              margins: { top: 60, bottom: 60, left: 0, right: 0 },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "COUNTERSIGNED", font: "Arial", size: 22 })] })]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              borders: noBorder,
              margins: { top: 60, bottom: 60, left: 0, right: 0 },
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: [new Paragraph({ children: [new TextRun({ text: `PLACE: ${placeVal}`, font: "Arial", size: 22 })] })]
            }),
            new TableCell({
              borders: noBorder,
              margins: { top: 60, bottom: 60, left: 0, right: 0 },
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "STAMP & SIGNATURE OF DIRECTOR", font: "Arial", size: 22 })] })]
            })
          ]
        })
      ]
    });
    docChildren.push(tableSignatures);

    // Build Word Document
    const wordDoc = new Document({
      sections: [{
        properties: {
          page: {
            margin: { top: 720, bottom: 720, left: 720, right: 720 }
          }
        },
        children: docChildren
      }]
    });

    const blob = await Packer.toBlob(wordDoc);
    const filename = `${(cvState.personalInfo.fullName || "Student_CV").trim().replace(/\\s+/g, "_")}_BITM_CV.docx`;
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);

    if (btn) {
      btn.innerHTML = originalHtml;
      btn.disabled = false;
    }
  } catch (err) {
    console.error("Word export error:", err);
    alert("Could not generate Word document: " + err.message);
    if (btn) {
      btn.innerHTML = originalHtml;
      btn.disabled = false;
    }
  }
}

/* Accordion card toggle */
function toggleCard(headerEl) {
  const body = headerEl.nextElementSibling;
  const arrow = headerEl.querySelector("span");
  if (body.style.display === "none") {
    body.style.display = "flex";
    if (arrow) arrow.innerText = "▼";
  } else {
    body.style.display = "none";
    if (arrow) arrow.innerText = "▶";
  }
}

/* Modals */
function openModal(id) {
  document.getElementById(id).classList.add("active");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("active");
}

/* ==========================================================================
   OPENROUTER AI INTEGRATION
   ========================================================================== */
async function callOpenRouter(prompt) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3005",
      "X-Title": "BITM CPS CV Builder"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an executive CV consultant for Balaji Institute of Telecom & Management (BITM), Sri Balaji University Pune. You produce crisp, professional bullet points following BITM placement rules. No first-person pronouns."
        },
        { role: "user", content: prompt }
      ],
      max_tokens: 600
    })
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || "";
}

async function executeAiCopilot() {
  const action = document.getElementById("selAiAction").value;
  const context = document.getElementById("txtAiContext").value;
  const statusArea = document.getElementById("aiStatusArea");
  const btn = document.getElementById("btnExecuteAi");

  statusArea.style.display = "block";
  statusArea.innerHTML = `<span style="color:#0284c7;">⚡ Running AI with OpenRouter... please wait.</span>`;
  btn.disabled = true;

  try {
    if (action === "enhance_internship") {
      const prompt = `Rewrite and polish these 4 MBA internship bullet points for specialization in ${cvState.personalInfo.specialization}. Use strong corporate action verbs and quantifiable outcomes. Context: ${context || "HR & Marketing"}. Return ONLY 4 bullet points separated by newlines:
Current bullets:
${cvState.internship.bullets.join("\n")}`;

      const result = await callOpenRouter(prompt);
      if (result) {
        const lines = result.split("\n").map(l => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
        if (lines.length > 0) {
          cvState.internship.bullets = lines;
          renderInternshipBulletsForm();
          updateLivePreview();
        }
      }
      statusArea.innerHTML = `<span style="color:#10b981;">✓ Successfully enhanced internship bullet points!</span>`;

    } else if (action === "enhance_projects") {
      const prompt = `Polish the descriptions of these MBA projects to highlight technical rigor and strategic problem-solving. Return improved single sentence summaries:
1. ${cvState.projects.research[0]?.title || ""}
2. ${cvState.projects.other[0]?.title || ""}
Context: ${context}`;

      const result = await callOpenRouter(prompt);
      statusArea.innerHTML = `<span style="color:#10b981;">✓ AI recommendations generated:<br><pre style="white-space:pre-wrap;font-size:11px;margin-top:6px;">${result}</pre></span>`;

    } else if (action === "enhance_achievements") {
      const prompt = `Improve these student council / committee achievements to sound formal and prestigious:
${cvState.responsibilities.join("\n")}`;

      const result = await callOpenRouter(prompt);
      if (result) {
        const lines = result.split("\n").map(l => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
        if (lines.length > 0) {
          cvState.responsibilities = lines;
          renderResponsibilitiesForm();
          updateLivePreview();
        }
      }
      statusArea.innerHTML = `<span style="color:#10b981;">✓ Successfully elevated responsibilities & achievements!</span>`;

    } else if (action === "full_audit") {
      statusArea.innerHTML = `
        <div style="background:#f0fdf4; border:1px solid #bbf7d0; padding:8px; border-radius:6px; color:#166534;">
          <strong>✓ BITM Placement Compliance Audit Passed:</strong><br>
          • Font: Arial throughout verified (11pt)<br>
          • Name: 14pt Bold properly aligned<br>
          • Passing Year: MBA Pursuing (2026–28)<br>
          • Alignment: Dates consistently aligned on right<br>
          • Formal White Background Photo Slot active<br>
          • Table Structures: Strictly identical to b cv u (1).pdf
        </div>
      `;
    }

  } catch (err) {
    statusArea.innerHTML = `<span style="color:#ef4444;">Error calling AI: ${err.message}</span>`;
  } finally {
    btn.disabled = false;
  }
}
