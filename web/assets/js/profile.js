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

  const editButton = document.getElementById('editButton');
  const saveButton = document.getElementById('saveButton');
  const editForm = document.getElementById('editForm');
  const userInfo = document.getElementById('userInfo');
  const editUsername = document.getElementById('editUsername');
  const editEmail = document.getElementById('editEmail');
  const adminButton = document.getElementById('adminButton');

  if (editButton && saveButton && editForm && userInfo && editUsername && editEmail) {
      editButton.addEventListener('click', () => {
          editForm.classList.remove('hidden');
          editButton.classList.add('hidden');
          const username = userInfo.querySelector('p strong:nth-child(1)').nextSibling.textContent.trim();
          const email = userInfo.querySelector('p strong:nth-child(2)').nextSibling.textContent.trim();
          editUsername.value = username;
          editEmail.value = email;
      });

      saveButton.addEventListener('click', async () => {
          const updatedUsername = editUsername.value;
          const updatedEmail = editEmail.value;

          try {
              const response = await fetch('http://localhost:3000/api/users/profile', {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify({ username: updatedUsername, email: updatedEmail })
              });

              if (response.ok) {
                  userInfo.innerHTML = `
                      <p><strong>Username:</strong> ${updatedUsername}</p>
                      <p><strong>Email:</strong> ${updatedEmail}</p>
                  `;
                  editForm.classList.add('hidden');
                  editButton.classList.remove('hidden');
              } else {
                  const errorData = await response.json();
                  console.error('Failed to update profile:', errorData.message);
              }
          } catch (error) {
              console.error('Error during updating profile:', error);
          }
      });
  }

  try {
      // Fetch user profile
      console.log('Fetching user profile...');
      const profileResponse = await fetch('http://localhost:3000/api/users/profile', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      console.log('Profile response status:', profileResponse.status);
      const profileData = await profileResponse.json();
      console.log('Profile response data:', profileData);

      if (profileResponse.ok) {
          userInfo.innerHTML = `
              <p><strong>Username:</strong> ${profileData.data.Username}</p>
              <p><strong>Email:</strong> ${profileData.data.Email}</p>
          `;
          if (profileData.data.IsAdmin) {
              adminButton.style.display = 'block';
          }
      } else {
          console.error('Failed to fetch profile:', profileData.message);
          userInfo.innerText = profileData.message;
      }
  } catch (error) {
      console.error('Error during fetching profile:', error);
      userInfo.innerText = 'An error occurred while fetching the profile.';
  }

  try {
      // Fetch user adoptions
      console.log('Fetching user adoptions...');
      const adoptionsResponse = await fetch('http://localhost:3000/api/adoptions/my-adoptions', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      console.log('Adoptions response status:', adoptionsResponse.status);
      const adoptionsData = await adoptionsResponse.json();
      console.log('Adoptions response data:', adoptionsData);

      if (adoptionsResponse.ok) {
          const adoptionsList = adoptionsData.data.map(adoption => {
              console.log('Animal data for adoption:', adoption);

              return `
                  <div class="adoption-card">
                      <img src="${adoption.PhotoUrl || 'assets/images/fallback.jpg'}" alt="Foto di ${adoption.Name}" class="adoption-animal-photo">
                      <p><strong>Name:</strong> ${adoption.Name}</p>
                      <p><strong>Species:</strong> ${adoption.Species}</p>
                      <p><strong>Adoption Date:</strong> ${new Date(adoption.AdoptionDate).toLocaleDateString()}</p>
                  </div>
              `;
          });

          document.getElementById('userAdoptions').innerHTML = adoptionsList.join('');
      } else {
          console.error('Failed to fetch adoptions:', adoptionsData.message);
          document.getElementById('userAdoptions').innerText = adoptionsData.message;
      }
  } catch (error) {
      console.error('Error during fetching adoptions:', error);
      document.getElementById('userAdoptions').innerText = 'An error occurred while fetching the adoptions.';
  }
});
