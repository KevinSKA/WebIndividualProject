document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cvForm");

    const addJobBtn = document.getElementById("addJobBtn");
    const addEducationBtn = document.getElementById("addEducationBtn");
    const addSkillBtn = document.getElementById("addSkillBtn");

    function addRemoveButton(type, container) {
        const oldBtn = container.querySelector(".remove-section-btn");
        if (oldBtn) oldBtn.remove();

        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = `Remove ${type.charAt(0).toUpperCase() + type.slice(1)}`;
        btn.className = "remove-section-btn";

        btn.addEventListener("click", () => {
            const allOfType = form.querySelectorAll("." + type);
            if (allOfType.length > 1) {
                container.remove();
            } else {
                alert(`You must have at least one ${type} section.`);
            }
        });

        container.appendChild(btn);
    }

    const firstEmployment = form.querySelector(".employment");
    if (firstEmployment) addRemoveButton("employment", firstEmployment);

    const firstEducation = form.querySelector(".education");
    if (firstEducation) addRemoveButton("education", firstEducation);

    const firstSkill = form.querySelector(".skills");
    if (firstSkill) addRemoveButton("skills", firstSkill);

    addJobBtn.addEventListener("click", () => addSection("employment"));
    addEducationBtn.addEventListener("click", () => addSection("education"));
    addSkillBtn.addEventListener("click", () => addSection("skills"));

    function addSection(type) {
        let container = document.createElement("div");
        container.classList.add(type);

        if (type === "employment") {
            container.innerHTML = `
                <fieldset>
                  <legend>Employment</legend>
                  <label>Job Title:</label>
                  <input type="text" name="jobTitle" placeholder="e.g. Backend Developer">
                  <label>Company Name:</label>
                  <input type="text" name="companyName" placeholder="e.g. Google">
                  <label>Start Date:</label>
                  <input type="month" name="jobStart">
                  <label>End Date:</label>
                  <input type="month" name="jobEnd">
                  <label>Location:</label>
                  <input type="text" name="jobLocation" placeholder="e.g. Beirut">
                </fieldset>`;
        }

        if (type === "education") {
            container.innerHTML = `
                <fieldset>
                  <legend>Education</legend>
                  <label>Institution:</label>
                  <input type="text" name="schoolName" placeholder="e.g. Usek">
                  <label>Degree / Major:</label>
                  <input type="text" name="degree" placeholder="e.g. Computer Engineering">
                  <label>Start Date:</label>
                  <input type="month" name="eduStart">
                  <label>End Date:</label>
                  <input type="month" name="eduEnd">
                  <label>Location:</label>
                  <input type="text" name="eduLocation" placeholder="e.g. Jounieh">
                </fieldset>`;
        }

        if (type === "skills") {
            container.innerHTML = `
                <fieldset>
                  <legend>Skill</legend>
                  <label>Skill Name:</label>
                  <input type="text" name="skillName" placeholder="e.g. Java">
                  <label>Level:</label>
                  <select name="skillLevel">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                </fieldset>`;
        }

        addRemoveButton(type, container);

        let insertBeforeEl;
        if (type === "employment") insertBeforeEl = addJobBtn;
        else if (type === "education") insertBeforeEl = addEducationBtn;
        else insertBeforeEl = addSkillBtn;

        insertBeforeEl.before(container);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const reader = new FileReader();
        const photoFile = document.getElementById("profilePhoto").files[0];

        reader.onloadend = function () {
            const cvData = {
                personalInfo: {
                    fullName: form.fullName.value,
                    jobTitle: form.jobTitle.value,
                    address: form.address.value,
                    phone: form.phone.value,
                    email: form.email.value,
                    dob: form.dob.value,
                    photo: reader.result || null,
                },
                profile: form.profile.value,
                employment: [...form.querySelectorAll(".employment")].map(div => ({
                    title: div.querySelector('input[name="jobTitle"]').value,
                    company: div.querySelector('input[name="companyName"]').value,
                    start: div.querySelector('input[name="jobStart"]').value,
                    end: div.querySelector('input[name="jobEnd"]').value,
                    location: div.querySelector('input[name="jobLocation"]').value,
                })),
                education: [...form.querySelectorAll(".education")].map(div => ({
                    school: div.querySelector('input[name="schoolName"]').value,
                    degree: div.querySelector('input[name="degree"]').value,
                    start: div.querySelector('input[name="eduStart"]').value,
                    end: div.querySelector('input[name="eduEnd"]').value,
                    location: div.querySelector('input[name="eduLocation"]').value,
                })),
                skills: [...form.querySelectorAll(".skills")].map(div => ({
                    name: div.querySelector('input[name="skillName"]').value,
                    level: div.querySelector('select[name="skillLevel"]').value,
                })),
            };

            const certFiles = document.getElementById("certificates").files;
            const certPromises = [...certFiles].map(file => {
                return new Promise((resolve) => {
                    const fr = new FileReader();
                    fr.onload = () => resolve({ name: file.name, data: fr.result });
                    fr.readAsDataURL(file);
                });
            });

            Promise.all(certPromises).then(certificates => {
                cvData.certificates = certificates;
                localStorage.setItem("cvData", JSON.stringify(cvData));
                window.location.href = "cv-preview.html";
            });
        };

        if (photoFile) reader.readAsDataURL(photoFile);
        else reader.onloadend();
    });
});
