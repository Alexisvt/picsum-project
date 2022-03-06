import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { render as rtlRender } from '@testing-library/react';
import { FC, ReactElement } from 'react';
import { Provider } from 'react-redux';

import { baseAPIConfig } from '../app/services/baseAPIConfig';
import photoReducer, { PHOTO_NAMESPACE } from '../features/PhotoSlice';

function render(
  ui: ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        [baseAPIConfig.reducerPath]: baseAPIConfig.reducer,
        [PHOTO_NAMESPACE]: photoReducer,
      },
      preloadedState,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseAPIConfig.middleware),
    }),
    ...renderOptions
  } = {} as any
) {
  setupListeners(store.dispatch);
  const Wrapper: FC = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  store.dispatch(baseAPIConfig.util.resetApiState());
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
