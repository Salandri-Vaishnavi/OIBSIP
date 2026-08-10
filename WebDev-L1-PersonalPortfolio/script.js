// ===========================
// PORTFOLIO JAVASCRIPT
// ===========================


// ===========================
// NAVBAR ACTIVE LINK
// ===========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


// ===========================
// STICKY NAVBAR SHADOW
// ===========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 40) {

        header.style.boxShadow =
            "0 10px 30px rgba(0, 0, 0, 0.12)";

    } else {

        header.style.boxShadow =
            "0 3px 10px rgba(0, 0, 0, 0.08)";

    }

});


// ===========================
// REVEAL ANIMATION
// ===========================

const revealElements = document.querySelectorAll(
    ".project-card, .timeline-item, .certificate-card, .achievement-card, .hackathon-card, .skills-category, .contact-item"
);

function reveal() {

    const trigger = window.innerHeight * 0.88;

    revealElements.forEach((element) => {

        const top = element.getBoundingClientRect().top;

        if (top < trigger) {
            element.classList.add("show");
        }

    });

}

window.addEventListener("scroll", reveal);

reveal();


// ===========================
// EMAILJS INITIALIZATION
// ===========================

// ===========================
// EMAILJS INITIALIZATION
// ===========================

emailjs.init({
    publicKey: "c7_e07BxdpfR8lo84"
});


// ===========================
// EMAILJS CONTACT FORM
// ===========================

const form = document.getElementById("contact-form");

if (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        emailjs.sendForm(
            "service_tfrcnet",
            "template_e979vnc",
            form
        )
        .then(function () {

            alert(
                "Thank you! Your message has been sent successfully."
            );

            form.reset();

        })
        .catch(function (error) {

            console.error("EmailJS Error:", error);

            alert(
                "Sorry, your message could not be sent. Please try again."
            );

        });

    });

}

// ===========================
// FOOTER CURRENT YEAR
// ===========================

const copyright = document.querySelector(".copyright");

if (copyright) {

    copyright.innerHTML =
        `© ${new Date().getFullYear()} Vaishnavi Salandri. All Rights Reserved.`;

}