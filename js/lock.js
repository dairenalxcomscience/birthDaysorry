// ============================================
//  lock.js — PIN Pad Logic
// ============================================

// ✏️ GANTI INI: PIN yang benar (contoh: tanggal lahir "0101")
const CORRECT_PIN = '140603'

// ─────────────────────────────────────────────
let inputPin = ''
let isLocked  = false   // mencegah input saat animasi error berjalan

const dots    = document.querySelectorAll('.pin-dot')
const display = document.getElementById('pinDisplay')
const errMsg  = document.getElementById('pinError')

// ─────────────────────────────────────────────
//  pressKey — dipanggil saat tombol angka diklik
// ─────────────────────────────────────────────
function pressKey(num) {
  if (isLocked) return
  if (inputPin.length >= 6) return

  inputPin += num
  updateDots()

  // Auto-check saat 4 digit terisi
  if (inputPin.length === 6) {
    isLocked = true
    setTimeout(checkPin, 350)
  }
}

// ─────────────────────────────────────────────
//  deleteKey — hapus digit terakhir
// ─────────────────────────────────────────────
function deleteKey() {
  if (isLocked) return
  if (inputPin.length === 0) return

  inputPin = inputPin.slice(0, -1)
  hideError()
  updateDots()
}

// ─────────────────────────────────────────────
//  checkPin — validasi PIN
// ─────────────────────────────────────────────
function checkPin() {
  if (inputPin === CORRECT_PIN) {
    onSuccess()
  } else {
    onFail()
  }
}

// ─────────────────────────────────────────────
//  onSuccess — PIN benar
// ─────────────────────────────────────────────
function onSuccess() {
  // Tandai sudah unlock — disimpan selama tab masih buka
  sessionStorage.setItem('bdw_unlocked', '1')

  // Semua dot jadi filled (feedback visual)
  dots.forEach(d => d.classList.add('filled'))

  // Fade out halaman, pindah ke loading
  setTimeout(() => {
    document.body.classList.add('fade-out')
    setTimeout(() => {
      window.location.href = 'loading.html'
    }, 500)
  }, 200)
}

// ─────────────────────────────────────────────
//  onFail — PIN salah
// ─────────────────────────────────────────────
function onFail() {
  // Ubah dot jadi merah
  dots.forEach(d => {
    d.classList.add('error')
    d.classList.remove('filled')
  })

  // Shake animasi pada display
  display.classList.add('shake')
  showError('Wrong passcode. Try again.')

  // Reset setelah animasi selesai
  setTimeout(() => {
    display.classList.remove('shake')
    dots.forEach(d => d.classList.remove('error'))
    inputPin = ''
    isLocked = false
    updateDots()
  }, 700)
}

// ─────────────────────────────────────────────
//  updateDots — sinkronkan tampilan dot dengan inputPin
// ─────────────────────────────────────────────
function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle('filled', i < inputPin.length)
  })
}

// ─────────────────────────────────────────────
//  showError / hideError
// ─────────────────────────────────────────────
function showError(msg) {
  errMsg.textContent = msg
  errMsg.classList.add('visible')
}

function hideError() {
  errMsg.classList.remove('visible')
}

// ─────────────────────────────────────────────
//  Keyboard support (opsional, untuk desktop)
// ─────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    pressKey(e.key)
  } else if (e.key === 'Backspace') {
    deleteKey()
  }
})
