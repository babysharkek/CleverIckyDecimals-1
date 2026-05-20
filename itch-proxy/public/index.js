"use strict";

/* ── Disguise picker ── */
const faviconEl = document.getElementById("dynamic-favicon");

document.querySelectorAll(".dsg-btn").forEach((btn) => {
	btn.addEventListener("click", () => {
		document.querySelectorAll(".dsg-btn").forEach(b => b.classList.remove("active"));
		btn.classList.add("active");
		const title = btn.getAttribute("data-title");
		const icon = btn.getAttribute("data-icon");
		document.title = title || "Infamous Proxy";
		if (faviconEl) faviconEl.href = icon ? icon + "?v=" + Date.now() : "favicon.ico";
	});
});

/* ── uFuzzy search suggestions ── */
const suggestionsData = [
	{ label: "YouTube", url: "https://www.youtube.com" },
	{ label: "TikTok", url: "https://www.tiktok.com" },
	{ label: "Google", url: "https://www.google.com" },
	{ label: "Gemini", url: "https://gemini.google.com" },
	{ label: "Footballia", url: "https://www.footballia.net" },
	{ label: "JustAnime", url: "https://justanime.to" },
	{ label: "Cinekada", url: "https://cinekada.com" },
	{ label: "Flixmomo", url: "https://flixmomo.us" },
	{ label: "DuckDuckGo", url: "https://duckduckgo.com" },
	{ label: "Reddit", url: "https://www.reddit.com" },
	{ label: "Instagram", url: "https://www.instagram.com" },
	{ label: "Twitter / X", url: "https://x.com" },
	{ label: "Netflix", url: "https://www.netflix.com" },
	{ label: "Twitch", url: "https://www.twitch.tv" },
	{ label: "Spotify", url: "https://open.spotify.com" },
	{ label: "GitHub", url: "https://github.com" },
	{ label: "Wikipedia", url: "https://www.wikipedia.org" },
	{ label: "Google Classroom", url: "https://classroom.google.com" },
	{ label: "Edpuzzle", url: "https://edpuzzle.com" },
	{ label: "DeltaMath", url: "https://www.deltamath.com" },
	{ label: "Quizlet", url: "https://quizlet.com" },
	{ label: "Khan Academy", url: "https://www.khanacademy.org" },
	{ label: "Kahoot", url: "https://kahoot.it" },
];

const haystack = suggestionsData.map(d => d.label);
let uf;
try { uf = new uFuzzy(); } catch {}

const sugBox = document.getElementById("sj-suggestions");
let activeIdx = -1;

function renderSuggestions(items) {
	if (!items.length) { sugBox.style.display = "none"; return; }
	sugBox.innerHTML = items.slice(0, 6).map((item, i) =>
		`<div class="sug-item" data-idx="${i}" data-url="${item.url}">
			<i class="hgi hgi-stroke hgi-search-01"></i>${item.label}
		</div>`
	).join("");
	sugBox.style.display = "block";
	activeIdx = -1;
	sugBox.querySelectorAll(".sug-item").forEach(el => {
		el.addEventListener("mousedown", (e) => {
			e.preventDefault();
			navigateToSuggestion(el.getAttribute("data-url"));
		});
	});
}

function hideSuggestions() {
	sugBox.style.display = "none";
	activeIdx = -1;
}

async function navigateToSuggestion(url) {
	hideSuggestions();
	address.value = "";
	await navigate(url);
}

/* ── Core elements ── */
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

const { ScramjetController } = $scramjetLoadController();

let wispUrl =
	(location.protocol === "https:" ? "wss" : "ws") +
	"://" + location.host + "/wisp/";

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
}

/* ── Input suggestions ── */
address.addEventListener("input", () => {
	const q = address.value.trim();
	if (!q) { hideSuggestions(); return; }
	if (!uf) return;
	const idxs = uf.filter(haystack, q);
	if (!idxs || !idxs.length) { hideSuggestions(); return; }
	renderSuggestions(idxs.slice(0, 6).map(i => suggestionsData[i]));
});

address.addEventListener("keydown", (e) => {
	const items = sugBox.querySelectorAll(".sug-item");
	if (!items.length) return;
	if (e.key === "ArrowDown") {
		e.preventDefault();
		activeIdx = Math.min(activeIdx + 1, items.length - 1);
		items.forEach((el, i) => el.classList.toggle("active", i === activeIdx));
	} else if (e.key === "ArrowUp") {
		e.preventDefault();
		activeIdx = Math.max(activeIdx - 1, -1);
		items.forEach((el, i) => el.classList.toggle("active", i === activeIdx));
	} else if (e.key === "Escape") {
		hideSuggestions();
	} else if (e.key === "Enter" && activeIdx >= 0) {
		e.preventDefault();
		navigateToSuggestion(items[activeIdx].getAttribute("data-url"));
	}
});

address.addEventListener("blur", () => setTimeout(hideSuggestions, 150));

/* ── Form submit ── */
if (form) {
	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		hideSuggestions();
		const url = search(address.value, searchEngine.value);
		await navigate(url);
		address.value = "";
	});
}

/* ── Nav buttons ── */
frame.addEventListener("load", () => {
	updateNavButtons();
	try {
		frame.contentWindow.open = function (url) {
			if (url) navigate(String(url));
			return null;
		};
	} catch {}
});

navBack.addEventListener("click", () => { try { frame.contentWindow.history.back(); } catch {} });
navForward.addEventListener("click", () => { try { frame.contentWindow.history.forward(); } catch {} });
navRefresh.addEventListener("click", () => {
	try { frame.contentWindow.location.reload(); } catch { frame.src = frame.src; }
});
navHome.addEventListener("click", () => showHome());

document.querySelectorAll(".ql-card").forEach((card) => {
	card.addEventListener("click", async (e) => {
		e.preventDefault();
		const url = card.getAttribute("data-url");
		if (url) await navigate(url);
	});
});
