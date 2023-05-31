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
    
    const [filtersInfo, setFiltersInfo] = useState([]);

    const [myJobs , setMyJobs] = useState([])
    const [myJobById, setMyJobById] = useState({})
    const [dataPostulation, setDataPostulation]= useState({})
    const [ infoReq ,setInfoReq ] = useState([])

    const getAllWorkers = async () => {
        let res = await axios.get('/api/workers')
        setWorkersData([...res.data])
        setSortedWorkers([...res.data])

    };
    
    
    const addFilters = (value) =>{
        const exist = filtersInfo.filter((filter) => filter === value )
        if(exist.length === 0){
            const filteredWorkers = sortedWorkers.filter((worker) => {
                return worker.type.map((data)=> data.name ).includes(value)
            });           
            setSortedWorkers(filteredWorkers);
            setFiltersInfo([...filtersInfo, value]);
        }       
    }

    const delFilterWorkers = (event) =>{
        const newInfoFilters = filtersInfo.filter((data)=> data !== event.target.value);    
        if(newInfoFilters.length){
            const newDataWorkers = workersData.filter((work) => {
                return newInfoFilters.some(filter => work.type.map(data => data.name).includes(filter));
            });
            setSortedWorkers(newDataWorkers);
            setFiltersInfo(newInfoFilters);
        }else{
            setSortedWorkers(workersData);
            setFiltersInfo([]);
        }
    }

    const sortWorkers = (value) => {
        const exist = filtersInfo.filter((filter) => filter === value )
        if(exist.length === 0 && (value !== "Ordenar" && value !== "Cercano")){
            if(value === 'Ascendente'){
                const sortedArr = sortedWorkers.sort((a, b) => a.name.localeCompare(b.name));
                setSortedWorkers([...sortedArr]);
            }else if(value === 'Descendente'){
                const sortedArr = sortedWorkers.sort((a, b) => b.name.localeCompare(a.name));
                setSortedWorkers([...sortedArr]);
            }else if(value === 'Rating'){
                const sortedArr = sortedWorkers.sort((a, b) => b.rating.localeCompare(a.rating));
                setSortedWorkers([...sortedArr]);
            }
        }
    };

    const getMyJobs = async (id) =>{
        const {data} = await axios.get(`/api/jobrequests?idEmployer=${id}`);
        setMyJobs(data);
    } 

    const getMyJobByID = async (id) =>{
        const {data} = await axios.get(`/api/jobrequests/${id}`)
        setMyJobById({...data});
        return {...data};
    }

    const getMyJobPostulations = async (idRequest) =>{
        const {data} = await axios.get(`/api/jobrequests?idRequest=${idRequest}`);
        setInfoReq(data);
    }

    const getWorkerByName = async (name) =>{
        try {
            const {data} = await axios.get(`/api/workers?name=${name}`)
            setSortedWorkers(data);
        } catch (error) {
            return error;
        }
    }

    const postInfoToPostulation = async (formData) =>{
        await axios.post("/api/jobs/newJob",formData);
    }

    return <HomeEmployerContext.Provider value={{ workersData, getAllWorkers, sortedWorkers, setSortedWorkers, sortWorkers, filtersInfo , addFilters, delFilterWorkers, myJobs, getMyJobs, myJobById, getMyJobByID, infoReq, getMyJobPostulations, postInfoToPostulation, getWorkerByName, dataPostulation ,setDataPostulation }}>{children}</HomeEmployerContext.Provider>;
}

