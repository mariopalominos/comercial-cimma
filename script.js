document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. CONTROL RESPONSIVO DEL MENÚ SUPERIOR
    // ==========================================
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Animación simple a las barras del botón hamburguesa
            mobileMenu.classList.toggle('toggle-open');
        });
    }

    // ==========================================
    // 1.5 MENÚ FLOTANTE DE WHATSAPP CON VENDEDORES
    // ==========================================
    const whatsappToggle = document.getElementById('whatsappToggle');
    const whatsappOptions = document.getElementById('whatsappOptions');
    const whatsappMenu = document.getElementById('whatsappMenu');

    if (whatsappToggle && whatsappOptions) {
        // Toggle al hacer clic en el botón principal
        whatsappToggle.addEventListener('click', (e) => {
            e.preventDefault();
            whatsappOptions.classList.toggle('active');
            whatsappToggle.classList.toggle('active');
            whatsappToggle.setAttribute('aria-expanded', whatsappOptions.classList.contains('active'));
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!whatsappMenu.contains(e.target)) {
                whatsappOptions.classList.remove('active');
                whatsappToggle.classList.remove('active');
                whatsappToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Cerrar menú al hacer clic en una opción
        whatsappOptions.querySelectorAll('.whatsapp-option').forEach(option => {
            option.addEventListener('click', () => {
                whatsappOptions.classList.remove('active');
                whatsappToggle.classList.remove('active');
                whatsappToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ==========================================
    // 2. EFECTO FADER DINÁMICO (HERO COMPONENT)
    // ==========================================
    const heroFader = document.getElementById('heroFader');
    if (heroFader) {
        window.addEventListener('scroll', () => {
            let scrollTop = window.scrollY;
            let windowHeight = window.innerHeight;
            
            // Calcula un radio de opacidad de 0.4 a 1 basado en la bajada del scroll
            let opacityFactor = 0.4 + (scrollTop / windowHeight);
            if (opacityFactor > 1) opacityFactor = 1;
            
            heroFader.style.background = `linear-gradient(to bottom, rgba(10,10,10,${opacityFactor}) 0%, rgba(10,10,10,1) 95%)`;
        });
    }

    // ==========================================
    // 3. SISTEMA DE FILTRADO TÉCNICO EN CATÁLOGO
    // ==========================================
    const filterCategory = document.getElementById('filterCategory');
    const filterMachinery = document.getElementById('filterMachinery');
    const productCards = document.querySelectorAll('.flip-card');

    function filterProducts() {
        const selectedCat = filterCategory ? filterCategory.value : 'all';
        const selectedMach = filterMachinery ? filterMachinery.value : 'all';

        productCards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            const cardMach = card.getAttribute('data-machinery');

            const matchesCategory = (selectedCat === 'all' || cardCat === selectedCat);
            const matchesMachinery = (selectedMach === 'all' || cardMach === selectedMach);

            if (matchesCategory && matchesMachinery) {
                card.style.display = 'block';
                // Pequeña animación de entrada premium al aparecer
                card.style.opacity = '0';
                setTimeout(() => { card.style.opacity = '1'; }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (filterCategory && filterMachinery) {
        filterCategory.addEventListener('change', filterProducts);
        filterMachinery.addEventListener('change', filterProducts);
    }
});

// ==========================================================================
    // 4. CONTROLADOR DEL REPOSITORIO DE IMÁGENES DINÁMICO (CARRUSEL)
    // ==========================================================================
    const sliderTrack = document.getElementById('repoSliderTrack');
    const prevBtn = document.getElementById('repoPrevBtn');
    const nextBtn = document.getElementById('repoNextBtn');
    const dotsContainer = document.getElementById('repoDotsContainer');

    if (sliderTrack && prevBtn && nextBtn) {
        
        // Función para calcular cuánto desplazar por clic (el ancho de una tarjeta)
        const getScrollAmount = () => {
            const firstItem = sliderTrack.querySelector('.repo-card-item');
            if (firstItem) {
                // Toma el ancho del item sumándole el espacio (gap) de separación
                return firstItem.offsetWidth + 24; 
            }
            return 300;
        };

        // Evento Flecha Derecha
        nextBtn.addEventListener('click', () => {
            sliderTrack.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        // Evento Flecha Izquierda
        prevBtn.addEventListener('click', () => {
            sliderTrack.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        // Opcional: Generación dinámica de puntos indicadores (Dots) según los ítems
        const items = sliderTrack.querySelectorAll('.repo-card-item');
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('repo-dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                const itemWidth = sliderTrack.querySelector('.repo-card-item').offsetWidth + 24;
                sliderTrack.scrollTo({
                    left: itemWidth * index,
                    behavior: 'smooth'
                });
            });
            dotsContainer.appendChild(dot);
        });

        // Sincronizar los puntos activos al realizar el desplazamiento (scroll)
        sliderTrack.addEventListener('scroll', () => {
            const itemWidth = sliderTrack.querySelector('.repo-card-item').offsetWidth + 24;
            const currentIndex = Math.round(sliderTrack.scrollLeft / itemWidth);
            const dots = dotsContainer.querySelectorAll('.repo-dot');
            
            dots.forEach((dot, idx) => {
                if (idx === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
    }

    // ==========================================================================
// ANIMACIÓN DE NÚMEROS (CONTADOR DINÁMICO)
// ==========================================================================
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    const speed = 200; // Velocidad de cambio

    stats.forEach(stat => {
        const updateCount = () => {
            const target = +stat.getAttribute('data-target');
            const count = +stat.innerText.replace('+', '');
            const inc = target / speed;

            if (count < target) {
                stat.innerText = (stat.getAttribute('data-target').includes('+') ? '+' : '') + Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                stat.innerText = (stat.getAttribute('data-target').includes('+') ? '+' : '') + target;
            }
        };
        updateCount();
    });
};

// Intersection Observer para activar la animación al hacer scroll
const observerOptions = {
    threshold: 0.5 // Se activa cuando el 50% de la sección es visible
};

const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target); // Solo se ejecuta una vez
        }
    });
}, observerOptions);

const impactSection = document.querySelector('.impact-section');
if (impactSection) {
    statsObserver.observe(impactSection);
}

// ==========================================================================
    // 5. ANIMACIÓN PREMIUM EN CASCADA PARA LOS ÍCONOS DEL FOOTER
    // ==========================================================================
    const footerSocials = document.querySelectorAll('.foot-social-links .social-icon');
    
    const footerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aplica un leve retraso secuencial a cada ícono para generar dinamismo
                footerSocials.forEach((icon, index) => {
                    icon.style.opacity = '0';
                    icon.style.transform = 'translateY(15px)';
                    icon.style.transition = `all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s`;
                    
                    // Dispara la animación visual
                    setTimeout(() => {
                        icon.style.opacity = '1';
                        icon.style.transform = 'translateY(0)';
                    }, 50);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const footerBlock = document.querySelector('.footer-wrap-block');
    if (footerBlock && footerSocials.length > 0) {
        footerObserver.observe(footerBlock);
    }

    // ==========================================================================
// LÓGICA DEL HERO CAROUSEL PREMIUM
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 segundos por imagen

    const showSlide = (index) => {
        // Remover clases activas
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(dot => dot.classList.remove('active'));

        // Activar slide seleccionado
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    };

    const nextSlide = () => {
        let index = (currentSlide + 1) % slides.length;
        showSlide(index);
    };

    const prevSlide = () => {
        let index = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(index);
    };

    // Eventos de botones
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Eventos de indicadores
    indicators.forEach((dot, idx) => {
        dot.addEventListener('click', () => showSlide(idx));
    });

    // Auto-reproducción automática
    let autoSlide = setInterval(nextSlide, slideInterval);

    // Detener auto-play cuando el usuario interactúa
    const resetTimer = () => {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, slideInterval);
    };

    [prevBtn, nextBtn].forEach(btn => {
        if(btn) btn.addEventListener('click', resetTimer);
    });
});

