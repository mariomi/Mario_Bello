document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    console.log('Token retrieved from localStorage:', token); // Log di debug

    if (!token) {
        console.log('No token found in localStorage, redirecting to login page'); // Log di debug
        window.location.href = 'login.html';
        return;
    }

    // Fetch the logged-in user's name
    const userButton = document.getElementById('userButton');
    if (token) {
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
    } else {
        if (userButton) {
            userButton.textContent = '?';  // Default to '?' if no token is found
        }
    }

    const animalId = new URLSearchParams(window.location.search).get('id');
    if (!animalId) {
        console.error('No animal ID provided in query string'); // Log di debug
        return;
    }

    try {
        console.log(`Fetching details for animal ID: ${animalId}...`); // Log di debug
        const animalResponse = await fetch(`http://localhost:3000/api/animals/${animalId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Animal response status:', animalResponse.status); // Log di debug
        console.log('Animal response headers:', animalResponse.headers); // Log di debug

        const animalContentType = animalResponse.headers.get("content-type");
        if (!animalContentType) {
            console.error('Animal response does not have a content-type header'); // Log di debug
            throw new TypeError("Animal response does not have a content-type header");
        }

        if (!animalContentType.includes("application/json")) {
            console.error('Animal response is not JSON, content-type:', animalContentType); // Log di debug
            throw new TypeError("Animal response is not JSON");
        }

        const animalData = await animalResponse.json();
        console.log('Animal response data:', animalData); // Log di debug

        if (animalResponse.ok) {
            const animalDetails = document.getElementById('animal-details');
            const imgUrl = animalData.PhotoUrl ? animalData.PhotoUrl : 'assets/images/fallback.jpg';
            animalDetails.innerHTML = `
                <div class="animal-container">
                    <div class="animal-image">
                        <img src="${imgUrl}" alt="Foto di ${animalData.Name}" onerror="this.onerror=null;this.src='assets/images/fallback.jpg';">
                    </div>
                    <div class="animal-info">
                        <h2>${animalData.Name}</h2>
                        <p><strong>Species:</strong> ${animalData.Species}</p>
                        <p><strong>Breed:</strong> ${animalData.Breed}</p>
                        <p><strong>Age:</strong> ${animalData.Age}</p>
                        <p><strong>Gender:</strong> ${animalData.Gender}</p>
                        <p><strong>Description:</strong> ${animalData.Description}</p>
                        <p><strong>Status:</strong> ${animalData.AdoptionStatus}</p>
                        <p><strong>Arrival Date:</strong> ${new Date(animalData.ArrivalDate).toLocaleDateString()}</p>
                    </div>
                </div>
            `;

            const adoptButton = document.getElementById('adopt-button');
            adoptButton.addEventListener('click', () => {
                window.location.href = `adoption-summary.html?animalId=${animalId}`;
            });
        } else {
            console.error('Failed to fetch animal details:', animalData.message); // Log di debug
            document.getElementById('animal-details').innerText = animalData.message;
        }
    } catch (error) {
        console.error('Error during fetching animal details:', error); // Log di debug
        document.getElementById('animal-details').innerText = 'An error occurred while fetching the animal details.';
    }
});
