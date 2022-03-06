import { baseAPIConfig } from './baseAPIConfig';
import { GetPicsumPhotoListArgs, PicsumPhoto } from './types';

export const picsumAPI = baseAPIConfig.injectEndpoints({
  endpoints: (builder) => ({
    getPicsumPhotoLis: builder.query<PicsumPhoto[], GetPicsumPhotoListArgs>({
      query: (args) => `v2/list?limit=${args.limit}`,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetPicsumPhotoLisQuery } = picsumAPI;
