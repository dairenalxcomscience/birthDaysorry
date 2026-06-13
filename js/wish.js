// ============================================
//  wish.js — Pixel Cake, Candle Blow, Fireworks, Audio
// ============================================

// ─────────────────────────────────────────────
//  PIXEL ART CAKE
//  Palette: setiap huruf = 1 warna pixel
//  '.' = transparan
// ─────────────────────────────────────────────
const PALETTE = {
  'F': '#F97316',  // api/flame — oranye
  'f': '#FBBF24',  // api terang
  'C': '#E5E7EB',  // lilin — putih abu
  'c': '#D1D5DB',  // lilin bayangan
  'W': '#FEF9C3',  // krim putih kekuningan
  'w': '#FEF08A',  // krim aksen
  'Y': '#FDE68A',  // cake kuning muda
  'y': '#FCD34D',  // cake kuning tua
  'B': '#D97706',  // cake coklat karamel
  'b': '#B45309',  // cake coklat gelap
  'P': '#FECACA',  // dekorasi pink
  '.': null,       // transparan
}

// Grid 18 kolom × 21 baris
// Setiap karakter = 1 pixel
const CAKE_ART_LIT = [
  '........ffffff........',  // row 0  — api (besar, nyala)
  '.......fffFFFf........',  // row 1
  '........fFFFff........',  // row 2  — api
  '........CCCCCC........',  // row 3  — 3 lilin
  '........CCCCCC........',  // row 4
  '..WWWWWWWWWWWWWWWW....',  // row 5  — frosting/krim layer atas
  '..WWWWWWWWWWWWWWWW....',  // row 6
  '..YYYYwwwwwwwYYYYY....',  // row 7  — body cake layer 1
  '..YYYYwwPwwwwYYYYY....',  // row 8
  '..YYYYwwwwwwwYYYYY....',  // row 9
  '.BBBBBBBBBBBBBBBBBBBb.',  // row 10 — layer 2 lebih lebar
  '.BBBBBbbbbbbbBBBBBBBb.',  // row 11
  '.BBBBBBBBBBBBBBBBBBBb.',  // row 12
  'bBBBBBBBBBBBBBBBBBBBbb', // row 13 — base
  'bBBBBBBBBBBBBBBBBBBBbb', // row 14
  'bBBBBBBBBBBBBBBBBBBBbb', // row 15
  '.bbbbbbbbbbbbbbbbbbbb.',  // row 16 — shadow bawah
  '......................',  // row 17
  '......................',  // row 18
  '......................',  // row 19
  '......................',  // row 20
]

// Versi lilin mati (baris api diganti '.')
const CAKE_ART_DARK = CAKE_ART_LIT.map((row, i) =>
  i < 3 ? row.replace(/[fF]/g, '.') : row
)

const canvas  = document.getElementById('cakeCanvas')
const ctx     = canvas.getContext('2d')

function drawCake(art) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  art.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const color = PALETTE[row[x]]
      if (color) {
        ctx.fillStyle = color
        ctx.fillRect(x, y, 1, 1)
      }
    }
  })
}

// Gambar pertama kali
drawCake(CAKE_ART_LIT)

// ─────────────────────────────────────────────
//  AUDIO
// ─────────────────────────────────────────────
const audio      = document.getElementById('bgMusic')
const musicIcon  = document.getElementById('musicIcon')
const musicLabel = document.getElementById('musicLabel')
let   isPlaying  = false

function toggleMusic() {
  if (isPlaying) {
    audio.pause()
    musicIcon.classList.add('paused')
    musicLabel.textContent = 'Play music'
  } else {
    audio.play().catch(() => {
      // Browser block autoplay — user sudah klik, harusnya oke
      console.warn('Audio play blocked')
    })
    musicIcon.classList.remove('paused')
    musicLabel.textContent = 'Happy Birthday to You'
  }
  isPlaying = !isPlaying
}

// Auto-play saat page load (sering diblock browser, fallback ke manual)
window.addEventListener('click', function autoPlay() {
  if (!isPlaying) toggleMusic()
  window.removeEventListener('click', autoPlay)
}, { once: true })

// ─────────────────────────────────────────────
//  BLOW CANDLES
// ─────────────────────────────────────────────
let blown = false

function blowCandles() {
  if (blown) return
  blown = true

  const blowBtn   = document.getElementById('blowBtn')
  const glow      = document.getElementById('candleGlow')
  const page      = document.getElementById('wishPage')
  const wishTitle = document.getElementById('wishTitle')

  // 1. Sembunyikan tombol
  blowBtn.classList.add('hidden')

  // 2. Matikan lilin (gambar ulang tanpa api)
  drawCake(CAKE_ART_DARK)
  glow.classList.add('out')

  // 3. Gelap sesaat (dramatic pause)
  setTimeout(() => {
    // 4. Nyalakan lampu — background berubah ke pink
    page.classList.add('lights-on')
    wishTitle.style.opacity = '1' // override inline untuk efek
  }, 600)

  // 5. Fireworks meledak
  setTimeout(() => {
    launchFireworks()
  }, 900)

  // 6. Tampilkan pesan "wish sent"
  setTimeout(() => {
    document.getElementById('wishSent').classList.add('visible')
  }, 1800)
}

// ─────────────────────────────────────────────
//  FIREWORKS
// ─────────────────────────────────────────────
const FW_COLORS = [
  '#EF4444', '#F97316', '#EAB308',
  '#F9A8D4', '#C084FC', '#60A5FA',
  '#34D399', '#FBBF24',
]

function launchFireworks() {
  const bursts = [
    { x: 20, y: 35 },
    { x: 75, y: 30 },
    { x: 45, y: 25 },
    { x: 15, y: 55 },
    { x: 82, y: 55 },
  ]

  bursts.forEach((pos, i) => {
    const color = FW_COLORS[i % FW_COLORS.length]
    setTimeout(() => createBurst(pos.x, pos.y, color), i * 300)
  })

  // Burst acak tambahan
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      createBurst(
        10 + Math.random() * 80,
        15 + Math.random() * 60,
        FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)]
      )
    }, 500 + i * 250)
  }
}

function createBurst(xPercent, yPercent, color) {
  const particleCount = 14
  const container     = document.body

  for (let p = 0; p < particleCount; p++) {
    const el    = document.createElement('div')
    el.className = 'firework-particle'

    // Posisi asal (center burst)
    el.style.left = xPercent + 'vw'
    el.style.top  = yPercent + 'vh'
    el.style.background = color

    // Arah tiap partikel (melingkar merata)
    const angle  = (p / particleCount) * 2 * Math.PI
    const dist   = 60 + Math.random() * 60  // px jarak
    const tx     = Math.cos(angle) * dist
    const ty     = Math.sin(angle) * dist
    const dur    = 0.9 + Math.random() * 0.5

    el.style.setProperty('--tx',  tx + 'px')
    el.style.setProperty('--ty',  ty + 'px')
    el.style.setProperty('--dur', dur + 's')

    // Ukuran acak
    const size = 4 + Math.random() * 5
    el.style.width  = size + 'px'
    el.style.height = size + 'px'

    container.appendChild(el)
    setTimeout(() => el.remove(), dur * 1000 + 100)
  }
}
