import { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const JobpostulationsContext = createContext();

export function usePostulations() {
  return useContext(JobpostulationsContext);
}

export function JobpostulationsProvider({ children }) {
  const [jobPostulations, setJobPostulations] = useState([]);

  const addJobPostulation = async (id) => {
    try {
      const response = await axios.post('/api/jobpostulations', { id });
      const newJobPostulation = response.data;
      setJobPostulations([...jobPostulations, newJobPostulation]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <JobpostulationsContext.Provider value={{ jobPostulations, addJobPostulation }}>
      {children}
    </JobpostulationsContext.Provider>
  );
}
