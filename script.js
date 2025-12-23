document.addEventListener("DOMContentLoaded", () => {
    const bgFlow = document.getElementById("kali-bg-flow");
    const container = document.getElementById("main-container");
    const splash = document.getElementById("splash-screen");
    const term = document.getElementById("terminal-content");
    const navItems = document.querySelectorAll(".nav-item");

    // 1. KALI ARKA PLAN AKIŞI
    const commands = ["nmap -sS target", "msfconsole -q", "exploit > run", "cat /etc/shadow", "ssh root@10.0.0.1", "chmod +x shell.sh", "hydra -l admin -P pass.txt"];
    function createBgLine() {
        const line = document.createElement("div");
        line.textContent = `[${new Date().toLocaleTimeString()}] root@kali:~# ${commands[Math.floor(Math.random() * commands.length)]}`;
        bgFlow.appendChild(line);
        if (bgFlow.childNodes.length > 40) bgFlow.removeChild(bgFlow.firstChild);
        setTimeout(createBgLine, 200);
    }
    createBgLine();

    // 2. DAKTİLO
    function typeEffect(element) {
        const text = element.textContent.trim();
        element.innerHTML = "";
        let i = 0;
        const cursor = document.createElement("span");
        cursor.className = "cursor";
        function typing() {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1);
                element.appendChild(cursor);
                i++;
                setTimeout(typing, 35);
            }
        }
        typing();
    }

    // 3. SPLASH
    const logs = ["[*] Establishing connection...", "[*] Bypassing firewall...", "[+] ACCESS GRANTED"];
    let l = 0;
    function runSplash() {
        if(l < logs.length) {
            const d = document.createElement("div"); d.textContent = logs[l++];
            term.appendChild(d); setTimeout(runSplash, 400);
        } else {
            setTimeout(() => {
                splash.style.opacity = "0";
                setTimeout(() => { splash.remove(); typeEffect(document.querySelector(".bio-text")); }, 800);
            }, 1000);
        }
    }
    runSplash();

    // 4. YATAY KAYDIRMA & NAVİGASYON
    container.addEventListener("wheel", (e) => { e.preventDefault(); container.scrollLeft += e.deltaY; }, { passive: false });
    navItems.forEach((item, idx) => {
        item.onclick = () => container.scrollTo({ left: container.offsetWidth * idx, behavior: 'smooth' });
    });
    container.onscroll = () => {
        const idx = Math.round(container.scrollLeft / container.offsetWidth);
        navItems.forEach((n, i) => n.classList.toggle("active", i === idx));
    };
});