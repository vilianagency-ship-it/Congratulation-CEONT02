import confetti from 'canvas-confetti';

const CELEBRATION_COLORS = [
  '#FFD700', // Gold
  '#F59E0B', // Amber
  '#EF4444', // Crimson Red
  '#3B82F6', // Royal Blue
  '#10B981', // Emerald
  '#EC4899', // Pink
  '#8B5CF6', // Purple
  '#FFFFFF'  // Diamond White
];

const GOLD_ROYAL_COLORS = [
  '#FFE066',
  '#F59E0B',
  '#D97706',
  '#FBBF24',
  '#FFFFFF',
  '#E0E7FF'
];

/**
 * Triggers a grand choreographed fireworks display
 * Used on page load to celebrate the CEO NT02 inauguration
 */
export function launchOpeningFireworks() {
  const duration = 3200;
  const animationEnd = Date.now() + duration;

  // Initial immediate celebratory blast
  confetti({
    particleCount: 80,
    spread: 100,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.6 },
    colors: CELEBRATION_COLORS,
    zIndex: 99999,
    shapes: ['star', 'circle']
  });

  // Secondary delayed side fireworks barrage
  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      // Final sparkling gold shower
      confetti({
        particleCount: 60,
        spread: 120,
        origin: { x: 0.5, y: 0.4 },
        colors: GOLD_ROYAL_COLORS,
        zIndex: 99999,
        scalar: 1.2
      });
      return;
    }

    const particleCount = Math.floor(35 * (timeLeft / duration)) + 15;

    // Left cannon rocket firework
    confetti({
      particleCount,
      angle: 60,
      spread: 70,
      startVelocity: 55,
      origin: { x: 0.05, y: 0.8 },
      colors: CELEBRATION_COLORS,
      zIndex: 99999,
      shapes: ['star', 'circle']
    });

    // Right cannon rocket firework
    confetti({
      particleCount,
      angle: 120,
      spread: 70,
      startVelocity: 55,
      origin: { x: 0.95, y: 0.8 },
      colors: CELEBRATION_COLORS,
      zIndex: 99999,
      shapes: ['star', 'circle']
    });

    // High altitude burst randomly across middle sky
    if (Math.random() > 0.4) {
      confetti({
        particleCount: 30,
        spread: 360,
        startVelocity: 30,
        ticks: 80,
        origin: {
          x: 0.2 + Math.random() * 0.6,
          y: 0.15 + Math.random() * 0.35
        },
        colors: GOLD_ROYAL_COLORS,
        zIndex: 99999,
        shapes: ['circle', 'star'],
        scalar: 0.9
      });
    }
  }, 320);
}

/**
 * Dazzling firework burst when clicking on a board member
 * Can fire from the click location or centered around the modal
 */
export function launchMemberCelebrationFireworks(originX?: number, originY?: number) {
  const x = originX !== undefined ? Math.max(0.1, Math.min(0.9, originX)) : 0.5;
  const y = originY !== undefined ? Math.max(0.1, Math.min(0.9, originY)) : 0.45;

  // Main high-velocity firework burst
  confetti({
    particleCount: 70,
    spread: 360,
    startVelocity: 42,
    origin: { x, y },
    colors: CELEBRATION_COLORS,
    zIndex: 99999,
    shapes: ['star', 'circle'],
    scalar: 1.1
  });

  // Secondary golden sparkles following after 150ms
  setTimeout(() => {
    confetti({
      particleCount: 45,
      spread: 120,
      startVelocity: 28,
      origin: { x, y: Math.max(0.15, y - 0.08) },
      colors: GOLD_ROYAL_COLORS,
      zIndex: 99999,
      shapes: ['star'],
      scalar: 1.3
    });
  }, 160);

  // Third trailing festive burst
  setTimeout(() => {
    confetti({
      particleCount: 35,
      angle: 90,
      spread: 90,
      startVelocity: 35,
      origin: { x, y: Math.min(0.85, y + 0.1) },
      colors: ['#FFD700', '#F59E0B', '#FFFFFF'],
      zIndex: 99999,
      scalar: 0.85
    });
  }, 320);
}
