import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { baseAPIConfig } from '../app/services/baseAPIConfig';
import store from '../app/store';
import { PicsumPhotoList } from '../utils/test_elements';
import { render, screen } from '../utils/test_helpers';
import PhotoContainer from './PhotoContainer';

export const handlers = [
  rest.get(`https://picsum.photos/v2/list`, (req, res, ctx) => {
    return res(ctx.json(PicsumPhotoList), ctx.delay(150));
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

test('fetches and receives photos from Picsum', async () => {
  render(<PhotoContainer />);

  const imageElements = (await screen.findAllByRole('img')) as HTMLImageElement[];

  expect(imageElements.length).toBe(2);
  expect(imageElements[0].src).toBe(PicsumPhotoList[0].download_url);
  expect(imageElements[1].src).toBe(PicsumPhotoList[1].download_url);
});
