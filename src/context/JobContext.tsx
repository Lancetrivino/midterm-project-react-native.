import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Job, Application } from '../types';
import uuid from 'react-native-uuid';

interface JobContextType {
  jobs: Job[];
  savedJobs: Job[];
  applications: Application[];
  setJobs: (jobs: Job[]) => void;
  saveJob: (job: Job) => void;
  removeSavedJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
  submitApplication: (application: Omit<Application, 'appliedDate'>) => void;
  removeApplication: (jobId: string) => void;
  hasApplied: (jobId: string) => boolean;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

interface JobProviderProps {
  children: ReactNode;
}

export const JobProvider: React.FC<JobProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  const saveJob = (job: Job) => {
    if (!isJobSaved(job.id)) {
      setSavedJobs((prev) => [...prev, job]);
    }
  };

  const removeSavedJob = (jobId: string) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  const isJobSaved = (jobId: string): boolean => {
    return savedJobs.some((job) => job.id === jobId);
  };

  const submitApplication = (application: Omit<Application, 'appliedDate'>) => {
    const newApplication: Application = {
      ...application,
      appliedDate: new Date(),
    };
    setApplications((prev) => [...prev, newApplication]);
  };

  const hasApplied = (jobId: string): boolean => {
    return applications.some((app) => app.jobId === jobId);
  };

  const removeApplication = (jobId: string) => {
    setApplications((prev) => prev.filter((app) => app.jobId !== jobId));
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        savedJobs,
        applications,
        setJobs,
        saveJob,
        removeSavedJob,
        isJobSaved,
        submitApplication,
        removeApplication,
        hasApplied,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = (): JobContextType => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within JobProvider');
  }
  return context;
};