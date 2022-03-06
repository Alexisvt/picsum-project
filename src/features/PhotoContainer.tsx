import styled from 'styled-components';

import { useAppSelector } from '../app/hooks';
import { useGetPicsumPhotoLisQuery } from '../app/services/picsumAPI';
import PhotoList from './PhotoList';
import { selectPhotoStatus } from './PhotoSlice';
import SelectedPhoto from './SelectedPhoto';

const PhotoContainer = () => {
  const status = useAppSelector(selectPhotoStatus);

  // fetch picsum photos
  useGetPicsumPhotoLisQuery({
    limit: 10,
  });

  return (
    <Container>
      {status === 'loading' ? (
        <div>Loading...</div>
      ) : (
        <>
          <PhotoList />
          <SelectedPhoto />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));
`;

export default PhotoContainer;
