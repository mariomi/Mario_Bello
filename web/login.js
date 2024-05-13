document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Previene il comportamento di invio form standard.
  
  const email = document.getElementById('email').value; // Prende l'email dall'elemento input.
  const password = document.getElementById('password').value; // Prende la password dall'elemento input.
  const data = { email, password }; // Crea un oggetto con email e password.

  try {
      // Esegue la richiesta fetch al server.
      const response = await fetch('http://localhost:3000/api/users/login', {
          method: 'POST', // Metodo HTTP
          headers: {
              'Content-Type': 'application/json' // Imposta l'header per indicare che il body è in formato JSON.
          },
          body: JSON.stringify(data) // Trasforma l'oggetto data in una stringa JSON.
      });

      
      if (response.ok) {
          const result = await response.json(); // Legge la risposta come JSON.
          console.log('Login successful', result);
          window.location.href = '/web/dashboard.html'; // Reindirizza l'utente alla dashboard.
      } else {
          const errorMessage = await response.text(); // Legge la risposta come testo se non è ok.
          console.error('Login failed', errorMessage);
          alert('Login failed: ' + errorMessage);
      }
  } catch (error) {
      console.error('Error during login:', error);
      alert('Error logging in: ' + error.message);
  }
});
