import { customerIcon, dashboard, expenses, settings, transactions, trend } from '../utils/Icons';
import { useGlobalContext } from '../context/globalContext';

export const MenuItems = () => {
  const { me } = useGlobalContext();

  return [
    {
      id: 1,
      title: 'Dashboard',
      icon: dashboard,
      link: '/dashboard',
    },
    {
      id: 2,
      title: 'Incomes',
      icon: transactions,
      link: '/campaign',
    },
    {
      id: 3,
      title: 'Expenses',
      icon: trend,
      link: '/settings',
    },
    // {
    //   id: 3,
    //   title: me?.role === 'me' ? 'Settings' : 'Customers',
    //   icon: me?.role === 'me' ? trend : customerIcon,
    //   link: me?.role === 'me' ? '/settings' : '/customers',
    // },
    {
      id: 4,
      title: me?.role === 'User' ? 'Settings' : 'Customers',
      icon: me?.role === 'User' ? settings : customerIcon,
      link: me?.role === 'User' ? '/orders' : '/customers',
  },
  ];
};
