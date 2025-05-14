// Enhanced particles.js configuration for AI Engineer Portfolio

function initEnhancedParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 100,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#6d00fe", "#00b8ff", "#ffffff"]
                },
                "shape": {
                    "type": ["circle", "triangle", "polygon"],
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 6
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.3,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00b8ff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "bounce",
                    "bounce": true,
                    "attract": {
                        "enable": true,
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
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 180,
                        "line_linked": {
                            "opacity": 0.8
                        }
                    },
                    "bubble": {
                        "distance": 200,
                        "size": 6,
                        "duration": 2,
                        "opacity": 0.8,
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
            "retina_detect": true,
            "config_demo": {
                "hide_card": false,
                "background_color": "#0a0a0a",
                "background_image": "",
                "background_position": "50% 50%",
                "background_repeat": "no-repeat",
                "background_size": "cover"
            }
        });
    }
}

// Function to create a dynamic data-driven particle system
function initDataDrivenParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('data-particles')) {
        // Simulate AI data processing with different particle behaviors
        const dataPoints = [
            { accuracy: 0.92, complexity: 0.7, importance: 0.9 },
            { accuracy: 0.87, complexity: 0.5, importance: 0.6 },
            { accuracy: 0.95, complexity: 0.8, importance: 0.8 },
            { accuracy: 0.78, complexity: 0.3, importance: 0.4 },
            { accuracy: 0.91, complexity: 0.6, importance: 0.7 }
        ];
        
        // Calculate particle configuration based on data metrics
        const particleValue = Math.floor(dataPoints.reduce((sum, point) => sum + point.complexity * 100, 0) / dataPoints.length);
        const particleSpeed = dataPoints.reduce((sum, point) => sum + point.accuracy * 3, 0) / dataPoints.length;
        const connectionOpacity = dataPoints.reduce((sum, point) => sum + point.importance, 0) / dataPoints.length * 0.8;
        
        particlesJS('data-particles', {
            "particles": {
                "number": {
                    "value": particleValue,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": function(e) {
                        // Create color based on position to simulate data clusters
                        const x = e.x / e.canvas.w;
                        const y = e.y / e.canvas.h;
                        
                        if (x < 0.33) return "#00b8ff"; // Data cluster 1
                        if (x < 0.66) return "#6d00fe"; // Data cluster 2
                        return "#00ffb8"; // Data cluster 3
                    }
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.7,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.2,
                        "sync": false
                    }
                },
                "size": {
                    "value": 4,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": connectionOpacity,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": particleSpeed,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
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
                        "mode": "connect"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 180,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "connect": {
                        "distance": 200,
                        "radius": 60,
                        "links": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 200,
                        "size": 8,
                        "duration": 2,
                        "opacity": 0.8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": Math.floor(particleValue / 10)
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

// Function to combine all particle effects into a unified system
function initParticleSystem() {
    // Initialize regular particles first
    initEnhancedParticles();
    
    // Initialize data-driven particles if element exists
    initDataDrivenParticles();
    
    // Add parallax effect to particles for depth
    if (typeof particlesJS !== 'undefined' && document.querySelectorAll('.parallax-particles').length > 0) {
        document.querySelectorAll('.parallax-particles').forEach((el, index) => {
            const containerId = `parallax-particles-${index}`;
            el.id = containerId;
            
            particlesJS(containerId, {
                "particles": {
                    "number": {
                        "value": 30,
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
                        }
                    },
                    "opacity": {
                        "value": 0.1,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.05,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 10,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 5,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": false
                    },
                    "move": {
                        "enable": true,
                        "speed": 0.6,
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
                            "mode": "slow"
                        },
                        "onclick": {
                            "enable": false
                        },
                        "resize": true
                    },
                    "modes": {
                        "slow": {
                            "factor": 3,
                            "radius": 200
                        }
                    }
                },
                "retina_detect": true
            });
            
            // Add parallax mouse movement effect
            window.addEventListener('mousemove', (e) => {
                const canvas = document.querySelector(`#${containerId} canvas`);
                if (canvas) {
                    const mouseX = e.clientX / window.innerWidth;
                    const mouseY = e.clientY / window.innerHeight;
                    
                    // Apply subtle transform based on mouse position
                    canvas.style.transform = `translate(${mouseX * 20 - 10}px, ${mouseY * 20 - 10}px)`;
                }
            });
        });
    }
}

// Initialize particle systems when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initParticleSystem();
});

// Handle window resize to recreate particles at proper dimensions
window.addEventListener('resize', function() {
    // Debounce resize event
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(function() {
        initParticleSystem();
    }, 300);
});