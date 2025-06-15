import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectiveRoutes = ({isAuth,userRole,allowededRoles,children}) => {
 if(!isAuth){
    return <Navigate to="/login"/>
 }
 if(!allowededRoles.includes(userRole)){
    return <Navigate to="/unauthorized" />
 }
 return children;
}

export default ProtectiveRoutes
