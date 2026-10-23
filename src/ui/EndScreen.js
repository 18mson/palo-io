/**
 * EndScreen — shows match results
 */
export class EndScreen {
  constructor() {
    this.el       = document.getElementById('end-screen')
    this.elResult = document.getElementById('end-result')
    this.elStats  = document.getElementById('end-stats')
    this.btnAgain = document.getElementById('btn-play-again')
    this.btnMenu  = document.getElementById('btn-main-menu-end')
  }

  show({ result, kills, deaths, kd, elapsed }, onPlayAgain, onMenu) {
    this.el.classList.add('active')
    this.elResult.textContent = result === 'win' ? 'VICTORY' : 'DEFEAT'
    this.elResult.className = `end-result ${result}`

    const mins = Math.floor(elapsed / 60)
    const secs = String(elapsed % 60).padStart(2, '0')

    this.elStats.innerHTML = `
      <div class="end-stat-item">
        <div class="stat-label">KILLS</div>
        <div class="stat-val" style="color:#00ff87">${kills}</div>
      </div>
      <div class="end-stat-item">
        <div class="stat-label">DEATHS</div>
        <div class="stat-val" style="color:#ff4655">${deaths}</div>
      </div>
      <div class="end-stat-item">
        <div class="stat-label">K/D</div>
        <div class="stat-val">${kd}</div>
      </div>
      <div class="end-stat-item">
        <div class="stat-label">TIME</div>
        <div class="stat-val" style="font-size:24px">${mins}:${secs}</div>
      </div>
    `

    this.btnAgain.onclick = () => { this.hide(); onPlayAgain?.() }
    this.btnMenu.onclick  = () => { this.hide(); onMenu?.() }
  }

  hide() {
    this.el.classList.remove('active')
  }
}
