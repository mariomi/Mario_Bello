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

    const animalId = new URLSearchParams(window.location.search).get('animalId');
    if (!animalId) {
        console.error('No animal ID provided in query string'); // Log di debug
        return;
    }

    try {
        // Fetch user profile
        console.log('Fetching user profile...'); // Log di debug
        const profileResponse = await fetch('http://localhost:3000/api/users/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Profile response status:', profileResponse.status); // Log di debug
        const profileData = await profileResponse.json();
        console.log('Profile response data:', profileData); // Log di debug

        const userProfile = profileData.data;

        // Fetch animal details
        console.log(`Fetching details for animal ID: ${animalId}...`); // Log di debug
        const animalResponse = await fetch(`http://localhost:3000/api/animals/${animalId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Animal response status:', animalResponse.status); // Log di debug
        const animalData = await animalResponse.json();
        console.log('Animal response data:', animalData); // Log di debug

        if (animalResponse.ok && profileResponse.ok) {
            const adoptionSummary = document.getElementById('adoption-summary');
            adoptionSummary.innerHTML = `
                <div class="summary-container">
                    <div class="animal-info">
                        <h2>Animal Information</h2>
                        <p><strong>Name:</strong> ${animalData.Name}</p>
                        <p><strong>Species:</strong> ${animalData.Species}</p>
                        <p><strong>Breed:</strong> ${animalData.Breed}</p>
                        <p><strong>Age:</strong> ${animalData.Age}</p>
                        <p><strong>Gender:</strong> ${animalData.Gender}</p>
                        <p><strong>Description:</strong> ${animalData.Description}</p>
                        <p><strong>Status:</strong> ${animalData.AdoptionStatus}</p>
                        <p><strong>Arrival Date:</strong> ${new Date(animalData.ArrivalDate).toLocaleDateString()}</p>
                    </div>
                    <div class="user-info">
                        <h2>User Information</h2>
                        <p><strong>Username:</strong> ${userProfile.Username}</p>
                        <p><strong>Email:</strong> ${userProfile.Email}</p>
                        <div class="thank-you-note">
                            <p>Thank you, ${userProfile.Username}, for adopting ${animalData.Name} from Animal Shelter. Your adoption helps us continue our mission to provide safe and loving homes for animals in need.</p>
                        </div>
                    </div>
                </div>
            `;

            const confirmButton = document.getElementById('confirm-button');
            confirmButton.addEventListener('click', async () => {
                try {
                    console.log('Confirming adoption...'); // Log di debug

                    // Register the adoption
                    const confirmResponse = await fetch('http://localhost:3000/api/adoptions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ userId: userProfile.UserID, animalId, status: 'Pending' })
                    });

                    console.log('Confirm response status:', confirmResponse.status); // Log di debug

                    if (!confirmResponse.ok) {
                        const confirmContentType = confirmResponse.headers.get("content-type");
                        if (!confirmContentType || !confirmContentType.includes("application/json")) {
                            console.error('Confirm response is not JSON, content-type:', confirmContentType); // Log di debug
                            throw new TypeError("Confirm response is not JSON");
                        }

                        const confirmData = await confirmResponse.json();
                        console.log('Confirm response data:', confirmData); // Log di debug

                        if (!confirmResponse.ok) {
                            console.error('Failed to confirm adoption:', confirmData.message); // Log di debug
                            document.getElementById('adoption-summary').innerText = 'An error occurred during the adoption confirmation. Please try again later.';
                            return;
                        }
                    }

                    // Update animal status
                    const updateResponse = await fetch(`http://localhost:3000/api/animals/${animalId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            name: animalData.Name,
                            species: animalData.Species,
                            breed: animalData.Breed,
                            age: animalData.Age,
                            gender: animalData.Gender,
                            description: animalData.Description,
                            adoptionStatus: 'Pending'
                        })
                    });

                    console.log('Update response status:', updateResponse.status); // Log di debug

                    if (!updateResponse.ok) {
                        const updateContentType = updateResponse.headers.get("content-type");
                        if (!updateContentType || !updateContentType.includes("application/json")) {
                            console.error('Update response is not JSON, content-type:', updateContentType); // Log di debug
                            throw new TypeError("Update response is not JSON");
                        }

                        const updateData = await updateResponse.json();
                        console.log('Update response data:', updateData); // Log di debug

                        if (!updateResponse.ok) {
                            console.error('Failed to update animal status:', updateData.message); // Log di debug
                            document.getElementById('adoption-summary').innerText = 'An error occurred while updating the animal status. Please try again later.';
                            return;
                        }
                    }

                    // Redirect to profile page
                    window.location.href = 'profile.html';
                } catch (error) {
                    console.error('Error during confirming adoption:', error); // Log di debug
                    document.getElementById('adoption-summary').innerText = 'An error occurred during the adoption confirmation. Please try again later.';
                }
            });
        } else {
            console.error('Failed to fetch animal details or user profile'); // Log di debug
            document.getElementById('adoption-summary').innerText = 'Failed to fetch animal details or user profile. Please try again later.';
        }
    } catch (error) {
        console.error('Error during fetching animal details or user profile:', error); // Log di debug
        document.getElementById('adoption-summary').innerText = 'An error occurred while fetching the animal details or user profile. Please try again later.';
    }
});
