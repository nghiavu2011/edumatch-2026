/* app.js - EduMatch 2026 application logic */

// ==========================================
// DATA STATE & LOCAL STORAGE INITIALIZATION
// ==========================================
const DEFAULT_SCHOOLS = [
    {
        id: "1",
        school: "Học viện Công nghệ Bưu chính Viễn thông (PTIT)",
        major: "Báo chí",
        method: "Xét IELTS + Học bạ (PT4)",
        formula_preset: "math_lit_ielts",
        custom_formula: "",
        benchmark: "25.95",
        ielts_converted: "9.5"
    },
    {
        id: "2",
        school: "Đại học Hà Nội (HANU)",
        major: "Marketing (Dạy bằng tiếng Anh)",
        method: "Xét IELTS + Học bạ (PT3)",
        formula_preset: "math_lit_eng_ielts_bonus",
        custom_formula: "",
        benchmark: "33.0 - 35.0",
        ielts_converted: "Cộng 2.0đ"
    },
    {
        id: "3",
        school: "Đại học Hà Nội (HANU)",
        major: "Truyền thông đa phương tiện (Tiếng Anh)",
        method: "Xét IELTS + Học bạ (PT3)",
        formula_preset: "math_lit_eng_ielts_bonus",
        custom_formula: "",
        benchmark: "34.5",
        ielts_converted: "Cộng 2.0đ"
    },
    {
        id: "4",
        school: "Đại học Thương mại (TMU)",
        major: "Quản trị thương hiệu",
        method: "Xét IELTS + Học bạ (PT410)",
        formula_preset: "tmu_formula",
        custom_formula: "",
        benchmark: "26.80",
        ielts_converted: "9.5"
    },
    {
        id: "5",
        school: "Đại học Thương mại (TMU)",
        major: "Marketing thương mại",
        method: "Xét IELTS + Học bạ (PT410)",
        formula_preset: "tmu_formula",
        custom_formula: "",
        benchmark: "27.30",
        ielts_converted: "9.5"
    },
    {
        id: "6",
        school: "Học viện Công nghệ Bưu chính Viễn thông (PTIT)",
        major: "Marketing",
        method: "Xét IELTS + Học bạ (PT4)",
        formula_preset: "math_lit_ielts",
        custom_formula: "",
        benchmark: "26.86",
        ielts_converted: "9.5"
    },
    {
        id: "7",
        school: "Học viện Công nghệ Bưu chính Viễn thông (PTIT)",
        major: "Truyền thông đa phương tiện",
        method: "Xét IELTS + Học bạ (PT4)",
        formula_preset: "math_lit_ielts",
        custom_formula: "",
        benchmark: "28.00",
        ielts_converted: "9.5"
    },
    {
        id: "8",
        school: "Học viện Tài chính (AOF)",
        major: "Kinh tế",
        method: "Xét IELTS + Học bạ (PT3)",
        formula_preset: "math_lit_ielts",
        custom_formula: "",
        benchmark: "24.50 - 25.50",
        ielts_converted: "9.5"
    },
    {
        id: "9",
        school: "Trường Đại học Kinh tế - ĐHQGHN (UEB)",
        major: "Kinh tế",
        method: "Xét IELTS + Học bạ (PT riêng)",
        formula_preset: "math_lit_ielts",
        custom_formula: "",
        benchmark: "25.00 - 26.50",
        ielts_converted: "9.5"
    },
    {
        id: "10",
        school: "Học viện Ngân hàng (HVNH)",
        major: "Marketing",
        method: "Xét IELTS + Học bạ (PT2.1)",
        formula_preset: "hvnh_formula",
        custom_formula: "",
        benchmark: "28.00 - 29.90",
        ielts_converted: "9.5"
    },
    {
        id: "11",
        school: "Học viện Ngân hàng (HVNH)",
        major: "Tài chính - Ngân hàng",
        method: "Xét IELTS + Học bạ (PT2.1)",
        formula_preset: "hvnh_formula",
        custom_formula: "",
        benchmark: "28.50 - 29.90",
        ielts_converted: "9.5"
    },
    {
        id: "12",
        school: "Đại học Kinh tế TP.HCM (UEH)",
        major: "Marketing",
        method: "Xét IELTS + Học bạ (PT4)",
        formula_preset: "ueh_formula",
        custom_formula: "",
        benchmark: "76.00",
        ielts_converted: "20.0"
    },
    {
        id: "13",
        school: "Đại học Kinh tế TP.HCM (UEH)",
        major: "Kinh tế",
        method: "Xét IELTS + Học bạ (PT4)",
        formula_preset: "ueh_formula",
        custom_formula: "",
        benchmark: "67.00",
        ielts_converted: "20.0"
    },
    {
        id: "14",
        school: "Đại học Công nghiệp Hà Nội (HaUI)",
        major: "Công nghệ thông tin",
        method: "Xét IELTS + Học bạ",
        formula_preset: "math_lit_ielts",
        custom_formula: "",
        benchmark: "24.50",
        ielts_converted: "9.5"
    },
    {
        id: "15",
        school: "Đại học Công nghiệp Hà Nội (HaUI)",
        major: "Marketing",
        method: "Xét IELTS + Học bạ",
        formula_preset: "math_lit_ielts",
        custom_formula: "",
        benchmark: "23.80",
        ielts_converted: "9.5"
    }
];

