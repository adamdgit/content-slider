let CATEGORY_ITEMS = 20
let SECTION_SIZE = 3
let QUERY = ''
let SCREEN_SIZE = document.body.clientWidth

// set section size based on screen size
if (SCREEN_SIZE >= 600) {
  SECTION_SIZE = 3
}
if (SCREEN_SIZE >= 1400) {
  SECTION_SIZE = 4
}
if (SCREEN_SIZE >= 2000) {
  SECTION_SIZE = 5
} 
if (SCREEN_SIZE < 600) {
  SECTION_SIZE = 2
}

const slide1 = document.querySelector('[data-slide-cat="sci-fi"]')
const slide2 = document.querySelector('[data-slide-cat="action"]')
const slide3 = document.querySelector('[data-slide-cat="documentary"]')
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '769cd24bbamsh1fb4150e925e97ap125ffcjsn7c416d1919c5',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
}

let documentaryResults = []
let actionResults = []
let scifiResults = []

// sci-fi
const getCat1 = async () => {
  await fetch('https://imdb8.p.rapidapi.com/title/v2/find?title=alien&titleType=movie&limit=20&sortArg=moviemeter%2Casc&genre=sci-fi', options)
	.then(response => response.json())
	.then(response => {
    scifiResults = response.results
    console.log(response.results)
    })
	.catch(err => console.error(err));

  scifiResults.map(result => {
    slide1.insertAdjacentHTML('beforeend', `
      <span class="result">
        <h2>${result.title? result.title : 'no data'}</h2>
        <img src=${result.image? result.image.url : 'no image data'} alt='${result.title} movie cover' />
        <h3>${result.year? result.year : 'no data'}</h3>
      </span>
    `)
  })
}
getCat1()

// action
const getCat2 = async () => {
  await fetch('https://imdb8.p.rapidapi.com/title/v2/find?title=game&titleType=movie&limit=20&sortArg=moviemeter%2Casc&genre=action', options)
	.then(response => response.json())
	.then(response => {
    actionResults = response.results
    console.log(response.results)
    })
	.catch(err => console.error(err));

  actionResults.map(result => {
    slide2.insertAdjacentHTML('beforeend', `
      <span class="result">
        <h2>${result.title}</h2>
        <img src=${result.image? result.image.url : 'no image data'} alt="" />
        <h3>${result.year}</h3>
      </span>
    `)
  })
}
getCat2()

// documentary
const getCat3 = async () => {
  await fetch('https://imdb8.p.rapidapi.com/title/v2/find?title=david&titleType=movie&limit=20&sortArg=moviemeter%2Casc&genre=documentary', options)
	.then(response => response.json())
	.then(response => {
    documentaryResults = response.results
    console.log(response.results)
    })
	.catch(err => console.error(err));

  documentaryResults.map(result => {
    slide3.insertAdjacentHTML('beforeend', `
      <span class="result">
        <h2>${result.title}</h2>
        <img src=${result.image? result.image.url : 'no image data'} alt="" />
        <h3>${result.year}</h3>
      </span>
    `)
  })
}
getCat3()

// update number of cards in the row when screen size is changed
window.addEventListener('resize', () => {
  SCREEN_SIZE = document.body.clientWidth
  if (SCREEN_SIZE >= 600) {
    SECTION_SIZE = 3
  }
  if (SCREEN_SIZE >= 1400) {
    SECTION_SIZE = 4
  }
  if (SCREEN_SIZE >= 2000) {
    SECTION_SIZE = 5
  } 
  if (SCREEN_SIZE < 600) {
    SECTION_SIZE = 2
  }
})

// check if button is clicked, pass clicked button node to handleclick
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