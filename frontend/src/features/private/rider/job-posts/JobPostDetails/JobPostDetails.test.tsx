import { employmentTypes } from "@private/shared/lib/constants/job-posts";
import { vehicles } from "@private/shared/lib/constants/vehicles";
import { screen, within } from "@testing-library/react";
import { jobPostsWithRestaurant } from "@tests/mocks/data/private/rider/job-posts";
import { customRender } from "@tests/utils/custom-render";

import { JobPostWithRestaurant } from "../../types/job-posts/job-post.types";
import JobPostDetails from "./JobPostDetails";

vi.mock("../JobPostDescription", () => ({
  default: () => <div data-testid="job-post-description" />,
}));

describe("JobPostDetails", () => {
  function renderComponent(jobPost: JobPostWithRestaurant) {
    customRender(<JobPostDetails jobPost={jobPost} />);

    return {
      jobPostDetailsHeader: screen.getByTestId("job-post-details-header"),
      jobPostDetails: screen.getByTestId("job-post-details"),
    };
  }

  describe("Header", () => {
    it("should render the job post details header correctly", () => {
      const { jobPostDetailsHeader } = renderComponent(
        jobPostsWithRestaurant[0],
      );

      expect(
        within(jobPostDetailsHeader).getByText(jobPostsWithRestaurant[0].title),
      ).toBeInTheDocument();
      expect(
        within(jobPostDetailsHeader).getByText(
          jobPostsWithRestaurant[0].restaurant.name,
        ),
      ).toBeInTheDocument();
      expect(
        within(jobPostDetailsHeader).getByText(
          `${jobPostsWithRestaurant[0].restaurant.postcode} - ${jobPostsWithRestaurant[0].restaurant.city}`,
        ),
      ).toBeInTheDocument();
      expect(
        within(jobPostDetailsHeader).queryByText(/\/ year/i),
      ).not.toBeInTheDocument();
    });

    it("should render the salary if present", () => {
      const { jobPostDetails } = renderComponent({
        ...jobPostsWithRestaurant[0],
        salary: 20000,
      });

      expect(
        within(jobPostDetails).queryByText(/\/ year/i),
      ).toBeInTheDocument();
    });
  });

  describe("Content", () => {
    it("should render the job post details correctly", () => {
      const { jobPostDetails } = renderComponent(jobPostsWithRestaurant[0]);

      const employmentType = employmentTypes.find(
        (option) => option.value === jobPostsWithRestaurant[0].employment_type,
      )?.label;

      const vehicleType = vehicles.find(
        (option) => option.value === jobPostsWithRestaurant[0].vehicle_type,
      )?.label;

      expect(
        within(jobPostDetails).queryByText(/\/ year/i),
      ).not.toBeInTheDocument();
      expect(
        within(jobPostDetails).getByText(employmentType!),
      ).toBeInTheDocument();
      expect(
        within(jobPostDetails).getByText(vehicleType!),
      ).toBeInTheDocument();
      expect(
        within(jobPostDetails).getByTestId("job-post-description"),
      ).toBeInTheDocument();
    });

    it("should render the salary if present", () => {
      const { jobPostDetails } = renderComponent({
        ...jobPostsWithRestaurant[0],
        salary: 20000,
      });

      expect(
        within(jobPostDetails).queryByText(/\/ year/i),
      ).toBeInTheDocument();
    });
  });
});
