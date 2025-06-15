document.addEventListener('DOMContentLoaded', () => {
    const initialHeart = document.getElementById('initial-heart');
    const explosionContainer = document.getElementById('explosion-container');
    const letterContainer = document.getElementById('letter-container');
    const closeLetterBtn = document.getElementById('close-letter-btn');
    const backgroundMusic = document.getElementById('background-music'); // Lo obtenemos aquí al inicio

    // CONFIGURACIÓN DE LAS PARTÍCULAS
    const particlesConfig = {
        flowers: ["img/f1.png", "img/f2.png", "img/f3.png, img/flor.png", "img/f5.png", "img/f6.png"],
        gifts: ["img/a1.gif", "img/a2.gif", "img/a3.gif"],
        hearts: 15,
        particleCount: 50 // Número total de partículas en la explosión
    };

    // --- Background Confetti/Bubbles ---
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.bottom = `-10px`;
        confetti.style.animationDelay = `${Math.random() * 8}s`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, ${60 + Math.random() * 20}%)`;
        confetti.style.animationDuration = `${10 + Math.random() * 5}s`;

        document.body.appendChild(confetti);

        confetti.addEventListener('animationend', () => {
            confetti.remove();
            createConfetti();
        });
    }

    for (let i = 0; i < 50; i++) {
        createConfetti();
    }

    // --- Heart Explosion Animation ---
    initialHeart.addEventListener('click', () => {
        initialHeart.style.animation = 'none';
        initialHeart.style.transition = 'opacity 0.5s, transform 0.5s';
        initialHeart.style.opacity = '0';
        initialHeart.style.transform = 'scale(0) rotate(-45deg)';

        // *** ESTRATEGIA MÁS ROBUSTA PARA EL AUDIO ***
        console.log("Intento de reproducción de audio al hacer clic en el corazón...");
        if (backgroundMusic) {
            backgroundMusic.volume = 0.5; // Ajusta el volumen si lo deseas (0.0 a 1.0)
            backgroundMusic.play().then(() => {
                console.log("✅ Audio iniciado exitosamente.");
            }).catch(e => {
                console.error("❌ Error al intentar reproducir el audio:", e);
                console.warn("Posiblemente el navegador bloqueó la reproducción automática. Consulta los mensajes de la consola para más detalles.");
                // Opcional: Podrías intentar reproducir un audio más corto aquí o mostrar un mensaje al usuario.
            });
        } else {
            console.error("❌ Elemento de audio con ID 'background-music' no encontrado en el DOM.");
        }

        setTimeout(() => {
            explodeHeart();
        }, 300);

        setTimeout(() => {
            letterContainer.classList.remove('hidden');
        }, 3000);
    });

    function explodeHeart() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const totalParticles = particlesConfig.particleCount;
        let flowerIndex = 0;
        let giftIndex = 0;

        for (let i = 0; i < totalParticles; i++) {
            const type = Math.random();
            let element;
            let currentSrc;

            if (type < 0.4 && particlesConfig.flowers.length > 0) {
                element = document.createElement('div');
                element.classList.add('animated-item', 'flower');
                currentSrc = particlesConfig.flowers[flowerIndex % particlesConfig.flowers.length];
                const imgElement = document.createElement('img');
                imgElement.src = currentSrc;
                imgElement.style.width = '100%';
                imgElement.style.height = '100%';
                imgElement.style.objectFit = 'contain';
                element.appendChild(imgElement);
                flowerIndex++;
            } else if (type < 0.7 && particlesConfig.gifts.length > 0) {
                element = document.createElement('div');
                element.classList.add('animated-item', 'gift');
                currentSrc = particlesConfig.gifts[giftIndex % particlesConfig.gifts.length];
                const imgElement = document.createElement('img');
                imgElement.src = currentSrc;
                imgElement.style.width = '100%';
                imgElement.style.height = '100%';
                imgElement.style.objectFit = 'contain';
                element.appendChild(imgElement);
                giftIndex++;
            } else {
                element = document.createElement('div');
                element.classList.add('animated-item', 'heart-particle');
            }

            element.style.left = `${centerX}px`;
            element.style.top = `${centerY}px`;

            explosionContainer.appendChild(element);
            applyExplosionAnimation(element);
        }
    }

    function applyExplosionAnimation(element) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * (window.innerWidth / 3) + 100;
        const translateX = Math.cos(angle) * distance;
        const translateY = Math.sin(angle) * distance;
        const rotateEnd = Math.random() * 720 - 360;
        const duration = 2.5 + Math.random() * 1.5;
        const delay = Math.random() * 0.5;

        element.animate([
            {
                opacity: 0,
                transform: `translate(-50%, -50%) scale(0.1) rotate(0deg)`
            },
            {
                opacity: 1,
                transform: `translate(-50%, -50%) scale(1.2) rotate(${Math.random() * 60 - 30}deg)`
            },
            {
                opacity: 1,
                transform: `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(1) rotate(${rotateEnd}deg)`
            }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            easing: 'ease-out',
            fill: 'forwards'
        });
    }

    // --- Close Letter Button ---
    closeLetterBtn.addEventListener('click', () => {
        letterContainer.classList.add('hidden');
        alert('¡Espero que te haya gustado este detalle! Gracias por ser tú. ❤️');
    });

    // Mensaje inicial para el usuario
    alert('¡Haz clic en el corazón para ver tu regalo de aniversario! ❤️');
});