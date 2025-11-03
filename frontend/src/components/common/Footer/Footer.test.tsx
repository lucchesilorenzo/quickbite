import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Footer from "./Footer";

import { footerLinks } from "@/lib/constants/navigation";

describe("Footer", () => {
  function renderComponent() {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
  }

  it("renders footer links correctly", () => {
    renderComponent();

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(footerLinks.length);

    footerLinks.forEach((link, index) => {
      expect(links[index]).toHaveAttribute("href", link.href);
      expect(links[index]).toHaveTextContent(link.label);
    });
  });

  it("renders current year and brand name", () => {
    renderComponent();

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`${currentYear} QuickBite`, "i")),
    ).toBeInTheDocument();
  });
});
