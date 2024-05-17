document.addEventListener('DOMContentLoaded', function() {
    // Assumi che l'utente sia già loggato e il nome sia memorizzato
    const userName = 'X';  // Questo dovrebbe essere dinamico, basato sull'utente loggato
    const userButton = document.getElementById('userButton');
    if (userButton && userName) {
        userButton.textContent = userName.charAt(0).toUpperCase();
    }

    const breedSelect = document.getElementById('breed');
    const animalList = document.getElementById('animal-list');

    breedSelect.addEventListener('change', fetchAnimals);

    // Fetch breed options
    fetch('http://localhost:3000/api/animals')
        .then(response => response.json())
        .then(animals => {
            const breeds = [...new Set(animals.map(animal => animal.Breed))];
            breeds.forEach(breed => {
                const option = document.createElement('option');
                option.value = breed;
                option.textContent = breed;
                breedSelect.appendChild(option);
            });

            fetchAnimals(); // Fetch animals initially
        })
        .catch(error => console.error('Error loading the animals:', error));

    function fetchAnimals() {
        const breed = breedSelect.value;
        const url = breed ? `http://localhost:3000/api/animals?breed=${breed}` : 'http://localhost:3000/api/animals';

        fetch(url)
            .then(response => response.json())
            .then(animals => {
                animalList.innerHTML = '';
                animals.forEach(animal => {
                    const div = document.createElement('div');
                    div.className = 'animal';

                    // Utilizza direttamente l'URL dell'immagine
                    const imgUrl = animal.PhotoUrl ? animal.PhotoUrl : 'assets/images/fallback.jpg';
                    console.log(`Image URL for ${animal.Name}: ${imgUrl}`);

                    div.innerHTML = `
                        <img style="display: block; -webkit-user-select: none; margin: auto; cursor: zoom-in; background-color: #1c1c1c; transition: background-color 300ms; width: 100%; height: 200px; object-fit: cover;" src="${imgUrl}" alt="Foto di ${animal.Name}" onerror="this.onerror=null;this.src='assets/images/fallback.jpg';">
                        <h3>${animal.Name}</h3>
                        <p>Specie: ${animal.Species}</p>
                        <p>Età: ${animal.Age}</p>
                    `;
                    animalList.appendChild(div);
                });
            })
            .catch(error => console.error('Error loading the animals:', error));
    }

    const cursor = new Cursor(document.querySelector(".cursor"));
    const cta = document.querySelector(".cta");
    const menuBtn = document.querySelector(".menu-btn");

    function update() {
        cursor.update();
    }

    function onMouseMove(event) {
        const x = event.clientX;
        const y = event.clientY;

        cursor.updateTargetPosition(x, y);
    }

    function onResize() {
        const { x, y, width, height } = menuBtn.getBoundingClientRect();

        gsap.set(cta, {
            left: x - width,
            top: y + height
        });
    }

    gsap.ticker.add(update);
    window.addEventListener("pointermove", onMouseMove);
    window.addEventListener("resize", onResize);
});

class Cursor {
    constructor(targetEl) {
        this.el = targetEl;

        this.position = {
            previous: vec2(-100, -100),
            current: vec2(-100, -100),
            target: vec2(-100, -100),
            lerpAmount: 0.1
        };
        this.scale = {
            previous: 1,
            current: 1,
            target: 1,
            lerpAmount: 0.1
        };

        this.isHovered = false;
        this.hoverEl = null;

        this.addListeners();
    }

    update() {
        this.position.current.lerp(this.position.target, this.position.lpAmount);
        this.scale.current = gsap.utils.interpolate(
            this.scale.current,
            this.scale.target,
            this.scale.lerpAmount
        );

        const delta = this.position.current.clone().sub(this.position.previous);

        this.position.previous.copy(this.position.current);
        this.scale.previous = this.scale.current;

        gsap.set(this.el, {
            x: this.position.current.x,
            y: this.position.current.y
        });

        if (!this.isHovered) {
            const angle = Math.atan2(delta.y, delta.x) * (180 / Math.PI);
            const distance = Math.sqrt(delta.x * delta.x + delta.y * delta.y) * 0.04;

            gsap.set(this.el, {
                rotate: angle,
                scaleX: this.scale.current + Math.min(distance, 1),
                scaleY: this.scale.current - Math.min(distance, 0.3)
            });
        }
    }

    updateTargetPosition(x, y) {
        if (this.isHovered) {
            const bounds = this.hoverEl.getBoundingClientRect();

            const cx = bounds.x + bounds.width / 2;
            const cy = bounds.y + bounds.height / 2;

            const dx = x - cx;
            const dy = y - cy;

            this.position.target.x = cx + dx * 0.15;
            this.position.target.y = cy + dy * 0.15;
            this.scale.target = 2;

            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            const distance = Math.sqrt(dx * dx + dy * dy) * 0.01;

            gsap.set(this.el, { rotate: angle });
            gsap.to(this.el, {
                scaleX: this.scale.target + Math.pow(Math.min(distance, 0.6), 3) * 3,
                scaleY: this.scale.target - Math.pow(Math.min(distance, 0.3), 3) * 3,
                duration: 0.5,
                ease: "power4.out",
                overwrite: true
            });
        } else {
            this.position.target.x = x;
            this.position.target.y = y;
            this.scale.target = 1;
        }
    }

    addListeners() {
        gsap.utils.toArray("[data-hover]").forEach((hoverEl) => {
            // set hover states
            {
                const hoverBoundsEl = hoverEl.querySelector("[data-hover-bounds]");
                hoverBoundsEl.addEventListener("pointerover", () => {
                    this.isHovered = true;
                    this.hoverEl = hoverBoundsEl;
                });
                hoverBoundsEl.addEventListener("pointerout", () => {
                    this.isHovered = false;
                    this.hoverEl = null;
                });
            }

            // magnetic effect
            {
                const xTo = gsap.quickTo(hoverEl, "x", {
                    duration: 1,
                    ease: "elastic.out(1, 0.3)"
                });
                const yTo = gsap.quickTo(hoverEl, "y", {
                    duration: 1,
                    ease: "elastic.out(1, 0.3)"
                });

                hoverEl.addEventListener("pointermove", (event) => {
                    const { clientX: cx, clientY: cy } = event;
                    const { height, width, left, top } = hoverEl.getBoundingClientRect();
                    const x = cx - (left + width / 2);
                    const y = cy - (top + height / 2);
                    xTo(x * 0.2);
                    yTo(y * 0.2);
                });

                hoverEl.addEventListener("pointerout", () => {
                    xTo(0);
                    yTo(0);
                });
            }
        });
    }
}

class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    copy({ x, y }) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vec2(this.x, this.y);
    }

    sub({ x, y }) {
        return new Vec2(this.x - x, this.y - y);
    }

    add({ x, y }) {
        return new Vec2(this.x + x, this.y + y);
    }

    lerp({ x, y }, amount) {
        this.x += (x - this.x) * amount;
        this.y += (y - this.y) * amount;
        return this;
    }
}

window.vec2 = (x, y) => new Vec2(x, y);
