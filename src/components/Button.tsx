import styled from 'styled-components';

const Button = styled.button`
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

export default Button;
