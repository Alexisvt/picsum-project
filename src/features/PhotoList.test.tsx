import { PicsumPhotoList } from '../utils/test_elements';
import { render, screen } from '../utils/test_helpers';
import PhotoList from './PhotoList';

test('should render two photos', () => {
  render(<PhotoList />, {
    preloadedState: {
      photo: {
        list: PicsumPhotoList,
        status: 'idle',
        selected: null,
      },
    },
  });

  const imageElements = screen.getAllByRole('img') as HTMLImageElement[];

  expect(imageElements.length).toBe(2);
  expect(imageElements[0].src).toBe(PicsumPhotoList[0].download_url);
  expect(imageElements[1].src).toBe(PicsumPhotoList[1].download_url);
});
