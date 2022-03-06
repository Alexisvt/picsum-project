import { PicsumPhotoList } from '../utils/test_elements';
import { render, screen } from '../utils/test_helpers';
import SelectedPhoto from './SelectedPhoto';

test('should show no photo selected', () => {
  render(<SelectedPhoto />);

  expect(screen.getByText('No photo selected')).toBeInTheDocument();
});

test('should display photo info', () => {
  render(<SelectedPhoto />, {
    preloadedState: {
      photo: {
        status: 'idle',
        list: [PicsumPhotoList],
        selected: PicsumPhotoList[0],
      },
    },
  });

  const imageElement = screen.getByRole('img') as HTMLImageElement;

  expect(screen.getByText(PicsumPhotoList[0].author)).toBeInTheDocument();
  expect(imageElement.src).toBe(PicsumPhotoList[0].download_url);
});

test('should clear selected photo', () => {
  // const dispatch = jest.fn();
  render(<SelectedPhoto />, {
    preloadedState: {
      photo: {
        status: 'idle',
        list: [PicsumPhotoList],
        selected: PicsumPhotoList[0],
      },
    },
  });

  const buttonElement = screen.getByRole('button');
  buttonElement.click();

  expect(screen.getByText('No photo selected')).toBeInTheDocument();
});
