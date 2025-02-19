import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import routes from '../routes/index-route';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminInfo } from '../actions/admin.auth';
import Lottie from 'lottie-react';

import loadingAnimation from '../components/loading/loading.json';


const AdminLayout = () => {
    const getRoutes = (routes) => {
        return routes.map((route) =>
            route.layout === 'admin' &&
            route.views.map((view) =>
                <Route
                    key={view.path}
                    path={`/${view.path}`}
                    element={view.component}
                />
            )
        )
    }
    return (

        <div>

            <Route>
                {getRoutes(routes)}
                <Route path='/' element={<Navigate to='/admin/dashboard' />} />
            </Route>
            {/* </div> */}

        </div>


    )
}


// }


export default AdminLayout