console.log("pass1a");
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    console.log('Token retrieved from localStorage:', token); // Log di debug
  
    if (!token) {
      window.location.href = 'login.html';
      return;
    }
  
    try {
      // Fetch user profile
      console.log("pass1");
      const response = await fetch('http://localhost:3000/api/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("pass2");
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Non-JSON response");
      }
      console.log("pass21");
      const data = await response.json();
      console.log('Profile response:', data); // Log di debug
      console.log("pass22");
      if (response.ok) {
        document.getElementById('userInfo').innerHTML = `
          <p><strong>Username:</strong> ${data.data.Username}</p>
          <p><strong>Email:</strong> ${data.data.Email}</p>
        `;
      } else {
        document.getElementById('userInfo').innerText = data.message;
      }
      console.log("pass23");
      // Fetch user adoptions
      const adoptionsResponse = await fetch('http://localhost:3000/api/adoptions/my-adoptions', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("pass24");
      const adoptionsContentType = adoptionsResponse.headers.get("content-type");
      if (!adoptionsContentType || !adoptionsContentType.includes("application/json")) {
        throw new TypeError("Non-JSON response");
      }
  
      const adoptionsData = await adoptionsResponse.json();
      console.log('Adoptions response:', adoptionsData); // Log di debug
      console.log("pass25");
      if (adoptionsResponse.ok) {
        const adoptions = adoptionsData.data.map(adoption => `
          <p><strong>Animal ID:</strong> ${adoption.AnimalID}</p>
          <p><strong>Adoption Date:</strong> ${adoption.AdoptionDate}</p>
        `).join('');
  
        document.getElementById('userAdoptions').innerHTML = adoptions;
      } else {
        document.getElementById('userAdoptions').innerText = adoptionsData.message;
      }
  
    } catch (error) {
      console.error('Error during fetching:', error); // Log di debug
      document.getElementById('userInfo').innerText = 'An error occurred while fetching the profile.';
      document.getElementById('userAdoptions').innerText = 'An error occurred while fetching the adoptions.';
    }
  });
  