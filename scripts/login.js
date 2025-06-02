document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    const usernameInput = document.getElementById('username');
    
    // Default login credentials
    const validUsername = 'admin';
    const validPassword = 'ngoc@nh_11072002!';
    
    // Set default username and make it unchangeable
    if (usernameInput) {
        usernameInput.value = validUsername;
        usernameInput.setAttribute('readonly', true);
        usernameInput.style.backgroundColor = '#f0f0f0';
    }
    
    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }
    
    // Handle form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Validate credentials
            if (username === validUsername && password === validPassword) {
                // For added effect, show a loading message
                errorMessage.textContent = '';
                errorMessage.style.color = '#4CAF50';
                errorMessage.textContent = 'Login successful! Enjoy your journey...';
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                // Show error message
                errorMessage.style.color = '#ff3860';
                errorMessage.textContent = 'Invalid password';
                
                // Shake animation for error feedback
                loginForm.classList.add('shake');
                setTimeout(() => {
                    loginForm.classList.remove('shake');
                }, 500);
            }
        });
    }
    
    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .shake {
            animation: shake 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);
});