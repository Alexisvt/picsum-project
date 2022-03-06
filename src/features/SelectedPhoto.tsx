import styled from 'styled-components';

import { useAppSelector } from '../app/hooks';
import ImageContainer from '../components/ImageContainer';
import { selectSelectedPhoto } from './PhotoSlice';

const SelectedPhoto = () => {
  const photo = useAppSelector(selectSelectedPhoto);

  return (
    <Container>
      {photo ? <ImageContainer src={photo.download_url} /> : <div>No photo selected</div>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SelectedPhoto;
