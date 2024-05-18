document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/animals')
        .then(response => response.json())
        .then(data => {
            const animalList = document.querySelector('.animal-list');
            data.forEach(animal => {
                const animalCard = document.createElement('div');
                animalCard.classList.add('animal');
                
                const animalImage = document.createElement('img');
                animalImage.src = animal.image;
                animalCard.appendChild(animalImage);
                
                const animalName = document.createElement('h3');
                animalName.textContent = animal.name;
                animalCard.appendChild(animalName);
                
                const animalDescription = document.createElement('p');
                animalDescription.textContent = animal.description;
                animalCard.appendChild(animalDescription);
                
                const adoptButton = document.createElement('button');
                adoptButton.textContent = 'Adopt';
                adoptButton.classList.add('adopt-btn');
                adoptButton.onclick = () => adoptAnimal(animal.id);
                animalCard.appendChild(adoptButton);
                
                animalList.appendChild(animalCard);
            });
        });
});

function adoptAnimal(animalId) {
    fetch(`/api/adopt/${animalId}`, { method: 'POST' })
        .then(response => {
            if (response.ok) {
                alert('Animal adopted successfully!');
                location.reload(); // Refresh the page to update the list
            } else {
                alert('Failed to adopt animal.');
            }
        });
}
