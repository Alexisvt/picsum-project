import { useEffect } from 'react';
import styled from 'styled-components';

import { useAppDispatch } from '../app/hooks';
import { useGetPicsumPhotoLisQuery } from '../app/services/picsumAPI';
import PhotoList from './PhotoList';
import { fetchImagesFromS3 } from './PhotoSlice';
import SelectedPhoto from './SelectedPhoto';

const PhotoContainer = () => {
  const dispatch = useAppDispatch();

  // fetch picsum photos
  useGetPicsumPhotoLisQuery({
    limit: +(process.env.REACT_APP_API_RESULT_LIMIT || 10),
  });

  // fetching other images from S3
  useEffect(() => {
    dispatch(fetchImagesFromS3());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <PhotoList />
      <SelectedPhoto />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));
`;

export default PhotoContainer;
