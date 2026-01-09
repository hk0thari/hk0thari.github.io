// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';

            if (window.innerWidth <= 768) {
                if (navLinks.style.display === 'flex') {
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '100%';
                    navLinks.style.left = '0';
                    navLinks.style.width = '100%';
                    navLinks.style.backgroundColor = 'white';
                    navLinks.style.padding = '1rem';
                    navLinks.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
                }
            }
        });
    }

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Show/hide projects based on filter
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe project cards and sections
    document.querySelectorAll('.project-card, .skill-category, .about-card, .step').forEach(el => {
        observer.observe(el);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .project-card, .skill-category, .about-card, .step {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .project-card.animate-in, .skill-category.animate-in,
        .about-card.animate-in, .step.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .project-card:nth-child(odd) { transition-delay: 0.1s; }
        .project-card:nth-child(even) { transition-delay: 0.2s; }
    `;
    document.head.appendChild(style);

    // Highlight active section in navbar
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add active link styling to CSS
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        .nav-links a.active {
            color: var(--primary) !important;
            font-weight: 600;
        }
    `;
    document.head.appendChild(activeStyle);

    // Make tech tags interactive
    document.querySelectorAll('.tech-tag, .skill-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const text = this.textContent;
            const tempInput = document.createElement('input');
            tempInput.value = text;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);

            // Visual feedback
            const originalText = this.textContent;
            this.textContent = 'Copied!';
            this.style.backgroundColor = 'var(--success)';
            this.style.color = 'white';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 1000);
        });
    });
});