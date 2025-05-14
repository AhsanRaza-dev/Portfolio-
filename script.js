// Merged Portfolio JavaScript with Glitch Counter and Neural Network Effects

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Smooth scrolling for anchor links
    initSmoothScroll();
    
    // Animated section reveals with ScrollTrigger
    initScrollAnimations();
    
    // Neural network animation
    initNeuralNetwork();
    
    // Initialize particles.js
    initParticles();
    
    // Form validation
    initContactForm();
    
    // Initialize counter animation
    initGlitchCounters();
});

// Navigation functionality
function initNavigation() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('header');
    
    // Toggle navigation menu
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });
    
    // Close navigation when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
        });
    });
    
    // Change header background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active-link');
            }
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animated section reveals with ScrollTrigger
function initScrollAnimations() {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: header,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Animate about section
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        const aboutImage = aboutContent.querySelector('.about-image');
        const aboutText = aboutContent.querySelector('.about-text');
        
        gsap.from(aboutImage, {
            x: -100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: aboutContent,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });
        
        gsap.from(aboutText, {
            x: 100,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            scrollTrigger: {
                trigger: aboutContent,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });
    }
    
    // Animate expertise cards
    gsap.utils.toArray('.expertise-card').forEach((card, index) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: '.expertise-container',
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Animate project cards
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            y: 70,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: '.projects-container',
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Animate contact section
    const contactContainer = document.querySelector('.contact-container');
    if (contactContainer) {
        const contactInfo = contactContainer.querySelector('.contact-info');
        const contactForm = contactContainer.querySelector('.contact-form');
        
        gsap.from(contactInfo, {
            x: -100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: contactContainer,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });
        
        gsap.from(contactForm, {
            x: 100,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            scrollTrigger: {
                trigger: contactContainer,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });
    }
}

// Neural network visualization
function initNeuralNetwork() {
    const canvas = document.getElementById('neural-network');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    // Neural network nodes
    const nodes = [];
    const numNodes = 50;
    const connections = [];
    const connectionProbability = 0.03; // Probability of connection between nodes
    
    // Create nodes
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 3 + 1,
            speed: Math.random() * 0.5 + 0.1,
            angle: Math.random() * Math.PI * 2,
            color: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.5})`
        });
    }
    
    // Create connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() < connectionProbability) {
                connections.push({
                    from: i,
                    to: j,
                    active: false,
                    pulsePosition: 0,
                    pulseSpeed: Math.random() * 0.02 + 0.005,
                    pulseActive: false,
                    nextPulseTime: Math.random() * 10000
                });
            }
        }
    }
    
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw connections
        const currentTime = Date.now();
        connections.forEach(connection => {
            const from = nodes[connection.from];
            const to = nodes[connection.to];
            
            // Calculate distance
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Only draw connections within a certain distance
            if (distance < 200) {
                // Draw line
                ctx.beginPath();
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);
                
                // Line gradient based on distance
                const opacity = 0.2 * (1 - distance / 200);
                ctx.strokeStyle = `rgba(0, 184, 255, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
                
                // Check if we should start a new pulse
                if (!connection.pulseActive && currentTime > connection.nextPulseTime) {
                    connection.pulseActive = true;
                    connection.pulsePosition = 0;
                }
                
                // Draw pulse if active
                if (connection.pulseActive) {
                    const pulseX = from.x + dx * connection.pulsePosition;
                    const pulseY = from.y + dy * connection.pulsePosition;
                    
                    ctx.beginPath();
                    ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(109, 0, 254, 0.8)';
                    ctx.fill();
                    
                    // Update pulse position
                    connection.pulsePosition += connection.pulseSpeed;
                    
                    // Reset pulse when it reaches the end
                    if (connection.pulsePosition >= 1) {
                        connection.pulseActive = false;
                        connection.nextPulseTime = currentTime + Math.random() * 5000 + 2000;
                    }
                }
            }
        });
        
        // Update and draw nodes
        nodes.forEach(node => {
            // Move nodes
            node.x += Math.cos(node.angle) * node.speed;
            node.y += Math.sin(node.angle) * node.speed;
            
            // Bounce off edges
            if (node.x < 0 || node.x > width) {
                node.angle = Math.PI - node.angle;
            }
            if (node.y < 0 || node.y > height) {
                node.angle = -node.angle;
            }
            
            // Keep nodes in bounds
            node.x = Math.max(0, Math.min(width, node.x));
            node.y = Math.max(0, Math.min(height, node.y));
            
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = node.color;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize particles.js
function initParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00b8ff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.6
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
}

// Form validation and submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (name === '' || email === '' || subject === '' || message === '') {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission (replace with actual form submission)
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Success message
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #00c853, #009688)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
    
    // Add special animation to form inputs
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Glitch Counter Animation
function initGlitchCounters() {
    // Insert glitch animation CSS
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes glitch-hover {
                0% {
                    transform: translate(0);
                    text-shadow: 0 0 0 rgba(0, 255, 255, 0);
                }
                20% {
                    transform: translate(-2px, 2px);
                    text-shadow: -2px 2px 0 rgba(255, 0, 255, 0.5);
                }
                40% {
                    transform: translate(-2px, -2px);
                    text-shadow: 2px -2px 0 rgba(0, 255, 255, 0.5);
                }
                60% {
                    transform: translate(2px, 2px);
                    text-shadow: 2px 2px 0 rgba(255, 0, 255, 0.5);
                }
                80% {
                    transform: translate(2px, -2px);
                    text-shadow: -2px -2px 0 rgba(0, 255, 255, 0.5);
                }
                100% {
                    transform: translate(0);
                    text-shadow: 0 0 0 rgba(255, 0, 255, 0);
                }
            }
            
            .active-glitch {
                animation: glitch-active 0.2s step-end forwards;
            }
            
            @keyframes glitch-active {
                0% { opacity: 1; transform: translate(0); }
                25% { opacity: 0.8; transform: translate(-2px, 2px); }
                50% { opacity: 1; transform: translate(2px, -2px); }
                75% { opacity: 0.9; transform: translate(-1px, -1px); }
                100% { opacity: 1; transform: translate(0); }
            }
        </style>
    `);
    
    // Function to animate counters
    function animateCounters() {
        const counters = document.querySelectorAll('.glitch-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / 100;
            let current = 0;
            
            // Reset counter text
            counter.textContent = '0';
            
            // Create counter animation
            const timer = setInterval(() => {
                current += step;
                
                // Update counter value
                counter.textContent = Math.round(current);
                
                // Add glitch class at random intervals
                if (Math.random() > 0.9) {
                    counter.classList.add('active-glitch');
                    setTimeout(() => {
                        counter.classList.remove('active-glitch');
                    }, 100);
                }
                
                // Stop the counter when target is reached
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, duration / 100);
        });
    }
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Initialize counter animation when the project counter section is visible
    function checkCounters() {
        const projectCounter = document.querySelector('.project-counter');
        if (projectCounter && isInViewport(projectCounter)) {
            animateCounters();
            // Remove scroll listener once animation has started
            window.removeEventListener('scroll', checkCounters);
        }
    }
    
    // Run on page load and scroll
    checkCounters();
    window.addEventListener('scroll', checkCounters);
    
    // Add additional glitch effect on hover
    const glitchNumbers = document.querySelectorAll('.glitch-number');
    glitchNumbers.forEach(number => {
        number.addEventListener('mouseover', function() {
            // Intensify glitch on mouseover
            this.style.animation = 'glitch-hover 0.2s infinite';
            
            // Return to normal after mouseout
            this.addEventListener('mouseout', function() {
                this.style.animation = '';
            }, { once: true });
        });
    });
}