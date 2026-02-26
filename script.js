// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const modal = document.getElementById('form-modal');
const formContainer = document.getElementById('form-container');

// Navigation functionality
function initNavigation() {
    const navOverlay = document.getElementById('nav-menu-overlay');
    const body = document.body;
    
    // Background Scroll-Lock: overflow hidden on body when menu is open
    // Prevents background from shifting while user taps a link – click-state stays stable
    let scrollPosition = 0;
    function toggleScrollLock(isMenuOpen) {
        if (isMenuOpen) {
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            body.style.top = `-${scrollPosition}px`;
            body.classList.add('menu-open'); // CSS: body.menu-open { overflow: hidden; … }
        } else {
            body.classList.remove('menu-open');
            body.style.top = '';
            window.scrollTo(0, scrollPosition);
            scrollPosition = 0;
        }
    }
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.contains('active');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        if (navOverlay) {
            navOverlay.classList.toggle('active');
        }
        // Toggle scroll lock - lock when opening, unlock when closing
        toggleScrollLock(!isActive);
    });

    // Close mobile menu when clicking on overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            // Unlock scroll when menu closes
            toggleScrollLock(false);
        });
    }

    // Close mobile menu when clicking on a link
    // Interactive "Red-i" Navigation Signature - Pulse animation on tap
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            // Trigger pulse animation on Brand Red "i" when link is tapped
            const brandI = link.querySelector('.brand-i');
            if (brandI) {
                // Add tapped class to trigger pulse animation
                link.classList.add('tapped');
                // Remove class after animation completes to allow re-triggering
                setTimeout(() => {
                    link.classList.remove('tapped');
                }, 500); // Match animation duration
            }
            
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            if (navOverlay) {
                navOverlay.classList.remove('active');
            }
            // Unlock scroll when menu closes via link click
            toggleScrollLock(false);
        });
        
        // Also handle touch events for mobile devices
        link.addEventListener('touchstart', (e) => {
            const brandI = link.querySelector('.brand-i');
            if (brandI) {
                link.classList.add('tapped');
                setTimeout(() => {
                    link.classList.remove('tapped');
                }, 500);
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Language detection
function getCurrentLanguage() {
    const currentPage = window.location.pathname;
    return currentPage.includes('-de.html') ? 'de' : 'en';
}

// Form handling
function initForms() {
    const currentLang = getCurrentLanguage();
    
    // Form templates with translations
    const forms = {
        'early-access': {
            title: currentLang === 'de' ? 'Warteliste für IOMS beitreten' : 'Join Our Waitlist for IOMS',
            subtitle: currentLang === 'de' ? 'Seien Sie unter den ersten, die die Zukunft des intelligenten Abfallmanagements erleben' : 'Be among the first to experience the future of smart waste management',
            fields: [
                { type: 'text', name: 'name', label: currentLang === 'de' ? 'Vollständiger Name' : 'Full Name', required: true },
                { type: 'email', name: 'email', label: currentLang === 'de' ? 'E-Mail-Adresse' : 'Email Address', required: true },
                { type: 'text', name: 'company', label: currentLang === 'de' ? 'Firmenname' : 'Company Name', required: true },
                { type: 'select', name: 'role', label: currentLang === 'de' ? 'Ich möchte beitreten als:' : 'I want to join as:', required: true, options: currentLang === 'de' ? [
                    'Als Lieferant', 'Als Kunde', 'Als Händler'
                ] : [
                    'As a Supplier', 'As a Customer', 'As a Distributor'
                ]},
                { type: 'textarea', name: 'additional_info', label: currentLang === 'de' ? 'Erzählen Sie uns von Ihrem Unternehmen und wie IOMS helfen kann (Optional)' : 'Tell us about your business and how IOMS can help (Optional)', required: false }
            ]
        },
        'roi': {
            title: currentLang === 'de' ? 'Kosteneinsparungen berechnen' : 'Get a Savings Estimate',
            subtitle: currentLang === 'de' ? 'Erfahren Sie, wie viel Sie mit IOMS sparen können' : 'See how much you can save with IOMS',
            fields: [
                { type: 'text', name: 'name', label: currentLang === 'de' ? 'Vollständiger Name' : 'Full Name', required: true },
                { type: 'email', name: 'email', label: currentLang === 'de' ? 'E-Mail-Adresse' : 'Email Address', required: true },
                { type: 'tel', name: 'phone', label: currentLang === 'de' ? 'Telefonnummer' : 'Phone Number', required: true },
                { type: 'text', name: 'company', label: currentLang === 'de' ? 'Restaurant/Firmenname' : 'Restaurant/Company Name', required: true },
                { type: 'number', name: 'monthly_revenue', label: currentLang === 'de' ? 'Monatlicher Umsatz (€)' : 'Monthly Revenue (€)', required: true, placeholder: currentLang === 'de' ? 'z.B. 50000' : 'e.g. 50000' },
                { type: 'number', name: 'kitchen_size', label: currentLang === 'de' ? 'Anzahl der Küchen' : 'Number of Kitchens', required: true, placeholder: currentLang === 'de' ? 'z.B. 2' : 'e.g. 2' },
                { type: 'select', name: 'waste_concern', label: currentLang === 'de' ? 'Hauptanliegen bezüglich Abfall' : 'Primary Waste Concern', required: true, options: currentLang === 'de' ? [
                    'Kostenreduzierung', 'Nachhaltigkeit', 'Compliance', 'Beides'
                ] : [
                    'Cost Reduction', 'Sustainability', 'Compliance', 'Both'
                ]}
            ]
        },
        'demo': {
            title: currentLang === 'de' ? '15-Minuten Demo buchen' : 'Book a 15-min Demo',
            subtitle: currentLang === 'de' ? 'Sehen Sie IOMS in Aktion mit einer personalisierten Demonstration' : 'See IOMS in action with a personalized demonstration',
            steps: [
                {
                    step: 1,
                    title: currentLang === 'de' ? 'Kontaktinformationen' : 'Contact Information',
                    fields: [
                        { type: 'text', name: 'name', label: currentLang === 'de' ? 'Vollständiger Name' : 'Full Name', required: true },
                        { type: 'email', name: 'email', label: currentLang === 'de' ? 'E-Mail-Adresse' : 'Email Address', required: true },
                        { type: 'tel', name: 'phone', label: currentLang === 'de' ? 'Telefonnummer' : 'Phone Number', required: true },
                        { type: 'text', name: 'company', label: currentLang === 'de' ? 'Restaurant/Firmenname' : 'Restaurant/Company Name', required: true }
                    ]
                },
                {
                    step: 2,
                    title: currentLang === 'de' ? 'Terminplanung' : 'Scheduling',
                    fields: [
                        { type: 'select', name: 'demo_type', label: currentLang === 'de' ? 'Demo-Typ' : 'Demo Type', required: true, options: currentLang === 'de' ? [
                            'Live-Demo (30 Min)', 'Produktpräsentation (15 Min)', 'Individuelle Präsentation (45 Min)'
                        ] : [
                            'Live Demo (30 min)', 'Product Walkthrough (15 min)', 'Custom Presentation (45 min)'
                        ]},
                        { type: 'datetime-local', name: 'preferred_time', label: currentLang === 'de' ? 'Bevorzugtes Datum & Uhrzeit' : 'Preferred Date & Time', required: true },
                        { type: 'textarea', name: 'questions', label: currentLang === 'de' ? 'Spezifische Fragen oder Anforderungen' : 'Specific Questions or Requirements', required: false }
                    ]
                }
            ]
        },
        'whitepaper': {
            title: currentLang === 'de' ? 'Unser Forschungs-Whitepaper herunterladen' : 'Download Our Research Whitepaper',
            subtitle: currentLang === 'de' ? 'Die Zukunft des Abfallmanagements in der F&B-Branche' : 'The Future of Food Waste Management in the F&B Industry',
            fields: [
                { type: 'text', name: 'name', label: currentLang === 'de' ? 'Vollständiger Name' : 'Full Name', required: true },
                { type: 'email', name: 'email', label: currentLang === 'de' ? 'E-Mail-Adresse' : 'Email Address', required: true },
                { type: 'text', name: 'company', label: currentLang === 'de' ? 'Firmenname' : 'Company Name', required: true },
                { type: 'select', name: 'industry', label: currentLang === 'de' ? 'Branche' : 'Industry', required: true, options: currentLang === 'de' ? [
                    'Restaurant', 'Gastronomie', 'Hotellerie', 'Einzelhandel', 'Beratung', 'Sonstiges'
                ] : [
                    'Restaurant', 'Food Service', 'Hospitality', 'Retail', 'Consulting', 'Other'
                ]},
                { type: 'checkbox', name: 'newsletter', label: currentLang === 'de' ? 'Newsletter für Brancheneinblicke abonnieren' : 'Subscribe to our newsletter for industry insights', required: false }
            ]
        }
    };

    // Open form modal
    window.openForm = function(formType) {
        const form = forms[formType];
        if (!form) return;

        formContainer.innerHTML = createFormHTML(form);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Modal opens directly in center - no animation needed
        // Remove any animation classes that might cause movement
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.classList.remove('fade-in-up');
        }
        
        // Initialize progress bar for step-based forms
        const formElement = formContainer.querySelector('#dynamic-form');
        if (formElement && formElement.dataset.totalSteps) {
            const currentStep = parseInt(formElement.dataset.currentStep);
            const totalSteps = parseInt(formElement.dataset.totalSteps);
            updateProgressBar(currentStep, totalSteps);
        }
        
        // Add scrollbar interaction handlers
        const scrollArea = formContainer.querySelector('.form-fields-scroll');
        if (scrollArea) {
            // Show scrollbar on scroll/touch
            let scrollTimeout;
            const showScrollbar = () => {
                scrollArea.classList.add('scrolling');
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    scrollArea.classList.remove('scrolling');
                }, 1000); // Hide after 1 second of inactivity
            };
            
            scrollArea.addEventListener('scroll', showScrollbar);
            scrollArea.addEventListener('touchstart', showScrollbar);
            scrollArea.addEventListener('touchmove', showScrollbar);
        }
    };

    // Close form modal
    window.closeForm = function() {
        // Remove animation class before closing
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.classList.remove('fade-in-up');
        }
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        formContainer.innerHTML = '';
    };

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeForm();
        }
    });

    // Create form HTML
    function createFormHTML(form) {
        const formType = Object.keys(forms).find(key => forms[key] === form);
        let html = '';
        
        // Check if form has steps (progressive disclosure)
        if (form.steps && form.steps.length > 0) {
            // Step-based form with progress bar
            html = `
                <div class="form-progress-bar">
                    <div class="form-progress-fill" id="form-progress-fill"></div>
                </div>
                <div class="form-header">
                    <h2>${form.title}</h2>
                    <p>${form.subtitle}</p>
                </div>
                <form id="dynamic-form" onsubmit="handleFormSubmit(event, '${formType}')" data-current-step="1" data-total-steps="${form.steps.length}">
                    <div class="form-fields-scroll">
                        ${form.steps.map((step, index) => `
                            <div class="form-step" data-step="${step.step}" style="display: ${index === 0 ? 'block' : 'none'};">
                                <h3 class="step-title">${step.title}</h3>
                                ${step.fields.map(field => createFieldHTML(field)).join('')}
                            </div>
                        `).join('')}
                    </div>
                    <div class="form-navigation">
                        <button type="button" class="form-nav-btn form-nav-back" onclick="goToPreviousStep()" style="display: none;">
                            <i class="fas fa-arrow-left"></i>
                            ${currentLang === 'de' ? 'Zurück' : 'Back'}
                        </button>
                        <button type="button" class="form-nav-btn form-nav-next" onclick="goToNextStep()">
                            ${currentLang === 'de' ? 'Weiter' : 'Next'}
                            <i class="fas fa-arrow-right"></i>
                        </button>
                        <button type="submit" class="form-submit" style="display: none;">
                            <i class="fas fa-shield-alt"></i>
                            ${currentLang === 'de' ? 'Demo sichern' : 'Secure My Demo'}
                        </button>
                    </div>
                </form>
            `;
        } else {
            // Standard single-step form
            html = `
                <div class="form-header">
                    <h2>${form.title}</h2>
                    <p>${form.subtitle}</p>
                </div>
                <form id="dynamic-form" onsubmit="handleFormSubmit(event, '${formType}')">
                    <div class="form-fields-scroll">
            `;

            form.fields.forEach(field => {
                html += createFieldHTML(field);
            });

            html += `
                    </div>
                    <button type="submit" class="form-submit">
                        <i class="fas fa-paper-plane"></i>
                        ${currentLang === 'de' ? 'Absenden' : 'Submit'}
                    </button>
                </form>
            `;
        }

        return html;
    }
    
    // Step navigation functions
    window.goToNextStep = function() {
        const form = document.getElementById('dynamic-form');
        if (!form) return;
        
        const currentStep = parseInt(form.dataset.currentStep);
        const totalSteps = parseInt(form.dataset.totalSteps);
        
        // Validate current step
        const currentStepElement = form.querySelector(`.form-step[data-step="${currentStep}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (!isValid) {
            return; // Don't proceed if validation fails
        }
        
        // Hide current step
        currentStepElement.style.display = 'none';
        
        // Show next step
        if (currentStep < totalSteps) {
            const nextStep = currentStep + 1;
            form.dataset.currentStep = nextStep;
            const nextStepElement = form.querySelector(`.form-step[data-step="${nextStep}"]`);
            if (nextStepElement) {
                nextStepElement.style.display = 'block';
            }
            
            // Update progress bar
            updateProgressBar(nextStep, totalSteps);
            
            // Update navigation buttons
            const backBtn = form.querySelector('.form-nav-back');
            const nextBtn = form.querySelector('.form-nav-next');
            const submitBtn = form.querySelector('.form-submit');
            
            if (backBtn) backBtn.style.display = 'inline-flex';
            if (nextStep === totalSteps) {
                if (nextBtn) nextBtn.style.display = 'none';
                if (submitBtn) submitBtn.style.display = 'inline-flex';
            }
        }
    };
    
    window.goToPreviousStep = function() {
        const form = document.getElementById('dynamic-form');
        if (!form) return;
        
        const currentStep = parseInt(form.dataset.currentStep);
        
        if (currentStep > 1) {
            // Hide current step
            const currentStepElement = form.querySelector(`.form-step[data-step="${currentStep}"]`);
            currentStepElement.style.display = 'none';
            
            // Show previous step
            const prevStep = currentStep - 1;
            form.dataset.currentStep = prevStep;
            const prevStepElement = form.querySelector(`.form-step[data-step="${prevStep}"]`);
            if (prevStepElement) {
                prevStepElement.style.display = 'block';
            }
            
            // Update progress bar
            updateProgressBar(prevStep, parseInt(form.dataset.totalSteps));
            
            // Update navigation buttons
            const backBtn = form.querySelector('.form-nav-back');
            const nextBtn = form.querySelector('.form-nav-next');
            const submitBtn = form.querySelector('.form-submit');
            
            if (prevStep === 1) {
                if (backBtn) backBtn.style.display = 'none';
            }
            if (nextBtn) nextBtn.style.display = 'inline-flex';
            if (submitBtn) submitBtn.style.display = 'none';
        }
    };
    
    // Update progress bar - accessible globally
    window.updateProgressBar = function(currentStep, totalSteps) {
        const progressFill = document.getElementById('form-progress-fill');
        if (progressFill) {
            const progress = (currentStep / totalSteps) * 100;
            progressFill.style.width = progress + '%';
        }
    };

    // Create field HTML
    function createFieldHTML(field) {
        let html = `<div class="form-group">`;
        
        if (field.type === 'checkbox') {
            html += `
                <label class="checkbox-label">
                    <input type="checkbox" name="${field.name}" ${field.required ? 'required' : ''}>
                    <span class="checkmark"></span>
                    ${field.label}
                </label>
            `;
        } else {
            html += `<label for="${field.name}">${field.label}${field.required ? ' *' : ''}</label>`;
            
            if (field.type === 'select') {
                html += `<select name="${field.name}" id="${field.name}" ${field.required ? 'required' : ''}>`;
                const currentLang = getCurrentLanguage();
                const placeholderText = currentLang === 'de' ? 'Wählen Sie' : 'Select';
                html += `<option value="">${placeholderText} ${field.label.toLowerCase()}</option>`;
                field.options.forEach(option => {
                    html += `<option value="${option}">${option}</option>`;
                });
                html += `</select>`;
            } else if (field.type === 'textarea') {
                html += `<textarea name="${field.name}" id="${field.name}" ${field.required ? 'required' : ''}></textarea>`;
            } else if (field.type === 'range') {
                html += `
                    <div class="range-container">
                        <input type="range" name="${field.name}" id="${field.name}" 
                               min="${field.min}" max="${field.max}" value="${field.value}" 
                               ${field.required ? 'required' : ''} 
                               oninput="updateRangeValue(this)">
                        <div class="range-labels">
                            <span>1</span>
                            <span class="range-value">${field.value}</span>
                            <span>10</span>
                        </div>
                    </div>
                `;
            } else {
                html += `<input type="${field.type}" name="${field.name}" id="${field.name}" ${field.required ? 'required' : ''}>`;
            }
        }
        
        html += `</div>`;
        return html;
    }

    // Update range value display
    window.updateRangeValue = function(input) {
        const valueDisplay = input.parentElement.querySelector('.range-value');
        valueDisplay.textContent = input.value;
    };

    // Handle form submission
    window.handleFormSubmit = function(event, formType) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Add form type to data
        data.formType = formType;
        data.timestamp = new Date().toISOString();
        
        // Show loading state
        const submitBtn = form.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            console.log('Form submitted:', data);
            
            // Show success message
            formContainer.innerHTML = `
                <div class="form-success">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2>Thank You!</h2>
                    <p>Your submission has been received. We'll get back to you within 24 hours.</p>
                    <button class="cta-button primary" onclick="closeForm()">
                        <i class="fas fa-times"></i>
                        Close
                    </button>
                </div>
            `;
            
            // Reset form
            form.reset();
        }, 2000);
    };
}

// Animations and scroll effects
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .problem-stat, .step, .testimonial, .benefit-item');
    animateElements.forEach(el => observer.observe(el));

    // Counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number, .proof-stat .stat-number');
        
        counters.forEach(counter => {
            const originalText = counter.textContent;
            const target = parseInt(originalText.replace(/[^\d]/g, ''));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format based on original content
                if (originalText.includes('€143B')) {
                    counter.textContent = '€' + Math.floor(current) + 'B';
                } else if (originalText.includes('€15K')) {
                    counter.textContent = '€' + Math.floor(current) + 'K';
                } else if (originalText.includes('%')) {
                    counter.textContent = Math.floor(current) + '%';
                } else if (originalText.includes('€')) {
                    counter.textContent = '€' + Math.floor(current).toLocaleString();
                } else if (originalText.includes('+')) {
                    counter.textContent = Math.floor(current).toLocaleString() + '+';
                } else if (originalText.includes('M')) {
                    counter.textContent = Math.floor(current) + 'M';
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });
    }

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Parallax effects
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual, .dashboard-mockup');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Hardware product image parallax - subtle 5% offset for three-dimensional feel
        const hardwareImage = document.querySelector('.hardware-image-placeholder');
        if (hardwareImage) {
            const hardwareSection = document.querySelector('.hardware-section');
            if (hardwareSection) {
                const rect = hardwareSection.getBoundingClientRect();
                const sectionTop = rect.top + window.pageYOffset;
                const sectionHeight = hardwareSection.offsetHeight;
                
                // Apply parallax when section is in viewport
                if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
                    const parallaxSpeed = 0.05; /* 5% parallax offset - subtle three-dimensional feel */
                    const offset = (scrolled - sectionTop) * parallaxSpeed;
                    hardwareImage.style.transform = `translateY(${offset}px)`;
                } else if (scrolled < sectionTop) {
                    hardwareImage.style.transform = 'translateY(0)';
                }
            }
        }
        
        // Gravity Interaction - Footer reveal effect (uncovered by CTA section)
        const footer = document.querySelector('.footer');
        if (footer) {
            const footerRect = footer.getBoundingClientRect();
            const footerTop = footerRect.top + window.pageYOffset;
            const revealStart = footerTop - window.innerHeight - 200; // Start revealing 200px before footer enters viewport
            
            // Calculate reveal progress as user approaches footer
            if (scrolled > revealStart) {
                const revealProgress = Math.min(1, (scrolled - revealStart) / 600); // 600px reveal range
                const parallaxSpeed = 0.4; /* Footer moves slower than scroll, creating "uncovered" effect */
                const maxOffset = 150; /* Maximum offset - footer starts 150px below */
                const offset = maxOffset * (1 - revealProgress) * parallaxSpeed;
                footer.style.transform = `translateY(${offset}px)`;
            } else {
                footer.style.transform = `translateY(${150 * 0.4}px)`; /* Initially positioned below (60px offset) */
            }
        }
    });
}

// Typing animation for hero title
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
}

// Smooth reveal animations
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.section-header, .feature-item, .benefit-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
}

// Form validation
function initFormValidation() {
    // Real-time validation
    document.addEventListener('input', (e) => {
        if (e.target.matches('input, select, textarea')) {
            validateField(e.target);
        }
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const isValid = field.checkValidity();
        
        // Remove existing validation classes
        field.classList.remove('error', 'success');
        
        if (value && isValid) {
            field.classList.add('success');
        } else if (value && !isValid) {
            field.classList.add('error');
        }
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
function initPerformanceOptimizations() {
    // Lazy loading for images (if any are added later)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounced scroll events
    const debouncedScroll = debounce(() => {
        // Any scroll-based functionality
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);
}

// Initialize everything when DOM is loaded
// Atmospheric Spotlight Effect - Mouse-following spotlight for solution section
function initAtmosphericSpotlight() {
    const solutionSection = document.querySelector('.solution-section');
    if (!solutionSection) return;

    const setSpotlightCenter = () => {
        const rect = solutionSection.getBoundingClientRect();
        solutionSection.style.setProperty('--spotlight-x', `${rect.width * 0.5}px`);
        solutionSection.style.setProperty('--spotlight-y', `${rect.height * 0.2}px`);
    };
    setSpotlightCenter();
    window.addEventListener('resize', setSpotlightCenter);

    solutionSection.addEventListener('mousemove', (e) => {
        const rect = solutionSection.getBoundingClientRect();
        const xPx = e.clientX - rect.left;
        const yPx = e.clientY - rect.top;
        solutionSection.style.setProperty('--spotlight-x', `${xPx}px`);
        solutionSection.style.setProperty('--spotlight-y', `${yPx}px`);
    });

    solutionSection.addEventListener('mouseleave', setSpotlightCenter);
}

// Interactive Signature - Cursor-tracking radial highlight for "Book a Demo" button
function initButtonHighlight() {
    const demoButton = document.querySelector('.hero-cta .cta-button.primary');
    if (!demoButton) return;

    demoButton.addEventListener('mousemove', (e) => {
        const rect = demoButton.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        demoButton.style.setProperty('--highlight-x', `${x}px`);
        demoButton.style.setProperty('--highlight-y', `${y}px`);
    });

    // Reset to center when mouse leaves
    demoButton.addEventListener('mouseleave', () => {
        const rect = demoButton.getBoundingClientRect();
        demoButton.style.setProperty('--highlight-x', `${rect.width / 2}px`);
        demoButton.style.setProperty('--highlight-y', `${rect.height / 2}px`);
    });
}

// Kinetic Reveal - Wrap specific words in hero title with overflow-hidden containers
function initHeroKineticReveal() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    // Find all spans with kinetic-word class
    const kineticWords = heroTitle.querySelectorAll('.kinetic-word');
    
    kineticWords.forEach(kineticWord => {
        // Create wrapper with overflow-hidden
        const wrapper = document.createElement('span');
        wrapper.className = 'kinetic-word-wrapper';
        // Preserve no-break class if present
        if (kineticWord.classList.contains('no-break')) {
            wrapper.classList.add('no-break');
        }
        wrapper.style.overflow = 'hidden';
        wrapper.style.display = 'inline-block';
        wrapper.style.verticalAlign = 'bottom';
        wrapper.style.lineHeight = 'inherit';
        wrapper.style.height = '1.2em'; // Ensure wrapper has height to mask properly
        
        // Create content span that will be animated
        const contentSpan = document.createElement('span');
        contentSpan.className = 'kinetic-word-content';
        contentSpan.innerHTML = kineticWord.innerHTML;
        // Preserve the highlight-keyword color
        contentSpan.style.color = getComputedStyle(kineticWord).color;
        
        // Wrap the kinetic word
        wrapper.appendChild(contentSpan);
        kineticWord.parentNode.replaceChild(wrapper, kineticWord);
    });
}

// Line-by-Line Masking - Wrap words in divs with overflow-hidden for reveal effect
function initHeadingReveal() {
    // Select all primary headlines EXCEPT hero-title (which has its own kinetic reveal)
    const headings = document.querySelectorAll('.section-header h2, .solution-header h2, .hardware-text h2, .features-section .section-header h2, .social-proof .section-header h2, .final-cta h2');
    
    headings.forEach((heading, headingIndex) => {
        const text = heading.textContent;
        const words = text.split(' ');
        
        // Clear the heading content
        heading.innerHTML = '';
        
        // Wrap each word in a div with overflow-hidden
        words.forEach((word, wordIndex) => {
            const wordWrapper = document.createElement('span');
            wordWrapper.className = 'heading-word-wrapper';
            wordWrapper.style.overflow = 'hidden';
            wordWrapper.style.display = 'inline-block';
            wordWrapper.style.verticalAlign = 'bottom';
            
            const wordSpan = document.createElement('span');
            wordSpan.className = 'heading-word';
            wordSpan.textContent = word + (wordIndex < words.length - 1 ? ' ' : '');
            wordSpan.style.animationDelay = `${wordIndex * 0.1}s`; // Stagger each word by 0.1s
            
            wordWrapper.appendChild(wordSpan);
            heading.appendChild(wordWrapper);
        });
    });
}

// Scroll-Trigger Integration - Intersection Observer for heading animations
function initScrollTriggeredAnimations() {
    // Track animated elements to prevent re-triggering (motion fatigue prevention)
    const animatedElements = new Set();
    
    // Select all elements that need scroll-triggered animations
    const animatedSelectors = [
        '.section-header h2',
        '.hero-title', // Hero title (will trigger kinetic words separately)
        '.solution-header h2',
        '.hardware-text h2',
        '.features-section .section-header h2',
        '.social-proof .section-header h2',
        '.final-cta h2',
        '.section-header p',
        '.hero-subtitle',
        '.solution-header p',
        '.hardware-description',
        '.features-section .section-header p',
        '.social-proof .section-header p',
        '.cta-button',
        '.feature-card',
        '.bento-card',
        '.final-cta-button',
        '.proof-stat',
        '.insight-card'
    ];
    
    const elementsToAnimate = document.querySelectorAll(animatedSelectors.join(', '));
    
    // Intersection Observer - triggers when element is 20% into viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Only animate if element is 20% visible and hasn't been animated before
            if (entry.intersectionRatio >= 0.2 && !animatedElements.has(entry.target)) {
                // Special handling for hero title - trigger kinetic word animations
                if (entry.target.classList.contains('hero-title')) {
                    const kineticWrappers = entry.target.querySelectorAll('.kinetic-word-wrapper');
                    kineticWrappers.forEach((wrapper, index) => {
                        wrapper.classList.add('animate-kinetic');
                        // Optional: Add slight stagger delay between kinetic words
                        wrapper.querySelector('.kinetic-word-content').style.animationDelay = `${index * 0.15}s`;
                    });
                }
                // For headings with word wrappers, animate all word spans
                else if (entry.target.querySelectorAll('.heading-word').length > 0) {
                    const wordSpans = entry.target.querySelectorAll('.heading-word');
                    wordSpans.forEach((word, index) => {
                        word.classList.add('animate-in');
                        // Maintain word-by-word stagger delay
                        word.style.animationDelay = `${index * 0.1}s`;
                    });
                    // Also add animate-in to the heading itself for sweep effect trigger
                    entry.target.classList.add('animate-in');
                } else {
                    // For other elements, add animate-in class directly
                    entry.target.classList.add('animate-in');
                }
                animatedElements.add(entry.target); // Mark as animated to prevent re-triggering
            }
        });
    }, {
        threshold: 0.2, // Trigger when 20% of element is visible
        rootMargin: '0px'
    });
    
    // Observe all elements
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // Immediate check for hero title (since it's at the top, it might already be in view)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const rect = heroTitle.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        if (isInView && !animatedElements.has(heroTitle)) {
            const kineticWrappers = heroTitle.querySelectorAll('.kinetic-word-wrapper');
            kineticWrappers.forEach((wrapper, index) => {
                wrapper.classList.add('animate-kinetic');
                // Optional: Add slight stagger delay between kinetic words
                wrapper.querySelector('.kinetic-word-content').style.animationDelay = `${index * 0.15}s`;
            });
            animatedElements.add(heroTitle);
        }
    }
}

// Video Lightbox functionality
function initVideoLightbox() {
    // Create video lightbox modal if it doesn't exist
    let videoModal = document.getElementById('video-lightbox');
    if (!videoModal) {
        videoModal = document.createElement('div');
        videoModal.id = 'video-lightbox';
        videoModal.className = 'video-lightbox';
        videoModal.innerHTML = `
            <div class="video-lightbox-content">
                <span class="video-lightbox-close">&times;</span>
                <div class="video-lightbox-iframe-container">
                    <iframe id="video-iframe" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        `;
        document.body.appendChild(videoModal);
    }

    // Close lightbox
    const closeBtn = videoModal.querySelector('.video-lightbox-close');
    closeBtn.addEventListener('click', closeVideoLightbox);
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.style.display === 'block') {
            closeVideoLightbox();
        }
    });
}

function openVideoLightbox(event) {
    event.preventDefault();
    const videoModal = document.getElementById('video-lightbox');
    if (!videoModal) return;

    // Replace with your actual video URL (YouTube, Vimeo, etc.)
    // For now using a placeholder - you'll need to replace with actual video embed URL
    const videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Replace with your actual video URL
    
    const iframe = videoModal.querySelector('#video-iframe');
    iframe.src = videoUrl + '?autoplay=1';
    videoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeVideoLightbox() {
    const videoModal = document.getElementById('video-lightbox');
    if (!videoModal) return;

    const iframe = videoModal.querySelector('#video-iframe');
    iframe.src = ''; // Stop video playback
    videoModal.style.display = 'none';
    document.body.style.overflow = '';
}

// Make function globally accessible
window.openVideoLightbox = openVideoLightbox;

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initForms();
    initAnimations();
    initParallax();
    initRevealAnimations();
    initFormValidation();
    initAtmosphericSpotlight();
    initButtonHighlight();
    initHeroKineticReveal(); // Wrap kinetic words in hero title first
    initHeadingReveal(); // Wrap words for other headings
    initScrollTriggeredAnimations(); // Then set up scroll triggers
    initPerformanceOptimizations();
    initVideoLightbox(); // Initialize video lightbox
    
    // Add loading complete class
    document.body.classList.add('loaded');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.classList.add('paused');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('paused');
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could send error to analytics service
});

// Export functions for global access
window.WebMeister360 = {
    openForm,
    closeForm,
    handleFormSubmit,
    updateRangeValue
};
