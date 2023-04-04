const slideContainer = document.querySelector('.container');
const slide = document.querySelector('.slides');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const interval = 10000;

let slides = document.querySelectorAll('.slide');
let index = 1;
let slideId;
const currentSlide = document.querySelector('.current-slide');
const totalSlides = document.querySelector('.total-slides');





const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].clientWidth;
console.log(slideWidth)

slide.style.transform = `translateX(${-slideWidth * index}px)`

const startSlide = () => {
    slideId = setInterval(() =>{
        moveToNextSlide();
    }, interval);
}


const getSlides = ()=> document.querySelectorAll('.slide')

  
const updateCounter = () => {
  const slide = getSlides();
  if (index === 0) {
      currentSlide.textContent = slide.length - 2;
  } else if (index === 4) {
      currentSlide.textContent = slide.length - 4;
  } else {
      currentSlide.textContent = index;
  }
  totalSlides.textContent = slide.length - 2;
};

  
  updateCounter();
  

slide.addEventListener('transitionend', () =>{
    slides = getSlides();
    if(slides[index].id === firstClone.id){
        slide.style.transition = 'none';
        index = 1;
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
    }    
    if(slides[index].id === lastClone.id){
        slide.style.transition = 'none';
        index = slides.length - 2;
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
    }    
    
})

let isMoving = false;

const moveToNextSlide = () => {
  slides = getSlides();
  if(index >= slides.length -1 || isMoving) return;

  isMoving = true;
  nextBtn.disabled = true;

  index++;
  
  slide.style.transition = '1s';
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
 updateCounter();

 
  slide.addEventListener('transitionend', function transitionEndHandler() {
    slide.style.transition = 'none';
    
    isMoving = false;

    nextBtn.disabled = false;
   
    slide.removeEventListener('transitionend', transitionEndHandler);
  });
  
};

const moveToPreviousSlide = () => {
  if(index<= 0 || isMoving) return;

  isMoving = true;
  prevBtn.disabled = true;

  index--;
  slide.style.transform = `translateX(${-slideWidth * index}px)`
  slide.style.transition = '1s';
      
updateCounter();

  slide.addEventListener('transitionend', function transitionEndHandler() {
    slide.style.transition = 'none';
      
    isMoving = false;
    prevBtn.disabled = false;
    slide.removeEventListener('transitionend', transitionEndHandler);
  });
};



slideContainer.addEventListener('mouseenter', () =>{
    clearInterval(slideId)
})

slideContainer.addEventListener('mouseleave', startSlide);

nextBtn.addEventListener('click', moveToNextSlide);
prevBtn.addEventListener('click', moveToPreviousSlide);


startSlide();
