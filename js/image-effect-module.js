const NONE = {
  NAME: 'none',
  MIN: 0,
  MAX: 100,
  STEP: 1,
  UNITS: ''
};

const CHROME = {
  NAME: 'grayscale',
  MIN: 0,
  MAX: 1,
  STEP: 0.1,
  UNITS: ''
};

const SEPIA = {
  NAME: 'sepia',
  MIN: 0,
  MAX: 1,
  STEP: 0.1,
  UNITS: ''
};

const MARVIN = {
  NAME: 'invert',
  MIN: 0,
  MAX: 100,
  STEP: 1,
  UNITS: '%'
};

const PHOBOS = {
  NAME: 'blur',
  MIN: 0,
  MAX: 3,
  STEP: 0.1,
  UNITS: 'px'
};

const HEAT = {
  NAME: 'brightness',
  MIN: 1,
  MAX: 3,
  STEP: 0.1,
  UNITS: ''
};

const effectsName = {
  none: NONE,
  chrome: CHROME,
  sepia: SEPIA,
  marvin: MARVIN,
  phobos: PHOBOS,
  heat: HEAT,
};

let currentEffect;

const effectSlider = document.querySelector('.effect-level__slider');
const effects = document.querySelectorAll('.effects__radio');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');
const uploadEffectLevel = document.querySelector('.img-upload__effect-level');

uploadEffectLevel.classList.add('hidden');

noUiSlider.create(effectSlider, {
  range: {
    min: NONE.MIN,
    max: NONE.MAX
  },
  start: 100,
  step: NONE.STEP,
  connect: 'lower',
  format: {
    to: (value) => Number(value),
    from: (value) => Number(value)
  }
});

const updateImageEffect = (value) => {
  if (!currentEffect) {
    return;
  }

  if (value !== currentEffect.MAX) {
    imagePreview.style.filter = `${currentEffect.NAME}(${value}${currentEffect.UNITS})`;
  }
};

const appliesEffectCharacteristics = () => {
  if(currentEffect.NAME !== NONE.NAME){
    imagePreview.style.filter = `${currentEffect.NAME}(${currentEffect.MAX}${currentEffect.UNITS})`;
    uploadEffectLevel.classList.remove('hidden');

    effectSlider.noUiSlider.updateOptions({
      range: {
        min: currentEffect.MIN,
        max: currentEffect.MAX
      },
      start: currentEffect.MAX,
      step: currentEffect.STEP
    });
  }else {
    imagePreview.style.filter = '';
    uploadEffectLevel.classList.add('hidden');
  }
};

const reset = () => {
  currentEffect = effectsName.none;
  appliesEffectCharacteristics();
};

effectSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectSlider.noUiSlider.get();
  updateImageEffect(effectLevelValue.value);
});

for (const effect of effects){
  effect.addEventListener('change', () => {
    currentEffect = effectsName[effect.value];
    appliesEffectCharacteristics();
  });
}

export {reset};
