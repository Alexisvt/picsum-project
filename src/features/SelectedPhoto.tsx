import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import Button from '../components/Button';
import ImageContainer from '../components/ImageContainer';
import { selectSelectedPhoto, setSelected } from './PhotoSlice';

const SelectedPhoto = () => {
  const photo = useAppSelector(selectSelectedPhoto);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setSelected(null));
  };

  return (
    <Container>
      {photo ? (
        <SelectPhotoContainer>
          <StyledH1>{photo.author}</StyledH1>
          <ImageContainer src={photo.download_url} />
          <Button type="button" onClick={handleClick}>
            Clear
          </Button>
        </SelectPhotoContainer>
      ) : (
        <div>No photo selected</div>
      )}
    </Container>
  );
};

const StyledH1 = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`;

const SelectPhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.313rem;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SelectedPhoto;
