import Dashboard from "../components/layouts/Admin/pages/Dashboard";
import Products from "../components/layouts/Admin/pages/Prodduct";
import CreateProduct from "../components/layouts/Admin/pages/Prodduct/create";
import UpdateProduct from "../components/layouts/Admin/pages/Prodduct/update";

const AdminRoutes = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        component: <Dashboard />
    },
    {
        name: 'Products',
        path: 'products',
        component: <Products />
    },
    {
        name: 'Create',
        path: 'products/create',
        component: <CreateProduct />
    },
    {
        name: 'Update',
        path: 'products/update/:slug',
        component: <UpdateProduct />
    },
    {
        name: 'Categories',
        path: 'categories',
        component: ''
    }
];

export default AdminRoutes
