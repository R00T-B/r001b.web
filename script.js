document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById("splash-screen");
    const term = document.getElementById("terminal-content");
    const container = document.getElementById("main-container");
    const dots = document.querySelectorAll(".dot");
    const navItems = document.querySelectorAll(".nav-item");

    // 1. BOOT SEQUENCE
    const logs = ["INITIALIZING CORE...", "BYPASSING FIREWALL...", "NODE r001B: CONNECTED", "WELCOME OPERATOR.", "APEX AI READY FOR COMMANDS."];
    let l = 0;
    function runBoot() {
        if(l < logs.length) {
            const p = document.createElement("div"); p.textContent = `> ${logs[l++]}`;
            term.appendChild(p); setTimeout(runBoot, 450);
        } else {
            setTimeout(() => { splash.style.opacity = "0"; setTimeout(() => splash.remove(), 1000); }, 1000);
        }
    }
    runBoot();

    // 2. LIVE CLOCK & WIDGETS
    setInterval(() => {
        document.getElementById("live-clock").textContent = new Date().toLocaleTimeString();
    }, 1000);

    // 3. 3D MOUSE PARALLAX
    document.addEventListener("mousemove", (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 45;
        const y = (window.innerHeight / 2 - e.pageY) / 45;
        document.querySelectorAll(".glitch-box").forEach(el => {
            el.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        });
    });

    // 4. SCROLL SPY (Nav & Dots Update)
    container.addEventListener("scroll", () => {
        const idx = Math.round(container.scrollTop / container.offsetHeight);
        dots.forEach((d, i) => d.classList.toggle("active", i === idx));
        navItems.forEach((n, i) => n.classList.toggle("active", i === idx));
        
        // Glitch effect on scroll
        document.body.style.filter = "hue-rotate(10deg) brightness(1.2)";
        setTimeout(() => document.body.style.filter = "none", 50);
    });

    // 5. KALI BACKGROUND FLOW
    const bgFlow = document.getElementById("kali-bg-flow");
    const cmds = ["ssh root@target", "nmap -A 10.0.0.1", "exploit(handler) > run", "cat /etc/passwd"];
    function createBg() {
        const d = document.createElement("div");
        d.textContent = `[${new Date().toLocaleTimeString()}] > ${cmds[Math.floor(Math.random()*cmds.length)]}`;
        bgFlow.appendChild(d);
        if(bgFlow.childNodes.length > 35) bgFlow.removeChild(bgFlow.firstChild);
        setTimeout(createBg, 250);
    }
    createBg();
});

function scrollToPanel(index) {
    const container = document.getElementById("main-container");
    container.scrollTo({ top: container.offsetHeight * index, behavior: 'smooth' });
}