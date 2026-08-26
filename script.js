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
    const projectCards = document.querySelectorAll(".project-card");
    let currentSection = "";
    let navigationIntent = null;
    let menuScrollPosition = {
        top: 0,
        left: 0
    };


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

            const previousScrollBehavior =
                document.documentElement.style.scrollBehavior;

            document.documentElement.style.scrollBehavior = "auto";
            window.scrollTo({
                top: menuScrollPosition.top,
                left: menuScrollPosition.left,
                behavior: "auto"
            });
            document.documentElement.style.scrollBehavior =
                previousScrollBehavior;
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


    /* =========================================
       03. ACTIVE NAVIGATION SECTION
    ========================================= */

    function setActiveSection(sectionId) {
        if (!sectionId) return;

        currentSection = sectionId;

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${currentSection}`
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

    function isAtNavigationTarget(target) {
        if (!target) return false;

        if (target.id === "home") {
            return window.scrollY <= 1;
        }

        const headerHeight =
            header?.getBoundingClientRect().height || 0;

        return Math.abs(
            target.getBoundingClientRect().top - headerHeight
        ) <= 1;
    }

    function finishNavigationIntent() {
        if (!navigationIntent) return;

        const target = navigationIntent.target;
        navigationIntent = null;
        setActiveSection(target.id);
    }

    function cancelNavigationIntent() {
        if (!navigationIntent) return;

        navigationIntent = null;
        updateActiveSection();
    }

    function updateActiveSection() {
        if (!sections.length) return;

        if (navigationIntent) {
            setActiveSection(navigationIntent.target.id);

            if (isAtNavigationTarget(navigationIntent.target)) {
                finishNavigationIntent();
            }

            return;
        }

        setActiveSection(getCurrentSection());
    }

    function scrollToSection(target, behavior = "auto") {
        if (!target) return;

        const prefersReducedMotion =
            window.matchMedia?.("(prefers-reduced-motion: reduce)")
                .matches;

        const scrollBehavior =
            behavior === "smooth" && !prefersReducedMotion
                ? "smooth"
                : "auto";

        if (target.id === "home") {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: scrollBehavior
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
            behavior: scrollBehavior
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

    function navigateFromCurrentUrl(behavior = "auto") {
        const hash = window.location.hash;
        const sectionId = hash ? hash.slice(1) : "home";
        const target = document.getElementById(sectionId) ||
            document.getElementById("home");

        if (!target) return;

        navigationIntent = null;

        if (target.id === "home") {
            cleanHomeUrl();
        }

        scrollToSection(target, behavior);
        setActiveSection(target.id);
    }

    function navigateToSection(link) {
        const hash = link.getAttribute("href");

        if (!hash || !hash.startsWith("#")) return;

        const target = document.getElementById(hash.slice(1));

        if (!target) return;

        /*
         * Close and unlock the mobile menu before starting the scroll.
         * This prevents the fixed-body restoration from racing the
         * browser's native hash navigation on the first tap.
         */
        closeMobileMenu();

        navigationIntent = {
            target
        };

        setActiveSection(target.id);

        scrollToSection(target, "smooth");

        if (target.id === "home") {
            cleanHomeUrl();
        } else if (
            window.history?.pushState &&
            window.location.hash !== hash
        ) {
            window.history.pushState(null, "", hash);
        }

    }


    /* =========================================
       04. MOBILE MENU
    ========================================= */

    if (menuIcon && navList) {

        menuIcon.addEventListener("click", () => {
            if (navList.classList.contains("open")) {
                closeMobileMenu();
                return;
            }

            openMobileMenu();
        });
    }


    /* =========================================
       05. HEADER / LOGO NAVIGATION
    ========================================= */

    headerLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            navigateToSection(link);
        });
    });


    /* =========================================
       06. ESCAPE KEY
    ========================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

        if (
            event.key === "ArrowUp" ||
            event.key === "ArrowDown" ||
            event.key === "PageUp" ||
            event.key === "PageDown" ||
            event.key === "Home" ||
            event.key === "End" ||
            event.key === " "
        ) {
            cancelNavigationIntent();
        }
    });


    /* =========================================
       07. PROJECT DOCUMENTATION CAROUSELS
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
       08. WINDOW EVENTS
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

    window.addEventListener("wheel", cancelNavigationIntent, {
        passive: true
    });

    window.addEventListener("touchstart", cancelNavigationIntent, {
        passive: true
    });

    window.addEventListener("pointerdown", cancelNavigationIntent, {
        passive: true
    });

    window.addEventListener("scrollend", () => {
        if (!navigationIntent) {
            updateActiveSection();
            return;
        }

        if (isAtNavigationTarget(navigationIntent.target)) {
            finishNavigationIntent();
        } else {
            cancelNavigationIntent();
        }
    });

    window.addEventListener("popstate", () => {
        navigationIntent = null;
        closeMobileMenu();
        navigateFromCurrentUrl("auto");
    });

    window.addEventListener("hashchange", () => {
        navigationIntent = null;
        navigateFromCurrentUrl("auto");
    });


    /* =========================================
       09. INITIALIZE
    ========================================= */

    navigateFromCurrentUrl("auto");
    updateActiveSection();
});
