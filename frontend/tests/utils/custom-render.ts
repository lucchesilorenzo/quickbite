import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import TestProviders from "@tests/TestProviders";

export function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, { wrapper: TestProviders, ...options });
}
