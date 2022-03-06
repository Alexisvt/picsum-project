import { faker } from '@faker-js/faker';

import { PicsumPhoto } from '../app/services/types';

export function generatePicsumPhotos(imageFromAWS: string[]) {
  return imageFromAWS.map(generatePicsumPhoto);
}

export function generatePicsumPhoto(imageSrc: string): PicsumPhoto {
  return {
    id: faker.datatype.uuid(),
    author: faker.name.firstName(),
    download_url: imageSrc,
  };
}
