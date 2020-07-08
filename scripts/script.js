'use strict';

const dataBase = [];

const modalAdd = document.querySelector('.modal__add'),
    addAd = document.querySelector('.add__ad'),
    modalBtnSubmit = document.querySelector('.modal__btn-submit'),
    modalSubmit = document.querySelector('.modal__submit'),
    catalog = document.querySelector('.catalog'),
    modalItem = document.querySelector('.modal__item'),
    modalBtnWarning = document.querySelector('.modal__btn-warning');

const elementsModalSubmit = [...modalSubmit.elements].filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit');


//закрытие модального окна по нажатию на крест / клику все области
const closeModal = function(event) {
    const target = event.target;
    if(target.closest('.modal__close') || target === this) {
        this.classList.add('hide');
        modalSubmit.reset();
        if(this === modalAdd) {
            modalSubmit.reset();
        }
    }
}

//закрытие модального окна по 'esc'
const closeModalEscape = event => {
    if (event.code === 'Escape') {
        modalAdd.classList.add('hide');
        modalItem.classList.add('hide');
    };
}

//проверка на заполненность формы
modalSubmit.addEventListener('input', ()=> {
    const validForm = elementsModalSubmit.every(elem => elem.value);
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
});

modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    const itemObj = {};
    for (const elem of elementsModalSubmit) {
        itemObj[elem.name] = elem.value;
    }
    dataBase.push(itemObj);
    
});

//открытие по кнопке
addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    document.addEventListener('keydown', closeModalEscape);
});


catalog.addEventListener('click', event => {
    const target = event.target;
    
    if(target.closest('.card')) {
        modalItem.classList.remove('hide');
        document.addEventListener('keydown', closeModalEscape);
    };

});

//закрытие при клике внутри
modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);