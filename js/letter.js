// ============================================
//  letter.js — Autoplay Music Logic
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bgMusic');

  // Mengatur volume audio (0.0 sampai 1.0). 0.6 artinya volume 60%
  audio.volume = 0.6; 

  // Fungsi untuk memutar audio
  function playAudio() {
    audio.play()
      .then(() => {
        console.log("Lagu berhasil diputar otomatis!");
      })
      .catch(error => {
        console.log("Autoplay diblokir browser, disiapkan untuk berputar saat layar disentuh:", error);
        
        // Pemicu Cadangan: Jika browser memblokir autoplay, 
        // lagu akan berputar otomatis begitu user mengklik/menyentuh area mana saja di layar.
        document.addEventListener('click', () => {
          audio.play();
        }, { once: true }); // { once: true } memastikan fungsi klik ini cuma jalan sekali
      });
  }

  // Jalankan fungsi putar audio saat halaman siap
  playAudio();
});