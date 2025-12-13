import { registerFormSchema } from "@rider/schemas/auth.schema";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormWrapper from "@tests/FormWrapper";

import LocationStep from "./LocationStep";

describe("LocationStep", () => {
  function renderComponent() {
    const user = userEvent.setup();

    render(
      <FormWrapper
        schema={registerFormSchema}
        defaultValues={{
          street_address: "",
          building_number: "",
          postcode: "",
          city: "",
          state: "",
        }}
        formOptions={{ mode: "onChange" }}
      >
        <LocationStep />
      </FormWrapper>,
    );

    return {
      user,
      streetAddressInput: screen.getByLabelText(/street address/i),
      buildingNumberInput: screen.getByLabelText(/building number/i),
      postcodeInput: screen.getByLabelText(/postcode/i),
      cityInput: screen.getByLabelText(/city/i),
      stateInput: screen.getByLabelText(/state/i),
      expectErrorToBeInTheDocument: (errorMessage: RegExp) => {
        expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
      },
    };
  }

  it("should render the title and input fields", () => {
    const {
      streetAddressInput,
      buildingNumberInput,
      postcodeInput,
      cityInput,
      stateInput,
    } = renderComponent();

    expect(screen.getByText(/your location/i)).toBeInTheDocument();
    expect(streetAddressInput).toBeInTheDocument();
    expect(buildingNumberInput).toBeInTheDocument();
    expect(postcodeInput).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();
    expect(stateInput).toBeInTheDocument();
  });

  it.each([
    {
      scenario: "required",
      errorMessage: /fill out your street address/i,
    },
    {
      scenario: "longer than 50 characters",
      street_address: "a".repeat(51),
      errorMessage: /street address is too long/i,
    },
  ])(
    "should display an error if street_address is $scenario",
    async ({ street_address, errorMessage }) => {
      const { user, streetAddressInput, expectErrorToBeInTheDocument } =
        renderComponent();

      if (street_address !== undefined) {
        await user.type(streetAddressInput, street_address);
      } else {
        await user.type(streetAddressInput, "1");
        await user.clear(streetAddressInput);
      }

      expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it.each([
    {
      scenario: "required",
      errorMessage: /fill out your building number/i,
    },
    {
      scenario: "longer than 50 characters",
      building_number: "a".repeat(51),
      errorMessage: /building number is too long/i,
    },
  ])(
    "should display an error if building_number is $scenario",
    async ({ building_number, errorMessage }) => {
      const { user, buildingNumberInput, expectErrorToBeInTheDocument } =
        renderComponent();

      if (building_number !== undefined) {
        await user.type(buildingNumberInput, building_number);
      } else {
        await user.type(buildingNumberInput, "1");
        await user.clear(buildingNumberInput);
      }

      expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it.each([
    {
      scenario: "required",
      errorMessage: /fill out your postcode/i,
    },
    {
      scenario: "longer than 50 characters",
      postcode: "a".repeat(51),
      errorMessage: /postcode is too long/i,
    },
  ])(
    "should display an error if postcode is $scenario",
    async ({ postcode, errorMessage }) => {
      const { user, postcodeInput, expectErrorToBeInTheDocument } =
        renderComponent();

      if (postcode !== undefined) {
        await user.type(postcodeInput, postcode);
      } else {
        await user.type(postcodeInput, "1");
        await user.clear(postcodeInput);
      }

      expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it.each([
    {
      scenario: "required",
      errorMessage: /fill out your city/i,
    },
    {
      scenario: "longer than 50 characters",
      city: "a".repeat(51),
      errorMessage: /city is too long/i,
    },
  ])(
    "should display an error if city is $scenario",
    async ({ city, errorMessage }) => {
      const { user, cityInput, expectErrorToBeInTheDocument } =
        renderComponent();

      if (city !== undefined) {
        await user.type(cityInput, city);
      } else {
        await user.type(cityInput, "1");
        await user.clear(cityInput);
      }

      expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it.each([
    {
      scenario: "required",
      errorMessage: /fill out your state/i,
    },
    {
      scenario: "longer than 50 characters",
      state: "a".repeat(51),
      errorMessage: /state is too long/i,
    },
  ])(
    "should display an error if state is $scenario",
    async ({ state, errorMessage }) => {
      const { user, stateInput, expectErrorToBeInTheDocument } =
        renderComponent();

      if (state !== undefined) {
        await user.type(stateInput, state);
      } else {
        await user.type(stateInput, "1");
        await user.clear(stateInput);
      }

      expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it("should not display any validation errors when all fields are valid", async () => {
    const {
      user,
      streetAddressInput,
      buildingNumberInput,
      postcodeInput,
      cityInput,
      stateInput,
    } = renderComponent();

    await user.type(streetAddressInput, "Via Roma");
    await user.type(buildingNumberInput, "11");
    await user.type(postcodeInput, "00100");
    await user.type(cityInput, "Rome");
    await user.type(stateInput, "Lazio");

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
