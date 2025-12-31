import { createContext, useContext } from "react";

import { useParams } from "react-router-dom";

import { useGetJobPost } from "../hooks/job-posts/useGetJobPost";
import { GetJobPostResponse } from "../types/job-posts/job-post.api.types";

type JobPostApplicationProviderProps = {
  children: React.ReactNode;
};

type JobPostApplicationContext = {
  jobPostData?: GetJobPostResponse;
  isLoadingJobPost: boolean;
  jobPostError: Error | null;
};

const JobPostApplicationContext =
  createContext<JobPostApplicationContext | null>(null);

export default function JobPostApplicationProvider({
  children,
}: JobPostApplicationProviderProps) {
  const { jobPostId } = useParams();

  const {
    data: jobPostData,
    isLoading: isLoadingJobPost,
    error: jobPostError,
  } = useGetJobPost({ jobPostId: jobPostId! });

  return (
    <JobPostApplicationContext.Provider
      value={{ jobPostData, isLoadingJobPost, jobPostError }}
    >
      {children}
    </JobPostApplicationContext.Provider>
  );
}

export function useJobPostApplication() {
  const context = useContext(JobPostApplicationContext);

  if (!context) {
    throw new Error(
      "useJobPostApplication must be used within a JobPostApplicationProvider.",
    );
  }

  return context;
}
