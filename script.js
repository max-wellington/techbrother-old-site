// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active', !isActive);
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Thank you for your inquiry! We will contact you shortly.');
        
        // Reset form
        this.reset();
        
        // In a real implementation, you would send this to your backend:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     alert('Thank you for your inquiry! We will contact you shortly.');
        //     this.reset();
        // })
        // .catch(error => {
        //     alert('There was an error submitting your form. Please try again.');
        // });
    });
}


// Benefits Carousel
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.benefits-carousel');
    if (carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        
        let currentSlide = 0;
        const totalSlides = slides.length;

        function showSlide(index) {
            // Remove active class from all slides and dots
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            // Move track
            track.style.transform = `translateX(-${index * 100}%)`;
            currentSlide = index;
            
            // Update background image for foundation section
            const foundationSection = document.getElementById('foundation-section');
            if (foundationSection) {
                const activeSlide = slides[index];
                const slideImage = activeSlide.querySelector('.slide-image img');
                if (slideImage && slideImage.src) {
                    foundationSection.style.backgroundImage = `url(${slideImage.src})`;
                }
            }
        }

        function nextSlide() {
            const next = (currentSlide + 1) % totalSlides;
            showSlide(next);
        }

        function prevSlide() {
            const prev = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(prev);
        }

        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        // Initialize
        showSlide(0);
        
        // Set initial background image
        const foundationSection = document.getElementById('foundation-section');
        if (foundationSection && slides[0]) {
            const slideImage = slides[0].querySelector('.slide-image img');
            if (slideImage && slideImage.src) {
                foundationSection.style.backgroundImage = `url(${slideImage.src})`;
            }
        }

        // Auto-play (optional - uncomment if desired)
        // setInterval(nextSlide, 5000);
    }

    // Services Stacked Image Switcher
    const serviceCards = document.querySelectorAll('.service-card-stacked');
    const serviceImages = document.querySelectorAll('.service-image');
    
    if (serviceCards.length > 0 && serviceImages.length > 0) {
        const tailoredSection = document.querySelector('.tailored-support');
        // Observe tailored section visibility to limit background to its viewport
        if (tailoredSection) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(() => {
                    // Only consider section "in view" when it's centered in the viewport
                    const rect = tailoredSection.getBoundingClientRect();
                    const vh = window.innerHeight || document.documentElement.clientHeight;
                    const isCentered = rect.top <= vh * 0.25 && rect.bottom >= vh * 0.75;
                    if (isCentered) {
                        if (!tailoredSection.classList.contains('in-view')) {
                            tailoredSection.classList.add('in-view');
                            // Disable background image effects on mobile
                            // if (window.innerWidth <= 768) {
                            //     const activeImg = document.querySelector('.service-image.active');
                            //     if (activeImg && !tailoredSection.style.getPropertyValue('--tailored-bg-current')) {
                            //         tailoredSection.style.setProperty('--tailored-bg-current', `url("${activeImg.src}")`);
                            //         tailoredSection.classList.add('image-active');
                            //         document.body.classList.add('bg-dark-active');
                            //     }
                            // }
                        }
                    } else {
                        if (tailoredSection.classList.contains('in-view')) {
                            tailoredSection.classList.remove('in-view');
                            // Disable background image effects on mobile
                            // tailoredSection.style.removeProperty('--tailored-bg-current');
                            // tailoredSection.style.removeProperty('--tailored-bg-next');
                            // tailoredSection.classList.remove('image-active', 'image-fading', 'crossfading');
                            // document.body.classList.remove('bg-dark-active');
                        }
                    }
                });
            }, { root: null, rootMargin: '-25% 0px -25% 0px', threshold: 0 });
            sectionObserver.observe(tailoredSection);

            // Extra guard: on scroll, immediately clear when out of viewport
            const handleScroll = () => {
                const rect = tailoredSection.getBoundingClientRect();
                const vh = window.innerHeight || document.documentElement.clientHeight;
                const isAtTop = window.scrollY <= 0;
                const isCentered = rect.top <= vh * 0.25 && rect.bottom >= vh * 0.75;
                if (isAtTop || !isCentered) {
                    if (tailoredSection.classList.contains('in-view')) {
                        tailoredSection.classList.remove('in-view');
                        // Disable background image effects on mobile
                        // tailoredSection.style.removeProperty('--tailored-bg-current');
                        // tailoredSection.style.removeProperty('--tailored-bg-next');
                        // tailoredSection.classList.remove('image-active', 'image-fading', 'crossfading');
                        // document.body.classList.remove('bg-dark-active');
                    }
                } else if (isCentered) {
                    if (!tailoredSection.classList.contains('in-view')) {
                        tailoredSection.classList.add('in-view');
                    }
                    // Disable background image effects on mobile
                    // document.body.classList.add('bg-dark-active');
                    // if (window.innerWidth <= 768) {
                    //     const activeImg = document.querySelector('.service-image.active');
                    //     if (activeImg && !tailoredSection.style.getPropertyValue('--tailored-bg-current')) {
                    //         tailoredSection.style.setProperty('--tailored-bg-current', `url("${activeImg.src}")`);
                    //         tailoredSection.classList.add('image-active');
                    //     }
                    // }
                }
            };
            document.addEventListener('scroll', handleScroll, { passive: true });
        }
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -20% 0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const serviceIndex = entry.target.getAttribute('data-service');
                    
                    // Remove active class from all cards and images
                    serviceCards.forEach(card => card.classList.remove('active'));
                    serviceImages.forEach(img => img.classList.remove('active'));
                    
                    // Add active class to current card and corresponding image
                    entry.target.classList.add('active');
                    const targetImage = document.querySelector(`.service-image[data-service="${serviceIndex}"]`);
                    if (targetImage) {
                        targetImage.classList.add('active');
                        // Disable background image effects on mobile
                        // const tailoredSection = document.querySelector('.tailored-support');
                        // if (tailoredSection && window.innerWidth <= 768 && tailoredSection.classList.contains('in-view')) {
                        //     // Two-layer crossfade: set next, fade it in, then promote to current
                        //     const FADE_MS = 350;
                        //     const nextUrl = `url("${targetImage.src}")`;
                        //     tailoredSection.style.setProperty('--tailored-bg-next', nextUrl);
                        //     tailoredSection.classList.add('crossfading');
                        //     tailoredSection.classList.add('image-active');
                        //     setTimeout(() => {
                        //         tailoredSection.style.setProperty('--tailored-bg-current', nextUrl);
                        //         tailoredSection.style.removeProperty('--tailored-bg-next');
                        //         tailoredSection.classList.remove('crossfading');
                        //         document.body.classList.add('bg-dark-active');
                        //     }, FADE_MS);
                        // }
                    }
                }
            });
        }, observerOptions);

        serviceCards.forEach(card => {
            observer.observe(card);
        });

        // Initialize first card as active
        if (serviceCards[0]) {
            serviceCards[0].classList.add('active');
            if (serviceImages[0]) {
                serviceImages[0].classList.add('active');
                // Do not set background on init for mobile; wait until highlighted by observer
            }
        }

        // Disable background image effects on mobile - no resize handler needed
        // const updateTailoredBackground = () => {
        //     const tailoredSection = document.querySelector('.tailored-support');
        //     if (!tailoredSection) return;
        //     if (window.innerWidth <= 768) {
        //         const activeImg = document.querySelector('.service-image.active');
        //         if (activeImg && tailoredSection.classList.contains('in-view')) {
        //             // If we have no current, set it immediately; else crossfade to it
        //             const currentHasImage = !!tailoredSection.style.getPropertyValue('--tailored-bg-current');
        //             const nextUrl = `url("${activeImg.src}")`;
        //             if (!currentHasImage) {
        //                 tailoredSection.style.setProperty('--tailored-bg-current', nextUrl);
        //                 tailoredSection.classList.add('image-active');
        //                 void document.body.offsetHeight;
        //                 setTimeout(() => {
        //                     document.body.classList.add('bg-dark-active');
        //                 }, 10);
        //             } else {
        //                 const FADE_MS = 350;
        //                 tailoredSection.style.setProperty('--tailored-bg-next', nextUrl);
        //                 tailoredSection.classList.add('crossfading');
        //                 tailoredSection.classList.add('image-active');
        //                 setTimeout(() => {
        //                     tailoredSection.style.setProperty('--tailored-bg-current', nextUrl);
        //                     tailoredSection.style.removeProperty('--tailored-bg-next');
        //                     tailoredSection.classList.remove('crossfading');
        //                     void document.body.offsetHeight;
        //                     setTimeout(() => {
        //                         document.body.classList.add('bg-dark-active');
        //                     }, 10);
        //                 }, FADE_MS);
        //             }
        //         } else {
        //             tailoredSection.style.removeProperty('--tailored-bg-current');
        //             tailoredSection.style.removeProperty('--tailored-bg-next');
        //             tailoredSection.classList.remove('image-active');
        //             void document.body.offsetHeight;
        //             setTimeout(() => {
        //                 document.body.classList.remove('bg-dark-active');
        //             }, 10);
        //         }
        //     } else {
        //         tailoredSection.style.removeProperty('--tailored-bg-current');
        //         tailoredSection.style.removeProperty('--tailored-bg-next');
        //         tailoredSection.classList.remove('image-active');
        //         void document.body.offsetHeight;
        //         setTimeout(() => {
        //             document.body.classList.remove('bg-dark-active');
        //         }, 10);
        //     }
        // };

        // window.addEventListener('resize', updateTailoredBackground);
        // updateTailoredBackground();
    }

});

