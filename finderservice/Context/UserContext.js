"use client"
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useContext } from "react";

export const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context) throw new Error('useUser must be used inner a provider.');
    return context;
}

export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState({});

    const updateUserData =  async(email) => {
        if(userData.email) return
        let res = await axios.post('/api/auth/getUser', {email})
        console.log(res,'Update desde el context!');
        setUserData({...res.data.user})
    }


  return <UserContext.Provider value={{ userData, updateUserData }}>{children}</UserContext.Provider>;
};
