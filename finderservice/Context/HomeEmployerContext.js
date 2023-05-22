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
        
        let res = await axios.get('/api/workers')
        console.log(res.data);
        setWorkersData([...res.data])
        setSortedWorkers([...res.data])

    };

    // const sortWorkers = (ascending = true) => {
    //     let sortedArr;
      
    //     if (ascending) {
    //       sortedArr = [...workersData].sort((a, b) => a.name.localeCompare(b.name));
    //     } else {
    //       sortedArr = [...workersData].sort((a, b) => b.name.localeCompare(a.name));
    //     }
      
    //     setSortedWorkers(sortedArr);
    //   };
      

    // const handleSortChange = (e) => {
    //     const value = e.target.value;
    //     let sortedArr = [...workersData];

    //     if(value === 'az') {
    //         sortedArr = [...workersData].sort((a, b) => a.name.localeCompare(b.name));
    //     }else if (value === 'za') {
    //         sortedArr = [...workersData].sort((a, b) => b.name.localeCompare(a.name))
    //     }
    //     setSortedWorkers(sortedArr)
    // }
    
    const sortWorkers = (value) => {
        let sortedArr;
        console.log(value);
            if(value === 'Ascendente'){
            sortedArr = [...workersData].sort((a, b) =>
            a.name.localeCompare(b.name))
        }else if(value === 'Descendente'){
            sortedArr = [...workersData].sort((a, b) =>
            b.name.localeCompare(a.name))
        }
            setSortedWorkers(sortedArr)
    };


    return <HomeEmployerContext.Provider value={{ workersData, getAllWorkers, sortedWorkers, sortWorkers }}>{children}</HomeEmployerContext.Provider>;
}

