document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const projectCards = document.querySelectorAll('.project-card');
    const categoryTitle = document.querySelector('.category-title');
    const currentDateTimeElement = document.getElementById('current-date-time');
    const themeToggle = document.getElementById('theme-toggle');
    const logoutLink = document.querySelector('.nav-link.logout');
    const logoutModal = document.getElementById('logout-modal');
    const cancelLogout = document.getElementById('cancel-logout');
    const confirmLogout = document.getElementById('confirm-logout');
    
    // Logout confirmation handling
    if (logoutLink && logoutModal) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            logoutModal.classList.add('active');
        });
        
        // Close modal when Cancel is clicked
        if (cancelLogout) {
            cancelLogout.addEventListener('click', () => {
                logoutModal.classList.remove('active');
            });
        }
        
        // Confirm logout and redirect
        if (confirmLogout) {
            confirmLogout.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
        
        logoutModal.addEventListener('click', (e) => {
            if (e.target === logoutModal) {
                logoutModal.classList.remove('active');
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && logoutModal.classList.contains('active')) {
                logoutModal.classList.remove('active');
            }
        });
    }
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Initialize theme toggle state
    if (themeToggle) {
        themeToggle.checked = savedTheme === 'dark';
        
        // Add theme toggle event listener
        themeToggle.addEventListener('change', () => {
            const theme = themeToggle.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    }
    
    // Update date and time with specified format
    function updateDateTime() {
        const now = new Date();
        
        // Format the date: e.g., "July 15, 2023"
        const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', dateOptions);
        
        // Format the time in 12-hour format: e.g., "2:45 PM"
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
        
        // Set the formatted date and time with bold tags
        if (currentDateTimeElement) {
            currentDateTimeElement.innerHTML = `<b>${formattedDate}</b> @ <b>${formattedTime}</b>`;
        }
    }
    
    // Initial date/time update
    if (currentDateTimeElement) {
        updateDateTime();
        // Update every second
        setInterval(updateDateTime, 1000);
    }
    
    // Add click event listeners to all navigation links (except logout)
    navLinks.forEach(link => {
        if (!link.classList.contains('logout')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(item => item.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Get the selected category
                const category = link.getAttribute('data-category');
                
                // Update the category title
                if (category === 'all') {
                    categoryTitle.textContent = 'All';
                } else if (category === 'morning') {
                    categoryTitle.textContent = 'Morning';
                } else if (category === 'night') {
                    categoryTitle.textContent = 'Night';
                } else if (category === 'misc') {
                    categoryTitle.textContent = 'Miscellaneous';
                }
                
                // Filter the projects based on category
                projectCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.classList.remove('hidden');
                        // Add a slight delay to the animation to create a staggered effect
                        setTimeout(() => {
                            card.style.animation = 'none';
                            card.offsetHeight; // Trigger reflow
                            card.style.animation = null;
                        }, 10);
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        }
    });
    
    // Add a welcome greeting based on time of day
    const hour = new Date().getHours();
    const welcomeMessage = document.querySelector('.welcome-message');
    
    if (welcomeMessage) {
        let greeting;
        if (hour >= 5 && hour < 12) {
            greeting = "Good morning";
        } else if (hour >= 12 && hour < 18) {
            greeting = "Good afternoon";
        } else {
            greeting = "Good evening";
        }
        
        welcomeMessage.innerHTML = `${greeting}, Ngọc Ánh`;
    }
});
