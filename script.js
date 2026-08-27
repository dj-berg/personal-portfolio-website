/* =========================================
   Daniel Berg Portfolio Script
   Clean, organized, and lightweight
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       01. DOM ELEMENTS
    ========================================= */

    const menuIcon = document.getElementById("menu-icon");
    const navList = document.querySelector(".navlist");
    const header = document.querySelector("header");

    const headerLinks = document.querySelectorAll('header a[href^="#"]');
    const navLinks = document.querySelectorAll("header .navlist a");
    const sections = document.querySelectorAll("section");
    let menuScrollPosition = {
        top: 0,
        left: 0
    };


    /* ========================================
       02. MOBILE MENU / SCROLL LOCK
    ======================================== */

    function closeMobileMenu() {
        if (!menuIcon || !navList) return;

        navList.classList.remove("open");

        document.documentElement.classList.remove("menu-open");
        document.body.classList.remove("menu-open");

        if (document.body.style.position === "fixed") {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";

            window.scrollTo({
                top: menuScrollPosition.top,
                left: menuScrollPosition.left,
                behavior: "auto"
            });
        }

        menuIcon.classList.add("bx-menu");
        menuIcon.classList.remove("bx-x");

        menuIcon.setAttribute("aria-expanded", "false");
        menuIcon.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }

    function openMobileMenu() {
        if (!menuIcon || !navList) return;

        updateActiveSection();

        menuScrollPosition = {
            top: window.scrollY,
            left: window.scrollX
        };

        navList.classList.add("open");

        document.documentElement.classList.add("menu-open");
        document.body.classList.add("menu-open");

        document.body.style.position = "fixed";
        document.body.style.top = `-${menuScrollPosition.top}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";

        menuIcon.classList.remove("bx-menu");
        menuIcon.classList.add("bx-x");
        menuIcon.setAttribute("aria-expanded", "true");
        menuIcon.setAttribute("aria-label", "Close navigation menu");
    }


    /* ========================================
       03. ACTIVE SECTION TRACKING
    ======================================== */

    function setActiveSection(sectionId) {
        if (!sectionId) return;

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${sectionId}`
            );
        });
    }

    function getCurrentSection() {
        if (!sections.length) return "";

        const headerHeight =
            header?.getBoundingClientRect().height || 0;

        const usableViewportHeight =
            Math.max(0, window.innerHeight - headerHeight);

        const activationLine =
            headerHeight + Math.min(120, Math.max(48, usableViewportHeight * 0.2));

        let visibleSection = sections[0].id;

        sections.forEach(section => {
            if (section.getBoundingClientRect().top <= activationLine) {
                visibleSection = section.id;
            }
        });

        return visibleSection;
    }

    function updateActiveSection() {
        if (!sections.length) return;

        setActiveSection(getCurrentSection());
    }

    function scrollToSection(target) {
        if (!target) return;

        if (target.id === "home") {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto"
            });
            return;
        }

        const headerHeight =
            header?.getBoundingClientRect().height || 0;

        const targetY =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: Math.max(0, targetY),
            left: window.scrollX,
            behavior: "auto"
        });
    }

    function cleanHomeUrl() {
        if (
            window.history?.replaceState &&
            (window.location.pathname !== "/" || window.location.hash)
        ) {
            window.history.replaceState(null, "", "/");
        }
    }

    function navigateFromCurrentUrl() {
        const hash = window.location.hash;
        const sectionId = hash ? hash.slice(1) : "home";
        const target = document.getElementById(sectionId) ||
            document.getElementById("home");

        if (!target) return;

        if (target.id === "home") {
            cleanHomeUrl();
        }

        scrollToSection(target);
        setActiveSection(target.id);
    }

    function navigateToSection(link) {
        const hash = link.getAttribute("href");

        if (!hash || !hash.startsWith("#")) return;

        const target = document.getElementById(hash.slice(1));

        if (!target) return;

        /*
         * Close and unlock the mobile menu before calculating the
         * target position so fixed-body restoration is complete first.
         */
        closeMobileMenu();

        setActiveSection(target.id);

        scrollToSection(target);

        if (target.id === "home") {
            cleanHomeUrl();
        } else if (
            window.history?.pushState &&
            window.location.hash !== hash
        ) {
            window.history.pushState(null, "", hash);
        }

    }


    /* ========================================
       04. MOBILE MENU TOGGLE
    ======================================== */

    if (menuIcon && navList) {

        menuIcon.addEventListener("click", () => {
            if (navList.classList.contains("open")) {
                closeMobileMenu();
                return;
            }

            openMobileMenu();
        });
    }


    /* ========================================
       05. HEADER / NAVIGATION
    ======================================== */

    headerLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            navigateToSection(link);
        });
    });


    /* ========================================
       06. KEYBOARD / ACCESSIBILITY
    ======================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    });


    /* ========================================
       07. CONTACT FORM / EMAILJS
    ======================================== */

    const contactForm = document.getElementById("contact-form");
    const statusMessage = document.getElementById("contact-form-status");
    const submitButton = contactForm?.querySelector('button[type="submit"]');

    if (contactForm && statusMessage && submitButton) {
        const EMAILJS_SERVICE_ID = "service_3uvsbni";
        const EMAILJS_TEMPLATE_ID = "template_h9nlekg";
        const EMAILJS_PUBLIC_KEY = "VkVXmCBWffsrQg6wy";

        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            if (
                EMAILJS_SERVICE_ID.startsWith("YOUR_") ||
                EMAILJS_TEMPLATE_ID.startsWith("YOUR_") ||
                EMAILJS_PUBLIC_KEY.startsWith("YOUR_")
            ) {
                statusMessage.textContent =
                    "EmailJS still needs your Service ID, Template ID, and Public Key.";
                statusMessage.className =
                    "contact-form-status contact-form-status-error";
                return;
            }

            const originalButtonContent = submitButton.innerHTML;

            submitButton.disabled = true;
            submitButton.innerHTML =
                "<i class='bx bx-loader-alt bx-spin' aria-hidden='true'></i> Sending...";
            statusMessage.textContent = "";
            statusMessage.className = "contact-form-status";

            try {
                await emailjs.sendForm(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    contactForm,
                    {
                        publicKey: EMAILJS_PUBLIC_KEY
                    }
                );

                contactForm.reset();
                statusMessage.textContent =
                    "Your message was sent successfully. Thank you!";
                statusMessage.className =
                    "contact-form-status contact-form-status-success";
            } catch (error) {
                console.error("EmailJS submission failed:", error);

                statusMessage.textContent =
                    "Your message could not be sent. Please try again or email me directly.";
                statusMessage.className =
                    "contact-form-status contact-form-status-error";
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonContent;
            }
        });
    }


    /* ========================================
       08. WINDOW EVENTS
    ======================================== */

    window.addEventListener(
        "scroll",
        updateActiveSection,
        {
            passive: true
        }
    );

    window.addEventListener(
        "resize",
        updateActiveSection
    );

    /* ========================================
       09. HISTORY / HASH NAVIGATION
    ======================================== */

    window.addEventListener("popstate", () => {
        closeMobileMenu();
        navigateFromCurrentUrl();
    });

    window.addEventListener("hashchange", () => {
        navigateFromCurrentUrl();
    });


    /* ========================================
       10. INITIALIZATION
    ======================================== */

    navigateFromCurrentUrl();
    updateActiveSection();
});
