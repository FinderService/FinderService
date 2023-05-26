import { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const JobrequestsContext = createContext();

export function useRequests() {
  return useContext(JobrequestsContext);
}

export function JobrequestsProvider({ children }) {
  const [jobRequests, setJobRequests] = useState([]);

  const addJobRequest = async (id) => {
    try {
      const response = await axios.post('/api/jobrequests', { id });
      const newJobRequest = response.data;
      setJobRequests([...jobRequests, newJobRequest]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <JobrequestsContext.Provider value={{ jobRequests, addJobRequest }}>
      {children}
    </JobrequestsContext.Provider>
  );
}
