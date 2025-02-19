import React from 'react'
import Home from '../components/layouts/Client/MainContent/Home';
import DetailProduct from '../components/layouts/Client/products/detail';
import CartList from '../components/layouts/Client/Cart/Cart-list';
import ProductsList from '../components/layouts/Client/MainContent/List';
import Search from '../components/layouts/Client/MainContent/search';
import Order from '../components/layouts/Client/Order/Order';
import OrderSuccess from '../components/layouts/Client/Order/OrderSuccess';
import History from '../components/layouts/Client/Order/History';
import Build from '../components/layouts/Client/build/Build';
import ForgotPassword from '../components/layouts/Client/Forgotpassword/Forgotpassword';
import Otp from '../components/layouts/Client/Forgotpassword/otp';
import ResetPassword from '../components/layouts/Client/Forgotpassword/ResetPassword';
// import Oders from '../components/layouts/Admin/pages/Orders/Oders';
const ClientRoutes = [
    {
        name: 'Home',
        path: '/',
        component: <Home />
    },

    {
        name: 'List',
        path: '/products/:slug',
        component: <ProductsList />
    },
    {
        name: 'List',
        path: '/products/search',
        component: <Search />
    },
    {
        name: 'Detail',
        path: '/products/detail/:slugProduct',
        component: <DetailProduct />
    },
    {
        name: 'Cart',
        path: '/cart',
        component: <CartList />
    },
    {
        name: 'Order',
        path: '/cart/order',
        component: <Order />
    },
    {
        name: 'orderSuccess',
        path: '/cart/order/success/:orderId',
        component: <OrderSuccess />
    },
    {
        name: 'orderHistory',
        path: '/order/history',
        component: <History />
    },
    {
        name: 'build',
        path: '/build',
        component: <Build />
    },
    {
        name: 'forgot-Password',
        path: '/forgot-Password',
        component: <ForgotPassword />
    },
    {
        name: 'forgot-Password-otp',
        path: '/forgot-Password/otp/:email',
        component: <Otp />
    },
    {
        name: 'forgot-Password-reset-password',
        path: '/forgot-Password/reset-password',
        component: <ResetPassword />
    },
];

export default ClientRoutes
