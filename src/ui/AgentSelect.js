import { AGENT_LIST } from '../agents/AgentRegistry.js'

/**
 * AgentSelect — Choose your Agent in lobby (Weapon selection happens on deploy screen)
 */
export class AgentSelect {
  constructor() {
    this.el              = document.getElementById('agent-select')
    this.listEl          = document.getElementById('agent-list')
    this.detailsEl       = document.getElementById('agent-details')
    this.btnConfirm      = document.getElementById('btn-confirm-agent')
    this.btnBack         = document.getElementById('btn-back-menu')
    this.selectedAgentId = 'blaze'
    this.onConfirm       = null
    this.onBack          = null

    this._render()
    this._bindEvents()
  }

  show(onConfirm, onBack) {
    this.onConfirm = onConfirm
    this.onBack    = onBack
    this.el.classList.add('active')
    this._selectAgent(this.selectedAgentId)
  }

  hide() {
    this.el.classList.remove('active')
  }

  _render() {
    this.listEl.innerHTML = AGENT_LIST.map(agent => `
      <div class="agent-card" data-id="${agent.id}">
        <div class="agent-card-icon" style="background:${agent.color}22; border:2px solid ${agent.color}44">
          ${agent.emoji}
        </div>
        <div class="agent-card-info">
          <div class="agent-card-name">${agent.name}</div>
          <div class="agent-card-role">${agent.role}</div>
        </div>
      </div>
    `).join('')
  }

  _selectAgent(id) {
    this.selectedAgentId = id
    this.listEl.querySelectorAll('.agent-card').forEach(el => {
      el.classList.toggle('active', el.dataset.id === id)
    })
    this._updateDetails()
  }

  _updateDetails() {
    const agent = AGENT_LIST.find(a => a.id === this.selectedAgentId)
    if (!agent) return

    const speedPct  = Math.round(agent.speed * 80)
    const healthPct = Math.round((agent.health / 130) * 100)

    this.detailsEl.innerHTML = `
      <div class="agent-details-name" style="color:${agent.color}">${agent.name}</div>
      <div class="agent-details-role">${agent.role}</div>
      <div style="font-size:14px;color:#8899a6;max-width:440px;line-height:1.6;margin-top:8px">${agent.description}</div>

      <!-- Agent Attributes -->
      <div class="agent-stat-grid" style="margin-top:20px">
        <div class="agent-stat-item">
          <div class="agent-stat-label">BASE HEALTH</div>
          <div class="agent-stat-value">${agent.health} HP</div>
          <div class="agent-stat-bar"><div class="agent-stat-bar-fill" style="width:${healthPct}%;background:${agent.color}"></div></div>
        </div>
        <div class="agent-stat-item">
          <div class="agent-stat-label">MOBILITY SPEED</div>
          <div class="agent-stat-value">${agent.speed.toFixed(1)}x</div>
          <div class="agent-stat-bar"><div class="agent-stat-bar-fill" style="width:${speedPct}%;background:${agent.color}"></div></div>
        </div>
      </div>

      <!-- Tactical Lore Box -->
      <div style="margin-top:24px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);padding:18px 22px;border-radius:4px;max-width:440px">
        <div style="font-size:11px;letter-spacing:2px;color:var(--val-gray);text-transform:uppercase;margin-bottom:6px">TACTICAL PROFILE</div>
        <div style="font-size:13px;color:#c5d0db;line-height:1.5">
          Specialized in high-tempo engagements. Weapon loadout can be chosen freely on deployment.
        </div>
      </div>
    `
  }

  _bindEvents() {
    this.listEl.addEventListener('click', e => {
      const card = e.target.closest('.agent-card')
      if (card) this._selectAgent(card.dataset.id)
    })

    this.btnConfirm.addEventListener('click', () => {
      const agent = AGENT_LIST.find(a => a.id === this.selectedAgentId)
      this.hide()
      this.onConfirm?.(agent)
    })

    this.btnBack.addEventListener('click', () => {
      this.hide()
      this.onBack?.()
    })
  }
}
