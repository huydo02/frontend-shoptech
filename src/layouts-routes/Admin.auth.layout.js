import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import routes from '../routes/index-route';

const AdminAuthLayout = () => {
    const getRoutes = (routes) => {
        return routes.map((route) =>
            route.layout === '/admin/auth' &&
            route.views.map((view) =>
                <Route
                    path={`/${view.path}`}
                    element={view.component}
                />
            )
        )
    }

    return (
        <Routes>
            {getRoutes(routes)}
            <Route path='/' element={<Navigate to='/admin/auth/login' replace />} />
        </Routes>
    )
}

export default AdminAuthLayout