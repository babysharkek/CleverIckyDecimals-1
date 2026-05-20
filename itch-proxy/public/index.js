"use strict";

/* ── Disguise picker ── */
const faviconEl = document.getElementById("dynamic-favicon");

function applyDisguise(btn) {
        document.querySelectorAll(".dsg-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const title = btn.getAttribute("data-title");
        const icon = btn.getAttribute("data-icon");
        document.title = title;
        if (faviconEl) faviconEl.href = icon + "?v=" + Date.now();
}

const dsgBtns = document.querySelectorAll(".dsg-btn");
// Apply first disguise on load
if (dsgBtns.length) applyDisguise(dsgBtns[0]);

dsgBtns.forEach((btn) => {
        btn.addEventListener("click", () => applyDisguise(btn));
});

/* ── uFuzzy search suggestions ── */
const suggestionsData = [
        { label: "YouTube", url: "https://www.youtube.com" },
        { label: "TikTok", url: "https://www.tiktok.com" },
        { label: "Google", url: "https://www.google.com" },
        { label: "Gemini", url: "https://gemini.google.com" },
        { label: "ChatGPT", url: "https://chatgpt.com" },
        { label: "Claude AI", url: "https://claude.ai" },
        { label: "Microsoft Copilot", url: "https://copilot.microsoft.com" },
        { label: "Perplexity AI", url: "https://www.perplexity.ai" },
        { label: "Instagram", url: "https://www.instagram.com" },
        { label: "Twitter / X", url: "https://x.com" },
        { label: "Reddit", url: "https://www.reddit.com" },
        { label: "Discord", url: "https://discord.com" },
        { label: "Snapchat", url: "https://www.snapchat.com" },
        { label: "Facebook", url: "https://www.facebook.com" },
        { label: "LinkedIn", url: "https://www.linkedin.com" },
        { label: "Pinterest", url: "https://www.pinterest.com" },
        { label: "Threads", url: "https://www.threads.net" },
        { label: "Tumblr", url: "https://www.tumblr.com" },
        { label: "WhatsApp Web", url: "https://web.whatsapp.com" },
        { label: "Telegram Web", url: "https://web.telegram.org" },
        { label: "Netflix", url: "https://www.netflix.com" },
        { label: "Disney+", url: "https://www.disneyplus.com" },
        { label: "Hulu", url: "https://www.hulu.com" },
        { label: "Max HBO", url: "https://www.max.com" },
        { label: "Crunchyroll", url: "https://www.crunchyroll.com" },
        { label: "Twitch", url: "https://www.twitch.tv" },
        { label: "Vimeo", url: "https://vimeo.com" },
        { label: "DailyMotion", url: "https://www.dailymotion.com" },
        { label: "Paramount+", url: "https://www.paramountplus.com" },
        { label: "Peacock TV", url: "https://www.peacocktv.com" },
        { label: "Funimation", url: "https://www.funimation.com" },
        { label: "AniWave", url: "https://aniwave.to" },
        { label: "MyAnimeList", url: "https://myanimelist.net" },
        { label: "Cinekada", url: "https://cinekada.com" },
        { label: "Flixmomo", url: "https://flixmomo.us" },
        { label: "JustAnime", url: "https://justanime.to" },
        { label: "Footballia", url: "https://www.footballia.net" },
        { label: "Spotify", url: "https://open.spotify.com" },
        { label: "SoundCloud", url: "https://soundcloud.com" },
        { label: "Apple Music", url: "https://music.apple.com" },
        { label: "YouTube Music", url: "https://music.youtube.com" },
        { label: "Bandcamp", url: "https://bandcamp.com" },
        { label: "GitHub", url: "https://github.com" },
        { label: "GitLab", url: "https://gitlab.com" },
        { label: "Replit", url: "https://replit.com" },
        { label: "CodePen", url: "https://codepen.io" },
        { label: "Stack Overflow", url: "https://stackoverflow.com" },
        { label: "MDN Web Docs", url: "https://developer.mozilla.org" },
        { label: "NPM", url: "https://www.npmjs.com" },
        { label: "Vercel", url: "https://vercel.com" },
        { label: "Netlify", url: "https://www.netlify.com" },
        { label: "Wikipedia", url: "https://www.wikipedia.org" },
        { label: "DuckDuckGo", url: "https://duckduckgo.com" },
        { label: "Bing", url: "https://www.bing.com" },
        { label: "Yahoo", url: "https://www.yahoo.com" },
        { label: "Google Classroom", url: "https://classroom.google.com" },
        { label: "Edpuzzle", url: "https://edpuzzle.com" },
        { label: "DeltaMath", url: "https://www.deltamath.com" },
        { label: "Quizlet", url: "https://quizlet.com" },
        { label: "Khan Academy", url: "https://www.khanacademy.org" },
        { label: "Kahoot", url: "https://kahoot.it" },
        { label: "Blooket", url: "https://www.blooket.com" },
        { label: "Gimkit", url: "https://www.gimkit.com" },
        { label: "Duolingo", url: "https://www.duolingo.com" },
        { label: "Coursera", url: "https://www.coursera.org" },
        { label: "Udemy", url: "https://www.udemy.com" },
        { label: "Codecademy", url: "https://www.codecademy.com" },
        { label: "FreeCodeCamp", url: "https://www.freecodecamp.org" },
        { label: "W3Schools", url: "https://www.w3schools.com" },
        { label: "Brilliant", url: "https://brilliant.org" },
        { label: "WolframAlpha", url: "https://www.wolframalpha.com" },
        { label: "Schoology", url: "https://www.schoology.com" },
        { label: "Blackboard", url: "https://www.blackboard.com" },
        { label: "Canvas LMS", url: "https://canvas.instructure.com" },
        { label: "edX", url: "https://www.edx.org" },
        { label: "Roblox", url: "https://www.roblox.com" },
        { label: "Minecraft", url: "https://www.minecraft.net" },
        { label: "Steam Store", url: "https://store.steampowered.com" },
        { label: "Steam Community", url: "https://steamcommunity.com" },
        { label: "Epic Games Store", url: "https://store.epicgames.com" },
        { label: "Chess.com", url: "https://www.chess.com" },
        { label: "Lichess", url: "https://lichess.org" },
        { label: "CrazyGames", url: "https://www.crazygames.com" },
        { label: "Poki", url: "https://poki.com" },
        { label: "CoolMath Games", url: "https://www.coolmathgames.com" },
        { label: "Armor Games", url: "https://armorgames.com" },
        { label: "Newgrounds", url: "https://www.newgrounds.com" },
        { label: "Itch.io", url: "https://itch.io" },
        { label: "Wordle", url: "https://www.nytimes.com/games/wordle" },
        { label: "Kongregate", url: "https://www.kongregate.com" },
        { label: "Miniclip", url: "https://www.miniclip.com" },
        { label: "Y8 Games", url: "https://www.y8.com" },
        { label: "Kizi", url: "https://kizi.com" },
        { label: "IGN", url: "https://www.ign.com" },
        { label: "GameSpot", url: "https://www.gamespot.com" },
        { label: "Metacritic", url: "https://www.metacritic.com" },
        { label: "Nexus Mods", url: "https://www.nexusmods.com" },
        { label: "CurseForge", url: "https://www.curseforge.com" },
        { label: "Polygon", url: "https://www.polygon.com" },
        { label: "Amazon", url: "https://www.amazon.com" },
        { label: "eBay", url: "https://www.ebay.com" },
        { label: "Walmart", url: "https://www.walmart.com" },
        { label: "Target", url: "https://www.target.com" },
        { label: "Best Buy", url: "https://www.bestbuy.com" },
        { label: "Etsy", url: "https://www.etsy.com" },
        { label: "Temu", url: "https://www.temu.com" },
        { label: "Shein", url: "https://www.shein.com" },
        { label: "AliExpress", url: "https://www.aliexpress.com" },
        { label: "Google Drive", url: "https://drive.google.com" },
        { label: "Google Docs", url: "https://docs.google.com" },
        { label: "Google Sheets", url: "https://sheets.google.com" },
        { label: "Google Maps", url: "https://maps.google.com" },
        { label: "Google Translate", url: "https://translate.google.com" },
        { label: "Gmail", url: "https://mail.google.com" },
        { label: "Outlook", url: "https://outlook.live.com" },
        { label: "Microsoft 365", url: "https://www.office.com" },
        { label: "OneDrive", url: "https://onedrive.live.com" },
        { label: "Dropbox", url: "https://www.dropbox.com" },
        { label: "Notion", url: "https://www.notion.so" },
        { label: "Trello", url: "https://trello.com" },
        { label: "Slack", url: "https://slack.com" },
        { label: "Zoom", url: "https://zoom.us" },
        { label: "Google Meet", url: "https://meet.google.com" },
        { label: "Figma", url: "https://www.figma.com" },
        { label: "Canva", url: "https://www.canva.com" },
        { label: "Unsplash", url: "https://unsplash.com" },
        { label: "Pexels", url: "https://www.pexels.com" },
        { label: "Imgur", url: "https://imgur.com" },
        { label: "Giphy", url: "https://giphy.com" },
        { label: "IMDb", url: "https://www.imdb.com" },
        { label: "Rotten Tomatoes", url: "https://www.rottentomatoes.com" },
        { label: "Letterboxd", url: "https://letterboxd.com" },
        { label: "BBC News", url: "https://www.bbc.com/news" },
        { label: "CNN", url: "https://www.cnn.com" },
        { label: "ESPN", url: "https://www.espn.com" },
        { label: "NBA", url: "https://www.nba.com" },
        { label: "NFL", url: "https://www.nfl.com" },
        { label: "FIFA", url: "https://www.fifa.com" },
        { label: "The Verge", url: "https://www.theverge.com" },
        { label: "TechCrunch", url: "https://techcrunch.com" },
        { label: "Hacker News", url: "https://news.ycombinator.com" },
        { label: "Product Hunt", url: "https://www.producthunt.com" },
        { label: "Medium", url: "https://medium.com" },
        { label: "Substack", url: "https://substack.com" },
        { label: "PayPal", url: "https://www.paypal.com" },
        { label: "Speedtest", url: "https://www.speedtest.net" },
        { label: "Wayback Machine", url: "https://archive.org" },
        { label: "Temp Mail", url: "https://temp-mail.org" },
        { label: "TED Talks", url: "https://www.ted.com" },
        { label: "Britannica", url: "https://www.britannica.com" },
        { label: "National Geographic", url: "https://www.nationalgeographic.com" },
        { label: "Weather.com", url: "https://weather.com" },
        { label: "Google Fonts", url: "https://fonts.google.com" },
        { label: "Dribbble", url: "https://dribbble.com" },
        { label: "Behance", url: "https://www.behance.net" },
];

const TOP_SITES = ["YouTube","TikTok","Instagram","Reddit","Netflix","Discord","Spotify","ChatGPT","Google","Twitch"];

function filterSites(query) {
        const q = query.trim().toLowerCase();
        if (!q) return TOP_SITES.map(n => suggestionsData.find(d => d.label === n)).filter(Boolean);
        return suggestionsData.filter(d =>
                d.label.toLowerCase().includes(q) || d.url.toLowerCase().includes(q)
        ).slice(0, 8);
}

/* ── Core elements ── */
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

/* ── Algolia Autocomplete ── */
const { autocomplete } = window['@algolia/autocomplete-js'];

autocomplete({
        container: '#autocomplete',
        placeholder: 'Search or enter a URL…',
        openOnFocus: true,
        detachedMediaQuery: 'none',
        getSources({ query }) {
                return [{
                        sourceId: 'sites',
                        getItems() { return filterSites(query); },
                        templates: {
                                item({ item, html }) {
                                        return html`
                                                <div class="aa-ItemContent">
                                                        <div class="aa-ItemContentBody">
                                                                <div class="aa-ItemContentTitle">${item.label}</div>
                                                                <div class="aa-ItemContentDescription">${item.url.replace(/^https?:\/\//, '')}</div>
                                                        </div>
                                                </div>`;
                                },
                        },
                        onSelect({ item, setQuery, refresh }) {
                                navigate(item.url);
                                setQuery('');
                                refresh();
                        },
                }];
        },
        onSubmit({ state, setQuery, refresh }) {
                if (!state.query.trim()) return;
                const url = search(state.query, searchEngine.value);
                navigate(url);
                setQuery('');
                refresh();
        },
});

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
