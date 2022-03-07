import styled from 'styled-components';

const Button = styled.button`
  width: 6.25rem;
  border: none;
  color: #fff;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background: #0f2f97;
  &:hover {
    background: #5074eb;
    color: #fff;
  }
`;

export default Button;
