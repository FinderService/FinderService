'use client'

import { useContext, createContext, useState } from "react"
import axios from "axios"

const HomeEmployerContext = createContext();

export const useWorker = () => {
    const context = useContext(HomeEmployerContext);
    if(!context) throw new Error('useWorker must be used inner a provider.')
    return context;
};

export const HomeEmployerProvider = ({ children }) => {
    const [workersData, setWorkersData] = useState([]);
    const [sortedWorkers, setSortedWorkers] = useState([]);
    
    const getAllWorkers = async () => {
        return;
        let res = await axios.get('/api/workers')
        setWorkersData([...res.data])
    };
    
    const sortWorkers = (sort) => {

        
            console.log(sort);
            return;
            workers.sort((a, b) =>
          a.name.localeCompare(b.name))
        
      
        
    };


    return <HomeEmployerContext.Provider value={{ workersData, getAllWorkers, sortWorkers }}>{children}</HomeEmployerContext.Provider>;
}

