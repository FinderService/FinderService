"use client"
import axios from "axios";
import { createContext, useState } from "react";
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
        let socialLogin = localStorage.getItem('socialLogin');
        if(userData.email || socialLogin ) return
        //if(userData.email) return
        let res = await axios.post('/api/auth/getUser', {email})
        console.log(res,'Update desde el context!');
        if(!res){
            console.log('User logued bye social app!');
            return;
        }
        setUserData({...res.data.user})
    }


  return <UserContext.Provider value={{ userData, updateUserData }}>{children}</UserContext.Provider>;
};
