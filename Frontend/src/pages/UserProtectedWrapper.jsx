import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/userContext';
import axios from 'axios';

const UserProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('user');
    const {user, setUser} = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        if(!token) {
            navigate('/login');
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if(response.status === 200) {
                const data = response.data;
                setUser(data.user);
                setIsLoading(false);
            }
        })
        .catch((error) => {
            console.log(error);
            localStorage.removeItem('user');
            navigate('/login');
        })
    }, [token])
  return (
    <>
        {children}
    </>
  )
}

export default UserProtectedWrapper