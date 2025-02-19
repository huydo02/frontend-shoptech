import { Route, Routes } from 'react-router-dom';
// import './App.css';
import Client from './components/layouts/Client';
import allReducers from './reducers';
// import useCart from './actions/cart';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import Admin from './components/layouts/Admin/Layout';
import Login from './components/layouts/Admin/pages/Auth/Login';
import AdminLayout from './layouts-routes/Admin.layout';
import Dashboard from './components/layouts/Admin/pages/Dashboard';
import UpdateProduct from './components/layouts/Admin/pages/Prodduct/update';
import CreateProduct from './components/layouts/Admin/pages/Prodduct/create';
import Products from './components/layouts/Admin/pages/Prodduct';
import Permissions from './components/layouts/Admin/pages/Permissions/permissions';
import RolesTable from './components/layouts/Admin/pages/roles';
import RoleCreate from './components/layouts/Admin/pages/roles/create';
import RoleEdit from './components/layouts/Admin/pages/roles/edit';
import Categories from './components/layouts/Admin/pages/Category';
import EditCategory from './components/layouts/Admin/pages/Category/edit';
import CategoryCreate from './components/layouts/Admin/pages/Category/create';
import Accounts from './components/layouts/Admin/pages/Accounts';
import AccountsCreate from './components/layouts/Admin/pages/Accounts/create';
import AccountsEdit from './components/layouts/Admin/pages/Accounts/edit';
import Oders from './components/layouts/Admin/pages/Orders/Oders';
import OrderDetail from './components/layouts/Admin/pages/Orders/Detail';
function App() {
  const store = createStore(allReducers, applyMiddleware(thunk));
  // const { getCartItem } = useCart();
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path='/admin/auth/login' element={<Login />} />

          <Route path='/admin/*' element={<Admin />} >
            <Route path='dashboard' element={<Dashboard />} ></Route>
            <Route path='products' element={<Products />} ></Route>
            <Route path='products/create' element={<CreateProduct />} ></Route>
            <Route path='products/edit/:id' element={<UpdateProduct />} ></Route>
            <Route path='roles' element={<RolesTable />} ></Route>
            <Route path='roles/create' element={<RoleCreate />} ></Route>
            <Route path='roles/edit/:id' element={<RoleEdit />} ></Route>
            <Route path='roles/permissions' element={<Permissions />} ></Route>

            <Route path='categories' element={<Categories />} ></Route>
            <Route path='categories/create' element={<CategoryCreate />} ></Route>
            <Route path='categories/edit/:id' element={<EditCategory />} ></Route>

            <Route path='orders' element={<Oders />} ></Route>
            <Route path='orders/detail/:id' element={<OrderDetail />} ></Route>


            <Route path='accounts' element={<Accounts />} ></Route>
            <Route path='accounts/create' element={<AccountsCreate />} ></Route>
            <Route path='accounts/edit/:id' element={<AccountsEdit />} ></Route>
            {/* <AdminLayout /> */}
          </Route>
          <Route path='/*' element={<Client />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
