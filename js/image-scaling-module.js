const ZOOM_STEP = 25;
const INITIAL_SCALE_VALUE = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const scalableImage = document.querySelector('.img-upload__preview img');

let scaleValue;

const assignsScaleImage = (value) => {
  scalableImage.style.transform = `scale(${value / 100})`;
};

const defaultScale = () => {
  scaleValue = INITIAL_SCALE_VALUE;
  assignsScaleImage (scaleValue);
};

const checksScaleValueSmaller = () => {
  if (scaleValue === 25){
    scaleControlSmaller.disabled = true;
  }else{
    scaleControlSmaller.disabled = false;
  }
};

const checksScaleValueBigger = () => {
  if (scaleValue === 100){
    scaleControlBigger.disabled = true;
  }else{
    scaleControlBigger.disabled = false;
  }
};

const changeScaleSmaller = () => {
  if(scaleValue > 25){
    checksScaleValueSmaller();
    scaleValue -= ZOOM_STEP;
    scaleControlValue.value = `${scaleValue}%`;
    assignsScaleImage (scaleValue);
  }
};

const changeScaleBigger = () => {
  if(scaleValue < 100){
    checksScaleValueBigger();
    scaleValue += ZOOM_STEP;
    scaleControlValue.value = `${scaleValue}%`;
    assignsScaleImage (scaleValue);
  }
};

const imageScaling = () => {
  defaultScale();
  scaleControlSmaller.addEventListener('click', changeScaleSmaller);
  scaleControlBigger.addEventListener('click', changeScaleBigger);
};

export {imageScaling};
