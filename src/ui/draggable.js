/**
 * makeDraggable — Enables smooth mouse & touch dragging on any DOM element or modal
 *
 * @param {HTMLElement} element - The target container element to position and move
 * @param {HTMLElement} [handle] - Optional drag handle element (defaults to element)
 * @param {string} [storageKey] - Optional localStorage key to remember position
 * @param {Function} [onDragEnd] - Optional callback when dragging finishes
 * @returns {Function} cleanup - Function to remove event listeners
 */
export function makeDraggable(element, handle = null, storageKey = null, onDragEnd = null) {
  if (!element) return () => {}
  const dragHandle = handle || element

  dragHandle.style.cursor = 'grab'

  let isDragging = false
  let startX = 0
  let startY = 0
  let initialLeft = 0
  let initialTop = 0

  // Restore saved position if available
  if (storageKey) {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const { left, top } = JSON.parse(saved)
        if (typeof left === 'number' && typeof top === 'number') {
          // Clamp to current viewport
          const width = element.offsetWidth || 320
          const height = element.offsetHeight || 200
          const maxLeft = Math.max(0, window.innerWidth - width - 8)
          const maxTop = Math.max(0, window.innerHeight - height - 8)
          element.style.position = 'fixed'
          element.style.left = `${Math.max(8, Math.min(maxLeft, left))}px`
          element.style.top = `${Math.max(8, Math.min(maxTop, top))}px`
          element.style.right = 'auto'
          element.style.bottom = 'auto'
        }
      }
    } catch {}
  }

  function onPointerDown(e) {
    // Only primary mouse button (left-click) or touch
    if (e.type === 'mousedown' && e.button !== 0) return
    // Ignore interactive children
    if (e.target.closest('button, input, textarea, select, a, .no-drag')) return

    isDragging = true
    dragHandle.style.cursor = 'grabbing'
    element.classList.add('is-dragging')

    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    startX = clientX
    startY = clientY

    const rect = element.getBoundingClientRect()
    initialLeft = rect.left
    initialTop = rect.top

    // Switch to fixed positioning for predictable viewport coordinates
    element.style.position = 'fixed'
    element.style.left = `${initialLeft}px`
    element.style.top = `${initialTop}px`
    element.style.right = 'auto'
    element.style.bottom = 'auto'
    element.style.margin = '0'

    window.addEventListener('mousemove', onPointerMove, { passive: false })
    window.addEventListener('touchmove', onPointerMove, { passive: false })
    window.addEventListener('mouseup', onPointerUp)
    window.addEventListener('touchend', onPointerUp)

    if (e.cancelable) e.preventDefault()
  }

  function onPointerMove(e) {
    if (!isDragging) return

    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY

    const deltaX = clientX - startX
    const deltaY = clientY - startY

    let newLeft = initialLeft + deltaX
    let newTop = initialTop + deltaY

    // Clamp within viewport
    const width = element.offsetWidth || 320
    const height = element.offsetHeight || 200
    const maxLeft = Math.max(0, window.innerWidth - width - 8)
    const maxTop = Math.max(0, window.innerHeight - height - 8)

    newLeft = Math.max(8, Math.min(maxLeft, newLeft))
    newTop = Math.max(8, Math.min(maxTop, newTop))

    element.style.left = `${newLeft}px`
    element.style.top = `${newTop}px`

    if (e.cancelable) e.preventDefault()
  }

  function onPointerUp() {
    if (!isDragging) return
    isDragging = false
    dragHandle.style.cursor = 'grab'
    element.classList.remove('is-dragging')

    window.removeEventListener('mousemove', onPointerMove)
    window.removeEventListener('touchmove', onPointerMove)
    window.removeEventListener('mouseup', onPointerUp)
    window.removeEventListener('touchend', onPointerUp)

    // Save position
    if (storageKey) {
      try {
        const left = parseFloat(element.style.left) || 0
        const top = parseFloat(element.style.top) || 0
        localStorage.setItem(storageKey, JSON.stringify({ left, top }))
      } catch {}
    }

    if (typeof onDragEnd === 'function') {
      onDragEnd({ left: parseFloat(element.style.left), top: parseFloat(element.style.top) })
    }
  }

  // Double click handle to reset position
  function onDblClick(e) {
    if (e.target.closest('button, input, select, textarea, a, .no-drag')) return
    element.style.position = 'fixed'
    element.style.left = '16px'
    element.style.top = '16px'
    element.style.right = 'auto'
    element.style.bottom = 'auto'
    if (storageKey) {
      localStorage.removeItem(storageKey)
    }
  }

  // Adjust on window resize so it never stays out of bounds
  function onWindowResize() {
    if (!element.style.left || !element.style.top) return
    const curLeft = parseFloat(element.style.left) || 0
    const curTop = parseFloat(element.style.top) || 0
    const width = element.offsetWidth || 320
    const height = element.offsetHeight || 200
    const maxLeft = Math.max(0, window.innerWidth - width - 8)
    const maxTop = Math.max(0, window.innerHeight - height - 8)
    const clampedLeft = Math.max(8, Math.min(maxLeft, curLeft))
    const clampedTop = Math.max(8, Math.min(maxTop, curTop))
    element.style.left = `${clampedLeft}px`
    element.style.top = `${clampedTop}px`
  }

  dragHandle.addEventListener('mousedown', onPointerDown)
  dragHandle.addEventListener('touchstart', onPointerDown, { passive: false })
  dragHandle.addEventListener('dblclick', onDblClick)
  window.addEventListener('resize', onWindowResize)

  return function cleanup() {
    dragHandle.removeEventListener('mousedown', onPointerDown)
    dragHandle.removeEventListener('touchstart', onPointerDown)
    dragHandle.removeEventListener('dblclick', onDblClick)
    window.removeEventListener('resize', onWindowResize)
    window.removeEventListener('mousemove', onPointerMove)
    window.removeEventListener('touchmove', onPointerMove)
    window.removeEventListener('mouseup', onPointerUp)
    window.removeEventListener('touchend', onPointerUp)
  }
}
