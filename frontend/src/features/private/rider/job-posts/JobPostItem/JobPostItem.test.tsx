import { screen } from "@testing-library/react";
import { jobPostsWithRestaurant } from "@tests/mocks/data/private/rider/job-posts";
import { customRender } from "@tests/utils/custom-render";

import { JobPostWithRestaurant } from "../../types/job-posts/job-post.types";
import JobPostItem from "./JobPostItem";

import { employmentTypes } from "@/features/private/shared/lib/constants/job-posts";

describe("JobPostItem", () => {
  function renderComponent(jobPost: JobPostWithRestaurant) {
    customRender(<JobPostItem jobPost={jobPost} />);
  }

  it("should render the main structure", () => {
    renderComponent(jobPostsWithRestaurant[0]);

    const employmentType = employmentTypes.find(
      (option) => option.value === jobPostsWithRestaurant[0].employment_type,
    )?.label;

    expect(
      screen.getByText(jobPostsWithRestaurant[0].title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(jobPostsWithRestaurant[0].restaurant.name),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${jobPostsWithRestaurant[0].restaurant.postcode} - ${jobPostsWithRestaurant[0].restaurant.city}`,
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(/\/ year/i)).not.toBeInTheDocument();
    expect(screen.getByText(employmentType!)).toBeInTheDocument();
  });

  it("should render the salary if it exists", () => {
    renderComponent({ ...jobPostsWithRestaurant[0], salary: 20000 });

    screen.debug();
    expect(screen.getByText(/\/ year/i)).toBeInTheDocument();
  });
});
