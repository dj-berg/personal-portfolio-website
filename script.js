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

    const homeLinks = document.querySelectorAll('a[href="#home"]');
    const navLinks = document.querySelectorAll("header .navlist a");
    const sections = document.querySelectorAll("section");
    const projectCards = document.querySelectorAll(".project-card");
    let menuScrollPosition = 0;


    /* =========================================
       02. HELPER FUNCTIONS
    ========================================= */

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
            window.scrollTo(0, menuScrollPosition);
        }

        menuIcon.classList.add("bx-menu");
        menuIcon.classList.remove("bx-x");

        menuIcon.setAttribute("aria-expanded", "false");
        menuIcon.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }


    /* =========================================
       03. ACTIVE NAVIGATION SECTION
    ========================================= */

    function updateActiveSection() {
        if (!sections.length) return;

        let currentSection = "";

        const headerHeight =
            document.querySelector("header")?.offsetHeight || 0;

        const scrollPosition =
            window.scrollY + headerHeight + 80;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {
                currentSection = section.id;
            }
        });

        if (!currentSection) {
            currentSection = sections[0]?.id || "";
        }

        navLinks.forEach(link => {
            const target = link.getAttribute("href");

            link.classList.toggle(
                "active",
                target === `#${currentSection}`
            );
        });
    }


    /* =========================================
       04. MOBILE MENU
    ========================================= */

    if (menuIcon && navList) {

        menuIcon.addEventListener("click", () => {

            const isOpen =
                navList.classList.toggle("open");

            if (isOpen) {
                menuScrollPosition = window.scrollY;
                document.body.style.position = "fixed";
                document.body.style.top = `-${menuScrollPosition}px`;
                document.body.style.left = "0";
                document.body.style.right = "0";
                document.body.style.width = "100%";
            } else {
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.left = "";
                document.body.style.right = "";
                document.body.style.width = "";
                window.scrollTo(0, menuScrollPosition);
            }

            document.documentElement.classList.toggle(
                "menu-open",
                isOpen
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

            menuIcon.classList.toggle(
                "bx-menu",
                !isOpen
            );

            menuIcon.classList.toggle(
                "bx-x",
                isOpen
            );

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
       05. HOME / LOGO SCROLL
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
       06. CLOSE MOBILE MENU AFTER NAVIGATION
    ========================================= */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (link.getAttribute("href") !== "#home") {
                closeMobileMenu();
            }
        });
    });


    /* =========================================
       07. ESCAPE KEY
    ========================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMobileMenu();
        }
    });


    /* =========================================
       08. PROJECT DOCUMENTATION CAROUSELS
    ========================================= */

    projectCards.forEach(card => {

        const pages = Array.from(
            card.querySelectorAll(".project-page")
        );

        /*
         * Support both:
         *
         * .project-prev / .project-next
         *
         * and the existing design where only
         * .project-next is present.
         */

        const nextButton =
            card.querySelector(".project-next");

        const prevButton =
            card.querySelector(".project-prev");

        const indicators = Array.from(
            card.querySelectorAll(
                ".project-indicator, .project-dot"
            )
        );

        const pageCount = card.querySelector(".project-page-count");

        /*
         * Cards without multiple pages do not
         * need carousel behavior.
         */

        if (pages.length <= 1) {
            return;
        }

        let currentPage = 0;
        const boundedCarousel = card.classList.contains("feature-flag-case-study");


        /* =====================================
           SHOW PROJECT PAGE
        ===================================== */

        function showPage(index) {

            /*
             * Wrap around:
             *
             * last → first
             * first → last
             */

            currentPage = boundedCarousel
                ? Math.max(0, Math.min(index, pages.length - 1))
                : (index + pages.length) % pages.length;


            /* ---------------------------------
               Update slides
            --------------------------------- */

            pages.forEach((page, pageIndex) => {

                const isActive =
                    pageIndex === currentPage;

                page.classList.toggle(
                    "active",
                    isActive
                );

                page.setAttribute(
                    "aria-hidden",
                    String(!isActive)
                );

                /*
                 * Prevent keyboard focus from
                 * entering hidden project pages
                 * when supported by the browser.
                 */

                if (isActive) {
                    page.removeAttribute("inert");
                } else {
                    page.setAttribute("inert", "");
                }
            });


            /* ---------------------------------
               Documentation state
            --------------------------------- */

            const isDocumentationPage =
                currentPage > 0;

            card.classList.toggle(
                "show-documentation",
                isDocumentationPage
            );


            /* ---------------------------------
               Current slide metadata
            --------------------------------- */

            card.dataset.projectPage =
                String(currentPage);

            card.dataset.projectPageNumber =
                String(currentPage + 1);

            card.dataset.projectPageCount =
                String(pages.length);

            if (pageCount) {
                const pageNumber = String(currentPage + 1);
                const totalPages = String(pages.length);

                if (boundedCarousel) {
                    pageCount.textContent = `${pageNumber}/${totalPages}`;
                } else {
                    const pageLabel = pages[currentPage]
                        .querySelector(".project-page-label")
                        ?.textContent
                        .trim();

                    pageCount.textContent = `${currentPage + 1} / ${pages.length}${pageLabel ? " \u00b7 " + pageLabel : ""}`;
                }
            }


            /* ---------------------------------
               Indicators
            --------------------------------- */

            indicators.forEach(
                (indicator, indicatorIndex) => {

                    const isActive =
                        indicatorIndex === currentPage;

                    indicator.classList.toggle(
                        "active",
                        isActive
                    );

                    indicator.setAttribute(
                        "aria-current",
                        isActive ? "true" : "false"
                    );
                }
            );


            /* ---------------------------------
               Next button accessibility
            --------------------------------- */

            if (nextButton) {

                const nextPage = boundedCarousel
                    ? Math.min(currentPage + 1, pages.length - 1)
                    : (currentPage + 1) % pages.length;

                if (boundedCarousel) {
                    nextButton.disabled = currentPage === pages.length - 1;
                }

                /*
                 * With two slides this keeps the
                 * original Overview ↔ Documentation
                 * wording.
                 */

                if (pages.length === 2) {

                    nextButton.setAttribute(
                        "aria-label",
                        currentPage === 0
                            ? "View project documentation"
                            : "Return to project overview"
                    );

                    nextButton.setAttribute(
                        "title",
                        currentPage === 0
                            ? "View documentation"
                            : "Return to overview"
                    );

                } else {

                    nextButton.setAttribute(
                        "aria-label",
                        nextPage === 0
                            ? "Return to project overview"
                            : `View project page ${nextPage + 1}`
                    );

                    nextButton.setAttribute(
                        "title",
                        nextPage === 0
                            ? "Return to overview"
                            : `Next page (${nextPage + 1} of ${pages.length})`
                    );
                }
            }


            /* ---------------------------------
               Previous button accessibility
            --------------------------------- */

            if (prevButton) {

                const previousPage = boundedCarousel
                    ? Math.max(currentPage - 1, 0)
                    : (
                        currentPage -
                        1 +
                        pages.length
                    ) % pages.length;

                if (boundedCarousel) {
                    prevButton.disabled = currentPage === 0;
                }

                prevButton.setAttribute(
                    "aria-label",
                    previousPage === 0
                        ? "Return to project overview"
                        : `View project page ${previousPage + 1}`
                );

                prevButton.setAttribute(
                    "title",
                    previousPage === 0
                        ? "Return to overview"
                        : `Previous page (${previousPage + 1} of ${pages.length})`
                );
            }
        }


        /* =====================================
           NEXT PAGE
        ===================================== */

        function nextPage() {
            if (!boundedCarousel || currentPage < pages.length - 1) {
                showPage(currentPage + 1);
            }
        }


        /* =====================================
           PREVIOUS PAGE
        ===================================== */

        function previousPage() {
            if (!boundedCarousel || currentPage > 0) {
                showPage(currentPage - 1);
            }
        }


        /* =====================================
           NEXT BUTTON
        ===================================== */

        if (nextButton) {

            nextButton.addEventListener(
                "click",
                nextPage
            );
        }


        /* =====================================
           PREVIOUS BUTTON
        ===================================== */

        if (prevButton) {

            prevButton.addEventListener(
                "click",
                previousPage
            );
        }


        /* =====================================
           INDICATOR / DOT NAVIGATION
        ===================================== */

        indicators.forEach(
            (indicator, indicatorIndex) => {

                indicator.addEventListener(
                    "click",
                    () => {
                        showPage(indicatorIndex);
                    }
                );
            }
        );


        /* =====================================
           KEYBOARD CAROUSEL NAVIGATION
        ===================================== */

        card.addEventListener(
            "keydown",
            event => {

                /*
                 * Don't hijack arrow keys while
                 * someone is typing into a field.
                 */

                const tagName =
                    event.target.tagName;

                if (
                    tagName === "INPUT" ||
                    tagName === "TEXTAREA" ||
                    tagName === "SELECT"
                ) {
                    return;
                }


                if (event.key === "ArrowRight") {

                    event.preventDefault();

                    nextPage();
                }


                if (event.key === "ArrowLeft") {

                    event.preventDefault();

                    previousPage();
                }


                /*
                 * Home returns to the project's
                 * overview slide.
                 */

                if (event.key === "Home") {

                    event.preventDefault();

                    showPage(0);
                }
            }
        );


        /* =====================================
           INITIALIZE PROJECT
        ===================================== */

        showPage(0);
    });


    /* =========================================
       09. WINDOW EVENTS
    ========================================= */

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


    /* =========================================
       10. INITIALIZE
    ========================================= */

    updateActiveSection();
});
