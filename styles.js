// ===================== Extended Script.js for Vyaapar Website =====================

// Sidebar functionality
function initSidebar() {
    console.log('Initializing sidebar...');

    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');

    console.log('Sidebar elements found:', {
        sidebar: !!sidebar,
        mainContent: !!mainContent,
        sidebarToggle: !!sidebarToggle,
        mobileSidebarToggle: !!mobileSidebarToggle
    });

    if (!sidebar || !mainContent) {
        console.error('Required elements not found - sidebar:', !!sidebar, 'mainContent:', !!mainContent);
        return;
    }

    // Create overlay for mobile
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }

    // Toggle sidebar function
    function toggleSidebar() {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            sidebar.classList.toggle('mobile-show');
            overlay.classList.toggle('active');
            document.body.classList.toggle('sidebar-open');
        } else {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        }
    }

    // Close sidebar function
    function closeSidebar() {
        sidebar.classList.remove('mobile-show');
        overlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    }

    // Handle sidebar toggle button
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    if (mobileSidebarToggle) {
        mobileSidebarToggle.addEventListener('click', toggleSidebar);
    }

    overlay.addEventListener('click', closeSidebar);

    // Close sidebar with Escape key
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeSidebar();
    });

    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

        sidebar.classList.remove('mobile-show');
        overlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
        mainContent.classList.remove('expanded', 'mobile-full');

        if (isMobile) {
            mainContent.classList.add('mobile-full');
            sidebar.classList.remove('collapsed');
        } else if (isTablet) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
        } else {
            sidebar.classList.remove('collapsed');
        }
    }

    handleResize();

    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 100);
    });

    console.log('Sidebar initialization completed successfully');
}

// ===================== Sidebar Navigation =====================
function initSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    if (sidebarLinks.length === 0) {
        console.log('No sidebar links found');
        return;
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight || 80;
                const offsetTop = targetElement.offsetTop - navbarHeight - 20;

                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }

            if (window.innerWidth <= 768) {
                const sidebar = document.querySelector('.sidebar');
                const overlay = document.querySelector('.sidebar-overlay');
                if (sidebar) {
                    sidebar.classList.remove('mobile-show');
                    if (overlay) overlay.classList.remove('active');
                    document.body.classList.remove('sidebar-open');
                }
            }
        });
    });

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    if (sections.length === 0 || sidebarLinks.length === 0) return;

    let currentSection = 'home';
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href').substring(1);
        if (linkHref === currentSection) link.classList.add('active');
    });
}

// ===================== Dark Mode Toggle =====================
function initDarkModeToggle() {
    const darkToggle = document.getElementById('darkModeToggle');
    if (!darkToggle) return;

    darkToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Load preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// ===================== Lazy Load Images =====================
function initLazyLoadImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, { threshold: 0.1 });

    lazyImages.forEach(img => observer.observe(img));
}

// ===================== DOMContentLoaded Init =====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Loaded');
    initSidebar();
    initSidebarNavigation();
    initSmoothScrolling();
    initMobileNavigation();
    initContactForm();
    initScrollAnimations();
    initHeroIllustrationAnimation();
    initTypingEffect();
    initStatsCounter();
    initDarkModeToggle();
    initLazyLoadImages();
});

// ===================== CSS Variables for Dark Mode =====================
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
    body.dark-mode {
        --primary-brown: #f5f5f5;
        --secondary-brown: #ccc;
        background-color: #1c1c1c;
        color: #f5f5f5;
    }
    body.dark-mode .navbar { background: #333 !important; color: #f5f5f5; }
    body.dark-mode .sidebar { background: #2c2c2c; color: #f5f5f5; }
    body.dark-mode .notification { background: #444 !important; }
`;
document.head.appendChild(darkModeStyles);

// ========================================================================
// (The rest of your code for smooth scrolling, contact form, ripple effect,
// scroll animations, hero animations, typing effect, stats counter remains)
// ========================================================================

