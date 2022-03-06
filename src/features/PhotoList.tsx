import styled from 'styled-components';

import { useAppSelector } from '../app/hooks';
import ImageContainer from '../components/ImageContainer';
import { selectPhotoList } from './PhotoSlice';

const PhotoList = () => {
  const photoList = useAppSelector(selectPhotoList);

  const photos = photoList.map((photo) => (
    <ImageContainer src={photo.download_url} key={photo.id} />
  ));

  return <Container>{photos}</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 0.625rem;
  align-items: center;
  padding: 10px 0;
  height: 100vh;
`;

export default PhotoList;
