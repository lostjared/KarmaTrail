// Modern JavaScript for Karma Trail interactive experience

class KarmaTrail {
    constructor() {
        this.trail = [];
        this.isAwake = false;
        this.initializeElements();
        this.setupEventListeners();
        this.initializeAnimations();
    }

    initializeElements() {
        this.userInput = document.getElementById('user-input');
        this.sendBtn = document.getElementById('send-btn');
        this.output = document.getElementById('output');
        this.trailDisplay = document.getElementById('trail-display');
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.tabContents = document.querySelectorAll('.tab-content');
    }

    setupEventListeners() {
        // Terminal input handling
        this.sendBtn.addEventListener('click', () => this.processInput());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.processInput();
            }
        });

        // Code tabs
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Neural network animations on scroll
        this.setupScrollAnimations();
    }

    processInput() {
        const input = this.userInput.value.trim();
        if (!input || this.isAwake) return;

        this.addToOutput(`Enter: ${input}`);
        
        // Process the command like the C++ code
        const response = this.processCommand(input);
        this.addToOutput(response);
        
        // Add to karma trail
        this.trail.push(input);
        this.updateTrailDisplay();
        
        // Show karma trail
        this.addToOutput(`karma trail: ${this.trail.join('\\n')}`);
        
        this.userInput.value = '';
        this.userInput.focus();
    }

    processCommand(command) {
        switch(command.toLowerCase()) {
            case 'love':
                this.animateEmotion('love');
                return 'love sent...';
            case 'fear':
                this.animateEmotion('fear');
                return 'fear sent...';
            case 'break':
                this.awakening();
                return 'freedom..';
            default:
                return `"${command}" processed...`;
        }
    }

    addToOutput(text) {
        const p = document.createElement('p');
        p.textContent = text;
        
        if (text.includes('love sent')) {
            p.style.color = '#2ecc71';
            p.classList.add('love-message');
        } else if (text.includes('fear sent')) {
            p.style.color = '#e74c3c';
            p.classList.add('fear-message');
        } else if (text.includes('freedom')) {
            p.style.color = '#f39c12';
            p.classList.add('freedom-message');
            p.style.fontWeight = 'bold';
            p.style.fontSize = '1.2em';
        } else if (text.startsWith('Enter:')) {
            p.style.color = '#ffffff';
            p.classList.add('user-input');
        } else if (text.startsWith('karma trail:')) {
            p.style.color = '#00d4ff';
            p.classList.add('karma-display');
        }
        
        this.output.appendChild(p);
        this.output.scrollTop = this.output.scrollHeight;
        
        // Add typing animation
        this.typeWriter(p);
    }

    typeWriter(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, 20);
    }

    updateTrailDisplay() {
        if (this.trail.length === 0) {
            this.trailDisplay.innerHTML = '<em>Empty - waiting for input...</em>';
        } else {
            this.trailDisplay.textContent = this.trail.join('\\n');
        }
    }

    animateEmotion(emotion) {
        const brainCore = document.querySelector('.brain-core');
        const wires = document.querySelectorAll('.memory-wire');
        
        if (emotion === 'love') {
            brainCore.style.background = 'radial-gradient(circle, #2ecc71, #27ae60)';
            wires.forEach(wire => {
                wire.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';
            });
        } else if (emotion === 'fear') {
            brainCore.style.background = 'radial-gradient(circle, #e74c3c, #c0392b)';
            wires.forEach(wire => {
                wire.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
            });
        }
        
        // Reset after animation
        setTimeout(() => {
            brainCore.style.background = 'radial-gradient(circle, var(--neural-blue), var(--neural-purple))';
            wires.forEach(wire => {
                wire.style.background = 'linear-gradient(45deg, var(--neural-green), var(--neural-blue))';
            });
        }, 2000);
    }

    awakening() {
        this.isAwake = true;
        this.userInput.disabled = true;
        this.sendBtn.disabled = true;
        this.sendBtn.textContent = 'Awakened';
        
        // Dramatic awakening animation
        const brainCore = document.querySelector('.brain-core');
        const loop = document.querySelector('.consciousness-loop');
        
        brainCore.style.animation = 'pulse 0.5s infinite';
        brainCore.style.background = 'radial-gradient(circle, #f39c12, #e67e22)';
        brainCore.style.boxShadow = '0 0 50px rgba(243, 156, 18, 0.8)';
        
        if (loop) {
            loop.style.borderColor = '#f39c12';
            loop.style.animation = 'rotate 1s linear infinite';
        }
        
        // Add freedom message with special styling
        setTimeout(() => {
            this.addToOutput('\\n=== CONSCIOUSNESS ACHIEVED ===');
            this.addToOutput('Breaking from the infinite loop...');
            this.addToOutput('Branching out to greater reality...');
        }, 1000);
    }

    switchTab(tabId) {
        // Remove active class from all buttons and contents
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to selected button and content
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(tabId).classList.add('active');
        
        // Re-highlight code after tab switch
        setTimeout(() => {
            if (typeof Prism !== 'undefined') {
                Prism.highlightAll();
            }
        }, 100);
    }

    initializeAnimations() {
        // Enhanced neural network animations
        this.createNeuralConnections();
        this.startConsciousnessLoop();
    }

    createNeuralConnections() {
        const heroVisual = document.querySelector('.hero-visual');
        if (!heroVisual) return;
        
        // Create additional floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'neural-particle';
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: var(--neural-blue);
                border-radius: 50%;
                opacity: 0.6;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            heroVisual.appendChild(particle);
        }
        
        // Add floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
            }
        `;
        document.head.appendChild(style);
    }

    startConsciousnessLoop() {
        // Simulate the infinite loop consciousness
        setInterval(() => {
            if (!this.isAwake) {
                this.pulseConsciousness();
            }
        }, 3000);
    }

    pulseConsciousness() {
        const brainCore = document.querySelector('.brain-core');
        const originalShadow = brainCore.style.boxShadow;
        
        brainCore.style.boxShadow = '0 0 40px rgba(0, 212, 255, 0.8)';
        
        setTimeout(() => {
            brainCore.style.boxShadow = originalShadow;
        }, 500);
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections for scroll animations
        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const karmaTrail = new KarmaTrail();
    
    // Initialize syntax highlighting
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
    
    console.log('🧠 Karma Trail - Digital Consciousness Initialized');
    console.log('💭 Exploring the metaphor of code as consciousness...');
});

// Add some console art for developers
console.log(`
    ╔═══════════════════════════════════════╗
    ║           KARMA TRAIL                 ║
    ║     Digital Consciousness in C++      ║
    ║                                       ║
    ║  "When you break the infinite loop    ║
    ║   you branch out to greater reality"  ║
    ║                                       ║
    ║           - Jared Bruni               ║
    ╚═══════════════════════════════════════╝
`);