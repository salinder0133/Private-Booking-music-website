🎵 Private Booking Music Website

A High-Fidelity Cyberpunk-themed demo website designed for artist booking and music streaming. This project showcases advanced frontend skills, focusing on Glassmorphism UI, 3D interactions, and a custom-built audio engine.

⚠️ Disclaimer: > This website is a frontend portfolio project. It is not connected to any real management service. No actual payments or bookings are processed.

🚀 Live Demo

👉 Experience the site here: https://salinder0133.github.io/Private-Booking-music-website/

✨ Key Features

1. 🎨 Cyberpunk & Glassmorphism UI

Neon Aesthetics: Deep space background (#050510) with floating ambient lights in Cyan and Pink.

Glass Effect: Translucent cards using backdrop-filter: blur(20px) and semi-transparent borders.

Glow Effects: Text shadows and box shadows that create a glowing neon sign effect (text-shadow, box-shadow).

2. 🎧 Custom Audio Player Engine

Dynamic Playlist: JavaScript object-based track management.

Real-time Visualizers: CSS Keyframe animations (@keyframes bounce) simulating music beats.

Smart Controls: Play/Pause, Next/Prev, and a functional Seek Bar (Range Slider).

Auto-Play Logic: Automatically plays the next track when the current one ends.

3. 🧊 3D Holographic Tilt Effect

Interactive Cards: Elements rotate in 3D space based on mouse position.

Physics: Uses perspective(800px), rotateX, and rotateY for a realistic depth feel.

Optimization: Logic automatically adjusts for mobile touch screens vs desktop mouse movement.

4. 📱 Fully Responsive Design

Mobile-First Menu: A custom hamburger menu transition for screens smaller than 768px.

Fluid Grids: Uses CSS Grid (repeat(auto-fit, minmax(...))) to adapt layouts for any screen size.

Touch-Friendly: Buttons and inputs are sized for easy interaction on touch devices.

🛠️ Technologies Used

Category

Tech Stack

Structure

HTML5 Semantic Tags

Styling

CSS3 (Variables, Animations, Flexbox, Grid, Backdrop-Filter)

Logic

JavaScript (ES6+, IntersectionObserver, Audio API)

Assets

Google Fonts (Poppins), FontAwesome (Icons)

📂 Folder Structure

root/
│
├─ index.html          # Main structure
├─ script.js           # Audio logic, 3D tilt, Form handling
├─ style.css           # Cyberpunk theme & Animations
├─ photos/             # Assets directory
│  ├─ about/           # About section images
│  ├─ gallery/         # Gallery grid images
│  ├─ music/           # Album arts & MP3 files
│  └─ (Hero images)


🧠 Code Highlights

CSS Variables (Cyberpunk Palette)

The site uses a centralized variable system for consistent theming.

:root {
    --bg-dark: #050510;
    --accent-cyan: #00f2ff;
    --accent-pink: #ff00d4;
    --glass-bg: rgba(255, 255, 255, 0.05);
    --text-glow-cyan: 0 0 10px rgba(0, 242, 255, 0.8);
}


Ambient Background Animation

Moving lights created using pseudo-elements (::before, ::after) and keyframes.

@keyframes floatLight {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
}


📜 License

This project is licensed under the MIT License.

Copyright (c) 2025 Salinder0133

You are free to use, modify, and distribute this project.

Credit is required – please retain the copyright notice.
