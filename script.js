document.addEventListener("DOMContentLoaded", () => {
  // AOS animasiýany başlatmak
  AOS.init({
    once: false,
    duration: 1000,
    easing: 'ease-out-cubic'
  });

  const overlay = document.getElementById('envelope-overlay');
  const audio = document.getElementById('wedding-audio');
  const musicIcon = document.getElementById('music-icon');
  const musicBtn = document.getElementById('music-btn');

  let isOpened = false;

  // AÝDYMY BAŞLATMAK FUNKSIÝASY
  function playAudio() {
    audio.play().then(() => {
      musicIcon.classList.remove('fa-music');
      musicIcon.classList.add('fa-pause');
    }).catch(err => {
      console.log("Autoplay päsgelçiligi ýüze çykdy:", err);
    });
  }

  // KONWERTE BASYLANDA: SAZY AWTOMATIK ÇALMAK WE KONWERTI AÇMAK
  overlay.addEventListener('click', () => {
    if (isOpened) return;
    isOpened = true;

    // Sazy göni çalyp başlamak
    playAudio();

    // Konwerti açyş animasiýasy
    overlay.classList.add('opened');

    setTimeout(() => {
      AOS.refresh();
    }, 600);
  });

  // DUÝDURYŞSYZ UKY (FALLBACK): Ulanyjy konwertden başga ekranyň islendik ýerine basanda hem sazy başlatmak
  document.body.addEventListener('click', () => {
    if (audio.paused && !isOpened) {
      playAudio();
    }
  }, { once: true });

  // SAZ DÜWMESI (PLAY / PAUSE TOGGLE)
  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Overlay-e basylmagyny bökdemek
    if (audio.paused) {
      playAudio();
    } else {
      audio.pause();
      musicIcon.classList.remove('fa-pause');
      musicIcon.classList.add('fa-music');
    }
  });

  // TOÝA ÇENLI WAGT SANAÝJY (COUNTDOWN) - 25 Oktýabr 2026
  const weddingDate = new Date("October 25, 2026 18:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      document.getElementById("days").innerText = days < 10 ? "0" + days : days;
      document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
      document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
      document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    } else {
      document.getElementById("days").innerText = "00";
      document.getElementById("hours").innerText = "00";
      document.getElementById("minutes").innerText = "00";
      document.getElementById("seconds").innerText = "00";
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();
});
