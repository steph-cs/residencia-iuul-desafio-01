let slideMainPosition = 0;
const slidesMain = document.getElementsByClassName('carousel-main');
const totalMainSlides = slidesMain.length;

document.
  getElementById('carousel-main__button--next')
  .addEventListener("click", function() {
    moveToNextMainSlide();
  });
document.
  getElementById('carousel-main__button--prev')
  .addEventListener("click", function() {
    moveToPrevMainSlide();
  });

function updateslideMainPosition() {
  for (let slide of slidesMain) {
     slide.classList.remove('carousel__item--visible');
     slide.classList.add('carousel__item--hidden');
  }
  slidesMain[slideMainPosition].classList.remove('carousel__item--hidden');
  slidesMain[slideMainPosition].classList.add('carousel__item--visible');

}

function moveToNextMainSlide() {
  //console.log(slideMainPosition)
  if (slideMainPosition != totalMainSlides-1) {
    slideMainPosition++
  }else{
      slideMainPosition = 0
  }
  updateslideMainPosition();

  //console.log(slideMainPosition)
}

function moveToPrevMainSlide() {

  if (slideMainPosition != 0 ){
    slideMainPosition--;
  }else{
      slideMainPosition = totalMainSlides -1
  }

  updateslideMainPosition();
}
