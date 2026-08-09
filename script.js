/* =========================================================
   CAREERPATH — COMPLETE INTERACTIVE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       1. CAREER CARD MODALS
       ===================================================== */

    const careerCards =
        document.querySelectorAll(".career-card");


    careerCards.forEach((card) => {

        card.style.cursor = "pointer";


        card.addEventListener("click", () => {

            const titleElement =
                card.querySelector("h3");

            const descriptionElement =
                card.querySelector(
                    ".career-card-content > p"
                );


            if (
                !titleElement ||
                !descriptionElement
            ) {
                return;
            }


            const title =
                titleElement.textContent.trim();


            const description =
                descriptionElement.textContent.trim();


            const tags =
                Array.from(
                    card.querySelectorAll(
                        ".career-tags span"
                    )
                ).map((tag) =>
                    tag.textContent.trim()
                );


            showCareerDetails(
                title,
                description,
                tags
            );

        });

    });


    function showCareerDetails(
        title,
        description,
        tags
    ) {

        const existingModal =
            document.querySelector(
                ".career-modal"
            );


        if (existingModal) {

            existingModal.remove();

        }


        const modal =
            document.createElement("div");


        modal.className =
            "career-modal";


        modal.innerHTML = `
            <div class="career-modal-overlay"></div>

            <div
                class="career-modal-box"
                role="dialog"
                aria-modal="true"
                aria-labelledby="career-modal-title"
            >

                <button
                    type="button"
                    class="career-modal-close"
                    aria-label="Close career details"
                >
                    ×
                </button>

                <span class="eyebrow">
                    CAREER PATH
                </span>

                <h2 id="career-modal-title">
                    ${title}
                </h2>

                <p class="career-modal-description">
                    ${description}
                </p>

                <div class="career-modal-section">

                    <h3>
                        Skills you'll explore
                    </h3>

                    <div class="career-modal-tags">
                        ${tags
                            .map(
                                (tag) =>
                                    `<span>${tag}</span>`
                            )
                            .join("")}
                    </div>

                </div>

                <div class="career-modal-section">

                    <h3>
                        Your beginner roadmap
                    </h3>

                    <div class="modal-roadmap">

                        <div>
                            <strong>01</strong>

                            <span>
                                Understand the fundamentals
                            </span>
                        </div>

                        <div>
                            <strong>02</strong>

                            <span>
                                Learn the core skills
                            </span>
                        </div>

                        <div>
                            <strong>03</strong>

                            <span>
                                Build practical projects
                            </span>
                        </div>

                        <div>
                            <strong>04</strong>

                            <span>
                                Create your portfolio
                            </span>
                        </div>

                    </div>

                </div>

                <a
                    href="#roadmap"
                    class="primary-button modal-start-button"
                >
                    Start this path
                    <span>→</span>
                </a>

            </div>
        `;


        document.body.appendChild(modal);

        document.body.classList.add(
            "modal-open"
        );


        const closeButton =
            modal.querySelector(
                ".career-modal-close"
            );


        const overlay =
            modal.querySelector(
                ".career-modal-overlay"
            );


        const startButton =
            modal.querySelector(
                ".modal-start-button"
            );


        const closeModal = () => {

            if (!document.body.contains(modal)) {
                return;
            }


            modal.remove();


            document.body.classList.remove(
                "modal-open"
            );


            document.removeEventListener(
                "keydown",
                escapeHandler
            );

        };


        const escapeHandler = (event) => {

            if (event.key === "Escape") {

                closeModal();

            }

        };


        closeButton.addEventListener(
            "click",
            closeModal
        );


        overlay.addEventListener(
            "click",
            closeModal
        );


        startButton.addEventListener(
            "click",
            closeModal
        );


        document.addEventListener(
            "keydown",
            escapeHandler
        );


        closeButton.focus();

    }


    /* =====================================================
       2. SCROLL REVEAL ANIMATIONS
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .intro-content,
            .career-card,
            .about-main-card,
            .about-content,
            .roadmap-step,
            .value-card,
            .cta-card,
            .contact-heading,
            .contact-info-card,
            .contact-note,
            .contact-form-card
            `
        );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "reveal-visible"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "reveal-visible"
                );

            }
        );

    }


    /* =====================================================
       3. CONTACT FORM
       ===================================================== */

    const contactForm =
        document.querySelector(
            ".contact-form"
        );


    if (contactForm) {

        let statusElement =
            contactForm.querySelector(
                ".form-status"
            );


        /*
         * Create form-status automatically
         * if it does not already exist.
         */

        if (!statusElement) {

            statusElement =
                document.createElement("p");


            statusElement.className =
                "form-status";


            statusElement.setAttribute(
                "aria-live",
                "polite"
            );


            contactForm.appendChild(
                statusElement
            );

        }


        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                /* -----------------------------------------
                   Get form fields
                ----------------------------------------- */

                const nameInput =
                    contactForm.querySelector(
                        'input[name="name"], #name'
                    );


                const emailInput =
                    contactForm.querySelector(
                        'input[name="email"], #email'
                    );


                const messageInput =
                    contactForm.querySelector(
                        'textarea[name="message"], #message'
                    );


                if (
                    !nameInput ||
                    !emailInput ||
                    !messageInput
                ) {

                    showFormError(
                        "Please check the contact form fields."
                    );

                    return;

                }


                const name =
                    nameInput.value.trim();


                const email =
                    emailInput.value.trim();


                const message =
                    messageInput.value.trim();


                /* -----------------------------------------
                   Name validation
                ----------------------------------------- */

                if (!name) {

                    showFormError(
                        "Please enter your name."
                    );

                    nameInput.focus();

                    return;

                }


                /* -----------------------------------------
                   Email validation
                ----------------------------------------- */

                if (!email) {

                    showFormError(
                        "Please enter your email address."
                    );

                    emailInput.focus();

                    return;

                }


                if (!isValidEmail(email)) {

                    showFormError(
                        "Please enter a valid email address."
                    );

                    emailInput.focus();

                    return;

                }


                /* -----------------------------------------
                   Message validation
                ----------------------------------------- */

                if (!message) {

                    showFormError(
                        "Please enter your message."
                    );

                    messageInput.focus();

                    return;

                }


                /* -----------------------------------------
                   Success
                ----------------------------------------- */

                statusElement.classList.remove(
                    "error"
                );


                statusElement.textContent =
                    `Thank you, ${name}! Your message has been submitted successfully.`;


                contactForm.reset();


                /* -----------------------------------------
                   Clear status after 5 seconds
                ----------------------------------------- */

                setTimeout(() => {

                    if (
                        statusElement &&
                        !statusElement.classList.contains(
                            "error"
                        )
                    ) {

                        statusElement.textContent = "";

                    }

                }, 5000);

            }
        );


        function showFormError(message) {

            statusElement.classList.add(
                "error"
            );


            statusElement.textContent =
                message;

        }


        function isValidEmail(email) {

            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                email
            );

        }

    }


    /* =====================================================
       4. SMOOTH SCROLL FOR INTERNAL LINKS
       ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                const navbar =
                    document.querySelector(
                        ".navbar"
                    );


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    navbarHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    }

});