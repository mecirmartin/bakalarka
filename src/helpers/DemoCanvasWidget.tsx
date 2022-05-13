import * as React from "react";
import styled from "@emotion/styled";
import { css, Global } from "@emotion/react";

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
  /* background-image: linear-gradient(
      0deg,
      transparent 24%,
      ${p => p.color} 25%,
      ${p => p.color} 26%,
      transparent 27%,
      transparent 74%,
      ${p => p.color} 75%,
      ${p => p.color} 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      ${p => p.color} 25%,
      ${p => p.color} 26%,
      transparent 27%,
      transparent 74%,
      ${p => p.color} 75%,
      ${p => p.color} 76%,
      transparent 77%,
      transparent
    ); */
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNi8yMS8yMfpAtEsAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAACEklEQVR4nO3dsU3EQBBA0QXRBclFNGAXRR+URE4ByBUQXUIfRIBj7r6Ws96Lxtms9LUO925Zlpfx633cpsfd/Dlti8sd5RzjfvYCHJOwSDyM3e9v27bXibv82bquT9/ztm0fM3e5xFHOMYYbi4iwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLxN2yLM+777dpm1zmtJvPk3a4htNuPk/a4SrcWCSEReJh7N4evtXHF9d1/Zlv9QxjHOccY7ixiAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEF1b/l9NuPk/a4SrcWCSERcILq//IUc4xhhuLiLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi4SwSAiLhLBICIuEsEgIi8QXQTowI+WSDrcAAAAASUVORK5CYII=");
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
    >
      {props.children}
    </Container>
  </>
);
