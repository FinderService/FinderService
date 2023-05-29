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
    const [userDetail, setUserDetail] = useState({})

    const [workers, setWorkers] = useState([]);
    const [employers, setEmployers] = useState([]);
    const [validusers, setValidusers] = useState([]);
    const [notValidusers, setNotvalidusers] = useState([])
    const [ removedUsers, setRemovedUsers ] = useState([])

    const getAllUsers = async () => {
        const { data } =  await axios.get("/api/admin");
        setUsers(data);
    }

    const getUserByID = async (id) => {
        const { data } = await axios.get(`/api/admin/${id}`)
        setUserDetail({...data});
    }

    const putUserdataByID = async (formData, id) => {
        try {
            await axios.put(`/api/admin/${id}`, formData)
        } catch (error) {
            console.log(error);
            return;
        }
        
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

            const deletedUsers = users.filter((user)=> user.deleted === true);
            setRemovedUsers([...deletedUsers]);
        }
    }

    return <AdminContext.Provider 
    value={{ users, getAllUsers, userDetail, setUserDetail, getUserByID, putUserdataByID,
        workers, employers, notValidusers, validusers, removedUsers, setUsersInfo }}> {children}
    </AdminContext.Provider>;
}