document.addEventListener('DOMContentLoaded', () => {
    const heroSections = document.querySelectorAll('.hero');
    if (!heroSections.length) return;

    const palette = [
        { hue: 210, sat: 100, light: 64 }, // TechBrother blue
        { hue: 48, sat: 100, light: 63 },  // accent yellow
        { hue: 142, sat: 63, light: 54 }   // accent green
    ];

    const random = (min, max) => Math.random() * (max - min) + min;
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const shuffle = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const baseColumns = [8, 28, 48, 68, 88];
    const baseRows = [12, 32, 52, 72];
    const basePositions = [];
    baseColumns.forEach((col) => {
        baseRows.forEach((row) => {
            basePositions.push({ left: col, top: row });
        });
    });

    const heroConfigs = [];

    heroSections.forEach((section, heroIndex) => {
        let bubbleLayer = section.querySelector('.hero-bubbles');
        if (!bubbleLayer) {
            bubbleLayer = document.createElement('div');
            bubbleLayer.className = 'hero-bubbles';
            section.insertBefore(bubbleLayer, section.firstChild);
        }

        bubbleLayer.innerHTML = '';

        const bubbleCount = parseInt(section.getAttribute('data-hero-bubbles') || '7', 10);
        const positions = shuffle(basePositions);
        const bubbles = [];

        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('span');
            const size = random(50, 300);
            const basePosition = positions[i % positions.length];
            const offsetLeft = clamp(basePosition.left + random(-8, 8), -4, 96);
            const offsetTop = clamp(basePosition.top + random(-10, 10), -6, 90);
            const baseColorIndex = Math.floor(Math.random() * palette.length);

            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${offsetLeft}%`;
            bubble.style.top = `${offsetTop}%`;
            bubble.style.backgroundColor = `hsla(${palette[baseColorIndex].hue}, ${palette[baseColorIndex].sat}%, ${palette[baseColorIndex].light}%, 0.32)`;
            bubble.style.filter = size >= 200
                ? `blur(${random(5, 8)}px)`
                : `blur(${random(0, 1)}px)`;

            bubbleLayer.appendChild(bubble);

            bubbles.push({
                el: bubble,
                amplitudeX: random(25, 70),
                amplitudeY: random(25, 70),
                speedX: random(0.12, 0.32),
                speedY: random(0.15, 0.35),
                colorSpeed: random(0.18, 0.45),
                phaseX: random(0, Math.PI * 2),
                phaseY: random(0, Math.PI * 2),
                colorPhase: random(0, Math.PI * 2),
                colorOffset: Math.random(),
                baseColorIndex,
                size
            });
        }

        heroConfigs.push({
            bubbles,
            start: performance.now() + heroIndex * 120
        });
    });

    function animate(now) {
        heroConfigs.forEach((config) => {
            const t = (now - config.start) / 1000;

            config.bubbles.forEach((bubble) => {
                const offsetX = Math.sin(t * bubble.speedX + bubble.phaseX) * bubble.amplitudeX;
                const offsetY = Math.cos(t * bubble.speedY + bubble.phaseY) * bubble.amplitudeY;

                const colorProgress = (Math.sin(t * bubble.colorSpeed + bubble.colorPhase) + 1) / 2;
                const shiftedProgress = (colorProgress + bubble.colorOffset) % 1;
                const scaled = shiftedProgress * palette.length;
                const fromIndex = Math.floor(scaled) % palette.length;
                const toIndex = (fromIndex + 1) % palette.length;
                const blend = scaled - Math.floor(scaled);
                const fromColor = palette[fromIndex];
                const toColor = palette[toIndex];
                const hue = fromColor.hue + (toColor.hue - fromColor.hue) * blend;
                const sat = fromColor.sat + (toColor.sat - fromColor.sat) * blend;
                const light = fromColor.light + (toColor.light - fromColor.light) * blend;

                bubble.el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                bubble.el.style.backgroundColor = `hsla(${hue}, ${sat}%, ${light}%, 0.32)`;
            });
        });

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
});

