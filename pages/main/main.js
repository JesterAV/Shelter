const petsAndBtnContainer = document.getElementById('pets_and_buttons_container');
const buttonsContainer = document.createElement('div');
const lButton = document.getElementById('left_arrow_button');
const rButton = document.getElementById('righ_arrow_button');
const slider = document.getElementById('slider');

let nowScreenWidth = window.innerWidth;

let counterCard = 0;

if (nowScreenWidth <= 629) {
    counterCard = 1;
    slider.style.justifyContent = 'center'; 
    console.log(counterCard);
} else if (nowScreenWidth <= 929) {
    counterCard = 2;
    slider.style.justifyContent = 'center'; 
    console.log(counterCard);
} else {
    counterCard = 3;
    console.log(counterCard);
}

function handleResize() {
    nowScreenWidth = window.innerWidth;

    if (nowScreenWidth <= 1149) {
        petsAndBtnContainer.classList.add('active');
        buttonsContainer.classList.add('arrow_buttons_container');

        if (!petsAndBtnContainer.contains(buttonsContainer)) {
            petsAndBtnContainer.appendChild(buttonsContainer);
        }

        buttonsContainer.appendChild(lButton);
        buttonsContainer.appendChild(rButton);
    } else {
        petsAndBtnContainer.classList.remove('active');
        
        if (petsAndBtnContainer.contains(buttonsContainer)) {
            petsAndBtnContainer.removeChild(buttonsContainer);
            petsAndBtnContainer.appendChild(lButton);
            petsAndBtnContainer.appendChild(rButton);
        }
    }

}

window.addEventListener('resize', handleResize);

handleResize();

// Burger Menu

const menuButton = document.getElementById('burger_menu');
const burgerMenu = document.getElementById('menu_section');

menuButton.addEventListener('click', (event) => {

    event.stopPropagation();

    menuButton.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');

    document.addEventListener('click', (event) => {
        if(!burgerMenu.contains(event.target) && !menuButton.contains(event.target)) {
            menuButton.classList.toggle('active');
            burgerMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        }
    });
});

// Slider

let pets = [];
let usedIndexes = [];

fetch('pets.json')
    .then(response => response.json())
    .then(data => {
        pets = data;
        generateCard();
    })

    .catch(error => {
        console.error('Error loading the json:', error);
    });

const petCard = document.getElementById('pet_card');

window.addEventListener('resize', () => {

    if (nowScreenWidth <= 629) {
        counterCard = 1;
        slider.style.justifyContent = 'center'; 
        console.log(counterCard);
    } else if (nowScreenWidth <= 929) {
        counterCard = 2;
        slider.style.justifyContent = 'center'; 
        console.log(counterCard);
    } else {
        counterCard = 3;
        console.log(counterCard);
    }

    generateCard();
});

