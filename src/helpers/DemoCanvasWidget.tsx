import * as React from "react";
import styled from "@emotion/styled";
import { css, Global } from "@emotion/react";
import "./DemoCanvasWidget.css";

export interface DemoCanvasWidgetProps {
  color?: string;
  background?: string;
}

const Container = styled.div<{ color: string; background: string }>`
  height: 100%;
  background-color: ${p => p.background};
  background-size: 50px 50px;
  display: flex;
  > * {
    height: 100%;
    min-height: 100%;
    width: 100%;
  }
`;

const Expand = css`
  html,
  body,
  #root {
    height: 100%;
  }
`;

export const DemoCanvasWidget: React.FC<DemoCanvasWidgetProps> = props => (
  <>
    <Global styles={Expand} />
    <Container
      background={props.background || "#fff"}
      color={props.color || "rgb(220, 220, 220, 0.8)"}
      id="demoContainer"
    >
      {props.children}
    </Container>
  </>
);
