const toggleButton = document.getElementById("toggleMode");
const htmlElement = document.documentElement;
const themeIcon = document.getElementById("themeIcon");
const navbar = document.getElementById("navbar");

function updateIcon(theme) {
    if (theme === "dark") {
        themeIcon.classList.remove("bi-sun");
        themeIcon.classList.add("bi-moon");
        downloadCv.classList.remove("btn-dark");
        downloadCv.classList.add("btn-light");
        cvBot.classList.remove("btn-dark");
        cvBot.classList.add("btn-light");
        experience1.classList.add("experience-darkmode");
        experience2.classList.add("experience-darkmode");
        experience3.classList.add("experience-darkmode");
        navbar.classList.remove("bg-white")
        navbar.classList.add("bg-dark")
        imgBackgroundLight.remove(".lightmode")
        imgBackgroundLight.add(".darkmode")
    } else {
        themeIcon.classList.remove("bi-moon");
        themeIcon.classList.add("bi-sun");
        downloadCv.classList.remove("btn-light");
        downloadCv.classList.add("btn-dark");
        cvBot.classList.remove("btn-light");
        cvBot.classList.add("btn-dark");
        experience1.classList.remove("experience-darkmode");
        experience2.classList.remove("experience-darkmode");
        experience3.classList.remove("experience-darkmode");
        navbar.classList.remove("bg-dark");
        navbar.classList.add("bg-white");
    }
}

toggleButton.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    htmlElement.setAttribute("data-bs-theme", newTheme);
    updateIcon(newTheme);
    updateColor(newTheme);
    changeBackground(newTheme)
});