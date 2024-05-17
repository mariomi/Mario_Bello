document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    console.log('Token retrieved from localStorage:', token); // Log di debug

    if (!token) {
        console.log('No token found in localStorage, redirecting to login page'); // Log di debug
        window.location.href = 'login.html';
        return;
    }

    try {
        // Fetch available animals
        console.log('Fetching available animals...'); // Log di debug
        const response = await fetch('http://localhost:3000/api/animals/available', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Available animals response status:', response.status); // Log di debug
        console.log('Available animals response headers:', response.headers); // Log di debug

        const contentType = response.headers.get("content-type");
        if (!contentType) {
            console.error('Available animals response does not have a content-type header'); // Log di debug
            throw new TypeError("Available animals response does not have a content-type header");
        }

        if (!contentType.includes("application/json")) {
            console.error('Available animals response is not JSON, content-type:', contentType); // Log di debug
            throw new TypeError("Available animals response is not JSON");
        }

        const data = await response.json();
        console.log('Available animals response data:', data); // Log di debug

        if (response.ok) {
            const animalSelect = document.getElementById('animalSelect');
            data.forEach(animal => {
                const option = document.createElement('option');
                option.value = animal.AnimalID;
                option.textContent = `${animal.Name} - ${animal.Type}`;
                animalSelect.appendChild(option);
            });
        } else {
            console.error('Failed to fetch available animals:', data.message); // Log di debug
            document.getElementById('adoptionsContainer').innerText = data.message;
        }
    } catch (error) {
        console.error('Error during fetching available animals:', error); // Log di debug
        document.getElementById('adoptionsContainer').innerText = 'An error occurred while fetching the available animals.';
    }

    document.getElementById('adoptionForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const animalID = document.getElementById('animalSelect').value;

        try {
            const response = await fetch('http://localhost:3000/api/adoptions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ animalID })
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Adoption successful:', data);
                document.getElementById('adoptionsContainer').innerText = 'Adoption successful!';
            } else {
                console.error('Failed to adopt animal:', data.message); // Log di debug
                document.getElementById('adoptionsContainer').innerText = data.message;
            }
        } catch (error) {
            console.error('Error during adoption:', error); // Log di debug
            document.getElementById('adoptionsContainer').innerText = 'An error occurred while trying to adopt the animal.';
        }
    });
});
