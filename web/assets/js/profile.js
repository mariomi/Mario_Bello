document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  console.log('Token retrieved from localStorage:', token); // Log di debug

  if (!token) {
    console.log('No token found in localStorage, redirecting to login page'); // Log di debug
    window.location.href = 'login.html';
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
    console.log('Profile response headers:', profileResponse.headers); // Log di debug

    const profileContentType = profileResponse.headers.get("content-type");
    if (!profileContentType) {
      console.error('Profile response does not have a content-type header'); // Log di debug
      throw new TypeError("Profile response does not have a content-type header");
    }

    if (!profileContentType.includes("application/json")) {
      console.error('Profile response is not JSON, content-type:', profileContentType); // Log di debug
      throw new TypeError("Profile response is not JSON");
    }

    const profileData = await profileResponse.json();
    console.log('Profile response data:', profileData); // Log di debug

    if (profileResponse.ok) {
      document.getElementById('userInfo').innerHTML = `
        <p><strong>Username:</strong> ${profileData.data.Username}</p>
        <p><strong>Email:</strong> ${profileData.data.Email}</p>
      `;
    } else {
      console.error('Failed to fetch profile:', profileData.message); // Log di debug
      document.getElementById('userInfo').innerText = profileData.message;
    }
  } catch (error) {
    console.error('Error during fetching profile:', error); // Log di debug
    document.getElementById('userInfo').innerText = 'An error occurred while fetching the profile.';
  }

  try {
    // Fetch user adoptions
    console.log('Fetching user adoptions...'); // Log di debug
    const adoptionsResponse = await fetch('http://localhost:3000/api/adoptions/my-adoptions', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Adoptions response status:', adoptionsResponse); // Log di debug
    console.log('Adoptions response headers:', adoptionsResponse.headers); // Log di debug

    const adoptionsContentType = adoptionsResponse.headers.get("content-type");
    if (!adoptionsContentType) {
      console.error('Adoptions response does not have a content-type header'); // Log di debug
      throw new TypeError("Adoptions response does not have a content-type header");
    }

    if (!adoptionsContentType.includes("application/json")) {
      console.error('Adoptions response is not JSON, content-type:', adoptionsContentType); // Log di debug
      throw new TypeError("Adoptions response is not JSON");
    }

    const adoptionsData = await adoptionsResponse.json();
    console.log('Adoptions response data:', adoptionsData); // Log di debug

    if (adoptionsResponse.ok) {
      const adoptions = adoptionsData.data.map(adoption => `
        <p><strong>Animal ID:</strong> ${adoption.AnimalID}</p>
        <p><strong>Adoption Date:</strong> ${adoption.AdoptionDate}</p>
      `).join('');

      document.getElementById('userAdoptions').innerHTML = adoptions;
    } else {
      console.error('Failed to fetch adoptions:', adoptionsData.message); // Log di debug
      document.getElementById('userAdoptions').innerText = adoptionsData.message;
    }
  } catch (error) {
    console.error('Error during fetching adoptions:', error); // Log di debug
    document.getElementById('userAdoptions').innerText = 'An error occurred while fetching the adoptions.';
  }
});
