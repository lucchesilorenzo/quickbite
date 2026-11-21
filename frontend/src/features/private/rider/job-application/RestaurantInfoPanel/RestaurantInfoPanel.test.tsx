import { screen } from "@testing-library/react";
import { jobPostResponse } from "@tests/mocks/data/private/rider/job-posts";
import { customRender } from "@tests/utils/custom-render";

import { useJobApplication } from "../../contexts/JobApplicationProvider";
import RestaurantInfoPanel from "./RestaurantInfoPanel";

import { GetRiderJobPost200 } from "@/api/models";

vi.mock("../../contexts/JobApplicationProvider", () => ({
  useJobApplication: vi.fn(),
}));

describe("RestaurantInfoPanel", () => {
  function renderComponent(
    jobPostData: GetRiderJobPost200,
    isLoadingJobPost: boolean = false,
    jobPostError: Error | null = null,
  ) {
    vi.mocked(useJobApplication).mockReturnValue({
      jobPostData,
      isLoadingJobPost,
      jobPostError,
    });

    customRender(<RestaurantInfoPanel />);
  }

  it("should render the restaurant logo", () => {
    renderComponent(jobPostResponse, false, null);

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      `${jobPostResponse.data.restaurant!.logo_url}`,
    );
  });

  it("should render the skeleton when restaurant logo is loading", () => {
    renderComponent(jobPostResponse, true, null);

    expect(
      screen.getByRole("region", {
        name: /restaurant info loading/i,
      }),
    ).toHaveAttribute("aria-busy", "true");
  });

  it("render the restaurant info details", () => {
    renderComponent(jobPostResponse, false, null);

    expect(screen.getByText(jobPostResponse.data.title)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${jobPostResponse.data.restaurant!.name} - ${jobPostResponse.data.restaurant!.city}, ${jobPostResponse.data.restaurant!.country}`,
      ),
    ).toBeInTheDocument();
  });

  it("should render the error message if fetching the job post fails", () => {
    renderComponent(jobPostResponse, false, new Error("Something went wrong."));

    expect(screen.getByRole("alert")).toHaveTextContent(
      /something went wrong/i,
    );
  });
});
