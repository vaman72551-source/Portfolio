document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTestimonials();
    initProjectsFilter();
    initContactForm();
    initProjectModal();
});

/**
 * Navigation Effects (Scroll Shrink, Active Link Tracking, Mobile Menu)
 */
function initNavigation() {
    const header = document.querySelector('header');
    
    // Sticky Scroll Effect
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('shadow-md', 'bg-surface/90', 'py-2');
                header.classList.remove('shadow-[0_0_15px_rgba(0,209,255,0.05)]', 'bg-surface/60', 'py-4');
            } else {
                header.classList.remove('shadow-md', 'bg-surface/90', 'py-2');
                header.classList.add('shadow-[0_0_15px_rgba(0,209,255,0.05)]', 'bg-surface/60', 'py-4');
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = !mobileMenu.classList.contains('hidden');
            const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
            
            if (isOpen) {
                mobileMenu.classList.add('hidden');
                if (icon) icon.textContent = 'menu';
            } else {
                mobileMenu.classList.remove('hidden');
                if (icon) icon.textContent = 'close';
            }
        });

        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
                if (icon) icon.textContent = 'menu';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
                if (icon) icon.textContent = 'menu';
            }
        });
    }

    // Active Navigation Link Highlighting (Page & Scroll Sync)
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    
    // Initial highlight for other pages
    if (currentFile !== 'index.html') {
        const activeIdMap = {
            'projects.html': 'nav-projects',
            'contact.html': 'nav-contact'
        };
        const activeId = activeIdMap[currentFile];
        if (activeId) {
            const link = document.getElementById(activeId);
            if (link) {
                link.classList.remove('text-on-surface-variant');
                link.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary', 'pb-1');
            }
        }
    } else {
        // Scroll spy for index.html (Home vs Stack)
        const sections = [
            { id: 'hero', linkId: 'nav-home' },
            { id: 'stack', linkId: 'nav-stack' }
        ];

        function scrollSpy() {
            let activeId = 'hero';
            sections.forEach(sec => {
                const el = document.getElementById(sec.id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // If section is near top of viewport
                    if (rect.top <= 180) {
                        activeId = sec.id;
                    }
                }
            });

            sections.forEach(sec => {
                const link = document.getElementById(sec.linkId);
                if (link) {
                    if (sec.id === activeId) {
                        link.classList.remove('text-on-surface-variant');
                        link.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary', 'pb-1');
                    } else {
                        link.classList.add('text-on-surface-variant');
                        link.classList.remove('text-primary', 'font-bold', 'border-b-2', 'border-primary', 'pb-1');
                    }
                }
            });
        }

        window.addEventListener('scroll', scrollSpy);
        scrollSpy(); // Initial call
    }
}

/**
 * Testimonials Slider/Carousel (Index Page)
 */
function initTestimonials() {
    const container = document.getElementById('testimonials-container');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const dots = document.querySelectorAll('.testimonial-dot');

    if (!container || !cards.length || !prevBtn || !nextBtn || !dots.length) return;

    let currentIndex = 1; // Start with the middle card (Marcus Vane) highlighted

    const updateCarousel = (index) => {
        currentIndex = (index + cards.length) % cards.length;

        // Slide and fade cards
        cards.forEach((card, i) => {
            card.style.transform = `translateX(-${currentIndex * 100}%)`;
            if (i === currentIndex) {
                card.style.opacity = '1';
                card.style.transform += ' scale(1)';
            } else {
                card.style.opacity = '0.35';
                card.style.transform += ' scale(0.95)';
            }
        });

        // Update dot indicators
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('bg-primary', 'w-6');
                dot.classList.remove('bg-outline-variant', 'w-2');
            } else {
                dot.classList.add('bg-outline-variant', 'w-2');
                dot.classList.remove('bg-primary', 'w-6');
            }
        });
    };

    // Transition styles
    cards.forEach(card => {
        card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));
    nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateCarousel(index));
    });

    // Auto-advance testimonials every 7 seconds
    let autoPlayInterval = setInterval(() => {
        updateCarousel(currentIndex + 1);
    }, 7000);

    // Pause autoplay on hover or interaction
    const pauseAutoplay = () => clearInterval(autoPlayInterval);
    container.addEventListener('mouseenter', pauseAutoplay);
    prevBtn.addEventListener('click', pauseAutoplay);
    nextBtn.addEventListener('click', pauseAutoplay);
    dots.forEach(dot => dot.addEventListener('click', pauseAutoplay));

    updateCarousel(currentIndex);
}

