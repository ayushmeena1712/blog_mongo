import React, {useEffect, useState} from 'react' 
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../Authcontext'

export default function Protected({children, authentication = true, onBoth = false}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const {auth} = useAuth();

    const authStatus = auth ? true : false;
    console.log('authStatus', authStatus);
    useEffect(() => { 

        if(authentication && authStatus !== authentication){
            console.log("navigate to login");
            navigate("/login")
        } else if(!authentication && authStatus !== authentication && !onBoth) {
            console.log("navigate to home");
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}