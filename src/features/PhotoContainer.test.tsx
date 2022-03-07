import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { baseAPIConfig } from '../app/services/baseAPIConfig';
import store from '../app/store';
import { PicsumPhotoList } from '../utils/test_elements';
import { render, screen, waitFor } from '../utils/test_helpers';
import PhotoContainer from './PhotoContainer';

jest.mock('./aws', () => ({
  __esModule: true,
  ...jest.requireActual('./aws'),
  fetchImages: () => Promise.resolve(['http://placeimg.com/640/480/nature']),
}));

export const handlers = [
  rest.get(`https://picsum.photos/v2/list`, (req, res, ctx) => {
    return res(ctx.json(PicsumPhotoList), ctx.delay(0));
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

afterEach(() => {
  store.dispatch(baseAPIConfig.util.resetApiState());
});

test('fetches and receives photos from Picsum and AWS Storage', async () => {
  render(<PhotoContainer />, {
    preloadedState: {
      photo: {
        list: [],
        status: 'idle',
        selected: null,
      },
    },
  });

  await waitFor(() => expect(screen.getAllByRole('img').length).toBe(3));
});
