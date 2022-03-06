import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { picsumAPI } from '../app/services/picsumAPI';
import { PicsumPhoto } from '../app/services/types';
import { RootState } from '../app/store';

export interface PhotoState {
  list: PicsumPhoto[];
  selected: PicsumPhoto | null;
  status: 'idle' | 'loading';
}

const initialState: PhotoState = { list: [], selected: null, status: 'idle' };

export const PHOTO_NAMESPACE = 'photo';

const photoSlice = createSlice({
  name: PHOTO_NAMESPACE,
  initialState,
  reducers: {
    addPhoto(state, action: PayloadAction<PicsumPhoto>) {
      state.list.push(action.payload);
    },
    setSelected(state, action: PayloadAction<PicsumPhoto | null>) {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(picsumAPI.endpoints.getPicsumPhotoLis.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(picsumAPI.endpoints.getPicsumPhotoLis.matchFulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'idle';
      });
  },
});

// exporting actions
export const { addPhoto, setSelected } = photoSlice.actions;

// exporting selectors
export const selectPhotoList = (state: RootState) => state.photo.list;
export const selectPhotoStatus = (state: RootState) => state.photo.status;
export const selectSelectedPhoto = (state: RootState) => state.photo.selected;

export default photoSlice.reducer;
