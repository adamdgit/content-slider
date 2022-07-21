let CATEGORY_ITEMS = 16
let SECTION_SIZE = 3
let SCREEN_SIZE = document.body.clientWidth
const slide = document.querySelectorAll('.slider')

// update number of cards in the row on screen resize
window.addEventListener('resize', () => {
  SCREEN_SIZE = document.body.clientWidth
  if (SCREEN_SIZE >= 1400) {
    SECTION_SIZE = 4
  } else if (SCREEN_SIZE >= 2000) {
    SECTION_SIZE = 5
  } else {
    SECTION_SIZE = 3
  }
})

// get each category slide as html node
slide.forEach(node => {
  // place set number of category items into each genre slide
  for (let i=1; i<=CATEGORY_ITEMS; i++) {
    // insert images to category slide
    node.insertAdjacentHTML('beforeend', '<img src="placeholder.png">')
  }
})

// when slide button is clicked call handleClick function
document.addEventListener('click', (e) => {
  let slideBtn
  if (e.target.matches('.slide-btn')) {
    slideBtn = e.target
  }
  if (slideBtn != null) {
    handleClick(slideBtn)
  }
})

// scroll left or right depending on button clicked
function handleClick(node) {

  let slide = node.closest('.video-slider-wrap').querySelector('.slider')
  let slideIndex = +(slide.style.getPropertyValue('--slider-index'))
  let slideSections = CATEGORY_ITEMS / SECTION_SIZE

  // prevent scrolling left if no items to scroll through
  if (node.classList.contains('slide-left') && slideIndex >= 1) {
    slide.style.setProperty('--slider-index', slideIndex -1)
  }
  // at end of items return to start of list
  if (node.classList.contains('slide-right')) {
    if (slideIndex >= slideSections -1) {
      slide.style.setProperty('--slider-index', slideIndex = 0)
    } else {
      slide.style.setProperty('--slider-index', slideIndex +1)
    }
  }
}