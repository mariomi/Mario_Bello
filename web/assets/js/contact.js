document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    console.log('Token retrieved from localStorage:', token); // Debug log

/*     if (!token) {
        console.log('No token found in localStorage, redirecting to login page'); // Debug log
        window.location.href = 'login.html';
        return;
    } */

    const userButton = document.getElementById('userButton');
    fetch('http://localhost:3000/api/users/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(user => {
        const userName = user.data.Username || 'X';  // Default to 'X' if no user is logged in
        if (userButton && userName) {
            userButton.textContent = userName.charAt(0).toUpperCase();
        }
    })
    .catch(error => {
        console.error('Error fetching user:', error);
        if (userButton) {
            userButton.textContent = '?';  // Default to '?' if there is an error
        }
    });

    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        try {
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                formResponse.textContent = 'Your message has been sent successfully!';
                formResponse.classList.remove('hidden');
                contactForm.reset();
            } else {
                formResponse.textContent = `Failed to send message: ${result.message}`;
                formResponse.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            formResponse.textContent = 'An error occurred while sending your message.';
            formResponse.classList.remove('hidden');
        }
    });
});
