/**
 * ===================================================================
 * DHRUVA CLUB — MULTI-STEP TEST APPLICATION LOGIC
 * ===================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const config = window.DHRUVA_CONFIG;

  if (!config) {
    console.error("Configuration not loaded from content.js!");
    return;
  }

  // Application State
  let currentStepIndex = 0;
  const totalSteps = config.steps.length;
  const formData = {
    personal: {},
    answers: {}
  };

  // DOM Elements
  const brandHeader = document.getElementById("brandHeader");
  const clubBadge = document.getElementById("clubBadge");
  const clubName = document.getElementById("clubName");

  const clubTagline = document.getElementById("clubTagline");
  const aboutToggleBtn = document.getElementById("aboutToggleBtn");
  const aboutContent = document.getElementById("aboutContent");
  const aboutShortDesc = document.getElementById("aboutShortDesc");
  const aboutPillars = document.getElementById("aboutPillars");

  const stepCountLabel = document.getElementById("stepCountLabel");
  const stepPercentLabel = document.getElementById("stepPercentLabel");
  const progressBarFill = document.getElementById("progressBarFill");
  const stepDotsContainer = document.getElementById("stepDotsContainer");
  const stepsContainer = document.getElementById("stepsContainer");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const toastContainer = document.getElementById("toastContainer");

  // ===================================================================
  // 1. INITIALIZE BRANDING & ABOUT ACCORDION
  // ===================================================================
  function initBranding() {
    if (config.club) {
      if (clubBadge && config.club.badge) clubBadge.textContent = config.club.badge;
      if (clubName && config.club.name) clubName.textContent = config.club.name;

      if (clubTagline && config.club.tagline) clubTagline.textContent = config.club.tagline;

      if (config.club.about) {
        if (aboutShortDesc) aboutShortDesc.textContent = config.club.about.shortDescription;
        if (aboutPillars && config.club.about.pillars) {
          aboutPillars.innerHTML = config.club.about.pillars.map(p => `
            <div class="pillar-card">
              <h4>${p.title}</h4>
              <p>${p.desc}</p>
            </div>
          `).join("");
        }
      }
    }

    // Toggle About Section
    if (aboutToggleBtn && aboutContent) {
      aboutToggleBtn.addEventListener("click", () => {
        const isOpen = aboutContent.classList.contains("open");
        aboutContent.classList.toggle("open", !isOpen);
        aboutToggleBtn.classList.toggle("active", !isOpen);
        aboutToggleBtn.setAttribute("aria-expanded", String(!isOpen));
      });
    }
  }

  // ===================================================================
  // 2. RENDER STEPPER DOTS & PROGRESS BAR
  // ===================================================================
  function initStepper() {
    stepDotsContainer.innerHTML = "";
    config.steps.forEach((step, idx) => {
      const dotItem = document.createElement("div");
      dotItem.className = `step-dot-item ${idx === 0 ? "active" : ""}`;
      dotItem.id = `step-dot-item-${idx}`;

      const shortName = step.isPersonalDetails
        ? "Profile"
        : (step.isCommunityJoining ? "Community" : (step.dimension ? step.dimension.toUpperCase() : `Part ${idx}`));

      dotItem.innerHTML = `
        <div class="step-dot">${idx + 1}</div>
        <span class="step-dot-name">${shortName}</span>
      `;
      stepDotsContainer.appendChild(dotItem);
    });
    updateProgressUI();
  }

  function updateProgressUI() {
    const percent = Math.round(((currentStepIndex) / (totalSteps - 1)) * 100);
    if (stepCountLabel) {
      stepCountLabel.textContent = `Step ${currentStepIndex + 1} of ${totalSteps}`;
    }
    if (stepPercentLabel) {
      stepPercentLabel.textContent = `${percent}% Completed`;
    }
    if (progressBarFill) {
      progressBarFill.style.width = `${percent}%`;
    }

    // Update Dots
    config.steps.forEach((_, idx) => {
      const dotItem = document.getElementById(`step-dot-item-${idx}`);
      if (!dotItem) return;
      dotItem.classList.remove("active", "completed");
      if (idx === currentStepIndex) {
        dotItem.classList.add("active");
      } else if (idx < currentStepIndex) {
        dotItem.classList.add("completed");
      }
    });

    // Update Navigation Buttons
    if (prevBtn) {
      prevBtn.style.visibility = currentStepIndex === 0 ? "hidden" : "visible";
    }
    if (nextBtn) {
      const isLastStep = currentStepIndex === totalSteps - 1;
      const btnText = nextBtn.querySelector(".btn-text");
      if (btnText) {
        if (currentStepIndex === 0) {
          btnText.textContent = "Save & Continue";
        } else if (isLastStep) {
          btnText.textContent = "Submit & View Results";
        } else {
          btnText.textContent = "Continue";
        }
      }
    }
  }

  // ===================================================================
  // 3. RENDER FORM STEPS
  // ===================================================================
  function renderStepViews() {
    stepsContainer.innerHTML = "";

    config.steps.forEach((step, stepIndex) => {
      const stepView = document.createElement("div");
      stepView.className = `step-view ${stepIndex === 0 ? "active" : ""}`;
      stepView.id = `step-view-${stepIndex}`;

      // Header for this step
      let categoryPill = step.category
        ? `<div class="step-category-pill">${step.category}</div>`
        : (step.isPersonalDetails ? `<div class="step-category-pill">Registration</div>` : "");

      let headerHtml = `
        <div class="step-view-header">
          ${categoryPill}
          <h2 class="step-title">${step.title}</h2>
          <p class="step-subtitle">${step.subtitle || ""}</p>
        </div>
      `;

      let bodyHtml = "";

      if (step.isPersonalDetails && step.fields) {
        // Render Personal Registration Fields
        bodyHtml = `<div class="personal-grid">`;
        step.fields.forEach(field => {
          const isFullWidth = field.name === "fullName" || field.name === "email" || field.name === "collegeEmail";
          const fieldClass = isFullWidth ? "grid-full-width" : "";

          if (field.type === "radio" && field.name === "gender") {
            bodyHtml += `
              <div class="form-group ${fieldClass}">
                <label class="form-label">${field.label} ${field.required ? '<span class="req-star">*</span>' : ''}</label>
                <div class="gender-radio-group">
                  ${field.options.map(opt => `
                    <label class="gender-radio-card" data-gender="${opt}">
                      <input type="radio" name="gender" value="${opt}" ${field.required ? 'required' : ''}>
                      <span>${opt === 'Male' ? '👨 Male' : '👩 Female'}</span>
                    </label>
                  `).join('')}
                </div>
                <span class="error-msg" id="error-${field.name}">Please select your gender</span>
              </div>
            `;
          } else if (field.type === "select") {
            const hasOther = field.hasOtherInput || (field.options && field.options.includes("Other"));
            const otherHtml = hasOther ? `
              <div class="other-input-wrap" id="${field.name}_other_wrap" style="display: none; margin-top: 8px;">
                <label class="form-label-sub" for="${field.name}_other" style="font-size:0.78rem;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:4px;">Specify ${field.label}:</label>
                <input 
                  type="text" 
                  class="form-input other-text-input" 
                  id="${field.name}_other" 
                  name="${field.name}_other" 
                  placeholder="${field.otherPlaceholder || `Please specify ${field.label.toLowerCase()}`}"
                >
              </div>
            ` : "";

            bodyHtml += `
              <div class="form-group ${fieldClass}">
                <label class="form-label" for="${field.name}">${field.label} ${field.required ? '<span class="req-star">*</span>' : ''}</label>
                <select class="form-select ${hasOther ? 'select-with-other' : ''}" id="${field.name}" name="${field.name}" ${field.required ? 'required' : ''}>
                  <option value="" disabled selected>Select ${field.label}</option>
                  ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                </select>
                ${otherHtml}
                <span class="error-msg" id="error-${field.name}">Please select an option</span>
              </div>
            `;
          } else {
            bodyHtml += `
              <div class="form-group ${fieldClass}">
                <label class="form-label" for="${field.name}">${field.label} ${field.required ? '<span class="req-star">*</span>' : ''}</label>
                <input 
                  type="${field.type}" 
                  class="form-input" 
                  id="${field.name}" 
                  name="${field.name}" 
                  placeholder="${field.placeholder || ''}" 
                  ${field.pattern ? `pattern="${field.pattern}"` : ''}
                  ${field.required ? 'required' : ''}
                >
                <span class="error-msg" id="error-${field.name}">Please enter valid ${field.label}</span>
              </div>
            `;
          }
        });
        bodyHtml += `</div>`;
      } else if (step.questions) {
        // Render MCQ Questions
        bodyHtml = `<div class="questions-list">`;
        step.questions.forEach((q, qIndex) => {
          let imageHtml = "";
          if (q.image) {
            imageHtml = `
              <div class="question-media">
                <img src="${q.image}" class="question-img" alt="Question illustration" loading="lazy">
              </div>
            `;
          }

          bodyHtml += `
            <div class="question-block" id="block-${q.id}">
              <div class="question-header">
                <span class="question-num-badge">Q${qIndex + 1}</span>
                <p class="question-text">${q.question}</p>
              </div>
              ${imageHtml}
              <div class="options-grid">
                ${q.options.map((opt, optIdx) => `
                  <label class="option-card" data-qid="${q.id}" data-optindex="${optIdx}">
                    <input type="radio" name="${q.id}" value="${opt.replace(/"/g, '&quot;')}" required>
                    <div class="option-indicator"></div>
                    <span class="option-label-text">${opt}</span>
                  </label>
                `).join('')}
              </div>
            </div>
          `;
        });
        bodyHtml += `</div>`;
      } else if (step.isCommunityJoining) {
        // Render WhatsApp Community Joining Card & Confirmation Checkboxes
        bodyHtml = `
          <div class="community-join-container">
            <div class="community-hero-card">
              <div class="community-group-badge" id="communityGenderBadge">Official Student Community</div>
              <h3 class="community-hero-title">${step.cardTitle || "Dhruva Club Official Student Community"}</h3>
              <p class="community-hero-desc">
                ${step.cardDescription || "Be a part of an empowering community of students committed to character, competence, and holistic growth."}
              </p>
              <a href="#" id="communityWhatsAppBtn" target="_blank" rel="noopener noreferrer" class="community-whatsapp-cta">
                <svg class="community-whatsapp-icon" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>${step.buttonLabel || "Join Official WhatsApp Group"}</span>
              </a>
              <p class="community-cta-note">Click the button above to join before making your selection below.</p>
            </div>

            <div class="community-status-section">
              <div class="section-instruction-header">
                <h4 class="section-instruction-title">
                  <span>📌</span>
                  <span>Confirm Your Community Status</span>
                </h4>
                <p class="section-instruction-sub">Please select one option to record your membership preference:</p>
              </div>

              <div class="community-choices-grid" id="communityChoicesGrid">
                ${(step.choices || []).map(choice => `
                  <div class="community-choice-card" id="choice-${choice.id}-card" data-choice="${choice.id}">
                    <input type="radio" name="whatsapp_status" value="${choice.id}">
                    <div class="choice-checkbox-box"></div>
                    <div class="choice-text-wrap">
                      <span class="choice-title">${choice.label}</span>
                      <span class="choice-desc">${choice.desc}</span>
                    </div>
                  </div>
                `).join('')}
              </div>

              <div class="consent-box-wrap" id="communityConsentWrap">
                <label class="consent-label" for="communityConsentInput">
                  <input type="checkbox" id="communityConsentInput" class="consent-native-checkbox" style="position:absolute;opacity:0;pointer-events:none;">
                  <div class="consent-checkbox-custom"></div>
                  <span class="consent-text">
                    <strong>Confirm Selection:</strong> ${step.consentText || "I confirm my selection above and agree to proceed to my assessment score evaluation."}
                  </span>
                </label>
              </div>
            </div>
          </div>
        `;
      }

      stepView.innerHTML = headerHtml + bodyHtml;
      stepsContainer.appendChild(stepView);
    });

    attachInteractiveHandlers();
  }

  // ===================================================================
  // 4. INTERACTION HANDLERS (RADIO SELECTION, INPUT EVENTS, OTHER DROPDOWN)
  // ===================================================================
  function attachInteractiveHandlers() {
    // Gender Radio Card styling
    const genderCards = document.querySelectorAll(".gender-radio-card");
    genderCards.forEach(card => {
      card.addEventListener("click", () => {
        genderCards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        const radio = card.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
        clearFieldError("gender");
      });
    });

    // Dropdown "Other" selection toggle handler
    const selectElements = document.querySelectorAll(".form-select");
    selectElements.forEach(select => {
      select.addEventListener("change", () => {
        const wrap = document.getElementById(`${select.name}_other_wrap`);
        if (wrap) {
          if (select.value === "Other") {
            wrap.style.display = "block";
            const input = document.getElementById(`${select.name}_other`);
            if (input) input.focus();
          } else {
            wrap.style.display = "none";
          }
        }
        clearFieldError(select.name);
      });
    });

    // MCQ Option Card selection styling
    const optionCards = document.querySelectorAll(".option-card");
    optionCards.forEach(card => {
      card.addEventListener("click", () => {
        const qid = card.dataset.qid;
        const siblingCards = document.querySelectorAll(`.option-card[data-qid="${qid}"]`);
        siblingCards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        const radio = card.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          formData.answers[qid] = radio.value;
        }
        // Remove unanswered alert on question block
        const block = document.getElementById(`block-${qid}`);
        if (block) block.classList.remove("unanswered-highlight");
      });
    });

    // Community choice card selection (mutually exclusive)
    const communityChoiceCards = document.querySelectorAll(".community-choice-card");
    communityChoiceCards.forEach(card => {
      card.addEventListener("click", () => {
        communityChoiceCards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        const radio = card.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          formData.whatsappCommunityStatus = radio.value;
        }
        const grid = document.getElementById("communityChoicesGrid");
        if (grid) grid.classList.remove("error-highlight");
      });
    });

    // Keep the custom consent style in sync with the native checkbox state.
    const consentWrap = document.getElementById("communityConsentWrap");
    const consentInput = document.getElementById("communityConsentInput");
    if (consentWrap && consentInput) {
      consentInput.addEventListener("change", () => {
        formData.communityConsent = consentInput.checked;
        consentWrap.classList.toggle("consent-checked", consentInput.checked);
        if (consentInput.checked) {
          consentWrap.classList.remove("error-highlight");
        }
      });
    }

    // WhatsApp Button Click Listener - Count click, auto-select "joined", auto-check confirmation, and save to DB
    const waBtn = document.getElementById("communityWhatsAppBtn");
    if (waBtn) {
      waBtn.addEventListener("click", () => {
        formData.whatsappCommunityStatus = "joined";
        formData.communityConsent = true;

        // Auto-select "I have joined" card in UI
        communityChoiceCards.forEach(c => c.classList.remove("selected"));
        const joinedCard = document.getElementById("choice-joined-card");
        if (joinedCard) {
          joinedCard.classList.add("selected");
          const radio = joinedCard.querySelector('input[type="radio"]');
          if (radio) radio.checked = true;
        }

        // Auto-check confirmation checkbox in UI
        if (consentInput) {
          consentInput.checked = true;
        }
        if (consentWrap) {
          consentWrap.classList.add("consent-checked");
          consentWrap.classList.remove("error-highlight");
        }
        const choicesGrid = document.getElementById("communityChoicesGrid");
        if (choicesGrid) choicesGrid.classList.remove("error-highlight");

        // Immediately record click & joined count in Firestore
        const subId = formData.submissionId || sessionStorage.getItem("dhruva_submission_id");
        if (window.DhruvaBackend && window.DhruvaBackend.recordWhatsAppClick) {
          window.DhruvaBackend.recordWhatsAppClick(subId, formData.personal);
        }

        showToast("WhatsApp group invite opened! You are marked as Joined.", "info");
      });
    }
  }

  function clearFieldError(fieldName) {
    const input = document.querySelector(`[name="${fieldName}"]`);
    if (input) input.classList.remove("error");
    const err = document.getElementById(`error-${fieldName}`);
    if (err) err.classList.remove("visible");
  }

  function showFieldError(fieldName, customMsg) {
    const input = document.querySelector(`[name="${fieldName}"]`);
    if (input) input.classList.add("error");
    const err = document.getElementById(`error-${fieldName}`);
    if (err) {
      if (customMsg) err.textContent = customMsg;
      err.classList.add("visible");
    }
  }

  // ===================================================================
  // 5. STEP VALIDATION
  // ===================================================================
  function validateCurrentStep() {
    const currentStepConfig = config.steps[currentStepIndex];

    if (currentStepConfig.isPersonalDetails) {
      let isValid = true;
      let firstErrorElement = null;

      currentStepConfig.fields.forEach(field => {
        if (field.type === "radio" && field.name === "gender") {
          const selected = document.querySelector('input[name="gender"]:checked');
          if (field.required && !selected) {
            isValid = false;
            showFieldError("gender", "Please select your gender");
            if (!firstErrorElement) firstErrorElement = document.querySelector(".gender-radio-group");
          } else if (selected) {
            formData.personal.gender = selected.value;
          }
        } else if (field.type === "select") {
          const el = document.getElementById(field.name);
          if (!el) return;
          let val = el.value.trim();

          if (val === "Other") {
            const otherInput = document.getElementById(`${field.name}_other`);
            const typedVal = otherInput ? otherInput.value.trim() : "";
            val = typedVal ? `Other: ${typedVal}` : "Other";
          }

          if (field.required && (!val || val.startsWith("Select "))) {
            isValid = false;
            showFieldError(field.name, `Please select ${field.label}`);
            if (!firstErrorElement) firstErrorElement = el;
          } else if (val && !val.startsWith("Select ")) {
            formData.personal[field.name] = val;
          }
        } else {
          const el = document.getElementById(field.name);
          if (!el) return;
          const val = el.value.trim();

          if (field.required && !val) {
            isValid = false;
            showFieldError(field.name, `${field.label} is required`);
            if (!firstErrorElement) firstErrorElement = el;
          } else if (val && field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
            if (field.required) {
              isValid = false;
              showFieldError(field.name, `Please enter a valid email address`);
              if (!firstErrorElement) firstErrorElement = el;
            } else {
              formData.personal[field.name] = val;
            }
          } else if (val && field.name === "whatsappNumber" && !/^[0-9]{10}$/.test(val.replace(/[^0-9]/g, ''))) {
            if (field.required) {
              isValid = false;
              showFieldError(field.name, `Please enter a valid 10-digit mobile number`);
              if (!firstErrorElement) firstErrorElement = el;
            } else {
              formData.personal[field.name] = val;
            }
          } else if (val) {
            formData.personal[field.name] = val;
          }
        }
      });

      if (!isValid) {
        showToast("Please fill in all required fields accurately.", "error");
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
          if (firstErrorElement.focus) firstErrorElement.focus();
        }
        return false;
      }
      return true;
    } else if (currentStepConfig.isCommunityJoining) {
      const choicesGrid = document.getElementById("communityChoicesGrid");
      const consentWrap = document.getElementById("communityConsentWrap");

      if (!formData.whatsappCommunityStatus) {
        if (choicesGrid) {
          choicesGrid.classList.add("error-highlight");
          choicesGrid.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        showToast("Please select whether you have joined or will join later on.", "error");
        return false;
      } else {
        if (choicesGrid) choicesGrid.classList.remove("error-highlight");
      }

      if (!formData.communityConsent) {
        if (consentWrap) {
          consentWrap.classList.add("error-highlight");
          consentWrap.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        showToast("Please check the confirmation box to confirm your selection.", "error");
        return false;
      } else {
        if (consentWrap) consentWrap.classList.remove("error-highlight");
      }

      return true;
    } else if (currentStepConfig.questions) {
      // Validate all MCQ questions in this step
      let allAnswered = true;
      let firstUnansweredBlock = null;

      currentStepConfig.questions.forEach(q => {
        const selected = document.querySelector(`input[name="${q.id}"]:checked`);
        const block = document.getElementById(`block-${q.id}`);
        if (!selected) {
          allAnswered = false;
          if (block) block.classList.add("unanswered-highlight");
          if (!firstUnansweredBlock) firstUnansweredBlock = block;
        } else {
          formData.answers[q.id] = selected.value;
          if (block) block.classList.remove("unanswered-highlight");
        }
      });

      if (!allAnswered) {
        showToast("Please answer all questions before proceeding.", "error");
        if (firstUnansweredBlock) {
          firstUnansweredBlock.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return false;
      }
      return true;
    }

    return true;
  }

  // ===================================================================
  // 6. NAVIGATION & SUBMISSION
  // ===================================================================
  function goToStep(newIndex) {
    if (newIndex < 0 || newIndex >= totalSteps) return;

    // Hide all step views
    const views = document.querySelectorAll(".step-view");
    views.forEach(v => v.classList.remove("active"));

    // Show target view
    const targetView = document.getElementById(`step-view-${newIndex}`);
    if (targetView) targetView.classList.add("active");

    currentStepIndex = newIndex;
    updateProgressUI();

    // If moving to community joining step, update WhatsApp link based on student's gender
    const targetStepConfig = config.steps[newIndex];
    if (targetStepConfig && targetStepConfig.isCommunityJoining) {
      updateCommunityStepDetails();
    }

    // Scroll smoothly to top of form card
    const formCard = document.getElementById("formCard");
    if (formCard) {
      formCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function updateCommunityStepDetails() {
    const userGender = (formData.personal.gender || "").toLowerCase();
    const waBtn = document.getElementById("communityWhatsAppBtn");
    const badge = document.getElementById("communityGenderBadge");

    let link = config.whatsappLinks?.default || "#";
    if (userGender === "female") {
      link = config.whatsappLinks?.female || config.whatsappLinks?.default || "#";
      if (badge) badge.textContent = "👩 Official Female Community Group";
    } else if (userGender === "male") {
      link = config.whatsappLinks?.male || config.whatsappLinks?.default || "#";
      if (badge) badge.textContent = "👨 Official Male Community Group";
    } else {
      if (badge) badge.textContent = "Official Student Community Group";
    }

    if (waBtn) waBtn.href = link;
  }

  // ===================================================================
  // 6. DYNAMIC SCORE CALCULATION ENGINE (AUTHENTIC & FUTURE-PROOF)
  // ===================================================================
  function calculateScores() {
    const totals = {
      pq: { earned: 0, max: 0 },
      iq: { earned: 0, max: 0 },
      sq: { earned: 0, max: 0 }
    };

    // Dynamically iterate over all steps and questions configured in content.js
    (config.steps || []).forEach(step => {
      if (!step.questions || !step.questions.length) return;

      // Determine step dimension: 'pq', 'iq', or 'sq'
      let dim = step.dimension;
      if (!dim) {
        const idLower = (step.id || "").toLowerCase();
        const catLower = (step.category || "").toLowerCase();
        if (idLower.includes("iq") || catLower.includes("iq") || catLower.includes("aptitude")) {
          dim = "iq";
        } else if (idLower.includes("sq") || catLower.includes("sq") || catLower.includes("wisdom")) {
          dim = "sq";
        } else {
          dim = "pq";
        }
      }

      step.questions.forEach(q => {
        const qDim = q.dimension || dim;
        if (!totals[qDim]) totals[qDim] = { earned: 0, max: 0 };

        const userAns = formData.answers[q.id];

        if (Array.isArray(q.optionScores) && q.optionScores.length) {
          const qMax = Math.max(...q.optionScores);
          totals[qDim].max += qMax;

          const radio = document.querySelector(`input[name="${q.id}"]:checked`);
          const card = radio ? radio.closest(".option-card") : null;
          const optIdx = card && card.dataset.optindex ? parseInt(card.dataset.optindex, 10) : 0;
          const pts = q.optionScores[optIdx] !== undefined ? q.optionScores[optIdx] : (qMax * 0.5);
          totals[qDim].earned += pts;
        } else if (q.correctAnswer) {
          totals[qDim].max += 5.0;
          if (userAns && userAns.trim() === q.correctAnswer.trim()) {
            totals[qDim].earned += 5.0;
          } else {
            totals[qDim].earned += 2.5; // Encouraging minimum base
          }
        } else {
          totals[qDim].max += 5.0;
          const radio = document.querySelector(`input[name="${q.id}"]:checked`);
          const card = radio ? radio.closest(".option-card") : null;
          const optIdx = card && card.dataset.optindex ? parseInt(card.dataset.optindex, 10) : 0;
          const pts = 2.5 + ((optIdx % 4) * 0.83);
          totals[qDim].earned += Math.min(5.0, pts);
        }
      });
    });

    // Helper: Computes authentic percentage guaranteed >= 50%
    const scale = (earned, max) => {
      if (!max || max <= 0) return 75;
      const rawPct = Math.round((earned / max) * 100);
      return Math.min(100, Math.max(50, rawPct));
    };

    return {
      pq: scale(totals.pq.earned, totals.pq.max),
      iq: scale(totals.iq.earned, totals.iq.max),
      sq: scale(totals.sq.earned, totals.sq.max)
    };
  }

  // ===================================================================
  // 7. SUBMISSION & REDIRECTION
  // ===================================================================
  async function handleFormSubmit() {
    if (!validateCurrentStep()) return;

    // Disable button & show spinner
    nextBtn.disabled = true;
    prevBtn.disabled = true;
    nextBtn.classList.add("submitting");
    const btnText = nextBtn.querySelector(".btn-text");
    if (btnText) btnText.textContent = "Submitting Assessment...";

    const userGender = (formData.personal.gender || "male").toLowerCase();
    const studentName = formData.personal.fullName || "Student";
    const computedScores = calculateScores();

    const totalScore = Math.round((computedScores.pq + computedScores.iq + computedScores.sq) / 3);

    const submissionId = formData.submissionId || sessionStorage.getItem("dhruva_submission_id");

    // CRITICAL: Individual answers are strictly NOT stored in the database as requested
    const updatePayload = {
      personal: formData.personal,
      scores: computedScores,
      totalScore,
      whatsappCommunityStatus: formData.whatsappCommunityStatus || "unspecified",
      userAgent: (navigator.userAgent || "").substring(0, 500)
    };

    console.log("Submitting completed assessment (WITHOUT answers):", updatePayload);

    try {
      const saveResult = await window.DhruvaBackend.updateAssessmentSubmission(submissionId, updatePayload);
      if (!saveResult || !saveResult.success) {
        throw new Error(saveResult && saveResult.error
          ? saveResult.error
          : "Assessment could not be saved to Firestore.");
      }

      // SECURITY: Encrypt session payload containing gender, studentName, scores, and whatsappStatus
      const sessionData = {
        gender: userGender,
        fullName: studentName,
        scores: computedScores,
        totalScore,
        whatsappStatus: formData.whatsappCommunityStatus || "join_later"
      };

      const authToken = window.DhruvaSecurity
        ? window.DhruvaSecurity.encryptSessionPayload(sessionData)
        : btoa(JSON.stringify(sessionData));

      if (authToken) {
        sessionStorage.setItem("dhruva_auth_token", authToken);
      }

      // Redirect to result page
      window.location.href = "result.html";
    } catch (err) {
      console.error("Submission error:", err);
      showToast("There was an error submitting your test. Please try again.", "error");
      nextBtn.disabled = false;
      prevBtn.disabled = false;
      nextBtn.classList.remove("submitting");
      if (btnText) btnText.textContent = "Submit & View Results";
    }
  }

  // Next / Continue button click
  nextBtn.addEventListener("click", async () => {
    // Case 1: On Step 0 (Registration) - Store entry in DB immediately!
    if (currentStepIndex === 0) {
      if (!validateCurrentStep()) return;

      // Save registration immediately to database
      nextBtn.disabled = true;
      nextBtn.classList.add("submitting");
      const btnText = nextBtn.querySelector(".btn-text");
      const originalText = btnText ? btnText.textContent : "Save & Continue";
      if (btnText) btnText.textContent = "Saving to database...";

      try {
        const res = await window.DhruvaBackend.saveRegistration(formData.personal);
        if (res && res.success && res.id) {
          formData.submissionId = res.id;
          sessionStorage.setItem("dhruva_submission_id", res.id);
          showToast("Registration saved! Starting assessment...", "info");
        } else {
          console.error("Registration was not saved to the database:", res && res.error);
          showToast(res && res.error ? res.error : "Registration could not be saved. Check your connection and try again.", "error");
          return;
        }
      } catch (err) {
        console.error("Error saving initial registration:", err);
        showToast("Registration could not be saved. Check your connection and try again.", "error");
        return;
      } finally {
        nextBtn.disabled = false;
        nextBtn.classList.remove("submitting");
        if (btnText) btnText.textContent = originalText;
      }
      goToStep(currentStepIndex + 1);
      return;
    }

    // Case 2: On Last Step (Step 5: Community Joining) - Validate choices & submit assessment!
    if (currentStepIndex === totalSteps - 1) {
      if (!validateCurrentStep()) return;
      handleFormSubmit();
      return;
    }

    // Case 3: Quiz Steps (PQ, IQ, SQ)
    if (validateCurrentStep()) {
      goToStep(currentStepIndex + 1);
    }
  });

  // Previous button click
  prevBtn.addEventListener("click", () => {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1);
    }
  });

  // ===================================================================
  // 7. TOAST NOTIFICATIONS
  // ===================================================================
  function showToast(message, type = "info") {
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${type === 'error' ? '⚠️' : 'ℹ️'}</span>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // Initialize
  initBranding();
  initStepper();
  renderStepViews();
});
