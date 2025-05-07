document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const result = await response.json();
            if (result.success) {
                localStorage.setItem('token', result.token);
                alert('Login successful');
                window.location.href = '/';
            } else {
                alert('Login failed: ' + result.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    });
});
