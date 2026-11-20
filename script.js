// ==========================================
// 1. SPRÁVA VYSOUVACÍHO MENU (DRAWER)
// ==========================================
const menuTrigger = document.getElementById("menu-trigger");
const closeDrawerBtn = document.getElementById("close-drawer");
const systemDrawer = document.getElementById("system-drawer");
const drawerBackdrop = document.getElementById("drawer-backdrop");

function openDrawer() {
    systemDrawer?.classList.add("open");
    drawerBackdrop?.classList.add("active");
    menuTrigger?.classList.add("active");
}

function closeDrawer() {
    systemDrawer?.classList.remove("open");
    drawerBackdrop?.classList.remove("active");
    menuTrigger?.classList.remove("active");
}

menuTrigger?.addEventListener("click", openDrawer);
closeDrawerBtn?.addEventListener("click", closeDrawer);
drawerBackdrop?.addEventListener("click", closeDrawer);

// Zavření klávesou ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
});

// ==========================================
// 2. SPRÁVA TÉMATU (DARK / LIGHT)
// ==========================================
const themeGroups = document.querySelectorAll("#theme-toggle");

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "light" || (!savedTheme && !prefersDark)) {
    enableLightTheme();
} else {
    disableLightTheme();
}

themeGroups.forEach(group => {
    group.querySelectorAll(".toggle-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const theme = btn.dataset.theme;
            if (theme === "light") {
                enableLightTheme();
            } else {
                disableLightTheme();
            }
        });
    });
});

function enableLightTheme() {
    document.body.classList.add("light-theme");
    localStorage.setItem("theme", "light");
    
    document.querySelectorAll("#theme-toggle .toggle-btn").forEach(b => {
        b.classList.toggle("active", b.dataset.theme === "light");
    });

    updateImages(true);
}

function disableLightTheme() {
    document.body.classList.remove("light-theme");
    localStorage.setItem("theme", "dark");
    
    document.querySelectorAll("#theme-toggle .toggle-btn").forEach(b => {
        b.classList.toggle("active", b.dataset.theme === "dark");
    });

    updateImages(false);
}

// Funkce pro výměnu sady obrázků
function updateImages(isLight) {
    document.querySelectorAll(".image, .image_grid").forEach(img => {
        const src = img.getAttribute("src");
        if (!src) return;

        if (isLight) {
            if (!src.includes("_svetly.svg")) {
                img.setAttribute("src", src.replace(".svg", "_svetly.svg"));
            }
        } else {
            img.setAttribute("src", src.replace("_svetly.svg", ".svg"));
        }
    });

    document.querySelectorAll(".hero-bg").forEach(bg => {
        let style = bg.style.backgroundImage;
        if (!style) return;

        if (isLight) {
            if (!style.includes("_svetly.svg")) {
                bg.style.backgroundImage = style.replace(".svg", "_svetly.svg");
            }
        } else {
            bg.style.backgroundImage = style.replace("_svetly.svg", ".svg");
        }
    });
}

// ==========================================
// 3. SPRÁVA JAZYKA (CZ / EN)
// ==========================================
const langGroups = document.querySelectorAll("#lang-toggle");

langGroups.forEach(group => {
    group.querySelectorAll(".toggle-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const selectedLang = btn.dataset.lang;
            localStorage.setItem("lang", selectedLang);

            document.querySelectorAll("#lang-toggle .toggle-btn").forEach(b => {
                b.classList.toggle("active", b.dataset.lang === selectedLang);
            });
        });
    });
});

const savedLang = localStorage.getItem("lang") || "cs";
document.querySelectorAll("#lang-toggle .toggle-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.lang === savedLang);
});

// ==========================================
// 4. SYSTEM READY LOGIKA
// ==========================================
const projectGrid = document.getElementById("project-grid");
if (projectGrid?.querySelectorAll(".card").length > 0) {
    document.body.classList.add("system-ready");
}