let appState = {
    theme: "dark",
    user: null,
    geminiApiKey: "",
    profile: {
        name: "Lê Linh",
        school: "THPT Nhân Chính",
        area: "KV3",
        ielts: "6.5",
        schoolType: "normal"
    },
    grades: {
        math: { 10: 7.3, 11: 7.8, 12: 8.6 },
        lit: { 10: 8.2, 11: 8.5, 12: 9.0 },
        eng: { 10: 8.6, 11: 8.7, 12: 9.1 }
    },
    exams: {
        math: 6.00,
        lit: 7.75,
        eng: 5.50,
        his: 7.25
    },
    customSchools: []
};

// ==========================================
// CORE APP CONTROLLER & EVENTS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    loadStateFromStorage();
    initAppStyles();
    initTabNavigation();
    initEventListeners();
    recalculateGrades();
    renderComparisonTable();
    lucide.createIcons();
});

function loadStateFromStorage() {
    const savedState = localStorage.getItem("edumatch_state");
    if (savedState) {
        try {
            const parsed = JSON.parse(savedState);
            appState = { ...appState, ...parsed };
        } catch (e) {
            console.error("Error parsing saved state from localStorage:", e);
        }
    }
    
    // Populate inputs from state
    document.getElementById("student-name").value = appState.profile.name;
    document.getElementById("school-name").value = appState.profile.school;
    document.getElementById("admission-area").value = appState.profile.area;
    document.getElementById("ielts-score").value = appState.profile.ielts;
    document.getElementById("school-type").value = appState.profile.schoolType;
    
    // Populate transcript inputs
    for (const sub of ["math", "lit", "eng"]) {
        for (const gr of [10, 11, 12]) {
            const input = document.querySelector(`.grade-input[data-subject="${sub}"][data-grade="${gr}"]`);
            if (input) input.value = appState.grades[sub][gr];
        }
    }
    
    // Populate exam inputs
    for (const sub of ["math", "lit", "eng", "his"]) {
        const input = document.querySelector(`.exam-input[data-subject="${sub}"]`);
        if (input) input.value = appState.exams[sub];
    }
}

function saveStateToStorage() {
    localStorage.setItem("edumatch_state", JSON.stringify(appState));
}

function initAppStyles() {
    // Apply Dark/Light theme class to body
    if (appState.theme === "light") {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
    } else {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
    }
}

function initTabNavigation() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    const panels = document.querySelectorAll(".tab-panel");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const tabId = btn.getAttribute("data-tab");
            
            tabBtns.forEach(b => b.classList.remove("active"));
            panels.forEach(p => p.classList.remove("active"));
            
            btn.classList.add("active");
            document.getElementById(`tab-${tabId}`).classList.add("active");
        });
    });
}

function initEventListeners() {
    // Theme toggle
    const toggleTheme = () => {
        if (document.body.classList.contains("dark-theme")) {
            document.body.classList.replace("dark-theme", "light-theme");
            appState.theme = "light";
        } else {
            document.body.classList.replace("light-theme", "dark-theme");
            appState.theme = "dark";
        }
        saveStateToStorage();
    };

    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
    


    // Profile input updates
    const profileInputs = ["student-name", "school-name", "admission-area", "ielts-score", "school-type"];
    profileInputs.forEach(id => {
        document.getElementById(id).addEventListener("change", (e) => {
            const field = id.replace("student-", "").replace("-score", "").replace("-type", "Type").replace("school-name", "school").replace("admission-area", "area");
            appState.profile[field] = e.target.value;
            saveStateToStorage();
            recalculateGrades();
            renderComparisonTable();
        });
    });

    // Grade inputs updates
    document.querySelectorAll(".grade-input").forEach(input => {
        input.addEventListener("input", (e) => {
            const val = parseFloat(e.target.value) || 0;
            const sub = e.target.getAttribute("data-subject");
            const gr = parseInt(e.target.getAttribute("data-grade"));
            appState.grades[sub][gr] = val;
            saveStateToStorage();
            recalculateGrades();
            renderComparisonTable();
        });
    });

    // Exam inputs updates
    document.querySelectorAll(".exam-input").forEach(input => {
        input.addEventListener("input", (e) => {
            const val = parseFloat(e.target.value) || 0;
            const sub = e.target.getAttribute("data-subject");
            appState.exams[sub] = val;
            saveStateToStorage();
            updateExamD01();
        });
    });



    // Re-evaluate button
    document.getElementById("re-evaluate-btn").addEventListener("click", () => {
        generateAIEvaluation(true);
    });

    // Modal controllers
    const modal = document.getElementById("add-school-modal");
    document.getElementById("add-school-btn").addEventListener("click", () => {
        modal.style.display = "flex";
    });
    
    const closeModal = () => {
        modal.style.display = "none";
        document.getElementById("add-school-form").reset();
        document.getElementById("ai-scan-text").value = "";
        document.getElementById("custom-formula-group").classList.add("hidden");
    };

    document.getElementById("close-modal-btn").addEventListener("click", closeModal);
    document.getElementById("cancel-modal-btn").addEventListener("click", closeModal);
    
    // Help Modal controllers
    const helpModal = document.getElementById("help-modal");
    const helpBtn = document.getElementById("help-btn");
    if (helpBtn) {
        helpBtn.addEventListener("click", () => {
            helpModal.style.display = "flex";
        });
    }
    
    const closeHelpModal = () => {
        helpModal.style.display = "none";
    };

    const closeHelpBtn = document.getElementById("close-help-modal-btn");
    if (closeHelpBtn) closeHelpBtn.addEventListener("click", closeHelpModal);
    
    const gotItHelpBtn = document.getElementById("got-it-help-btn");
    if (gotItHelpBtn) gotItHelpBtn.addEventListener("click", closeHelpModal);
    
    // Formula preset change
    document.getElementById("modal-formula-preset").addEventListener("change", (e) => {
        const group = document.getElementById("custom-formula-group");
        if (e.target.value === "custom") {
            group.classList.remove("hidden");
        } else {
            group.classList.add("hidden");
        }
    });

    // Add custom school form submit
    document.getElementById("add-school-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const schoolName = document.getElementById("modal-school-name").value;
        const majorName = document.getElementById("modal-major-name").value;
        const method = document.getElementById("modal-method").value;
        const formulaPreset = document.getElementById("modal-formula-preset").value;
        const customFormula = document.getElementById("modal-custom-formula-text").value;
        const benchmark = document.getElementById("modal-benchmark").value;
        const ieltsConverted = document.getElementById("modal-ielts-converted").value;

        const newSchool = {
            id: Date.now().toString(),
            school: schoolName,
            major: majorName,
            method: method,
            formula_preset: formulaPreset,
            custom_formula: formulaPreset === "custom" ? customFormula : "",
            benchmark: benchmark,
            ielts_converted: ieltsConverted
        };

        appState.customSchools.push(newSchool);
        saveStateToStorage();
        renderComparisonTable();
        closeModal();
    });

    // AI Quick Scan run button
    document.getElementById("run-ai-scan-btn").addEventListener("click", runAIQuickScan);
    
    // Search & Filter
    document.getElementById("school-search").addEventListener("input", renderComparisonTable);
    document.getElementById("chance-filter").addEventListener("change", renderComparisonTable);
}

