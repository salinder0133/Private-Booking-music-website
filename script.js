// =======================
// Background Slideshow
// =======================
const hero = document.querySelector('.hero');
const images = [
  'photos/photo1.jpg',
  'photos/photo2.jpg',
  'photos/photo3.jpg',
  'photos/photo4.jpg'
];
let current = 0;

function changeBackground() {
  if (hero) {
    hero.style.backgroundImage = `url(${images[current]})`;
    current = (current + 1) % images.length;
  }
}
changeBackground();
setInterval(changeBackground, 3000);

// =======================
// Smooth Scroll Navigation
// =======================
const links = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.getElementById(link.getAttribute("href").substring(1));
    if (!target) return;

    sections.forEach(sec => sec.classList.remove("active"));
    target.classList.add("active");

    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    target.scrollIntoView({ behavior: "smooth" });
  });
});

// =======================
// Popups
// =======================
const privatePopup = document.getElementById("private-popup");
const privateBtn = document.getElementById("private-book-btn");
const privateForm = privatePopup?.querySelector("form");

const showPopup = document.getElementById("show-popup");
const showButtons = document.querySelectorAll(".book-show-btn");
const showSelect = document.getElementById("show-select");
const showForm = showPopup?.querySelector("form");

if (privateBtn) {
  privateBtn.addEventListener("click", e => {
    e.preventDefault();
    privatePopup.classList.add("active");
  });
}

// Close popups
document.querySelectorAll(".popup .close").forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    closeBtn.closest(".popup").classList.remove("active");
  });
});
document.querySelectorAll(".popup").forEach(popup => {
  popup.addEventListener("click", e => {
    if (e.target === popup) popup.classList.remove("active");
  });
});

// Shows by month
const showsByMonth = {
  aug: ["Kolkata • 26 Aug 2025", "Agra • 20 Dec 2025"],
  sep: ["Delhi • 3 Sep 2025", "Mumbai • 10 Sep 2025", "Bangalore • 18 Sep 2025"],
  oct: ["Pune • 2 Oct 2025", "Hyderabad • 15 Oct 2025"]
};

showButtons.forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    const month = btn.getAttribute("data-month");
    const shows = showsByMonth[month] || [];

    showSelect.innerHTML = '<option value="">Select Show</option>';
    shows.forEach(show => {
      const option = document.createElement("option");
      option.value = show;
      option.textContent = show;
      showSelect.appendChild(option);
    });

    showPopup.classList.add("active");
    showPopup.querySelector("input[type='text']").focus();
  });
});

// =======================
// Toast Notifications
// =======================
function showToast(message, duration = 3000) {
  const toast = document.createElement("div");
  toast.className = "custom-toast";
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => document.body.removeChild(toast), 300);
  }, duration);
}

// =======================
// Generic Form Handler
// =======================
function handleFormSubmit(form, popup, successMessage) {
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    showToast(successMessage);
    popup.classList.remove("active");
    form.reset();
  });
}

handleFormSubmit(privateForm, privatePopup, "🎉 Your private booking has been submitted!");
handleFormSubmit(showForm, showPopup, "🎫 Your show booking has been submitted!");

// Reason select in private booking
const reasonSelect = document.getElementById("reason-select");
const otherReason = document.getElementById("other-reason");

if (reasonSelect && otherReason) {
  reasonSelect.addEventListener("change", () => {
    if (reasonSelect.value === "other") {
      otherReason.style.display = "block";
      otherReason.required = true;
    } else {
      otherReason.style.display = "none";
      otherReason.required = false;
    }
  });
}

// =======================
// Countdown Timer
// =======================
function startPrivateBookingTimer() {
  const expiryDate = new Date("2025-09-30T23:59:59");
  const timerElement = document.getElementById("private-timer");

  if (!timerElement) return;

  function updateTimer() {
    const now = new Date();
    const diff = expiryDate - now;

    if (diff <= 0) {
      timerElement.innerText = "🎉 Offer Ended — But You Can Still Book!";
      timerElement.style.color = "#ffcc00";
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    timerElement.innerText = `${days}d ${hours}h ${mins}m ${secs}s`;
  }

  const timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
}
startPrivateBookingTimer();

// =======================
// Contact Form
// =======================
const contactForm = document.querySelector("#contact form");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    showToast("📩 Thank you for contacting us! We’ll be in touch.");
    contactForm.reset();
  });
}

