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
    const [employersData, setEmployersData] = useState([]);

    const [infoFilters, setInfoFilters] = useState([]);
    const [types, setTypes] = useState([]);

    const [JobReqs, setJobReqs] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [workDetail, setWorkDetail] = useState([]);

    const [myPostulations, setMyPostulations] = useState([]);
    const [ postDetails , setPostDetails ] = useState({});
    const [saveData, setSaveData] = useState({});
    const [savedID , setSavedID] = useState("")
    const [saveIds, setSaveIds] = useState({});

    const getAllEmployers =  async () => {  
        let res = await axios.get('/api/employers')
        setEmployersData([...res.data])
    }

    const getJobReqs = async (id) => {
        if(id){
            let res = await axios.get(`/api/jobrequests/${id}`)
            setWorkDetail(res.data)
        }else{  
            let res2 = await axios.get('/api/jobrequests')
            setJobReqs([...res2.data])
            setFilterData([...res2.data])
        }
    }

    const jobFilters = (filter) =>{
        if(filter !== 'Trabajos'){
            const filteredWorks = JobReqs.filter((work) => {
                return work.type.map((data)=> data.name ).includes(filter)
            });
            setFilterData(filteredWorks);
            setInfoFilters([filter]);
        }
    }

    const delFilter = () => {
        setInfoFilters([]);
        setFilterData(JobReqs)

        //NO BORRAR, ES EL SECRETO DE LA FELICIDAD:
        //const newInfoFilters = infoFilters.filter((data)=> data !== filterToRemove);    
        //if(newInfoFilters.length){
        //    const newDataWorks = JobReqs.filter((work) => {
        //        return newInfoFilters.some(filter => work.type.map(data => data.name).includes(filter));
        //    });
        //    setFilterData(newDataWorks);
        //    setInfoFilters(newInfoFilters);
        //}else{
        //    setFilterData(JobReqs);
        //    setInfoFilters([]);
        //}
    }

    const getTypes = async () => {
        const { data } = ( await axios.get('/api/types') );
        const allTypes = data.map((type)=> type.name);
        setTypes(allTypes);
    }

    const getMyPostulations = async (id) => {
        const {data} = await axios.get(`/api/jobpostulations?idWorker=${id}`)
        setMyPostulations(data);
    }

    const getJobIDWorker = async (idRequest, idPostulation) => {
        const {data} = await axios.get(`/api/jobs/getJobId?idRequest=${idRequest}&idPostulation=${idPostulation}`);
        setSavedID(data);
    }
    
  return <WorkersContext.Provider 
    value={{ employersData, getAllEmployers, JobReqs, getJobReqs, workDetail , setWorkDetail,
        filterData, infoFilters, jobFilters, delFilter,
        types, getTypes, saveData, setSaveData, myPostulations, getMyPostulations, 
        postDetails, setPostDetails, saveIds, setSaveIds, savedID, getJobIDWorker}}>
        {children}
    </WorkersContext.Provider>;
};