function shuffleArray(array) {
    for (let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const overlay = document.getElementById('overlay');
const modalWindow = document.getElementById('modal_window');

function generateCard() {
    const availableIndexes = [...Array(pets.length).keys()];
    shuffleArray(availableIndexes);

    slider.innerHTML = '';

    for (let i = 0; i < counterCard; i++) {
        const randomIndex = availableIndexes.pop();

        if (availableIndexes.length === 0) {
            availableIndexes.push(...usedIndexes);
            usedIndexes = [];
            shuffleArray(availableIndexes);
        }

        const copyCard = petCard.cloneNode(true);
        copyCard.style.display = 'block';
        slider.appendChild(copyCard);

        const pet = pets[randomIndex];
        copyCard.setAttribute('data-id', pet.id);
        copyCard.querySelector('.pet_image').src = pet.img;
        copyCard.querySelector('.pet_name').innerText = pet.name;

        const modalButton = document.createElement('button');
        modalButton.classList.add('open_modal_btn');
        modalButton.innerText = 'Learn more';
        copyCard.querySelector('.name_and_button').appendChild(modalButton);

        modalButton.addEventListener('click', () => {
            overlay.classList.add('active');
            modalWindow.classList.add('active');
            document.body.classList.add('no-scroll');

            const modalImage = document.getElementById('modal_image');
            modalImage.src = pet.img;
            const modalPetName = document.getElementById('modal_pet_name');
            modalPetName.innerText = pet.name;
            const petType = document.getElementById('type_pet');
            petType.innerText = pet.type;
            const petBreed = document.getElementById('pet_breed');
            petBreed.innerText = pet.breed;
            const petDescription = document.getElementById('pet_description');
            petDescription.innerText = pet.description;
            const petAge = document.getElementById('age');            
            const petInoculations = document.getElementById('inoculations');            
            const petDiseases = document.getElementById('diseases');            
            const petParasites = document.getElementById('parasites');            

            petAge.innerText = pet.age;
            petInoculations.innerText = pet.inoculations;
            petDiseases.innerText = pet.diseases;
            petParasites.innerText = pet.parasites;
        });

        usedIndexes.push(randomIndex);
    }

    let currentIndex = 0;

    document.getElementById('left_arrow_button').addEventListener('click', () => {
        slider.style.transform = 'translateX(100%)';

        setTimeout(() => {

            slider.innerHTML = '';

            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = pets.length - counterCard;
            }

            slider.style.transform = 'translateX(-200%)';

            setTimeout(() => {
                updateSlider();

                slider.style.transform = 'translateX(0)';
            }, 200);
        }, 300);
    });

    document.getElementById('righ_arrow_button').addEventListener('click', () => {

        slider.style.transform = 'translateX(-100%)';

        setTimeout(() => {

            slider.innerHTML = '';

            if (currentIndex < pets.length - counterCard) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }

            slider.style.transform = 'translateX(200%)';

            setTimeout(() => {
                updateSlider();

                slider.style.transform = 'translateX(0)';
            }, 200);
        }, 300);
    });

    function updateSlider() {
        slider.innerHTML = '';

        for (let i = 0; i < counterCard; i++) {
            const petIndex = (currentIndex + i) % pets.length;
            const pet = pets[petIndex];
            const copyCard = petCard.cloneNode(true);
            copyCard.style.display = 'block';
            slider.appendChild(copyCard);

            copyCard.setAttribute('data-id', pet.id);

            console.log('Setting data-id:', pet.id);

            copyCard.querySelector('.pet_image').src = pet.img;
            copyCard.querySelector('.pet_name').innerText = pet.name;

            const modalButton = document.createElement('button');
            modalButton.classList.add('open_modal_btn');
            modalButton.innerText = 'Learn more';
            copyCard.querySelector('.name_and_button').appendChild(modalButton);

            modalButton.removeEventListener('click', openModalHandler);

            modalButton.addEventListener('click', openModalHandler);
        }
    }

    function openModalHandler(event) {
        const petIndex = event.target.closest('.pet_card').getAttribute('data-id');
        console.log('Pet index from data-id:', petIndex);
        const pet = pets.find(pet => pet.id == petIndex); 
    
        if (!pet) {
            console.error('Pet not found:', petIndex);
            return;
        }
    
        overlay.classList.add('active');
        modalWindow.classList.add('active');
        document.body.classList.add('no-scroll');
    
        const modalImage = document.getElementById('modal_image');
        modalImage.src = pet.img;
        const modalPetName = document.getElementById('modal_pet_name');
        modalPetName.innerText = pet.name;
        const petType = document.getElementById('type_pet');
        petType.innerText = pet.type;
        const petBreed = document.getElementById('pet_breed');
        petBreed.innerText = pet.breed;
        const petDescription = document.getElementById('pet_description');
        petDescription.innerText = pet.description;
        const petAge = document.getElementById('age');            
        const petInoculations = document.getElementById('inoculations');            
        const petDiseases = document.getElementById('diseases');            
        const petParasites = document.getElementById('parasites');            
    
        petAge.innerText = pet.age;
        petInoculations.innerText = pet.inoculations;
        petDiseases.innerText = pet.diseases;
        petParasites.innerText = pet.parasites;
    }

    overlay.addEventListener('click', () => {
        overlay.classList.remove('active');
        modalWindow.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    const markButton = document.getElementById('mark_button');
    markButton.addEventListener('click', () => {
        overlay.classList.remove('active');
        modalWindow.classList.remove('active');
        document.body.classList.remove('no-scroll');
    })
}