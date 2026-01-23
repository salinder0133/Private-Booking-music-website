document.addEventListener('DOMContentLoaded', () => {

    // =======================
    // 1. Hero Background Slideshow
    // =======================
    const hero = document.querySelector('.hero');
    const images = ['photos/photo1.jpg', 'photos/photo2.jpg', 'photos/photo3.jpg'];
    let current = 0;

    function changeBackground() {
        if (hero) {
            hero.style.transition = "background-image 1s ease-in-out";
            hero.style.backgroundImage = `url('${images[current]}')`;
            current = (current + 1) % images.length;
        }
    }

    if (hero) {
        setTimeout(() => {
            changeBackground();
            setInterval(changeBackground, 5000);
        }, 100);
    }

    // =======================
    // 2. Scroll Reveal Animation
    // =======================
    const revealElements = document.querySelectorAll("section");
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // =======================
    // 3. 3D Holographic Tilt Effect
    // =======================
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;
        document.querySelectorAll('.card, .month, .hero').forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
                const xMove = (x - rect.width / 2) / 25;
                const yMove = (y - rect.height / 2) / 25;
                card.style.transform = `perspective(800px) rotateY(${xMove}deg) rotateX(${-yMove}deg) scale(1.01)`;
            } else {
                card.style.transition = "transform 0.5s ease-out";
                card.style.transform = `perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)`;
            }
        });
    });

    // =======================
    // 4. MUSIC PLAYER SYSTEM
    // =======================
    const tracksData = [
        { title: "Jhol", img: "photos/music/music1.jpeg", src: "photos/music/jhol.mp3" },
        { title: "Dil Ibaadat", img: "photos/music/music2.jpeg", src: "photos/music/Dil Ibaadat.mp3" },
        { title: "Fakira", img: "photos/music/music3fix.jpeg", src: "photos/music/Fakira.mp3" },
        { title: "Tu Hi Haqeeqat", img: "photos/music/music4.jpeg", src: "photos/music/Tu Hi Haqeeqat.mp3" },
        { title: "Gale Lag Ja", img: "photos/music/music5.jpeg", src: "photos/music/Gale Lag Ja.mp3" }
    ];

    const grid = document.getElementById("musicGrid");
    const playPauseBtnGlobal = document.getElementById('playPauseBtn');
    const trackNameDisplay = document.getElementById('track-name-display');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    let currentPlayerIndex = 0;
    let players = [];

    if (grid) {
        tracksData.forEach((track, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <div class="visualizer-container">
                    <div class="bar" style="animation-delay: 0s"></div>
                    <div class="bar" style="animation-delay: 0.2s"></div>
                    <div class="bar" style="animation-delay: 0.4s"></div>
                </div>
                <img src="${track.img}" loading="lazy" alt="${track.title}" />
                <h3>${track.title}</h3>
                <button class="card-play-btn">▶</button>
                <div class="custom-audio-player" style="margin-top: 15px; width: 100%; padding: 0 10px;">
                    <input type="range" class="seekBar" min="0" value="0" />
                    <audio class="track" src="${track.src}" preload="none"></audio>
                </div>
            `;
            grid.appendChild(card);
        });

        setTimeout(() => {
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                const audio = card.querySelector('.track');
                const seekBar = card.querySelector('.seekBar');
                const cardBtn = card.querySelector('.card-play-btn');
                const visualizer = card.querySelector('.visualizer-container');

                if (audio && seekBar) {
                    audio.addEventListener('loadedmetadata', () => seekBar.max = Math.floor(audio.duration));
                    audio.addEventListener('timeupdate', () => seekBar.value = Math.floor(audio.currentTime));
                    seekBar.addEventListener('input', () => audio.currentTime = seekBar.value);

                    cardBtn.addEventListener('click', () => {
                        audio.paused ? playPlayerAtIndex(index) : (audio.pause(), updateUI());
                    });

                    audio.addEventListener('ended', () => playPlayerAtIndex((currentPlayerIndex + 1) % players.length));
                    players.push({ audio, cardBtn, visualizer, title: tracksData[index].title });
                }
            });
        }, 200);
    }

    function playPlayerAtIndex(index) {
        if (players.length === 0) return;
        players.forEach((p, i) => { if (i !== index) { p.audio.pause(); p.audio.currentTime = 0; } });
        const target = players[index];
        target.audio.play().catch(e => console.log("Play error:", e));
        currentPlayerIndex = index;
        if(trackNameDisplay) trackNameDisplay.innerText = target.title;
        updateUI();
    }

    function updateUI() {
        players.forEach((p) => {
            if (!p.audio.paused) {
                p.cardBtn.innerHTML = "⏸";
                p.visualizer.style.opacity = "1";
            } else {
                p.cardBtn.innerHTML = "▶";
                p.visualizer.style.opacity = "0";
            }
        });
        if(playPauseBtnGlobal) playPauseBtnGlobal.innerHTML = players[currentPlayerIndex].audio.paused ? "▶" : "⏸";
    }

    if (playPauseBtnGlobal) {
        playPauseBtnGlobal.addEventListener('click', () => {
            if (players.length > 0) {
                const current = players[currentPlayerIndex];
                current.audio.paused ? current.audio.play() : current.audio.pause();
                updateUI();
            }
        });
    }

    if (nextBtn) nextBtn.addEventListener('click', () => playPlayerAtIndex((currentPlayerIndex + 1) % players.length));
    if (prevBtn) prevBtn.addEventListener('click', () => playPlayerAtIndex((currentPlayerIndex - 1 + players.length) % players.length));

    // =======================
    // 5. POPUPS & NOTIFICATIONS
    // =======================
    const privatePopup = document.getElementById("private-popup");
    const showPopup = document.getElementById("show-popup");
    const privateBtn = document.getElementById("private-book-btn");

    // Notification Function
    const notifyContainer = document.createElement('div');
    notifyContainer.id = 'notification-container';
    document.body.appendChild(notifyContainer);

    function showNotification(message, type = 'success') {
        const n = document.createElement('div');
        n.className = `notification ${type}`;
        n.innerHTML = `<span>${type === 'success' ? '✅' : '❌'} ${message}</span>`;
        notifyContainer.appendChild(n);
        setTimeout(() => {
            n.classList.add('fade-out');
            n.addEventListener('animationend', () => n.remove());
        }, 3000);
    }

    // Form Submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            if (form.action.includes('ticket.html')) return; // Ticket logic handled by HTML action
            
            e.preventDefault();
            showNotification("Request Sent Successfully!");
            form.reset();
            
            // Close Popups
            document.querySelectorAll('.popup').forEach(p => p.classList.remove('active'));
        });
    });

    // Popup Logic
    if (privateBtn) privateBtn.addEventListener("click", (e) => { e.preventDefault(); privatePopup.classList.add("active"); });
    
    document.querySelectorAll(".close").forEach(btn => {
        btn.addEventListener("click", () => document.querySelectorAll(".popup").forEach(p => p.classList.remove("active")));
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup')) e.target.classList.remove('active');
    });

    // Show Selection Logic
    const showsByMonth = {
        aug: ["Kolkata • 26 Aug 2026", "Agra • 20 Dec 2026"],
        sep: ["Delhi • 3 Sep 2026", "Mumbai • 10 Sep 2026"],
        oct: ["Pune • 2 Oct 2026", "Hyderabad • 15 Oct 2026"]
    };
    
    const showSelect = document.getElementById("show-select");
    document.querySelectorAll(".book-show-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            const month = btn.getAttribute("data-month");
            const shows = showsByMonth[month] || [];
            if (showSelect && showPopup) {
                showSelect.innerHTML = '<option value="">Select Show</option>';
                shows.forEach(s => {
                    const opt = document.createElement("option");
                    opt.value = s; opt.textContent = s;
                    showSelect.appendChild(opt);
                });
                showPopup.classList.add("active");
            }
        });
    });

    // Timer Logic
    const timerElement = document.getElementById("private-timer");
    if (timerElement) {
        const expiryDate = new Date("2026-12-31T23:59:59").getTime();
        setInterval(() => {
            const now = new Date().getTime();
            const dist = expiryDate - now;
            if (dist < 0) { timerElement.innerHTML = "EXPIRED"; return; }
            const d = Math.floor(dist / (1000 * 60 * 60 * 24));
            const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((dist % (1000 * 60)) / 1000);
            timerElement.innerHTML = `${d}d : ${h}h : ${m}m : ${s}s`;
        }, 1000);
    }

    // Navigation Logic
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const showSection = (id) => {
        const targetId = id.replace('#', '') || 'home';
        sections.forEach(sec => sec.style.display = (sec.id === targetId) ? 'block' : 'none');
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${targetId}`));
    };

    window.addEventListener('popstate', () => showSection(window.location.hash));
    showSection(window.location.hash);

});
