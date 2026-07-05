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

    /* =========================================
       HELPER FUNCTIONS
    ========================================= */

    function closeMobileMenu() {
        if (!menuIcon || !navList) return;

        navList.classList.remove("open");
        menuIcon.classList.add("bx-menu");
        menuIcon.classList.remove("bx-x");
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
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    /* =========================================
       MOBILE MENU
    ========================================= */

    if (menuIcon && navList) {

        menuIcon.addEventListener("click", () => {
            navList.classList.toggle("open");
            menuIcon.classList.toggle("bx-menu");
            menuIcon.classList.toggle("bx-x");
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
       INITIALIZE
    ========================================= */

    window.addEventListener("scroll", updateActiveSection);
    window.addEventListener("resize", updateActiveSection);

    updateActiveSection();

});