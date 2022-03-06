import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../app/hooks';
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
          <StyledButton type="button" onClick={handleClick}>
            Clear
          </StyledButton>
        </SelectPhotoContainer>
      ) : (
        <div>No photo selected</div>
      )}
    </Container>
  );
};

const StyledButton = styled.button`
  /* background: none; */
  width: 6.25rem;
  border: none;
  color: #000;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: #5074eb;
    color: white;
  }
`;

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
