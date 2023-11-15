import { screen } from "@testing-library/react";

import Navigation from "../navigation.component";
import { renderWithProviders } from "../../../utils/test/test.utils";

describe("Navigation tests", () => {
  test("It should render a Sign in link and not a Sign Out link if there is no currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadState: {
        user: {
          currentUser: null,
        },
      },
    });

    const signOutLinkElement = screen.queryByText(/sign out/i);
    expect(signOutLinkElement).toBeNull();

    const signInLinkElement = screen.getByText(/sign in/i);
    expect(signInLinkElement).toBeInTheDocument();
  });

  test("It should render Sign Out and not Sign in if there is currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadState: {
        user: {
          currentUser: {},
        },
      },
    });

    const signInLinkElement = screen.queryByText(/sign in/i);
    expect(signInLinkElement).toBeNull();

    const signOutLinkElement = screen.getByText(/sign out/i);
    expect(signOutLinkElement).toBeInTheDocument();
  });

  test("it should not render a cart dropdown if isCartOpen is false", () => {
    renderWithProviders(<Navigation />, {
      preloadState: {
        cart: {
          isCartOpen: false,
          cartItems: [],
        },
      },
    });

    const dropdownTextElement = screen.queryByText(/your cart is empty/i);
    expect(dropdownTextElement).toBeNull();
  });

  test("it should render a cart dropdown if isCartOpen is true", () => {
    renderWithProviders(<Navigation />, {
      preloadState: {
        cart: {
          isCartOpen: true,
          cartItems: [],
        },
      },
    });

    const dropdownTextElement = screen.getByText(/your cart is empty/i);
    expect(dropdownTextElement).toBeInTheDocument();
  });
});
