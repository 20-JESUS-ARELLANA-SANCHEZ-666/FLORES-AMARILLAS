// --- JAVASCRIPT PARA AÑADIR ---

        document.addEventListener('DOMContentLoaded', function() {
            
            // --- LÓGICA PARA EL AUDIO Y LA SUPERPOSICIÓN ---
            const audioOverlay = document.getElementById('audio-overlay');
            const music = document.getElementById('background-music');
          

            // Función para iniciar el audio y ocultar la superposición
            function startExperience() {
                // El método play() devuelve una promesa. Lo manejamos para evitar errores en consola.
                const playPromise = music.play();
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        // Autoplay iniciado correctamente
                    }).catch(error => {
                        // Autoplay fue prevenido. No es un gran problema ya que el usuario lo inició.
                        console.log("Autoplay prevenido, pero el usuario hizo clic.");
                    });
                }

                // !! CAMBIO CLAVE: Esta línea inicia TODAS las animaciones de la página !!
                // Se elimina la clase 'container' del body, lo que activa el 'animation-play-state'.
                document.body.classList.remove("container");

                // Ocultar la superposición
                audioOverlay.style.opacity = '0';
                // Después de que termine la transición, oculta el elemento para que no sea interactuable
                setTimeout(() => {
                    audioOverlay.style.display = 'none';
                }, 800); // 800ms, igual que la transición en el CSS
            }
            
            // Añadimos el evento de clic a la superposición
            
                                    // Lógica del botón de música
            const musicToggle = document.getElementById('music-toggle');

            if (musicToggle) {
                musicToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    if (music.paused) {
                        music.play().then(() => {
                            musicToggle.textContent = '🎵';
                            musicToggle.style.opacity = '1';
                        }).catch(() => {});
                    } else {
                        music.pause();
                        musicToggle.textContent = '🔇';
                        musicToggle.style.opacity = '0.65';
                    }
                });
            }

            audioOverlay.addEventListener('click', startExperience);


            // --- LÓGICA PARA GENERAR PARTÍCULAS DE FONDO ---

            const particleContainer = document.querySelector('.background-particles');
            // Aumentamos la cantidad de partículas para un efecto más denso
            const numberOfParticles = 60; 

            for (let i = 0; i < numberOfParticles; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                particle.style.left = Math.random() * 100 + 'vw';
                
                // Reducimos la duración para que se muevan más rápido
                // Ahora la duración será entre 5 y 13 segundos (antes 15-30s)
                particle.style.animationDuration = (Math.random() * 8 + 5) + 's'; 
                
                particle.style.animationDelay = (Math.random() * 10) + 's';
                
                particleContainer.appendChild(particle);
            }

        });
