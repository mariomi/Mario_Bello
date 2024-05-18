document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    console.log('Token retrieved from localStorage:', token); // Log di debug

    if (!token) {
        console.log('No token found in localStorage, redirecting to login page'); // Log di debug
        window.location.href = 'login.html';
        return;
    }

    try {
        // Fetch the logged-in user's name
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

        const userButton = document.getElementById('userButton');
        if (profileResponse.ok) {
            const userName = profileData.data.Username || 'X';  // Default to 'X' if no user is logged in
            if (userButton && userName) {
                userButton.textContent = userName.charAt(0).toUpperCase();
            }
        } else {
            console.error('Failed to fetch profile:', profileData.message); // Log di debug
            if (userButton) {
                userButton.textContent = 'X';  // Default to 'X' if there is an error
            }
        }
    } catch (error) {
        console.error('Error during fetching profile:', error); // Log di debug
        const userButton = document.getElementById('userButton');
        if (userButton) {
            userButton.textContent = 'X';  // Default to 'X' if there is an error
        }
    }

    const animalList = document.getElementById('animal-list');

    try {
        // Fetch all animals
        console.log('Fetching list of animals...'); // Log di debug
        const animalsResponse = await fetch('http://localhost:3000/api/animals', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('Animals response status:', animalsResponse.status); // Log di debug
        const animalsData = await animalsResponse.json();
        console.log('Animals response data:', animalsData); // Log di debug

        if (animalsResponse.ok) {
            animalList.innerHTML = ''; // Svuota la lista degli animali

            // Filtra gli animali con stato "available"
            const availableAnimals = animalsData.filter(animal => animal.AdoptionStatus && animal.AdoptionStatus.toLowerCase() === 'available');

            availableAnimals.forEach(animal => {
                const div = document.createElement('div');
                div.className = 'animal';
                div.style.cursor = 'pointer';

                const imgUrl = animal.PhotoUrl ? animal.PhotoUrl : 'assets/images/fallback.jpg';

                div.innerHTML = `
                    <img style="display: block; -webkit-user-select: none; margin: auto; cursor: zoom-in; background-color: #1c1c1c; transition: background-color 300ms; width: 100%; height: 200px; object-fit: cover;" src="${imgUrl}" alt="Foto di ${animal.Name}" onerror="this.onerror=null;this.src='assets/images/fallback.jpg';">
                    <h3>${animal.Name}</h3>
                    <p>Specie: ${animal.Species}</p>
                    <p>Età: ${animal.Age}</p>
                `;

                div.addEventListener('click', () => {
                    window.location.href = `animal.html?id=${animal.AnimalID}`;
                });

                animalList.appendChild(div);
            });
        } else {
            console.error('Failed to fetch animals:', animalsData.message); // Log di debug
            animalList.innerText = animalsData.message;
        }
    } catch (error) {
        console.error('Error during fetching animals:', error); // Log di debug
        animalList.innerText = 'An error occurred while fetching the animals.';
    }
});
