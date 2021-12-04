import styled from "@emotion/styled"

interface CirclePortProps {
  top?: string
  right?: string
}

export const CirclePort = styled.div<CirclePortProps>`
  right: ${props => props.right};
  top: ${props => props.top};
  width: 1rem;
  height: 1rem;
  border-radius: 4px;
  background: #333;
  cursor: pointer;
  z-index: 2;
  &:hover {
    background: darkgray;
  }
`
