import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const JobrequestsContext = createContext();

export function UserProvider({ children }) {
  const [jobRequests, setJobRequest] = useState([]);

  const addJobRequests = async (id) => {
    try {
      const response = await axios.post('/api/jobrequests', { id });
      const newJobRequest = response.data;
      setJobRequest([...jobRequests, newJobRequest]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostulationsContext.Provider value={{ jobRequests, addJobRequests }}>
      {children}
    </PostulationsContext.Provider>
  );
}

export function useRequests() {
  return useContext(JobrequestsContext);
}
