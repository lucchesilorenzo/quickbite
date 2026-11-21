import { render, screen } from "@testing-library/react";
import { mockAuthState } from "@tests/utils/mock-auth-state";
import { MemoryRouter } from "react-router-dom";

import Footer from "./Footer";

import { footerLinks } from "@/lib/data/navigation.data";

describe("Footer", () => {
  function renderComponent() {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
  }

  it("renders footer links correctly when user is not logged in", () => {
    mockAuthState(null);
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

  it("should not render the 'Sign up a restaurant' link when user has customer role", () => {
    mockAuthState("customer");
    renderComponent();

    expect(
      screen.queryByRole("link", { name: /sign up a restaurant/i }),
    ).not.toBeInTheDocument();
  });
});