// ==========================================
// CALCULATIONS & GRADE FORMATTERS
// ==========================================
let calculatedAvgs = { math: 0, lit: 0, eng: 0 };

function recalculateGrades() {
    for (const sub of ["math", "lit", "eng"]) {
        const gr10 = appState.grades[sub][10] || 0;
        const gr11 = appState.grades[sub][11] || 0;
        const gr12 = appState.grades[sub][12] || 0;
        const avg = (gr10 + gr11 + gr12) / 3;
        calculatedAvgs[sub] = parseFloat(avg.toFixed(2));
        document.getElementById(`avg-${sub}`).innerText = avg.toFixed(2);
    }
    updateExamD01();
    generateAIEvaluation();
}

function updateExamD01() {
    const math = appState.exams.math || 0;
    const lit = appState.exams.lit || 0;
    const eng = appState.exams.eng || 0;
    const sum = math + lit + eng;
    document.getElementById("exam-d01").innerText = `${sum.toFixed(2)} điểm`;
}

function getIeltsConversion(preset, score) {
    const val = parseFloat(score);
    if (!val || val < 5.0) return 0;
    
    switch (preset) {
        case "math_lit_ielts":
        case "tmu_formula":
        case "three_subjects_average":
            // PTIT, TMU, AOF, UEB standard scale
            if (val >= 7.0) return 10.0;
            if (val >= 6.5) return 9.5;
            if (val >= 6.0) return 9.0;
            if (val >= 5.5) return 8.5;
            if (val >= 5.0) return 8.0;
            return 0;
            
        case "math_lit_eng_ielts_bonus":
            // HANU bonus points (added directly after computing standard grades)
            if (val >= 8.0) return 4.0;
            if (val >= 7.5) return 3.0;
            if (val >= 7.0) return 2.5;
            if (val >= 6.5) return 2.0;
            if (val >= 6.0) return 1.0;
            return 0;

        case "hvnh_formula":
            // HVNH scale
            if (val >= 7.5) return 10.0;
            if (val >= 7.0) return 9.75;
            if (val >= 6.5) return 9.5;
            if (val >= 6.0) return 9.0;
            if (val >= 5.5) return 8.5;
            return 0;

        case "ueh_formula":
            // UEH scale (max 20 points)
            if (val >= 7.0) return 20.0;
            if (val >= 6.5) return 18.0;
            if (val >= 6.0) return 15.0;
            if (val >= 5.5) return 10.0;
            return 0;

        default:
            return 9.5; // fallback
    }
}

