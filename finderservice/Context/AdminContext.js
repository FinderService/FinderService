"use client"

import { useContext, createContext, useState } from "react";
import axios from "axios";


const AdminContext = createContext();

export const useAdmin = () =>{
    const context = useContext(AdminContext);
    if(!context) throw new Error('useWorkers must be used inner a provider.');
    return context;
}

export const AdminProvider = ({ children }) => {
    const [users, setUsers ] = useState([]);

    const [workers, setWorkers] = useState([]);
    const [employers, setEmployers] = useState([]);
    const [validusers, setValidusers] = useState([]);
    const [notValidusers, setNotvalidusers] = useState([])

    const getAllUsers = async () =>{
        const { data } =  await axios.get("/api/admin");
        setUsers(data);
    }

    const setUsersInfo = () =>{
        if(users.length){
            const allWorkers = users.filter((user)=> user.profile === 'worker');
            setWorkers([...allWorkers]);

            const allEmployers = users.filter((user)=> user.profile === 'employer');
            setEmployers([...allEmployers]);
            
            const validatedUsers = users.filter((user)=> user.active === true);
            setValidusers([...validatedUsers]);

            const notUsers = users.filter((user)=> user.active === false);
            setNotvalidusers([...notUsers]);
        }
    }

    return <AdminContext.Provider 
    value={{ users, getAllUsers, workers, notValidusers, employers, validusers, setUsersInfo }}> {children}
    </AdminContext.Provider>;
}