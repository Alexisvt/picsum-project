import styled from 'styled-components';

import { ImageContainerProps } from './types';

const ImageContainer = styled.div<ImageContainerProps>`
  max-width: 18.75rem;
  max-height: 12.5rem;
  background-image: url(${(props) => props.imageURL});
  background-size: cover;
`;

export default ImageContainer;
