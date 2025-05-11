// Espera a que el documento esté listo
// Configura todo: fuegos artificiales, música, animaciones, interacciones

document.addEventListener('DOMContentLoaded', () => {
    // === CONFIGURACIÓN DEL LIENZO DE FUEGOS ARTIFICIALES ===
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');

    // Función para redimensionar el canvas y que cubra todo el contenido
    function resizeCanvas() {
        canvas.width = document.documentElement.scrollWidth;
        canvas.height = document.documentElement.scrollHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);


    const title = document.getElementById('fireworks-title');
    const message = "¡Feliz Día de las Madres!";
    const letters = [];

    // === ANIMACIÓN DEL TÍTULO CON LETRAS QUE EXPLOTAN ===
    const words = message.split(' ');
    words.forEach(word => {
        const wordContainer = document.createElement('span');
        title.appendChild(wordContainer);

        [...word].forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.classList.add('letter');
            span.style.opacity = 0;
            wordContainer.appendChild(span);
            letters.push(span);
        });

        const space = document.createElement('span');
        space.textContent = ' ';
        wordContainer.appendChild(space);
    });

    // Esperar a que las letras estén bien renderizadas
    letters.forEach(letter => {
        letter.style.transform = 'scale(1)';
        letter.style.opacity = '0';
    });

    requestAnimationFrame(() => {
        const positions = letters.map(span => {
        const rect = span.getBoundingClientRect();
        const x = rect.left + rect.width / 50 + window.scrollX;
        const y = rect.top + rect.height / 0.45 + window.scrollY;
            return { x, y, span };
        });

        const shuffled = [...positions].sort(() => Math.random() - 0.5);
        let i = 0;

    function launchNext() {
        if (i >= shuffled.length) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setTimeout(() => {
                canvas.style.opacity = '0';
            }, 1000); // puedes ajustar el tiempo si quieres
            return;
    }

        const { x, y, span } = shuffled[i];
        animateRocket(x, y, () => {
            fireworkExplosion(x, y, () => {
                span.style.opacity = 1;
                span.classList.add('boom');
                i++;
                setTimeout(launchNext, 200);
        });
    });
}
        launchNext();
});

    // === ANIMACIÓN DEL COHETE HACIA ARRIBA ===
    function animateRocket(targetX, targetY, callback) {
        const startX = canvas.width / 2;
        const startY = canvas.height;
        const duration = 60;
        let frame = 0;
        const trail = [];

        const hue = Math.random() * 360;

        const interval = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const t = frame / duration;
            const x = startX + (targetX - startX) * t + Math.sin(t * Math.PI) * 50;
            const y = startY + (targetY - startY) * t;

            trail.push({ x, y });

            trail.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
                ctx.fillStyle = `hsl(${hue + Math.random() * 30}, 100%, 70%)`;
                ctx.fill();
            });

            frame++;
            if (frame >= duration) {
                clearInterval(interval);
                callback();
            }
        }, 25);
    }

    // === EXPLOSIÓN DE FUEGOS ARTIFICIALES ===
    function fireworkExplosion(x, y, callback) {
        const particles = [];
        for (let i = 0; i < 60; i++) {
            particles.push({
                x,
                y,
                angle: Math.random() * 2 * Math.PI,
                speed: Math.random() * 6 + 4,
                radius: Math.random() * 3 + 2,
                color: `hsl(${Math.random() * 360}, 100%, 60%)`
            });
        }

        let frames = 0;
        const interval = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += Math.cos(p.angle) * p.speed;
                p.y += Math.sin(p.angle) * p.speed;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
                ctx.fillStyle = p.color;
                ctx.fill();
            });
            if (++frames > 20) {
                clearInterval(interval);
                callback();
            }
        }, 60);
    }

    // === CONFIGURACIÓN DE MÚSICA ===
    const bgMusic = document.getElementById('bg-music');
    const toggleBtn = document.getElementById('music-toggle');

    bgMusic.volume = 0.2;
    bgMusic.play().catch(() => { });

    if (toggleBtn && bgMusic) {
        let playing = true;
        toggleBtn.addEventListener('click', () => {
            if (playing) {
                bgMusic.pause();
                toggleBtn.textContent = '🔇';
            } else {
                bgMusic.play();
                toggleBtn.textContent = '🔊';
            }
            playing = !playing;
        });
    }

    // === MOSTRAR MENSAJE OCULTO ===
    const showMoreBtn = document.getElementById('show-more');
    const hiddenMsg = document.getElementById('hidden-message');

    if (showMoreBtn && hiddenMsg) {
        showMoreBtn.addEventListener('click', () => {
            hiddenMsg.classList.remove('hidden');
            showMoreBtn.style.display = 'none';
        });
    }

    // === ANIMACIÓN DE FOTOS AL HACER SCROLL (fade-in) ===
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.gallery img, .side-gallery img').forEach(img => {
  observer.observe(img);
});

    // === CARTA CON EFECTO DE MÁQUINA DE ESCRIBIR ===
    const text = `Hoy queremos tomarnos un momento, no solo yo, sino también mi Padre y Gabincha, para decirte con el corazón en la mano cuánto te amamos y lo agradecidos que estamos por tenerte en nuestras vidas.\n\nA veces, las palabras no alcanzan para expresar lo que realmente sentimos, pero queremos que sepas que eres el alma de esta familia. Gracias a ti, a tu entrega, a tu dedicación y a ese amor inmenso que siempre nos das, somos quienes somos hoy. Has sido más que una madre: has sido guía, apoyo, fuerza, y un ejemplo constante de amor incondicional.\n\nNo hay día en que no notemos todo lo que haces por nosotros, muchas veces en silencio, sin esperar nada a cambio. Y aunque no siempre lo digamos, lo valoramos profundamente. Tu presencia sostiene este hogar, y sin ti, nada sería igual. Eres el eje que mantiene unido este motor llamado familia.\n\nGracias por enseñarnos, junto con papá, los valores que llevamos dentro, por mostrarnos con tu ejemplo lo que significa el amor verdadero, la entrega desinteresada y la generosidad infinita. Gracias por tus abrazos, tus consejos, tus regaños con amor, por tu paciencia y tu ternura. Cada cosa que haces deja una huella en nosotros.\n\nHoy solo queremos que sepas que te vemos, te admiramos y te amamos más de lo que las palabras pueden decir. Y aunque a veces la rutina o el silencio no lo dejen tan claro, tú eres y siempre serás lo más valioso que tenemos.\n\nCon todo nuestro amor.`;

    const typedLetter = document.getElementById('typed-letter');
    let idx = 0;

    function typeWriter() {
        if (idx < text.length) {
            const char = text[idx];
            typedLetter.innerHTML += (char === '\n') ? '<br>' : char;
            idx++;
            setTimeout(typeWriter, 60);
        }
    }
    typeWriter();
});