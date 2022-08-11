'use strict'

const body = document.body
const header = document.querySelector('.header')
const headerInner = document.querySelector('.header__inner')
const headerBurger = document.querySelector('.header__burger')
const headerNav = document.querySelector('.header__nav')

headerBurger.addEventListener('click', () => {
	headerBurger.classList.toggle('is-active')
	headerNav.classList.toggle('is-open')
	body.classList.toggle('is-lock')
});

window.addEventListener('scroll', () => {
	let windowScrollTop = window.scrollY;

	if (windowScrollTop) {
		header.classList.add('is-scroll')
		headerInner.classList.add('is-scroll')
	} else {
		header.classList.remove('is-scroll')
		headerInner.classList.remove('is-scroll')
	}
})


const aboutImage = document.querySelectorAll('.about__image');

aboutImage.forEach((image) => {
	image.addEventListener('click', () => {
		if (image.classList.entries('is-active')) {
			aboutImage.forEach((image) => {
				if (image.classList.contains('is-active')) {
					image.classList.remove('is-active')
				}
			})

			image.classList.add('is-active')
		}
	})
})


const swiper = new Swiper('.swiper', {
	loop: true,
	slidesPerView: 1,
	spaceBetween: 20,

	breakpoints: {
		375: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		576: {
			slidesPerView: 2,
			spaceBetween: 30
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 30
		}
	},

	navigation: {
		nextEl: '.events__button_next',
    	prevEl: '.events__button_prev',
	}
})