// Chat Widget Persistence - Keep chat open when switching pages
(function() {
    const CHAT_STATE_KEY = 'techbrother_chat_state';
    let chatWidgetLoaded = false;
    let restorationAttempted = false;
    
    // Function to detect if chat widget is open/visible (more specific for LeadConnector)
    function isChatOpen() {
        // Check for LeadConnector specific elements
        const leadConnectorSelectors = [
            'iframe[src*="leadconnector"][src*="chat"]',
            'iframe[src*="widgets.leadconnectorhq.com"]',
            '[id*="leadconnector"]',
            '[class*="leadconnector"]',
            '[data-widget-id]',
            // Generic chat widget patterns
            '[id*="chat-widget"]',
            '[class*="chat-widget"]',
            '[id*="chatbot"]',
            '[class*="chatbot"]'
        ];
        
        // Check if any chat container is visible and large enough to be open
        for (let selector of leadConnectorSelectors) {
            try {
                const elements = document.querySelectorAll(selector);
                for (let el of elements) {
                    const style = window.getComputedStyle(el);
                    const rect = el.getBoundingClientRect();
                    
                    // Check if element is visible
                    if (style.display !== 'none' && 
                        style.visibility !== 'hidden' && 
                        style.opacity !== '0' &&
                        rect.width > 0 && rect.height > 0) {
                        
                        // For iframes, check if they're large enough (open chat window)
                        if (el.tagName === 'IFRAME') {
                            if (rect.width > 300 || rect.height > 400) {
                                return true;
                            }
                        } else {
                            // For other elements, check dimensions
                            if (rect.width > 300 || rect.height > 400) {
                                return true;
                            }
                        }
                    }
                }
            } catch (e) {
                // Continue if selector fails
            }
        }
        
        // Also check for common chat widget patterns in the entire DOM
        const allElements = document.querySelectorAll('*');
        for (let el of allElements) {
            const id = el.id || '';
            const className = el.className || '';
            const style = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            
            // Check if it looks like an open chat widget
            if ((id.includes('chat') || className.includes('chat') || 
                 id.includes('widget') || className.includes('widget')) &&
                style.display !== 'none' && 
                style.visibility !== 'hidden' &&
                style.position !== 'fixed' && // Usually fixed position for chat widgets
                rect.width > 300 && rect.height > 400 &&
                rect.top < window.innerHeight && rect.left < window.innerWidth) {
                return true;
            }
        }
        
        return false;
    }
    
    // Store chat state before page unload
    function storeChatState() {
        const chatOpen = isChatOpen();
        if (chatOpen) {
            localStorage.setItem(CHAT_STATE_KEY, JSON.stringify({
                isOpen: true,
                timestamp: Date.now(),
                url: window.location.href
            }));
        }
    }
    
    // Get stored chat state
    function getStoredChatState() {
        try {
            const stored = localStorage.getItem(CHAT_STATE_KEY);
            if (!stored) return null;
            
            const state = JSON.parse(stored);
            // Only use state if it's less than 1 hour old and from same domain
            if (Date.now() - state.timestamp < 3600000) {
                return state;
            }
        } catch (e) {
            // Silently fail
        }
        return null;
    }
    
    // Try to open/restore chat widget (more aggressive approach)
    function restoreChatState() {
        if (restorationAttempted) return;
        
        const storedState = getStoredChatState();
        if (!storedState || !storedState.isOpen) return;
        
        restorationAttempted = true;
        let attempts = 0;
        const maxAttempts = 50; // Try for ~10 seconds (more time for widget to load)
        
        const tryOpenChat = setInterval(() => {
            attempts++;
            
            // First, check if widget is already open
            if (isChatOpen()) {
                clearInterval(tryOpenChat);
                return;
            }
            
            // Look for chat widget button/trigger with more specific selectors
            const chatTriggers = [
                // LeadConnector specific
                'button[data-widget-id]',
                '[data-widget-id="68bf3314923a5e79ba2f1f85"]',
                '[id*="68bf3314923a5e79ba2f1f85"]',
                // Generic chat triggers
                'button[aria-label*="chat" i]',
                'button[aria-label*="message" i]',
                'button[aria-label*="help" i]',
                '[role="button"][aria-label*="chat" i]',
                '[class*="chat"][class*="button"]',
                '[class*="chat"][class*="toggle"]',
                '[class*="widget"][class*="button"]',
                '[id*="chat"][id*="button"]',
                '[id*="widget"][id*="button"]',
                '[id*="chat"][id*="toggle"]',
                // Look for any button that might be a chat trigger (fixed position, bottom right)
                'button[style*="position"][style*="fixed"]',
                'div[role="button"][style*="position"][style*="fixed"]'
            ];
            
            let triggerFound = false;
            for (let selector of chatTriggers) {
                try {
                    const elements = document.querySelectorAll(selector);
                    for (let el of elements) {
                        const style = window.getComputedStyle(el);
                        const rect = el.getBoundingClientRect();
                        
                        // Check if it's likely a chat trigger button
                        if (style.display !== 'none' && 
                            style.visibility !== 'hidden' &&
                            rect.width > 0 && rect.height > 0 &&
                            // Chat buttons are usually small and in bottom right
                            ((rect.width < 200 && rect.height < 200) || 
                             (rect.bottom > window.innerHeight - 100 && rect.right > window.innerWidth - 100))) {
                            // Try clicking it
                            el.click();
                            triggerFound = true;
                            
                            // Also try dispatching events
                            el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
                            break;
                        }
                    }
                    if (triggerFound) break;
                } catch (e) {
                    // Continue if selector fails
                }
            }
            
            // If widget is now open or we've tried enough times, stop
            if (isChatOpen() || attempts >= maxAttempts) {
                clearInterval(tryOpenChat);
            }
        }, 200);
    }
    
    // Store state before page unload
    window.addEventListener('beforeunload', function() {
        storeChatState();
    });
    
    // Also store state when clicking links (before navigation)
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.href && !link.target && link.protocol.startsWith('http')) {
            storeChatState();
        }
    }, true);
    
    // Store state periodically while on page
    setInterval(storeChatState, 3000);
    
    // Wait for widget script to load and then try to restore
    function initChatRestoration() {
        // Check if widget script is loaded
        const widgetScript = document.querySelector('script[src*="leadconnectorhq.com"]');
        if (widgetScript) {
            chatWidgetLoaded = true;
        }
        
        // Try restoration after delays (widget loads asynchronously)
        setTimeout(restoreChatState, 2000);  // 2 seconds
        setTimeout(restoreChatState, 4000);  // 4 seconds
        setTimeout(restoreChatState, 6000);  // 6 seconds
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatRestoration);
    } else {
        initChatRestoration();
    }
    
    // Use MutationObserver to detect when chat widget loads
    const observer = new MutationObserver(() => {
        const storedState = getStoredChatState();
        if (storedState && storedState.isOpen) {
            // Check if chat is actually open now
            if (!isChatOpen()) {
                // Widget might have just loaded - try to open it
                if (!restorationAttempted) {
                    restoreChatState();
                }
            }
        }
    });
    
    // Start observing immediately
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class', 'id']
    });
    
    // Clean up old state on page load (keep it fresh)
    const storedState = getStoredChatState();
    if (storedState && Date.now() - storedState.timestamp > 3600000) {
        localStorage.removeItem(CHAT_STATE_KEY);
    }
})();

