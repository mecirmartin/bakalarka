import styled from "@emotion/styled"

interface CirclePortProps {
  top?: string
  bottom?: string
  right?: string
  left?: string
}

export const RightCirclePort = styled.div<CirclePortProps>`
  position: absolute;
  right: ${props => props.right};
  top: ${props => props.top};
  width: 12px;
  height: 12px;
  border-radius: 4px;
  background: #333;
  cursor: pointer;
  &:hover {
    background: darkgray;
  }
`

export const LeftCirclePort = styled.div<CirclePortProps>`
  position: absolute;
  left: ${props => props.left};
  top: ${props => props.top};
  width: 12px;
  height: 12px;
  border-radius: 4px;
  background: #333;
  cursor: pointer;
  &:hover {
    background: darkgray;
  }
`
