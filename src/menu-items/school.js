// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconApps,
    IconMenu2,
    IconBuildingBank,
    IconTruckDelivery,
    IconClipboardList,
    IconBuildingWarehouse,
    IconTruckLoading,
    IconCalendar
} from '@tabler/icons';



// ==============================|| School Mean MENU ITEMS ||============================== //

const school = {
    id: 'OrderManagement',
    title: <FormattedMessage id="OrderManagement" />,
    icon: IconApps,
    type: 'group',
    children: [
        {
            id: 'Products',
            title: <FormattedMessage id="Products" />,
            type: 'collapse',
            icon: IconMenu2,
            children: [
                {
                    id: 'menuItems',
                    title: <FormattedMessage id="View Products" />,
                    type: 'item',
                    url: '/products',
                    breadcrumbs: false
                },
                {
                    id: 'addMenu',
                    title: <FormattedMessage id="Add Product" />,
                    type: 'item',
                    url: '/product/add',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'orders',
            title: <FormattedMessage id="orders" />,
            type: 'collapse',
            icon: IconCalendar,
            children: [
                {
                    id: 'orders',
                    title: <FormattedMessage id="viewOrder" />,
                    type: 'item',
                    url: '/orders',
                    breadcrumbs: false
                }
            ]
        }
       
    ]
};

export default school;
