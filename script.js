document.addEventListener('DOMContentLoaded', () => {

    // =======================
    // 1. Hero Background Slideshow
    // =======================
    const hero = document.querySelector('.hero');
    const images = ['photos/photo1.jpg', 'photos/photo2.jpg', 'photos/photo3.jpg'];
    let current = 0;

    // Preload images to prevent flickering
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    function changeBackground() {
        if (hero) {
            hero.style.transition = "background-image 1s ease-in-out";
            // FIX: Added backticks for template literal
            hero.style.backgroundImage = `url('${images[current]}')`;
            current = (current + 1) % images.length;
        }
    }

    // Start slideshow
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
                // FIX: Added backticks for template literal
                card.style.transform = `perspective(800px) rotateY(${xMove}deg) rotateX(${-yMove}deg) scale(1.01)`;
            } else {
                card.style.transition = "transform 0.5s ease-out, box-shadow 0.3s";
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
        { title: "Fakira", img: "photos/music/music3n.jpeg", src: "photos/music/Fakira.mp3" },
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

    // Only run music logic if grid exists
    if (grid) {
        // --- Generate Cards ---
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

        // --- Initialize Logic (After DOM Update) ---
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
                        if (audio.paused) {
                            playPlayerAtIndex(index);
                        } else {
                            audio.pause();
                            updateUI();
                        }
                    });

                    audio.addEventListener('ended', () => {
                        let next = (currentPlayerIndex + 1) % players.length;
                        playPlayerAtIndex(next);
                    });

                    players.push({ audio, cardBtn, visualizer, title: tracksData[index].title });
                }
            });
        }, 200);
    }

    // --- Player Functions ---
    function playPlayerAtIndex(index) {
        if (players.length === 0) return;
        
        players.forEach((p, i) => {
            if (i !== index) {
                p.audio.pause();
                p.audio.currentTime = 0;
            }
        });
        const target = players[index];
        target.audio.play().catch(e => console.log("Autoplay prevented:", e));
        currentPlayerIndex = index;
        if(trackNameDisplay) trackNameDisplay.innerText = target.title;
        updateUI();
    }

    function updateUI() {
        if (players.length === 0) return;

        players.forEach((p) => {
            if (!p.audio.paused) {
                p.cardBtn.innerHTML = "⏸";
                p.visualizer.style.opacity = "1";
                p.cardBtn.style.boxShadow = "0 0 30px var(--accent-pink), 0 0 10px #fff";
                p.cardBtn.style.background = "linear-gradient(135deg, var(--accent-pink), var(--accent-purple))";
            } else {
                p.cardBtn.innerHTML = "▶";
                p.visualizer.style.opacity = "0";
                p.cardBtn.style.boxShadow = "0 0 20px var(--accent-cyan)";
                p.cardBtn.style.background = "linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))";
            }
        });

        if(playPauseBtnGlobal) {
            const currentAudio = players[currentPlayerIndex].audio;
            playPauseBtnGlobal.innerHTML = currentAudio.paused ? "▶" : "⏸";
        }
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

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if(players.length > 0) playPlayerAtIndex((currentPlayerIndex + 1) % players.length);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if(players.length > 0) playPlayerAtIndex((currentPlayerIndex - 1 + players.length) % players.length);
        });
    }


    // =======================
    // 5. POPUPS, FORMS & TIMER
    // =======================
    const privatePopup = document.getElementById("private-popup");
    const showPopup = document.getElementById("show-popup");
    const privateBtn = document.getElementById("private-book-btn");

    if (privateBtn && privatePopup) {
        privateBtn.addEventListener("click", (e) => {
            e.preventDefault();
            privatePopup.classList.add("active");
        });
    }

    document.querySelectorAll(".close").forEach(btn => {
        btn.addEventListener("click", () => document.querySelectorAll(".popup").forEach(p => p.classList.remove("active")));
    });

    window.addEventListener('click', (e) => {
        document.querySelectorAll(".popup").forEach(p => {
            if (e.target == p) p.classList.remove("active");
        });
    });

    const showsByMonth = {
        aug: ["Kolkata • 26 Aug 2025", "Agra • 20 Dec 2025"],
        sep: ["Delhi • 3 Sep 2025", "Mumbai • 10 Sep 2025"],
        oct: ["Pune • 2 Oct 2025", "Hyderabad • 15 Oct 2025"]
    };
    
    const showSelect = document.getElementById("show-select");
    document.querySelectorAll(".book-show-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            const month = btn.getAttribute("data-month");
            const shows = showsByMonth[month] || [];
            if (showSelect && showPopup) {
                showSelect.innerHTML = '<option value="">Select Show</option>';
                shows.forEach(show => {
                    const option = document.createElement("option");
                    option.value = show;
                    option.textContent = show;
                    showSelect.appendChild(option);
                });
                showPopup.classList.add("active");
            }
        });
    });

    // Toast Notification
    function showToast(msg) {
        const div = document.createElement('div');
        div.innerText = msg;
        div.style.position = 'fixed';
        div.style.bottom = '100px';
        div.style.right = '20px';
        div.style.background = 'rgba(0, 242, 255, 0.1)';
        div.style.color = '#fff';
        div.style.padding = '15px 25px';
        div.style.borderRadius = '15px';
        div.style.border = '1px solid var(--accent-cyan)';
        div.style.boxShadow = '0 0 20px rgba(0, 242, 255, 0.3)';
        div.style.zIndex = '3000';
        div.style.fontWeight = '600';
        div.style.backdropFilter = 'blur(10px)';
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 3000);
    }

    document.querySelectorAll('form').forEach(f => {
        f.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast("🚀 Request Initiated successfully!");
            document.querySelectorAll(".popup").forEach(p => p.classList.remove("active"));
            f.reset();
        });
    });

    // FIX: Completed the Timer Logic
    function startPrivateBookingTimer() {
        const timerElement = document.getElementById("private-timer");
        if (!timerElement) return;

        const expiryDate = new Date("2025-12-31T23:59:59").getTime();

        const updateTimer = setInterval(() => {
            const now = new Date().getTime();
            const distance = expiryDate - now;

            if (distance < 0) {
                clearInterval(updateTimer);
                timerElement.innerHTML = "OFFER EXPIRED";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update display - assumes element accepts text, or adjust HTML structure
            timerElement.innerHTML = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
        }, 1000);
    }

    // Initialize Timer
    startPrivateBookingTimer();

});


