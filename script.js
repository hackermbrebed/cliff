document.addEventListener("DOMContentLoaded", () => {

    // 1. Dapatkan Nama Tamu dari URL Parameter (?to=NamaTamu)
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to');
    if (guestParam) {
        document.getElementById("guestName").innerText = guestParam;
    }

    // 2. Buka Undangan & Play Musik
    const coverScreen = document.getElementById("coverScreen");
    const openBtn = document.getElementById("openInvitationBtn");
    const bgMusic = document.getElementById("bgMusic");
    const audioBtn = document.getElementById("audioBtn");
    let isPlaying = false;

    openBtn.addEventListener("click", () => {
        coverScreen.classList.add("hide");
        bgMusic.play();
        isPlaying = true;
    });

    audioBtn.addEventListener("click", () => {
        if (isPlaying) {
            bgMusic.pause();
            audioBtn.querySelector("i").classList.remove("rotating");
        } else {
            bgMusic.play();
            audioBtn.querySelector("i").classList.add("rotating");
        }
        isPlaying = !isPlaying;
    });

    // 3. Countdown Timer Acara
    const targetDate = new Date("October 18, 2026 08:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 4. Form RSVP & Tambah Ucapan
    const rsvpForm = document.getElementById("rsvpForm");
    const wishesList = document.getElementById("wishesList");

    rsvpForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("inputName").value;
        const status = document.getElementById("inputStatus").value;
        const message = document.getElementById("inputMessage").value;

        // Tambah ucapan baru ke daftar
        const wishItem = document.createElement("div");
        wishItem.className = "wish-item";
        wishItem.innerHTML = `
            <strong>${name}</strong> <span class="badge-status">${status}</span>
            <p>${message}</p>
        `;

        wishesList.prepend(wishItem);
        rsvpForm.reset();
        alert("Terima kasih atas ucapan & konfirmasi Anda!");
    });
});

// 5. Salin Rekening
function copyText(elementId) {
    const textToCopy = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Nomor rekening berhasil disalin: " + textToCopy);
    });
}
