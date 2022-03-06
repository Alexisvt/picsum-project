import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { picsumAPI } from '../app/services/picsumAPI';
import { PicsumPhoto } from '../app/services/types';
import { RootState } from '../app/store';
import { generatePicsumPhoto, generatePicsumPhotos } from '../utils';
import { fetchImages, getImageFromS3, uploadFile } from './aws';

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
      .addCase(fetchImagesFromS3.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImagesFromS3.fulfilled, (state, action) => {
        const generatedPics = generatePicsumPhotos(action.payload);

        // add the new list of persons to the state
        state.list = [...state.list, ...generatedPics];
        state.status = 'idle';
      });

    builder
      .addCase(uploadNewPic.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadNewPic.fulfilled, (state, { payload }) => {
        const newGeneratedPic = generatePicsumPhoto(payload);

        // add the new list of persons to the state
        state.list.push(newGeneratedPic);
        state.status = 'idle';
      });

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

// Thunks
export const fetchImagesFromS3 = createAsyncThunk(
  `${PHOTO_NAMESPACE}/fetchImagesFromS3`,
  async () => {
    return await fetchImages();
  }
);

export const uploadNewPic = createAsyncThunk(
  `${PHOTO_NAMESPACE}/uploadNewPic`,
  async (file: File) => {
    // upload the image to AWS S3
    const result = await uploadFile(file);

    // then we fetch all the images from AWS S3
    return await getImageFromS3(result.key);
  }
);

// exporting actions
export const { addPhoto, setSelected } = photoSlice.actions;

// exporting selectors
export const selectPhotoList = (state: RootState) => state.photo.list;
export const selectPhotoStatus = (state: RootState) => state.photo.status;
export const selectSelectedPhoto = (state: RootState) => state.photo.selected;

export default photoSlice.reducer;
