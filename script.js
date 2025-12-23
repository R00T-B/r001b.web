document.addEventListener("DOMContentLoaded", () => {
    const bgFlow = document.getElementById("kali-bg-flow");
    const container = document.getElementById("main-container");
    const splash = document.getElementById("splash-screen");
    const term = document.getElementById("terminal-content");
    const navItems = document.querySelectorAll(".nav-item");

    // 1. KALI ARKA PLAN AKIŞI
    const commands = [
        "nmap -sS -O 192.168.1.1", "msfconsole -q", "exploit(handler) > run",
        "cat /etc/shadow", "ssh root@remote -p 22", "tcpdump -i eth0 -vv",
        "hydra -l admin -P rockyou.txt", "sqlmap -u target.php?id=1", "airmon-ng start wlan0"
    ];

    function createBgLine() {
        const line = document.createElement("div");
        line.textContent = `[${new Date().toLocaleTimeString()}] root@kali:~# ${commands[Math.floor(Math.random() * commands.length)]}`;
        bgFlow.appendChild(line);
        if (bgFlow.childNodes.length > 45) bgFlow.removeChild(bgFlow.firstChild);
        setTimeout(createBgLine, 180);
    }
    createBgLine();

    // 2. DAKTİLO EFEKTİ
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
                setTimeout(typing, 40);
            }
        }
        typing();
    }

    // 3. BOOT SEQUENCE
    const logs = [
        "[*] Bypassing authentication...",
        "[*] Mapping secure sectors...",
        "[*] Node r001B: CONNECTED",
        "[+] ACCESS GRANTED // READY"
    ];
    let l = 0;
    function runSplash() {
        if(l < logs.length) {
            const d = document.createElement("div"); d.textContent = logs[l++];
            term.appendChild(d); setTimeout(runSplash, 400);
        } else {
            setTimeout(() => {
                splash.style.opacity = "0";
                setTimeout(() => {
                    splash.remove();
                    typeEffect(document.querySelector(".bio-text"));
                }, 800);
            }, 1000);
        }
    }
    runSplash();

    // 4. YATAY KAYDIRMA (WHEEL -> HORIZONTAL)
    container.addEventListener("wheel", (e) => {
        if (Math.abs(e.deltaY) > 0) {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    // 5. MENÜ TIKLAMA VE SENKRONİZASYON
    navItems.forEach((item, idx) => {
        item.addEventListener("click", () => {
            container.scrollTo({ left: container.offsetWidth * idx, behavior: 'smooth' });
        });
    });

    container.addEventListener("scroll", () => {
        const idx = Math.round(container.scrollLeft / container.offsetWidth);
        navItems.forEach((n, i) => n.classList.toggle("active", i === idx));
    });
});