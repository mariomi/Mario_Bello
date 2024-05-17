document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = { username, email, password };

    try {
        const response = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Registration successful', result);
            alert('Registration successful! You will be redirected to the login page.');
            window.location.href = '/login.html'; 
        } else {
            const errorText = await response.text();
            console.error('Registration failed:', errorText);
            alert('Registration failed: ' + errorText);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Error during registration: ' + error.message);
    }
});