// =======================
// Music Player
// =======================
const players = document.querySelectorAll('.custom-audio-player');
const playPauseBtnGlobal = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let currentPlayerIndex = 0;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

players.forEach((player, index) => {
  const audio = player.querySelector('.track');
  const playPauseBtn = player.querySelector('.playPauseBtn');
  const seekBar = player.querySelector('.seekBar');
  const currentTimeEl = player.querySelector('.current-time');
  const durationEl = player.querySelector('.duration');

  // Metadata loaded
  audio.addEventListener('loadedmetadata', () => {
    seekBar.max = Math.floor(audio.duration);
    if (durationEl) durationEl.textContent = formatTime(audio.duration);
  });

  // Play/pause individual
  playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
      // Pause others
      players.forEach((p, i) => {
        const a = p.querySelector('.track');
        const btn = p.querySelector('.playPauseBtn');
        const ct = p.querySelector('.current-time');
        if (i !== index) {
          a.pause();
          a.currentTime = 0;
          btn.textContent = '▶️ Play';
          if (ct) ct.textContent = "0:00";
        }
      });
      audio.play();
      playPauseBtn.textContent = '⏸ Pause';
      currentPlayerIndex = index;
      updateGlobalPlayPauseBtn();
    } else {
      audio.pause();
      playPauseBtn.textContent = '▶️ Play';
      updateGlobalPlayPauseBtn();
    }
  });

  // Timeupdate
  audio.addEventListener('timeupdate', () => {
    seekBar.value = Math.floor(audio.currentTime);
    if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);

    // Last point fix
    if (audio.currentTime >= audio.duration) {
      audio.pause();
      audio.currentTime = 0;
      seekBar.value = 0;
      playPauseBtn.textContent = '▶️ Play';
      if (currentTimeEl) currentTimeEl.textContent = "0:00";
      updateGlobalPlayPauseBtn();
    }
  });

  // Seek with slider
  seekBar.addEventListener('input', () => {
    audio.currentTime = seekBar.value;
    if (audio.currentTime >= audio.duration) {
      audio.pause();
      audio.currentTime = 0;
      seekBar.value = 0;
      playPauseBtn.textContent = '▶️ Play';
      if (currentTimeEl) currentTimeEl.textContent = "0:00";
      updateGlobalPlayPauseBtn();
    }
  });

  audio.addEventListener('ended', () => {
    playPauseBtn.textContent = '▶️ Play';
    seekBar.value = 0;
    if (currentTimeEl) currentTimeEl.textContent = "0:00";
    updateGlobalPlayPauseBtn();
  });
});

// Global Play/Pause Button
function updateGlobalPlayPauseBtn() {
  const audio = players[currentPlayerIndex].querySelector('.track');
  playPauseBtnGlobal.textContent = audio.paused ? '▶️ Play' : '⏸ Pause';
}

function playPlayerAtIndex(index) {
  players.forEach((player, i) => {
    const audio = player.querySelector('.track');
    const btn = player.querySelector('.playPauseBtn');
    const currentTimeEl = player.querySelector('.current-time');
    if (i === index) {
      audio.play();
      btn.textContent = '⏸ Pause';
    } else {
      audio.pause();
      audio.currentTime = 0;
      btn.textContent = '▶️ Play';
      if (currentTimeEl) currentTimeEl.textContent = "0:00";
    }
  });
  currentPlayerIndex = index;
  updateGlobalPlayPauseBtn();
}

// Global Controls
playPauseBtnGlobal.addEventListener('click', () => {
  const audio = players[currentPlayerIndex].querySelector('.track');
  const btn = players[currentPlayerIndex].querySelector('.playPauseBtn');
  if (audio.paused) {
    audio.play();
    btn.textContent = '⏸ Pause';
    playPauseBtnGlobal.textContent = '⏸ Pause';
  } else {
    audio.pause();
    btn.textContent = '▶️ Play';
    playPauseBtnGlobal.textContent = '▶️ Play';
  }
});

nextBtn.addEventListener('click', () => {
  let nextIndex = (currentPlayerIndex + 1) % players.length;
  playPlayerAtIndex(nextIndex);
});

prevBtn.addEventListener('click', () => {
  let prevIndex = (currentPlayerIndex - 1 + players.length) % players.length;
  playPlayerAtIndex(prevIndex);
});



// ✅ Hamburger menu close on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('menu-toggle').checked = false;
  });
});