function calculateAdmissionScore(school) {
    const ieltsVal = getIeltsConversion(school.formula_preset, appState.profile.ielts);
    const math = calculatedAvgs.math;
    const lit = calculatedAvgs.lit;
    const eng = calculatedAvgs.eng;
    const areaBonus = getAreaBonus(appState.profile.area);
    const schoolTypeBonus = appState.profile.schoolType === "special" ? 0.5 : 0; // standard bonus if specialized THPT

    switch (school.formula_preset) {
        case "math_lit_ielts":
            // PTIT, AOF, UEB: Toán HB + Văn HB + IELTS quy đổi + Điểm cộng KV
            return parseFloat((math + lit + ieltsVal + areaBonus).toFixed(2));
            
        case "math_lit_eng_ielts_bonus":
            // HANU: Toán HB + Văn HB + Anh HB*2 + Điểm khuyến khích IELTS + Điểm cộng KV (thang 40)
            const baseHanu = math + lit + (eng * 2);
            return parseFloat((baseHanu + ieltsVal + (areaBonus * 4/3)).toFixed(2));

        case "tmu_formula":
            // TMU: [(Toán HB * 2 + Văn HB + IELTS quy đổi) * 3/4] + Điểm cộng (KV + Loại trường)
            const baseTmu = (math * 2) + lit + ieltsVal;
            const schoolBonus = appState.profile.schoolType === "special" ? 0.5 : 0; // TMU cộng 0.5đ cho HS trường chuyên
            return parseFloat(((baseTmu * 3/4) + areaBonus + schoolBonus).toFixed(2));

        case "hvnh_formula":
            // HVNH: (TBC 3 môn học bạ * 1.5) + (IELTS quy đổi * 1.5) + Điểm cộng KV
            const tbc3 = (math + lit + eng) / 3;
            return parseFloat(((tbc3 * 1.5) + (ieltsVal * 1.5) + areaBonus).toFixed(2));

        case "three_subjects_average":
            // Standard sum of 3 subjects + IELTS conversion + KV
            return parseFloat((math + lit + eng + areaBonus).toFixed(2));

        case "ueh_formula":
            // UEH: (TBC 3 môn * 5) + Điểm IELTS (max 20) + Điểm học lực + Điểm trường chuyên (thang 100)
            const tbcUeh = (math + lit + eng) / 3;
            const transcriptComp = tbcUeh * 5; // max 50 points
            const ieltsComp = ieltsVal; // max 20 points
            // Determine academic rank component (HSG 3 years = 15, HSG 2 years = 10, HSG 1 year = 5, none = 0)
            // Since we don't have full GPA, we approximate based on average of Math, Lit, Eng
            let academicComp = 0;
            if (tbcUeh >= 8.5) academicComp = 15;
            else if (tbcUeh >= 8.0) academicComp = 10;
            else if (tbcUeh >= 7.0) academicComp = 5;
            
            const schoolTypeComp = appState.profile.schoolType === "special" ? 10 : 0; // specialized THPT gets 10 points in UEH
            
            return parseFloat((transcriptComp + ieltsComp + academicComp + schoolTypeComp).toFixed(2));

        default:
            // Custom or unknown formulas: fallback to simple sum of math + lit + ielts
            return parseFloat((math + lit + ieltsVal + areaBonus).toFixed(2));
    }
}

function getAreaBonus(area) {
    if (area === "KV1") return 0.75;
    if (area === "KV2-NT") return 0.5;
    if (area === "KV2") return 0.25;
    return 0; // KV3
}