/**
 * Projects Filtering System (Projects Page)
 */
function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update button active UI
            filterBtns.forEach(b => {
                b.classList.remove('bg-primary-container', 'text-on-primary-container', 'border-primary-container');
                b.classList.add('bg-surface-container', 'text-on-surface-variant', 'border-transparent');
            });
            btn.classList.add('bg-primary-container', 'text-on-primary-container', 'border-primary-container');
            btn.classList.remove('bg-surface-container', 'text-on-surface-variant', 'border-transparent');

            // Micro-interaction bounce
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => btn.style.transform = 'scale(1)', 100);

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category.split(' ').includes(filterValue)) {
                    // Show matching card
                    card.style.display = 'block';
                    // trigger CSS animation
                    card.classList.remove('fade-in-up');
                    void card.offsetWidth; // Force reflow to restart animation
                    card.classList.add('fade-in-up');
                } else {
                    // Hide non-matching card
                    card.style.display = 'none';
                    card.classList.remove('fade-in-up');
                }
            });
        });
    });
}

/**
 * Contact Form Validation & Toast Notification
 */
function initContactForm() {
    const form = document.querySelector('form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');
    const captchaLabel = document.getElementById('captcha-question');
    const captchaInput = document.getElementById('contact-captcha');
    let captchaAnswer = 0;

    function generateCaptcha() {
        if (!captchaLabel) return;
        const num1 = Math.floor(Math.random() * 9) + 1; // 1-9
        const num2 = Math.floor(Math.random() * 9) + 1; // 1-9
        captchaAnswer = num1 + num2;
        captchaLabel.textContent = `What is ${num1} + ${num2}?`;
        if (captchaInput) {
            captchaInput.value = '';
            clearInvalid(captchaInput);
        }
    }

    // Initialize captcha on load
    generateCaptcha();
    
    // Label shift interactions
    inputs.forEach(el => {
        el.addEventListener('focus', () => {
            const label = el.parentElement.querySelector('label');
            if (label) label.classList.add('text-primary');
        });
        el.addEventListener('blur', () => {
            const label = el.parentElement.querySelector('label');
            if (label) label.classList.remove('text-primary');
        });
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate required fields
        inputs.forEach(input => {
            const isEmail = input.type === 'email';
            const isCaptcha = input.id === 'contact-captcha';
            const value = input.value.trim();
            
            if (!value) {
                isValid = false;
                markInvalid(input, 'This field is required.');
            } else if (isEmail && !validateEmail(value)) {
                isValid = false;
                markInvalid(input, 'Please enter a valid email address.');
            } else if (isCaptcha && parseInt(value, 10) !== captchaAnswer) {
                isValid = false;
                markInvalid(input, 'Incorrect answer. Please solve the security verification again.');
            } else {
                clearInvalid(input);
            }
        });

        if (isValid) {
            const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button');
            const originalBtnContent = submitBtn ? submitBtn.innerHTML : 'Send Message';
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending... <span class="material-symbols-outlined text-[20px] animate-spin ml-2">sync</span>';
            }

            // Gather form inputs (excluding captcha)
            const formData = {};
            inputs.forEach(input => {
                if (input.name && input.name !== 'captcha') {
                    formData[input.name] = input.value.trim();
                }
            });

            // Post to FormSubmit AJAX Endpoint
            fetch("https://formsubmit.co/ajax/v-aman@outlook.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(res => {
                if (res.ok) {
                    showToast('Message sent successfully! I will review and reply within 24 hours.', 'success');
                    form.reset();
                    generateCaptcha();
                } else {
                    throw new Error('Response error');
                }
            })
            .catch(err => {
                console.error(err);
                showToast('Oops! Something went wrong. Please try emailing directly.', 'error');
                generateCaptcha();
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                }
            });
        } else {
            showToast('Please correct the validation errors in the form.', 'error');
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function markInvalid(input, message) {
    input.classList.add('border-error', 'focus:border-error');
    input.classList.remove('focus:border-primary-container');
    
    let errorMsg = input.parentElement.querySelector('.error-message');
    if (!errorMsg) {
        errorMsg = document.createElement('span');
        errorMsg.className = 'error-message text-error text-[12px] font-label-md mt-1';
        input.parentElement.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
}

function clearInvalid(input) {
    input.classList.remove('border-error', 'focus:border-error');
    input.classList.add('focus:border-primary-container');
    
    const errorMsg = input.parentElement.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

/**
 * Show Premium Dynamic Toast Notification
 */
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast pointer-events-auto p-4 rounded-xl shadow-xl border flex items-center gap-3 transform translate-y-10 opacity-0 transition-all duration-300 ${
        type === 'success'
            ? 'bg-surface border-outline-variant/30 text-on-surface shadow-[0_4px_24px_rgba(0,209,255,0.08)]'
            : 'bg-error-container border-error/20 text-on-error-container'
    }`;

    const icon = document.createElement('span');
    icon.className = `material-symbols-outlined text-2xl ${
        type === 'success' ? 'text-primary' : 'text-error'
    }`;
    icon.textContent = type === 'success' ? 'check_circle' : 'error';

    const text = document.createElement('p');
    text.className = 'font-label-md text-[14px] leading-snug flex-grow';
    text.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(text);
    container.appendChild(toast);

    // Animate In
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    });

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        toast.classList.remove('translate-y-0', 'opacity-100');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4500);
}

/**
 * Project Details Modal & Gallery Lightbox System (Projects Page)
 */
function initProjectModal() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    
    if (!projectCards.length || !modal || !modalClose) return;
    
    const modalTitle = document.getElementById('modal-title');
    const modalRole = document.getElementById('modal-role');
    const modalCategory = document.getElementById('modal-category');
    const modalDescription = document.getElementById('modal-description');
    const modalDeliverables = document.getElementById('modal-deliverables');
    const modalTags = document.getElementById('modal-tags');
    const modalMainImg = document.getElementById('modal-main-img');
    const modalThumbnails = document.getElementById('modal-thumbnails');
    
    // Lightbox Elements
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxImg = document.getElementById('lightbox-img');

    // Open Modal
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title') || '';
            const role = card.getAttribute('data-role') || '';
            const categoryAttr = card.getAttribute('data-category') || '';
            const description = card.getAttribute('data-long-description') || '';
            const deliverablesStr = card.getAttribute('data-deliverables') || '';
            const tagsStr = card.getAttribute('data-tags') || '';
            const imagesStr = card.getAttribute('data-images') || '';
            
            // Format category name for badge
            const categoryName = categoryAttr.split(' ').map(c => {
                if (c === 'infra') return 'Infrastructure';
                if (c === 'ai') return 'AI / Machine Learning';
                if (c === 'web') return 'Web Application';
                return c.charAt(0).toUpperCase() + c.slice(1);
            }).join(' & ');
            
            // Set text content
            if (modalTitle) modalTitle.textContent = title;
            if (modalRole) modalRole.textContent = role ? `Role: ${role}` : '';
            if (modalCategory) modalCategory.textContent = categoryName;
            if (modalDescription) modalDescription.textContent = description;
            
            // Populate Deliverables List
            if (modalDeliverables) {
                modalDeliverables.innerHTML = '';
                if (deliverablesStr) {
                    const deliverables = deliverablesStr.split(';');
                    deliverables.forEach(item => {
                        if (item.trim()) {
                            const li = document.createElement('li');
                            li.textContent = item.trim();
                            modalDeliverables.appendChild(li);
                        }
                    });
                }
            }
            
            // Populate Tags
            if (modalTags) {
                modalTags.innerHTML = '';
                if (tagsStr) {
                    const tags = tagsStr.split(',');
                    tags.forEach(tag => {
                        if (tag.trim()) {
                            const span = document.createElement('span');
                            span.className = 'px-sm py-1 rounded-full bg-primary-container/10 text-primary text-[11px] font-bold uppercase tracking-wider';
                            span.textContent = tag.trim();
                            modalTags.appendChild(span);
                        }
                    });
                }
            }
            
            // Setup Gallery/Images & Thumbnails
            if (modalThumbnails && modalMainImg) {
                modalThumbnails.innerHTML = '';
                if (imagesStr) {
                    const images = imagesStr.split(',');
                    
                    // Set default main image
                    modalMainImg.src = images[0].trim();
                    
                    // Populate thumbnails if there are multiple images
                    if (images.length > 1) {
                        images.forEach((imgSrc, idx) => {
                            const cleanSrc = imgSrc.trim();
                            const thumb = document.createElement('button');
                            thumb.className = `w-12 h-12 rounded-lg border-2 overflow-hidden bg-surface-container transition-all hover:border-primary ${idx === 0 ? 'border-primary' : 'border-outline-variant/30'}`;
                            thumb.innerHTML = `<img src="${cleanSrc}" alt="thumbnail" class="w-full h-full object-cover"/>`;
                            
                            thumb.addEventListener('click', (e) => {
                                e.stopPropagation();
                                modalMainImg.src = cleanSrc;
                                // Update border UI
                                modalThumbnails.querySelectorAll('button').forEach(btn => btn.classList.remove('border-primary'));
                                modalThumbnails.querySelectorAll('button').forEach(btn => btn.classList.add('border-outline-variant/30'));
                                thumb.classList.add('border-primary');
                                thumb.classList.remove('border-outline-variant/30');
                            });
                            
                            modalThumbnails.appendChild(thumb);
                        });
                        modalThumbnails.classList.remove('hidden');
                    } else {
                        modalThumbnails.classList.add('hidden');
                    }
                }
            }
            
            // Animate Modal In
            modal.classList.remove('hidden');
            // Force reflow
            void modal.offsetWidth;
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
            
            const modalContent = modal.querySelector('.bg-surface');
            if (modalContent) {
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
            }
            document.body.classList.add('overflow-hidden'); // Prevent background scroll
        });
    });

    // Close Modal Function
    const closeModal = () => {
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0');
        
        const modalContent = modal.querySelector('.bg-surface');
        if (modalContent) {
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');
        }
        
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }, 300);
    };

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal clicking outside the container
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            if (!lightbox || lightbox.classList.contains('hidden')) {
                closeModal();
            }
        }
    });

    // Lightbox Controls
    if (modalMainImg && lightbox && lightboxImg) {
        modalMainImg.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxImg.src = modalMainImg.src;
            
            lightbox.classList.remove('hidden');
            void lightbox.offsetWidth;
            lightbox.classList.remove('opacity-0');
            lightbox.classList.add('opacity-100');
            
            lightboxImg.classList.remove('scale-95');
            lightboxImg.classList.add('scale-100');
        });
        
        const closeLightbox = () => {
            lightbox.classList.remove('opacity-100');
            lightbox.classList.add('opacity-0');
            lightboxImg.classList.remove('scale-100');
            lightboxImg.classList.add('scale-95');
            
            setTimeout(() => {
                lightbox.classList.add('hidden');
            }, 300);
        };
        
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
                closeLightbox();
            }
        });
    }
}

