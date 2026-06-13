// ============================================
//  loading.js — Progress bar + floating emoji
// ============================================

const bar    = document.getElementById('progressBar')
const page   = document.querySelector('.loading-page')

// Emoji yang muncul melayang
const EMOJIS = ['(≧◡≦)', '(>_<)', '(◕‿◕)', '(*^▽^*)', '(✿◠‿◠)', '♡', '🌸', '✨']

let progress = 0
let done     = false

// ─────────────────────────────────────────────
//  Progress bar — naik secara acak (terlihat "loading beneran")
// ─────────────────────────────────────────────
const progressInterval = setInterval(() => {
  if (done) return

  // Laju acak, melambat di 85%+ (biar dramatis sedikit)
  const remaining = 100 - progress
  const increment = Math.random() * (remaining > 20 ? 12 : 3)

  progress = Math.min(progress + increment, 100)
  bar.style.width = progress + '%'

  if (progress >= 100 && !done) {
    done = true
    clearInterval(progressInterval)
    clearInterval(emojiInterval)

    // Tunggu sebentar, lalu pindah ke hero
    setTimeout(() => {
      document.body.classList.add('fade-out')
      sessionStorage.setItem('bdw_unlocked', '1')
      setTimeout(() => window.location.href = 'hero.html', 500)
    }, 400)
  }
}, 180)

// ─────────────────────────────────────────────
//  Floating emoji spawner
// ─────────────────────────────────────────────
function spawnEmoji() {
  if (done) return

  const el = document.createElement('span')
  el.className = 'floating-emoji'
  el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]

  // Posisi X acak (5% - 90%)
  el.style.left = (5 + Math.random() * 85) + '%'

  // Mulai dari bawah layar
  el.style.bottom = '-40px'

  // Durasi animasi acak 3-6 detik
  const dur = 3 + Math.random() * 3
  el.style.setProperty('--dur', dur + 's')

  page.appendChild(el)

  // Hapus dari DOM setelah animasi selesai
  setTimeout(() => el.remove(), dur * 1000)
}

const emojiInterval = setInterval(spawnEmoji, 700)

// Spawn pertama langsung
spawnEmoji()