// ==========================================
// RENDER & FILTER DATA
// ==========================================
function renderComparisonTable() {
    const searchVal = document.getElementById("school-search").value.toLowerCase();
    const chanceVal = document.getElementById("chance-filter").value;
    const tbody = document.getElementById("comparison-table-body");
    tbody.innerHTML = "";

    const combinedList = [...DEFAULT_SCHOOLS, ...appState.customSchools];
    let matchCount = 0;

    combinedList.forEach(school => {
        const studentScore = calculateAdmissionScore(school);
        const chance = evaluateChance(studentScore, school.benchmark);
        
        // Search filter
        const matchesSearch = school.school.toLowerCase().includes(searchVal) || 
                              school.major.toLowerCase().includes(searchVal) ||
                              school.method.toLowerCase().includes(searchVal);
        
        // Chance filter
        const matchesChance = chanceVal === "all" || chance === chanceVal;

        if (matchesSearch && matchesChance) {
            matchCount++;
            const tr = document.createElement("tr");
            
            // Format calculated score display
            let scoreClass = "";
            let chanceClass = "";
            let chanceText = "";
            
            if (chance === "safe") {
                chanceClass = "chance-safe";
                chanceText = "An toàn";
            } else if (chance === "challenge") {
                chanceClass = "chance-challenge";
                chanceText = "Thử thách";
            } else {
                chanceClass = "chance-risky";
                chanceText = "Rủi ro";
            }
            
            // Custom formula display name
            let formulaName = "";
            if (school.formula_preset === "math_lit_ielts") formulaName = "Toán + Văn + IELTS quy đổi";
            else if (school.formula_preset === "math_lit_eng_ielts_bonus") formulaName = "Toán + Văn + Anh x 2 + Cộng IELTS";
            else if (school.formula_preset === "tmu_formula") formulaName = "(Toán x 2 + Văn + IELTS) x 3/4 + Cộng";
            else if (school.formula_preset === "hvnh_formula") formulaName = "Học bạ x 1.5 + IELTS x 1.5 + Cộng";
            else if (school.formula_preset === "three_subjects_average") formulaName = "Toán + Văn + Anh + Cộng";
            else if (school.formula_preset === "ueh_formula") formulaName = "Học bạ + IELTS + Học lực + Trường chuyên (Thang 100)";
            else formulaName = school.custom_formula || "Công thức riêng";

            const ieltsDisplay = getIeltsDisplay(school, appState.profile.ielts);

            tr.innerHTML = `
                <td><strong>${school.school}</strong></td>
                <td>${school.major}</td>
                <td><span class="badge badge-secondary">${school.method}</span></td>
                <td><span class="text-muted" style="font-size: 0.75rem;">${formulaName}</span></td>
                <td class="text-center"><strong>${ieltsDisplay}</strong></td>
                <td class="text-center highlight-col" style="font-size: 0.95rem;">${studentScore.toFixed(2)}</td>
                <td class="text-center"><strong>${school.benchmark}</strong></td>
                <td class="text-center">
                    <span class="chance-tag ${chanceClass}">${chanceText}</span>
                </td>
                <td class="text-center">
                    ${isCustom(school.id) ? 
                      `<button class="icon-btn-small delete-btn" data-id="${school.id}" title="Xóa ngành này"><i data-lucide="trash-2"></i></button>` : 
                      `<span class="text-muted">-</span>`
                    }
                </td>
            `;
            tbody.appendChild(tr);
        }
    });

    if (matchCount === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center text-muted" style="padding: 30px;">
                    Không tìm thấy ngành/trường nào khớp với bộ lọc của bạn.
                </td>
            </tr>
        `;
    }

    // Re-initialize trash bin icons and tooltips
    lucide.createIcons();
    
    // Bind delete actions
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = btn.getAttribute("data-id");
            appState.customSchools = appState.customSchools.filter(s => s.id !== id);
            saveStateToStorage();
            renderComparisonTable();
        });
    });

    updateRegistryStrategy(combinedList);
}

function isCustom(id) {
    return appState.customSchools.some(s => s.id === id);
}

function getIeltsDisplay(school, ieltsScore) {
    const val = getIeltsConversion(school.formula_preset, ieltsScore);
    if (school.formula_preset === "math_lit_eng_ielts_bonus") {
        return val > 0 ? `+${val.toFixed(1)}đ` : "Không cộng";
    }
    return val > 0 ? `${val.toFixed(1)}đ` : "Không đủ đk";
}

function evaluateChance(studentScore, benchmarkString) {
    // Parse benchmark (could be single number like "26.80" or range like "24.50 - 25.50" or range with tilde "~33.0 - 35.0")
    let targetMin = 0;
    
    const cleanStr = benchmarkString.replace("~", "").replace(/\(.*\)/, "").trim();
    if (cleanStr.includes("-")) {
        const parts = cleanStr.split("-");
        targetMin = parseFloat(parts[parts.length - 1].trim()); // use the higher end of the range
    } else {
        targetMin = parseFloat(cleanStr);
    }

    if (isNaN(targetMin) || targetMin === 0) return "challenge";

    // Compare
    if (studentScore >= targetMin + 0.5) return "safe";
    if (studentScore >= targetMin - 0.7) return "challenge";
    return "risky";
}

// ==========================================
// SMART REGISTRY STRATEGY SUGGESTIONS
// ==========================================
function updateRegistryStrategy(combinedList) {
    const listElement = document.getElementById("smart-registry-list");
    listElement.innerHTML = "";
    
    // Select all matched schools and evaluate them
    const calculatedSchools = combinedList.map(s => {
        const score = calculateAdmissionScore(s);
        const chance = evaluateChance(score, s.benchmark);
        return { ...s, score, chance };
    });

    // Group schools into categories
    const safeSchools = calculatedSchools.filter(s => s.chance === "safe");
    const challengeSchools = calculatedSchools.filter(s => s.chance === "challenge");
    const riskySchools = calculatedSchools.filter(s => s.chance === "risky");

    let itemsHtml = "";
    let wishIndex = 1;

    // We recommend 1 dream/risky choice as NV1 (if available), 
    // 1-2 challenging choices as NV2-NV3,
    // and 1-2 safe choices at the bottom.
    
    // 1. Dream aspiration (Risky / Challenge)
    if (riskySchools.length > 0) {
        const bestDream = riskySchools.sort((a,b) => b.score - a.score)[0];
        itemsHtml += createStrategyItem(wishIndex++, bestDream, "Nguyện vọng Thử thách (Ước mơ)", "Mặc dù điểm chuẩn năm ngoái cao hơn điểm của bạn, nhưng nếu đây là ngành bạn thích nhất, hãy cứ đặt làm NV1. Bạn không mất cơ hội ở các NV phía dưới nếu trượt ngành này.");
    }

    // 2. Challenging aspirations (Challenge)
    const challenges = challengeSchools.slice(0, 2);
    challenges.forEach(s => {
        itemsHtml += createStrategyItem(wishIndex++, s, "Nguyện vọng Vừa sức (Mục tiêu chính)", "Điểm của bạn đang sát nút so với điểm chuẩn năm ngoái. Đây là cơ hội tuyệt vời để đỗ vào ngành yêu thích nếu điểm chuẩn ổn định hoặc giảm nhẹ.");
    });

    // 3. Safe backup aspirations (Safe)
    const safes = safeSchools.slice(0, 2);
    safes.forEach(s => {
        itemsHtml += createStrategyItem(wishIndex++, s, "Nguyện vọng An toàn (Chốt đỗ)", "Điểm xét tuyển của bạn cao hơn hẳn điểm chuẩn năm ngoái. Đặt nguyện vọng này ở phía dưới để bảo đảm chắc chắn 100% đỗ đại học.");
    });

    if (itemsHtml === "") {
        listElement.innerHTML = `<p class="text-muted">Nhập thêm điểm số học bạ hoặc thêm các trường quan tâm ở Tab 2 để AI gợi ý danh sách nguyện vọng tối ưu cho bạn.</p>`;
    } else {
        listElement.innerHTML = itemsHtml;
    }
}

function createStrategyItem(index, school, tag, advice) {
    let icon = "shield-alert";
    let borderClass = "";
    let tagColorClass = "";
    if (school.chance === "safe") {
        icon = "shield-check";
        borderClass = "style='border-left: 4px solid var(--color-emerald);'";
        tagColorClass = "text-emerald";
    } else if (school.chance === "challenge") {
        icon = "alert-circle";
        borderClass = "style='border-left: 4px solid var(--color-amber);'";
        tagColorClass = "text-amber";
    } else {
        icon = "sparkles";
        borderClass = "style='border-left: 4px solid var(--color-secondary);'";
        tagColorClass = "text-violet";
    }

    return `
        <div class="suggestion-card" ${borderClass}>
            <div class="suggestion-details">
                <h4>Nguyện vọng ${index}: ${school.school} - <span class="gradient-text">${school.major}</span></h4>
                <p class="mt-1">${advice}</p>
                <div class="mt-2" style="font-size: 0.7rem; display: flex; gap: 10px; align-items: center;">
                    <span class="badge badge-primary">${school.method}</span>
                    <span>Điểm xét tuyển của bạn: <strong>${school.score.toFixed(2)}</strong></span>
                    <span>Điểm chuẩn: <strong>${school.benchmark}</strong></span>
                </div>
            </div>
            <div class="alert-icon ${tagColorClass}"><i data-lucide="${icon}"></i></div>
        </div>
    `;
}

// ==========================================
// LOCAL RULE-BASED EVALUATION (NO API KEY)
// ==========================================
function getLocalEvaluation() {
    const ielts = parseFloat(appState.profile.ielts);
    const math = calculatedAvgs.math;
    const lit = calculatedAvgs.lit;
    const eng = calculatedAvgs.eng;
    const scoreD01 = math + lit + eng;

    let evalText = `<p>Chào <strong>${appState.profile.name}</strong>, dựa vào học bạ cấp 3 trường <strong>${appState.profile.school}</strong> và chứng chỉ <strong>IELTS ${appState.profile.ielts}</strong>, EduMatch AI phân tích hồ sơ của bạn như sau:</p><br>`;
    
    // 1. Strength evaluation
    evalText += `<p><i data-lucide="sparkles" class="text-violet" style="display:inline-block; vertical-align:middle; width:16px;"></i> <strong>Đánh giá thế mạnh học bạ:</strong> `;
    if (math >= 8.0 && eng >= 8.5) {
        evalText += `Bạn học rất tốt các môn Tự nhiên và Ngoại ngữ (Toán học bạ đạt ${math}, Tiếng Anh đạt ${eng}). Điều này cực kỳ có lợi khi xét tuyển vào khối ngành Kinh tế, Marketing hoặc Công nghệ thông tin của các trường Top đầu.`;
    } else if (lit >= 8.5 && eng >= 8.5) {
        evalText += `Thế mạnh vượt trội của bạn nằm ở các môn Xã hội và Ngoại ngữ (Văn đạt ${lit}, Anh đạt ${eng}). Hãy tập trung vào các khối ngành Truyền thông, Báo chí, Ngôn ngữ hoặc Marketing tại các trường như HANU, PTIT.`;
    } else {
        evalText += `Học bạ của bạn ở mức Khá tốt (TBC Toán: ${math}, Văn: ${lit}, Anh: ${eng}). Đây là nền tảng tốt để nộp hồ sơ xét tuyển sớm kết hợp IELTS.`;
    }
    evalText += `</p><br>`;

    // 2. IELTS advantage evaluation
    evalText += `<p><i data-lucide="award" class="text-emerald" style="display:inline-block; vertical-align:middle; width:16px;"></i> <strong>Lợi thế chứng chỉ ngoại ngữ:</strong> `;
    if (ielts >= 6.5) {
        evalText += `Chứng chỉ <strong>IELTS ${appState.profile.ielts}</strong> là một lợi thế cạnh tranh cực kỳ lớn của bạn. Khi quy đổi sang điểm xét tuyển học bạ, hầu hết các trường (PTIT, TMU, HVNH...) đều quy đổi IELTS 6.5 thành <strong>9.5 điểm</strong> môn Ngoại ngữ. Ở Đại học Hà Nội (HANU), bạn được cộng thẳng <strong>2.0 điểm khuyến khích</strong> vào tổng điểm xét tuyển (thang 40). Đây chính là chiếc phao cứu sinh bù đắp cho điểm thi tốt nghiệp THPT nếu chưa như ý.`;
    } else if (ielts >= 5.5) {
        evalText += `Với chứng chỉ <strong>IELTS ${appState.profile.ielts}</strong>, bạn đã đủ điều kiện nộp hồ sơ xét tuyển sớm tại tất cả các trường trong danh sách (yêu cầu tối thiểu 5.5). Điểm quy đổi của bạn dao động quanh mức 8.5 - 9.0 điểm ngoại ngữ tùy trường.`;
    } else {
        evalText += `Hồ sơ chưa cập nhật chứng chỉ IELTS hoặc mức IELTS dưới 5.5. Hãy cố gắng ôn luyện và đạt tối thiểu IELTS 5.5 để mở cánh cửa xét tuyển học bạ kết hợp cực kỳ rộng mở này.`;
    }
    evalText += `</p><br>`;

    // 3. Recommended strategy
    evalText += `<p><i data-lucide="compass" class="text-violet" style="display:inline-block; vertical-align:middle; width:16px;"></i> <strong>Lời khuyên định hướng:</strong> `;
    if (ielts >= 6.5) {
        evalText += `Bạn nên tập trung 100% cơ hội vào <strong>Phương thức xét tuyển sớm (học bạ kết hợp IELTS)</strong> tại các trường như Học viện Bưu chính Viễn thông (PTIT), Đại học Thương mại (TMU) hoặc Đại học Hà Nội (HANU). Điểm học bạ của bạn rất tốt sẽ giúp bạn dễ dàng nằm trong nhóm an toàn của các trường này trước khi kỳ thi tốt nghiệp chính thức bắt đầu. Đừng lo lắng về điểm tốt nghiệp THPT nữa, chỉ cần ôn tập vừa đủ để đạt điều kiện đỗ tốt nghiệp là chắc suất vào Đại học!`;
    } else {
        evalText += `Hãy tận dụng điểm học bạ tốt của 3 năm học để xét học bạ độc lập, song song với việc nâng cao điểm chứng chỉ ngoại ngữ để mở thêm cơ hội xét tuyển kết hợp.`;
    }
    evalText += `</p>`;

    return evalText;
}

// ==========================================
// GEMINI AI INTEGRATION (CLIENT-SIDE)
// ==========================================
async function generateAIEvaluation(force = false) {
    const textContainer = document.getElementById("profile-evaluation-text");
    const isLoggedIn = !!appState.user;

    if (!isLoggedIn) {
        // Fallback to local rule-based engine if not logged in
        let localEval = getLocalEvaluation();
        localEval += `<br><div class="alert-box alert-success mt-2" style="background: rgba(99,102,241,0.08); border: 1px dashed rgba(99,102,241,0.3);">
            <div class="alert-icon text-violet"><i data-lucide="sparkles"></i></div>
            <div class="alert-text" style="font-size: 0.75rem;">
                <strong>Mở khóa AI:</strong> Hãy <strong>Đăng nhập Google</strong> ở góc trên bên phải để kích hoạt Trợ lý AI phân tích sâu sắc hơn.
            </div>
        </div>`;
        textContainer.innerHTML = localEval;
        lucide.createIcons();
        return;
    }

    if (!force && textContainer.innerHTML !== "Đang tải đánh giá hồ sơ...") {
        return; // Avoid multiple calls if not forced
    }

    textContainer.innerHTML = `
        <div class="spinner-container">
            <div class="spinner"></div>
            <span>Trí tuệ nhân tạo Gemini đang phân tích hồ sơ và đưa ra lời khuyên cá nhân hóa...</span>
        </div>
    `;

    const prompt = `
    Bạn là một chuyên gia tư vấn tuyển sinh đại học hàng đầu tại Việt Nam. 
    Hãy viết một bài phân tích đánh giá chi tiết (khoảng 3 đoạn văn ngắn, định dạng HTML có sử dụng các thẻ <p>, <strong> để làm nổi bật thông tin) dành cho học sinh có thông tin sau:
    - Họ tên: ${appState.profile.name}
    - Trường THPT: ${appState.profile.school} (${appState.profile.schoolType === 'special' ? 'Trường chuyên/chất lượng cao' : 'Trường thường'})
    - Khu vực: ${appState.profile.area}
    - Chứng chỉ: IELTS ${appState.profile.ielts}
    - Điểm trung bình học bạ Toán: ${calculatedAvgs.math}, Văn: ${calculatedAvgs.lit}, Anh: ${calculatedAvgs.eng}
    - Điểm thi tốt nghiệp THPT dự kiến/đã có: Toán ${appState.exams.math}, Văn ${appState.exams.lit}, Anh ${appState.exams.eng}, Sử ${appState.exams.his} (Tổng tổ hợp D01: ${appState.exams.math + appState.exams.lit + appState.exams.eng})

    Yêu cầu phân tích:
    1. Đánh giá thế mạnh học bạ cấp 3 (Toán, Văn, Anh) và sự tăng tiến điểm số qua các năm.
    2. Đánh giá lợi thế quy đổi của chứng chỉ IELTS (IELTS ${appState.profile.ielts}) tại các trường top đầu và làm rõ nó giúp bù đắp điểm thi tốt nghiệp như thế nào.
    3. Đưa ra chiến lược đăng ký nguyện vọng cụ thể (nên đặt trường nào làm NV1, NV2 dựa trên cơ hội đỗ học bạ kết hợp IELTS). Hãy xưng hô thân mật là "bạn" hoặc "con", giọng văn truyền cảm hứng, chuyên nghiệp của chuyên gia UI-UX nói chuyện với Gen Z/Alpha.
    Hãy trả về duy nhất chuỗi nội dung chứa các thẻ HTML, không cần bọc trong block code \`\`\`html.
    `;

    try {
        // Call via Developer's Serverless Proxy (since user is logged in with Google)
        const response = await fetch(`/api/gemini`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            let resText = data.candidates[0].content.parts[0].text;
            // Clean code blocks if LLM returns them
            resText = resText.replace(/```html/g, "").replace(/```/g, "").trim();
            textContainer.innerHTML = resText;
        } else if (data.error) {
            throw new Error(data.error);
        } else {
            throw new Error("Không thể phân tích dữ liệu trả về");
        }
    } catch (e) {
        console.error("Gemini API call failed, falling back to local engine:", e);
        textContainer.innerHTML = getLocalEvaluation() + `<br><p class="text-muted" style="font-size: 0.75rem;"><i data-lucide="info"></i> Lỗi kết nối Trợ lý AI (${e.message}). Đã tải phân tích từ bộ máy cục bộ.</p>`;
    }
    lucide.createIcons();
}

async function runAIQuickScan() {
    const isLoggedIn = !!appState.user;

    if (!isLoggedIn) {
        alert("Vui lòng Đăng nhập bằng Google ở góc trên bên phải để sử dụng tính năng quét tự động bằng AI!");
        return;
    }

    const docText = document.getElementById("ai-scan-text").value.trim();
    if (!docText) {
        alert("Vui lòng dán nội dung tuyển sinh của trường vào ô văn bản!");
        return;
    }

    const loader = document.getElementById("ai-scan-loading");
    loader.classList.remove("hidden");

    const prompt = `
    Đọc đoạn thông tin tuyển sinh sau và trích xuất thông tin để trả về một JSON duy nhất phù hợp với biểu mẫu sau:
    {
      "school": "Tên trường đầy đủ và ký hiệu viết tắt trong ngoặc, ví dụ: Học viện Công nghệ Bưu chính Viễn thông (PTIT)",
      "major": "Tên ngành học muốn xét tuyển",
      "method": "Tên phương thức xét tuyển ngắn gọn",
      "formula_preset": "Chọn 1 trong các khóa sau: 'math_lit_ielts', 'math_lit_eng_ielts_bonus', 'tmu_formula', 'hvnh_formula', 'three_subjects_average', 'ueh_formula'",
      "benchmark": "Điểm chuẩn năm trước (nếu không có thì đoán hoặc ước lượng hoặc để trống)",
      "ielts_converted": "Điểm quy đổi hoặc điểm cộng dành cho chứng chỉ IELTS 6.5 của trường này, ví dụ: '9.5' hoặc 'Cộng 2.0đ'"
    }

    Văn bản tuyển sinh:
    """
    ${docText}
    """

    Yêu cầu trả về DUY NHẤT một chuỗi định dạng JSON hợp lệ để parsed bằng JSON.parse(). Không bao gồm block code.
    `;

    try {
        // Serverless Proxy call
        const response = await fetch(`/api/gemini`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompt })
        });

        const data = await response.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            let resText = data.candidates[0].content.parts[0].text;
            resText = resText.replace(/```json/g, "").replace(/```/g, "").trim();
            
            const parsed = JSON.parse(resText);
            
            // Populate form
            document.getElementById("modal-school-name").value = parsed.school || "";
            document.getElementById("modal-major-name").value = parsed.major || "";
            document.getElementById("modal-method").value = parsed.method || "";
            document.getElementById("modal-formula-preset").value = parsed.formula_preset || "math_lit_ielts";
            document.getElementById("modal-benchmark").value = parsed.benchmark || "";
            document.getElementById("modal-ielts-converted").value = parsed.ielts_converted || "9.5";
            
            // Trigger select change layout
            document.getElementById("modal-formula-preset").dispatchEvent(new Event("change"));
            
            alert("Đã tự động điền form thành công bằng AI! Hãy kiểm tra lại và ấn 'Lưu lại'.");
        } else if (data.error) {
            throw new Error(data.error);
        } else {
            throw new Error("Trích xuất thông tin thất bại");
        }
    } catch (e) {
        console.error("AI scanning error:", e);
        alert("Lỗi AI: Không thể đọc hiểu văn bản này (" + e.message + "). Vui lòng nhập thông tin thủ công!");
    } finally {
        loader.classList.add("hidden");
    }
}

