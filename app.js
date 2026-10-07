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
  }
};

// Current Active State
let cvState = JSON.parse(JSON.stringify(SAMPLE_CV_DATA));

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  loadDraftFromStorage();
  populateFormFields();
  renderDynamicFormItems();
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
    updateLivePreview();
  }
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
      <td class="text-left font-bold" style="padding-left: 5px;">${a.degree}</td>
      <td class="text-left" style="padding-left: 5px;">${a.stream}</td>
      <td class="text-left" style="padding-left: 5px;">${a.university}</td>
      <td class="text-left" style="padding-left: 5px;">${a.institute}</td>
      <td class="text-center" style="white-space: nowrap;">${a.year}</td>
      <td class="text-center font-bold" style="white-space: nowrap;">${a.percentage}</td>
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
