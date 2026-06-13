;(function () {
  if (!sessionStorage.getItem('bdw_unlocked')) {
    window.location.replace('index.html')
    return
  }

  window.addEventListener('pageshow', function (e) {
    const entries = performance.getEntriesByType('navigation')
    const navType = entries.length > 0 ? entries[0].type : null
    if (!e.persisted && navType === 'reload') {
      sessionStorage.removeItem('bdw_unlocked')
      window.location.replace('index.html')
    }
  })
})()