let scrollAnimationFrame: number | null = null

export function windowScrollTo(y = 0, duration = 600) {
  const container = document.documentElement
  const startPosition = container.scrollTop
  const distance = y - startPosition
  const startTime = performance.now()

  if (scrollAnimationFrame) {
    cancelAnimationFrame(scrollAnimationFrame)
    scrollAnimationFrame = null
  }

  function animation(currentTime: number) {
    const timeElapsed = currentTime - startTime

    // EaseInOutCubic
    const t = Math.min(timeElapsed / duration, 1)
    const ease = t < 0.5
      ? 4 * t * t * t
      : 1 - (-2 * t + 2) ** 3 / 2

    container.scrollTop = startPosition + distance * ease

    if (timeElapsed < duration) {
      scrollAnimationFrame = requestAnimationFrame(animation)
    }
    else {
      scrollAnimationFrame = null
    }
  }

  scrollAnimationFrame = requestAnimationFrame(animation)
}
