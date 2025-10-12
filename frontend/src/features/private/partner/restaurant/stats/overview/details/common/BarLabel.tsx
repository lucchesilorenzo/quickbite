import { styled } from "@mui/material";
import { BarLabelProps, useAnimate } from "@mui/x-charts";
import { interpolateObject } from "@mui/x-charts-vendor/d3-interpolate";

const Text = styled("text")(({ theme }) => ({
  ...theme?.typography?.body2,
  fontSize: 12,
  stroke: "none",
  fill: (theme.vars || theme)?.palette?.text?.primary,
  transition: "opacity 0.2s ease-in, fill 0.2s ease-in",
  textAnchor: "middle",
  dominantBaseline: "central",
  pointerEvents: "none",
}));

export default function BarLabel({
  color,
  yOrigin,
  x,
  y,
  width,
  skipAnimation,
  ...rest
}: BarLabelProps) {
  const animatedProps = useAnimate(
    { x: x + width / 2, y: y - 15 },
    {
      initialProps: { x: x + width / 2, y: yOrigin },
      createInterpolator: interpolateObject,
      transformProps: (p) => p,
      applyProps: (element: SVGTextElement, p) => {
        element.setAttribute("x", p.x.toString());
        element.setAttribute("y", p.y.toString());
      },
      skip: skipAnimation,
    },
  );

  return <Text {...rest} fill={color} textAnchor="middle" {...animatedProps} />;
}
