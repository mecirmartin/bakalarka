import styled from "@emotion/styled"

interface CirclePortProps {
  top?: string
  bottom?: string
  right?: string
  left?: string
}

export const CirclePort = styled.div<CirclePortProps>`
  position: absolute;
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
