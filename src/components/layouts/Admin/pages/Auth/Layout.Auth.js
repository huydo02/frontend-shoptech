import React, { useEffect } from 'react'
import AdminAuthLayout from '../../../../../layouts-routes/Admin.auth.layout'
import { useDispatch, useSelector } from 'react-redux';
import { getAdminInfo } from '../../../../../actions/admin.auth';
import { useNavigate } from 'react-router';
// import '../../../../../asset/auth.admin.css'
const LayoutAuth = () => {

    return (
        <>

            <AdminAuthLayout />

        </>
    )
}

export default LayoutAuth