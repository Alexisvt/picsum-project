import { ChangeEvent, FC, useRef } from 'react';
import styled from 'styled-components';

import Button from './Button';
import { FileUploaderProps } from './types';

const FileUploader: FC<FileUploaderProps> = ({
  onFileChange,
  uploadButtonLabel = 'Upload a new image',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    onFileChange(file);
  };
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <StyledInput ref={fileInputRef} type="file" name="file-uploader" onChange={handleOnChange} />
      <StyledButton type="button" onClick={handleClick}>
        {uploadButtonLabel}
      </StyledButton>
    </div>
  );
};

const StyledButton = styled(Button)`
  width: 12.5rem;
  font-size: 1rem;
`;

const StyledInput = styled.input.attrs({
  type: 'file',
})`
  display: none;
`;

export default FileUploader;
