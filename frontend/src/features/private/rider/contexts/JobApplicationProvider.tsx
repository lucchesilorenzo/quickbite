import { createContext, useContext } from "react";

import { useParams } from "react-router-dom";

import { useGetJobPost } from "../hooks/job-posts/useGetJobPost";

import { GetRiderJobPost200 } from "@/api/models";

type JobApplicationProviderProps = {
  children: React.ReactNode;
};

type JobApplicationContext = {
  jobPostData?: GetRiderJobPost200;
  isLoadingJobPost: boolean;
  jobPostError: Error | null;
};

const JobApplicationContext = createContext<JobApplicationContext | null>(null);

export default function JobApplicationProvider({
  children,
}: JobApplicationProviderProps) {
  const { jobPostId } = useParams();

  const {
    data: jobPostData,
    isLoading: isLoadingJobPost,
    error: jobPostError,
  } = useGetJobPost({ jobPostId: jobPostId! });

  return (
    <JobApplicationContext.Provider
      value={{ jobPostData, isLoadingJobPost, jobPostError }}
    >
      {children}
    </JobApplicationContext.Provider>
  );
}

export function useJobApplication() {
  const context = useContext(JobApplicationContext);

  if (!context) {
    throw new Error(
      "useJobApplication must be used within a JobApplicationProvider.",
    );
  }

  return context;
}
