import { screen } from "@testing-library/react";
import { jobPostResponse } from "@tests/mocks/data/private/rider/job-posts";
import { customRender } from "@tests/utils/custom-render";

import { useJobApplication } from "../../contexts/JobApplicationProvider";
import { GetJobPostResponse } from "../../types/job-posts/job-post.api.types";
import RestaurantInfoPanel from "./RestaurantInfoPanel";

import env from "@/lib/env";

vi.mock("../../contexts/JobApplicationProvider", () => ({
  useJobApplication: vi.fn(),
}));

describe("RestaurantInfoPanel", () => {
  function renderComponent(
    jobPostData: GetJobPostResponse,
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
      `${env.VITE_BASE_URL}${jobPostResponse.job_post.restaurant.logo}`,
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

    expect(
      screen.getByText(jobPostResponse.job_post.title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${jobPostResponse.job_post.restaurant.name} - ${jobPostResponse.job_post.restaurant.city}, ${jobPostResponse.job_post.restaurant.country}`,
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
