document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    console.log('Token retrieved from localStorage:', token); // Log di debug
  
    if (!token) {
      console.log('No token found in localStorage, redirecting to login page'); // Log di debug
      window.location.href = 'login.html';
      return;
    }
  
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    });
  
    const addAnimalButton = document.getElementById('addAnimalButton');
    const saveAnimalButton = document.getElementById('saveAnimalButton');
    const animalForm = document.getElementById('animalForm');
    const animalList = document.getElementById('animalList');
    const animalName = document.getElementById('animalName');
    const animalSpecies = document.getElementById('animalSpecies');
    const animalBreed = document.getElementById('animalBreed');
    const animalAge = document.getElementById('animalAge');
    const animalGender = document.getElementById('animalGender');
    const animalDescription = document.getElementById('animalDescription');
    const animalPhotoUrl = document.getElementById('animalPhotoUrl');
  
    addAnimalButton.addEventListener('click', () => {
      animalForm.classList.toggle('hidden');
    });
  
    saveAnimalButton.addEventListener('click', async () => {
      const newAnimal = {
        name: animalName.value,
        species: animalSpecies.value,
        breed: animalBreed.value,
        age: animalAge.value,
        gender: animalGender.value,
        description: animalDescription.value,
        photoUrl: animalPhotoUrl.value
      };
  
      try {
        const response = await fetch('http://localhost:3000/api/animals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newAnimal)
        });
  
        if (response.ok) {
          console.log('Animal added successfully');
          loadAnimals();
        } else {
          const errorData = await response.json();
          console.error('Failed to add animal:', errorData.message);
        }
      } catch (error) {
        console.error('Error during adding animal:', error);
      }
    });
  
    async function loadAnimals() {
      try {
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
  
          animalsData.forEach(animal => {
            const div = document.createElement('div');
            div.className = 'animal';
            div.style.cursor = 'pointer';
  
            const imgUrl = animal.PhotoUrl ? animal.PhotoUrl : 'assets/images/fallback.jpg';
  
            div.innerHTML = `
              <img style="display: block; -webkit-user-select: none; margin: auto; cursor: zoom-in; background-color: #1c1c1c; transition: background-color 300ms; width: 100%; height: 200px; object-fit: cover;" src="${imgUrl}" alt="Foto di ${animal.Name}" onerror="this.onerror=null;this.src='assets/images/fallback.jpg';">
              <h3>${animal.Name}</h3>
              <p>Specie: ${animal.Species}</p>
              <p>Età: ${animal.Age}</p>
              <p>Status: ${animal.AdoptionStatus}</p>
              <button class="delete-btn" data-id="${animal.AnimalID}">Delete</button>
              <button class="edit-btn" data-id="${animal.AnimalID}">Edit</button>
            `;
  
            animalList.appendChild(div);
          });
  
          document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
              const animalId = e.target.getAttribute('data-id');
              try {
                const response = await fetch(`http://localhost:3000/api/animals/${animalId}`, {
                  method: 'DELETE',
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
  
                if (response.ok) {
                  console.log('Animal deleted successfully');
                  loadAnimals();
                } else {
                  const errorData = await response.json();
                  console.error('Failed to delete animal:', errorData.message);
                }
              } catch (error) {
                console.error('Error during deleting animal:', error);
              }
            });
          });
  
          document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
              const animalId = e.target.getAttribute('data-id');
              try {
                const response = await fetch(`http://localhost:3000/api/animals/${animalId}`, {
                  method: 'GET',
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
  
                const animalData = await response.json();
                if (response.ok) {
                  animalName.value = animalData.Name;
                  animalSpecies.value = animalData.Species;
                  animalBreed.value = animalData.Breed;
                  animalAge.value = animalData.Age;
                  animalGender.value = animalData.Gender;
                  animalDescription.value = animalData.Description;
                  animalPhotoUrl.value = animalData.PhotoUrl;
                  animalForm.classList.remove('hidden');
  
                  saveAnimalButton.addEventListener('click', async () => {
                    const updatedAnimal = {
                      name: animalName.value,
                      species: animalSpecies.value,
                      breed: animalBreed.value,
                      age: animalAge.value,
                      gender: animalGender.value,
                      description: animalDescription.value,
                      photoUrl: animalPhotoUrl.value
                    };
  
                    try {
                      const response = await fetch(`http://localhost:3000/api/animals/${animalId}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(updatedAnimal)
                      });
  
                      if (response.ok) {
                        console.log('Animal updated successfully');
                        loadAnimals();
                      } else {
                        const errorData = await response.json();
                        console.error('Failed to update animal:', errorData.message);
                      }
                    } catch (error) {
                      console.error('Error during updating animal:', error);
                    }
                  });
                } else {
                  console.error('Failed to fetch animal details:', animalData.message);
                }
              } catch (error) {
                console.error('Error during fetching animal details:', error);
              }
            });
          });
        } else {
          console.error('Failed to fetch animals:', animalsData.message); // Log di debug
          animalList.innerText = animalsData.message;
        }
      } catch (error) {
        console.error('Error during fetching animals:', error); // Log di debug
        animalList.innerText = 'An error occurred while fetching the animals.';
      }
    }
  
    loadAnimals();
  });
  