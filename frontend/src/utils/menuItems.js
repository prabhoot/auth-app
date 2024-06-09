import {dashboard, expenses, transactions, trend} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Campaign",
        icon: transactions,
        link: "/campaign",
    },
    {
        id: 3,
        title: "Customers",
        icon: trend,
        link: "/customers",
    },
    {
        id: 4,
        title: "Orders",
        icon: expenses,
        link: "/orders",
    },
]