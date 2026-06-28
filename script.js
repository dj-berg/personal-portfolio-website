/* =========================================
   Daniel Berg Portfolio Script
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuIcon = document.getElementById("menu-icon");
    const navList = document.querySelector(".navlist");

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

    document.querySelectorAll('a[href="#home"]').forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();

            if (navList && menuIcon) {
                navList.classList.remove("open");
                menuIcon.classList.add("bx-menu");
                menuIcon.classList.remove("bx-x");
            }

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    });

    /* =========================================
       CLOSE MOBILE MENU ON OTHER LINKS
    ========================================= */

    document.querySelectorAll(".navlist a").forEach(link => {
        link.addEventListener("click", () => {
            if (link.getAttribute("href") !== "#home" && navList && menuIcon) {
                navList.classList.remove("open");
                menuIcon.classList.add("bx-menu");
                menuIcon.classList.remove("bx-x");
            }
        });
    });

    /* =========================================
       ACTIVE NAV LINK
    ========================================= */

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("header .navlist a");

    function updateActiveSection() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 160;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        if (!currentSection && sections.length > 0) {
            currentSection = sections[0].getAttribute("id");
        }

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveSection);
    window.addEventListener("resize", updateActiveSection);
    updateActiveSection();

});