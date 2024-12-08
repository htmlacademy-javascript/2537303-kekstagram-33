const ZOOM_STEP = 25;
const INITIAL_SCALE_VALUE = 100;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const scalableImage = document.querySelector('.img-upload__preview img');

let scaleValue;

const assignsScaleImage = (value) => {
  scalableImage.style.transform = `scale(${value / 100})`;
};

const setsDefaultScale = () => {
  scaleValue = INITIAL_SCALE_VALUE;
  assignsScaleImage (scaleValue);
};

const checksScaleValueSmaller = () => {
  if (scaleValue === MIN_SCALE){
    scaleControlSmaller.disabled = true;
  }else{
    scaleControlSmaller.disabled = false;
  }
};

const checksScaleValueBigger = () => {
  if (scaleValue === MAX_SCALE){
    scaleControlBigger.disabled = true;
  }else{
    scaleControlBigger.disabled = false;
  }
};

const onChangeScaleSmaller = () => {
  if(scaleValue > MIN_SCALE){
    checksScaleValueSmaller();
    scaleValue -= ZOOM_STEP;
    scaleControlValue.value = `${scaleValue}%`;
    assignsScaleImage (scaleValue);
  }
};

const onChangeScaleBigger = () => {
  if(scaleValue < MAX_SCALE){
    checksScaleValueBigger();
    scaleValue += ZOOM_STEP;
    scaleControlValue.value = `${scaleValue}%`;
    assignsScaleImage (scaleValue);
  }
};

const imageScaling = () => {
  setsDefaultScale();
  scaleControlSmaller.addEventListener('click', onChangeScaleSmaller);
  scaleControlBigger.addEventListener('click', onChangeScaleBigger);
};

export {imageScaling};