// ==========================================
// GOOGLE SIGN-IN HANDLER
// ==========================================
window.handleCredentialResponse = function(response) {
    const responsePayload = decodeJwt(response.credential);
    
    appState.user = {
        name: responsePayload.name,
        email: responsePayload.email,
        picture: responsePayload.picture
    };
    
    // Update profile state with Google name if not modified
    if (appState.profile.name === "Lê Linh") {
        appState.profile.name = responsePayload.name;
        document.getElementById("student-name").value = responsePayload.name;
    }
    
    saveStateToStorage();
    showUserWidget();
    recalculateGrades();
};

function showUserWidget() {
    if (appState.user) {
        document.getElementById("google-auth-container").classList.add("hidden");
        const widget = document.getElementById("user-widget");
        widget.classList.remove("hidden");
        
        document.getElementById("user-avatar").src = appState.user.picture;
        document.getElementById("user-name").innerText = appState.user.name;
        
        // Setup logout btn
        document.getElementById("logout-btn").onclick = () => {
            appState.user = null;
            saveStateToStorage();
            document.getElementById("user-widget").classList.add("hidden");
            document.getElementById("google-auth-container").classList.remove("hidden");
        };
    }
}

// Helper to decode base64 JWT client-side
function decodeJwt(token) {
    try {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Error decoding JWT:", e);
        return {};
    }
}

// Ensure user widget remains active if logged in before reload
if (appState.user) {
    window.addEventListener("load", showUserWidget);
}
