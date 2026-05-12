document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeIcon) {
            themeIcon.classList.remove('bi-brightness-high');
            themeIcon.classList.add('bi-moon');
        }
    }

    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', () => {
            // Add rotation animation
            themeIcon.style.transform = 'rotate(180deg)';
            
            // Toggle theme
            document.body.classList.toggle('light-mode');
            
            // Update all theme-related elements
            const allElements = document.querySelectorAll('*');
            allElements.forEach(el => {
                el.classList.add('theme-transition');
            });
            
            if (document.body.classList.contains('light-mode')) {
                themeIcon.classList.remove('bi-brightness-high');
                themeIcon.classList.add('bi-moon');
                localStorage.setItem('theme', 'light');
            } else {
                themeIcon.classList.remove('bi-moon');
                themeIcon.classList.add('bi-brightness-high');
                localStorage.setItem('theme', 'dark');
            }
            
            // Reset rotation after animation
            setTimeout(() => {
                themeIcon.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('section');
    
    // Add reveal class to all sections except hero
    revealElements.forEach(el => {
        if (!el.classList.contains('hero')) {
            el.classList.add('reveal');
        }
    });

    const reveal = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach(el => {
            if (el.classList.contains('hero')) return;
            
            const elementTop = el.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', reveal);
    reveal(); // Check on load

    // Custom Cursor
    const customCursor = document.querySelector('.custom-cursor');
    const customCursorOutline = document.querySelector('.custom-cursor-outline');

    if (customCursor && customCursorOutline) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let outlineX = mouseX;
        let outlineY = mouseY;
        const outlineSpeed = 0.18;

        const updateCursor = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            customCursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
            customCursor.style.opacity = '1';
            customCursorOutline.style.opacity = '0.9';
        };

        const animateOutline = () => {
            outlineX += (mouseX - outlineX) * outlineSpeed;
            outlineY += (mouseY - outlineY) * outlineSpeed;
            customCursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
            requestAnimationFrame(animateOutline);
        };

        document.addEventListener('mousemove', updateCursor);
        document.addEventListener('mouseleave', () => {
            customCursor.style.opacity = '0';
            customCursorOutline.style.opacity = '0';
        });

        const interactiveElements = document.querySelectorAll('a, button, .btn, .theme-toggle, .social-btn, .project-link, .submit-btn, .nav-resume');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });

        animateOutline();
    }
});
