const body = document.querySelector('body')
const leftButton = document.querySelector('.slide-left')
const rightButton = document.querySelector('.slide-right')
const slider = document.querySelector('.slider')
let slideIndex = 1 // decrease when clicking right, increase clicking left
let carouselItems = slider.children.length
let sectionSize = 3

// set default items on load
if (window.innerWidth < 800) {
  body.style.setProperty('--section-size', '2')
  sectionSize = 2
}
if (window.innerWidth < 500) {
  body.style.setProperty('--section-size', '1')
  sectionSize = 1
}
if (window.innerWidth >= 800) {
  body.style.setProperty('--section-size', '3')
  sectionSize = 3
}

// change number of items when screen changes size
window.addEventListener('resize', () => {
  if (window.innerWidth < 800) {
    body.style.setProperty('--section-size', '2')
    sectionSize = 2
  }
  if (window.innerWidth < 500) {
    body.style.setProperty('--section-size', '1')
    sectionSize = 1
  }
  if (window.innerWidth >= 800) {
    body.style.setProperty('--section-size', '3')
    sectionSize = 3
  }
})

// first and last section of images of the slider
let rightImage = slider.children[slider.children.length -1]
let leftImage2 = slider.children[1]
let leftImage = slider.children[0]

// place clones at start and end of carousel
let clone = rightImage.cloneNode()
slider.insertAdjacentElement('afterbegin', clone)
clone = leftImage.cloneNode()
slider.insertAdjacentElement('beforeend', clone)
clone = leftImage2.cloneNode()
slider.insertAdjacentElement('beforeend', clone)


leftButton.addEventListener('pointerdown', () => {
  console.log(slideIndex)
  if(slideIndex === 1) {
    slideIndex--
    slider.style.transform = `translateX(${Math.round(slideIndex * -(100 / sectionSize))}%)`
    const timer1 = setTimeout(() => {
      slider.style.transition = 'unset'
      slideIndex = carouselItems
      slider.style.transform = `translateX(${Math.round(slideIndex * -(100 / sectionSize))}%)`
      clearTimeout(timer1)
    }, 310)
    const timer2 = setTimeout(() => {
      slider.style.transition = 'transform 300ms ease'
      clearTimeout(timer2)
    }, 320)
    return
  }

  slideIndex--
  slider.style.transform = `translateX(${Math.round(slideIndex * -(100 / sectionSize))}%)`

})



rightButton.addEventListener('pointerdown', () => {

  slideIndex++
  if(slideIndex === carouselItems) {
    slider.style.transform = `translateX(${Math.round(slideIndex * -(100 / sectionSize))}%)`
    const timer1 = setTimeout(() => {
      slider.style.transition = 'unset'
      slideIndex = 0
      slider.style.transform = `translateX(${Math.round(slideIndex * -(100 / sectionSize))}%)`
      clearTimeout(timer1)
    }, 270)
    const timer2 = setTimeout(() => {
      slider.style.transition = 'transform 300ms ease'
      clearTimeout(timer2)
    }, 290)
    return
  }
  slider.style.transform = `translateX(${Math.round(slideIndex * -(100 / sectionSize))}%)`

})
