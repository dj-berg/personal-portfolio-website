/* =========================================
   Daniel Berg Portfolio Script
   Clean, organized, and lightweight
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       DOM ELEMENTS
    ========================================= */

    const menuIcon = document.getElementById("menu-icon");
    const navList = document.querySelector(".navlist");

    const homeLinks = document.querySelectorAll('a[href="#home"]');
    const navLinks = document.querySelectorAll("header .navlist a");
    const sections = document.querySelectorAll("section");
    const projectCards = document.querySelectorAll(".project-card");

    /* =========================================
       HELPER FUNCTIONS
    ========================================= */

    function closeMobileMenu() {
        if (!menuIcon || !navList) return;

        navList.classList.remove("open");

        menuIcon.classList.add("bx-menu");
        menuIcon.classList.remove("bx-x");

        menuIcon.setAttribute("aria-expanded", "false");
        menuIcon.setAttribute("aria-label", "Open navigation menu");
    }

    function updateActiveSection() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 160;
            const sectionHeight = section.offsetHeight;

            const isCurrentSection =
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight;

            if (isCurrentSection) {
                currentSection = section.id;
            }
        });

        if (!currentSection && sections.length > 0) {
            currentSection = sections[0].id;
        }

        navLinks.forEach(link => {
            const linkTarget = link.getAttribute("href");

            link.classList.toggle(
                "active",
                linkTarget === `#${currentSection}`
            );
        });
    }

    /* =========================================
       MOBILE MENU
    ========================================= */

    if (menuIcon && navList) {
        menuIcon.addEventListener("click", () => {
            const isOpen = navList.classList.toggle("open");

            menuIcon.classList.toggle("bx-menu", !isOpen);
            menuIcon.classList.toggle("bx-x", isOpen);

            menuIcon.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuIcon.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        });
    }

    /* =========================================
       HOME / LOGO SCROLL FIX
    ========================================= */

    homeLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();

            closeMobileMenu();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    });

    /* =========================================
       CLOSE MOBILE MENU ON NAVIGATION
    ========================================= */

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (link.getAttribute("href") !== "#home") {
                closeMobileMenu();
            }
        });
    });

    /* =========================================
       CLOSE MOBILE MENU ON ESCAPE
    ========================================= */

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMobileMenu();
        }
    });

    /* =========================================
       PROJECT DOCUMENTATION CAROUSELS
    ========================================= */

    projectCards.forEach(card => {
        const pages = Array.from(
            card.querySelectorAll(".project-page")
        );

        const nextButton = card.querySelector(".project-next");

        if (!nextButton || pages.length <= 1) return;

        let currentPage = 0;

        function showPage(index) {
            currentPage =
                (index + pages.length) % pages.length;

            pages.forEach((page, pageIndex) => {
                const isActive = pageIndex === currentPage;

                page.classList.toggle("active", isActive);

                page.setAttribute(
                    "aria-hidden",
                    String(!isActive)
                );
            });

            const isDocumentationPage = currentPage > 0;

            card.classList.toggle(
                "show-documentation",
                isDocumentationPage
            );

            nextButton.setAttribute(
                "aria-label",
                isDocumentationPage
                    ? "Return to project overview"
                    : "View project documentation"
            );

            nextButton.setAttribute(
                "title",
                isDocumentationPage
                    ? "Return to overview"
                    : "View documentation"
            );
        }

        nextButton.addEventListener("click", () => {
            showPage(currentPage + 1);
        });

        nextButton.addEventListener("keydown", event => {
            if (event.key === "ArrowRight") {
                event.preventDefault();
                showPage(currentPage + 1);
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                showPage(currentPage - 1);
            }
        });

        showPage(0);
    });

    /* =========================================
       INITIALIZE
    ========================================= */

    window.addEventListener(
        "scroll",
        updateActiveSection,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateActiveSection
    );

    updateActiveSection();
});