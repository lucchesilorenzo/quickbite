import {
  UpdateJobPostPayload,
  UpdateJobPostResponse,
} from "@partner/types/job-posts/job-posts.api-types";
import { addJobPostForm, addJobPostFormResponse } from "./add-job-post";

export const editJobPostForm: UpdateJobPostPayload = {
  ...addJobPostForm,
  status: "open",
};

export const editJobPostFormResponse: UpdateJobPostResponse = {
  ...addJobPostFormResponse,
  message: "Job post updated successfully.",
};
