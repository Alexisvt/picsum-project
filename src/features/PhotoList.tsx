import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { PicsumPhoto } from '../app/services/types';
import FileUploader from '../components/FileUploader';
import ImageContainer from '../components/ImageContainer';
import { selectPhotoList, setSelected, uploadNewPic } from './PhotoSlice';

const PhotoList = () => {
  const dispatch = useAppDispatch();
  const photoList = useAppSelector(selectPhotoList);

  const handleClick = (photo: PicsumPhoto) => {
    dispatch(setSelected(photo));
  };

  const handleChange = (file: File) => {
    dispatch(uploadNewPic(file));
  };

  const photos = photoList.map((photo) => (
    <ImageContainer
      src={photo.download_url}
      key={photo.id}
      onClick={() => {
        handleClick(photo);
      }}
    />
  ));

  return (
    <Container>
      <FileUploader onFileChange={handleChange} />
      {photos}
    </Container>
  );
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
