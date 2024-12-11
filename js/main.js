import {showMiniatures} from './adding-posts.js';
import {uploadPhoto} from './image-upload-module.js';
import {sortPictures, showFiltersContainer} from './filter-gallery.js';
import { getDataError } from './post-message.js';
import { getData } from './submitting-form.js';
import './adding-posts.js';


getData().then((picture) => {
  showMiniatures(picture);
  uploadPhoto();
  showFiltersContainer();
  sortPictures(picture);
})
  .catch(
    () => {
      getDataError();
    }
  );
