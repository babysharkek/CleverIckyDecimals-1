"use strict";

const form = document.getElementById("sj-form");
const address = document.getElementById("sj-address");
const searchEngine = document.getElementById("sj-search-engine");
const error = document.getElementById("sj-error");
const errorCode = document.getElementById("sj-error-code");
const homeScreen = document.getElementById("sj-home");
const browserUI = document.getElementById("sj-browser");
const frame = document.getElementById("sj-frame");
const navBack = document.getElementById("nav-back");
const navForward = document.getElementById("nav-forward");
const navRefresh = document.getElementById("nav-refresh");
const navHome = document.getElementById("nav-home");
const navUrl = document.getElementById("nav-url");
const navForm = document.getElementById("nav-form");

const { ScramjetController } = $scramjetLoadController();

let wispUrl =
        (location.protocol === "https:" ? "wss" : "ws") +
        "://" +
        location.host +
        "/wisp/";

const scramjet = new ScramjetController({
        files: {
                wasm: "/scram/scramjet.wasm.wasm",
                all: "/scram/scramjet.all.js",
                sync: "/scram/scramjet.sync.js",
        },
        wisp: wispUrl,
});

scramjet.init();

async function ensureSW() {
        try {
                if (!(await registerSW())) {
                        setTimeout(() => window.location.reload(), 1000);
                }
        } catch (err) {
                error.textContent = "Failed to register service worker.";
                errorCode.textContent = err.toString();
                throw err;
        }
}

function showBrowser() {
        homeScreen.style.display = "none";
        browserUI.style.display = "flex";
}

function showHome() {
        homeScreen.style.display = "flex";
        browserUI.style.display = "none";
        frame.src = "about:blank";
}

function getFrameUrl() {
        try {
                const raw = frame.contentWindow.location.href;
                return scramjet.decodeUrl ? scramjet.decodeUrl(raw) : raw;
        } catch {
                return "";
        }
}

function updateNavUrl() {
        const url = getFrameUrl();
        if (url && url !== "about:blank") {
                navUrl.value = url;
        }
}

function updateNavButtons() {
        try {
                navBack.disabled = !frame.contentWindow.history.length || frame.contentWindow.history.length <= 1;
        } catch {
                navBack.disabled = true;
        }
}

async function navigate(url) {
        await ensureSW();
        showBrowser();
        const encoded = scramjet.encodeUrl(url);
        frame.src = encoded;
        navUrl.value = url;
}

frame.addEventListener("load", () => {
        updateNavUrl();
        updateNavButtons();
});

if (form) {
        form.addEventListener("submit", async (event) => {
                event.preventDefault();
                const url = search(address.value, searchEngine.value);
                await navigate(url);
                address.value = "";
        });
}

navForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const url = search(navUrl.value, searchEngine.value);
        await navigate(url);
});

navBack.addEventListener("click", () => {
        try {
                frame.contentWindow.history.back();
        } catch {}
});

navForward.addEventListener("click", () => {
        try {
                frame.contentWindow.history.forward();
        } catch {}
});

navRefresh.addEventListener("click", () => {
        try {
                frame.contentWindow.location.reload();
        } catch {
                frame.src = frame.src;
        }
});

navHome.addEventListener("click", () => {
        showHome();
});

document.querySelectorAll(".ql-card").forEach((card) => {
        card.addEventListener("click", async (e) => {
                e.preventDefault();
                const url = card.getAttribute("data-url");
                if (url) await navigate(url);
        });
});
