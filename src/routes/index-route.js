import AdminRoutes from "./Admin-routes";
import ClientRoutes from "./Client-routes";
import AuthAdminRoutes from "./Auth-admin-route";
import AuthClientRoutes from "./Auth-client-route";
import React from 'react'

const routes = [
    {
        layout: 'auth',
        views: [...AuthClientRoutes],
    },
    {
        layout: 'admin/auth',
        views: [...AuthAdminRoutes],
    },
    // {
    //     layout: 'admin',
    //     views: [...AdminRoutes],
    // },
    {
        layout: '/',
        views: [...ClientRoutes],
    },
]

export default routes