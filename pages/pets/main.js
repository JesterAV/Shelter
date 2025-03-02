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

/// Create list

let nowScreenWidth = window.innerWidth;

function handleResize() {
    nowScreenWidth = window.innerWidth;
}

window.addEventListener('resize', handleResize);

handleResize();

let counterCards = 0;

if (nowScreenWidth <= 629) {
    counterCards = 3;
} else if (nowScreenWidth <= 1213) {
    counterCards = 6
} else {
    counterCards = 8;
}


let pets = [];

fetch('/Shelter/pets.json')
    .then(response => response.json())
    .then(data => {
        pets = data;
        generateCard();
    })

    .catch(error => {
        console.error('Error loading the json:', error);
    });

let currentIndex = 0;

const petsListContainer = document.getElementById('pets_list_container');
const petCard = document.getElementById('pet_card');

const petList = document.getElementById('pets_list');
const petListTwo = document.createElement('div');
petListTwo.classList.add('pets_list_two');
petsListContainer.appendChild(petListTwo);

const petListThree = document.createElement('div');
petListThree.classList.add('pets_list_three');
petsListContainer.appendChild(petListThree);

const overlay = document.getElementById('overlay');
const modalWindow = document.getElementById('modal_window');

function generateCard() {
    toggleButtons()

    let addList = petList;
    let counterAdd = 0;

    for (let i = 0; i < pets.length; i++) {
        const cloneCard = petCard.cloneNode(true);
        cloneCard.style.display = 'flex';
        addList.appendChild(cloneCard);

        cloneCard.querySelector('.pet_image').src = pets[i].img;
        cloneCard.querySelector('.pet_name').innerText = pets[i].name;

        const modalButton = document.createElement('button');
        modalButton.classList.add('open_modal_btn');
        modalButton.innerText = 'Learn more';
        cloneCard.querySelector('.name_and_button').appendChild(modalButton);

        modalButton.addEventListener('click', () => {
            overlay.classList.add('active');
            modalWindow.classList.add('active');
            document.body.classList.add('no-scroll');

            const modalImage = document.getElementById('modal_image');
            modalImage.src = pets[i].img;
            const modalPetName = document.getElementById('modal_pet_name');
            modalPetName.innerText = pets[i].name;
            const petType = document.getElementById('type_pet');
            petType.innerText = pets[i].type;
            const petBreed = document.getElementById('pet_breed');
            petBreed.innerText = pets[i].breed;
            const petDescription = document.getElementById('pet_description');
            petDescription.innerText = pets[i].description;
            const petAge = document.getElementById('age');            
            const petInoculations = document.getElementById('inoculations');            
            const petDiseases = document.getElementById('diseases');            
            const petParasites = document.getElementById('parasites');            

            petAge.innerText = pets[i].age;
            petInoculations.innerText = pets[i].inoculations;
            petDiseases.innerText = pets[i].diseases;
            petParasites.innerText = pets[i].parasites;
        });

        currentIndex++;
        counterAdd++;
        
        if (nowScreenWidth <= 629 && counterAdd == 3) {
            addList = petListTwo;
        } else if (nowScreenWidth <= 629 && counterAdd == 6) {
            addList = petListThree;
        } else if (nowScreenWidth <= 1213 && counterAdd == 6) {
            addList = petListTwo;
        }

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

function openModalWindow() {

}

const doubleLeftButton = document.getElementById('double_left_arrow_button');
const onceLeftButton = document.getElementById('once_left_arrow_button');
const onceRightButton = document.getElementById('once_right_arrow_button');
const doubleRightButton = document.getElementById('double_right_arrow_button');
const numberList = document.getElementById('number_list');
const buttonsContainer = document.getElementById('buttons_container');


onceRightButton.addEventListener('click', () => {
    if (numberList.innerText == '1') {
        petList.classList.add('active');
        numberList.innerText = '2';

        petList.addEventListener('transitionend', () => {
            petListTwo.style.display = 'grid';
        }, { once: true });

    } else if (numberList.innerText == '2') {
        petListTwo.classList.add('active');
        numberList.innerText = '3';

        petList.addEventListener('transitionend', () => {
            petListThree.classList.add('active');
        }, { once: true });
    }

    toggleButtons();
});


doubleRightButton.addEventListener('click', () => {
    if (nowScreenWidth <= 1213) {
        petList.classList.add('active');
        numberList.innerText = '2';

        petList.addEventListener('transitionend', () => {
            petListTwo.style.display = 'grid';
        }, { once: true });

        toggleButtons();
        return;
    }

    petList.classList.add('active');
    petListTwo.classList.add('active');
    numberList.innerText = '3';

    petList.addEventListener('transitionend', () => {
        petListThree.style.display = 'grid';
    }, { once: true });

    toggleButtons();
});

onceLeftButton.addEventListener('click', () => {
    if (numberList.innerText == '3') {
        petListTwo.classList.remove('active');
        numberList.innerText = '2';
    } else if (numberList.innerText == '2') {
        petList.classList.remove('active');
        numberList.innerText = '1';
    }

    toggleButtons();
});

doubleLeftButton.addEventListener('click', () => {
    numberList.innerText = '1';
    petListTwo.classList.remove('active');
    petList.classList.remove('active');

    toggleButtons();
})


function toggleButtons() {
    if (nowScreenWidth > 1213) {
        // buttonsContainer.style.display = 'none';
    } else if (nowScreenWidth <= 629 && numberList.innerText == '1') {
        doubleLeftButton.classList.add('disabled');
        doubleLeftButton.disabled = true;
        onceLeftButton.classList.add('disabled');
        onceLeftButton.disabled = true;
        doubleRightButton.classList.remove('disabled');
        doubleRightButton.disabled = false;
        onceRightButton.classList.remove('disabled');
        onceRightButton.disabled = false;
    } else if (nowScreenWidth <= 629 && numberList.innerText == '2') {
        doubleLeftButton.classList.remove('disabled');
        doubleLeftButton.disabled = false;
        onceLeftButton.classList.remove('disabled');
        onceLeftButton.disabled = false;
        doubleRightButton.classList.remove('disabled');
        doubleRightButton.disabled = false;
        onceRightButton.classList.remove('disabled');
        onceRightButton.disabled = false;
    } else if (nowScreenWidth <= 629 && numberList.innerText == '3') {
        doubleRightButton.classList.add('disabled');
        doubleRightButton.disabled = true;
        onceRightButton.classList.add('disabled');
        onceRightButton.disabled = true;
    } else if (nowScreenWidth <= 1213 && numberList.innerText == '1') {
        doubleLeftButton.classList.add('disabled');
        doubleLeftButton.disabled = true;
        onceLeftButton.classList.add('disabled');
        onceLeftButton.disabled = true;
        doubleRightButton.classList.remove('disabled');
        doubleRightButton.disabled = false;
        onceRightButton.classList.remove('disabled');
        onceRightButton.disabled = false;
    } else if (nowScreenWidth <= 1213 && numberList.innerText == '2') {
        doubleRightButton.classList.add('disabled');
        doubleRightButton.disabled = true;
        onceRightButton.classList.add('disabled');
        onceRightButton.disabled = true;
        doubleLeftButton.classList.remove('disabled');
        doubleLeftButton.disabled = false;
        onceLeftButton.classList.remove('disabled');
        onceLeftButton.disabled = false;
    }
}