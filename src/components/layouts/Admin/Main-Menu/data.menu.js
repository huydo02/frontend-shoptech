
import { AppstoreOutlined, SettingOutlined, ProductOutlined, UsergroupAddOutlined, AppstoreAddOutlined, ApartmentOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const items = [
    {
        key: 'grp',
        label: 'Quản lý',
        type: 'group',
        children: [
            { key: '/admin/dashboard', label: 'Dashboard', icon: <AppstoreOutlined /> },
            { key: '/admin/orders', label: 'Quản lý đơn hàng', icon: <ShoppingCartOutlined /> },
            { key: '/admin/products', label: 'Quản lý sản phẩm', icon: <AppstoreAddOutlined /> },
            { key: '/admin/categories', label: 'Danh mục sản phẩm', icon: <ProductOutlined /> },
            { key: '/admin/accounts', label: 'Danh sách tài khoản', icon: <UsergroupAddOutlined /> },


        ],
    },
    {
        key: 'sub1',
        label: 'Quản lý quyền',
        icon: <ApartmentOutlined />,
        children: [
            {
                key: 'g1',
                label: 'Quản lý quyền',
                type: 'group',
                children: [
                    { key: '/admin/roles', label: 'Quản lý quyền' },
                    { key: '/admin/roles/permissions', label: 'Cấp quyền' },
                ],
            },
        ],
    },

    {
        type: 'divider',
    },

    {
        key: 'grp2',
        label: 'Group',
        type: 'group',
        children: [
            { key: '/admin/settings', label: 'Cài đặt', icon: <SettingOutlined /> },
            // { key: '/admin/dashboard/123', label: 'Option 14' },
        ],
    },
];
export default items;
