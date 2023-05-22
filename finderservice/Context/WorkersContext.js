"use client"

import { useContext, createContext, useState } from "react";
import axios from "axios";

const WorkersContext = createContext();

export const useWorkers = () => {
    const context = useContext(WorkersContext);
    if(!context) throw new Error('useWorkers must be used inner a provider.');
    return context;
}

export const WorkersProvider = ({ children }) => {
    const [workersData, setWorkersData] = useState([]);
    const [JobReqs, setJobReqs] = useState([]);
    const [workDetail, setWorkDetail] = useState([]);

    const getAllEmployers =  async () => {  
        let res = await axios.get('/api/employers')
        setWorkersData([...res.data])
    }

    const getJobReqs = async (id) => {
        if(id){
            let res = await axios.get(`/api/jobrequests/${id}`)
            setWorkDetail(res.data)
        }else{  
            let res = await axios.get('/api/jobrequests')
            setJobReqs([...res.data])
        }
    }
    
  return <WorkersContext.Provider 
    value={{ workersData, getAllEmployers,
        JobReqs, getJobReqs,
        workDetail , setWorkDetail
    }}>{children}</WorkersContext.Provider>;
};