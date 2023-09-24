'use strict'

const body = document.querySelector('body');
const slider = document.querySelector('.slider');
const ageNumber = document.querySelector('.number');
const nextButtons = document.querySelectorAll('.btn--continue');
const backButtons = document.querySelectorAll('.btn--prev');
const submitButton = document.querySelector('.btn--submit');
const allSlides = document.querySelectorAll('.form__slide');
const citySelect = document.querySelector('.select--city');
const numberInput = document.querySelector('.input--phone');
const messageArea = document.querySelector('#message');
const nameInput = document.querySelector('.input--name');
const phoneInput = document.querySelector('.input--phone');
const policyCheck = document.querySelector('#policy');
const loader = document.querySelector('.loader');
const successScreen = document.querySelector('.success-popup');
const buttonClose = document.querySelector('.success__btn--close');
const form = document.querySelector('.main__form');
const errorLabels = document.querySelectorAll('.message--error');
const allOptions = document.querySelectorAll('option');
let message;
let name;
let isSelectOpened = false;
let phone;
let policy;

let slide = 0;
const numberIntoSlide = {
    0: 'first',
    1: 'second',
    2: 'third',
    3: 'success'
}

const handleNext = (index) => {
    if (index === 1 && !message) return
    slide += 1
    allSlides.forEach(slide => slide.classList.add('hidden'))
    document.querySelector(`.slide--${numberIntoSlide[slide]}`).classList.remove('hidden')
}

function handleBack() {
    slide -= 1
    allSlides.forEach(slide => slide.classList.add('hidden'))
    document.querySelector(`.slide--${numberIntoSlide[slide]}`).classList.remove('hidden')
}

nextButtons.forEach((nextButton, index) => {
    nextButton.addEventListener('click', () => {
        handleNext(index)
    })
})

backButtons.forEach(backButton => backButton.addEventListener('click', () => {
    handleBack()
}))
slider.addEventListener('input', e => {
    ageNumber.innerText = e.target.value
})

citySelect.addEventListener('click', (e) => {
    isSelectOpened = !isSelectOpened
    citySelect.classList.toggle('opened')
})

citySelect.addEventListener('blur', () => {
    if (isSelectOpened) {
        isSelectOpened = !isSelectOpened
        citySelect.classList.remove('opened')
    }
})

citySelect.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
        if (isSelectOpened) {
            isSelectOpened = !isSelectOpened;
            citySelect.classList.remove('opened')
        }
    }
})
messageArea.addEventListener('input', e => message = e.target.value)
nameInput.addEventListener('input', e => {
    name = e.target.value
    if (!name) {
        nameInput.classList.add('invalid')
        errorLabels[0].classList.remove('hidden')
    }
    if (name) {
        nameInput.classList.remove('invalid')
        errorLabels[0].classList.add('hidden')
    }
    if (phone && name && isFinite(phone)) submitButton.classList.remove('btn--inactive')
    if (!phone || !name || !isFinite(phone)) submitButton.classList.add('btn--inactive')
})

phoneInput.addEventListener('input', e => {
    phone = e.target.value
    if (!phone || !isFinite(phone)) {
        phoneInput.classList.add('invalid')
        errorLabels[1].classList.remove('hidden')
    }
    if (phone && isFinite(phone)) {
        phoneInput.classList.remove('invalid')
        errorLabels[1].classList.add('hidden')
    }
    if (phone && name && policy && isFinite(phone)) submitButton.classList.remove('btn--inactive')
    if (!name || !phone || !policy || !isFinite(phone)) submitButton.classList.add('btn--inactive')
})