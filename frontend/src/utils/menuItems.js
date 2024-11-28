import { customerIcon, dashboard, expenses, transactions, trend } from '../utils/Icons';
import { useGlobalContext } from '../context/globalContext';

export const MenuItems = () => {
  const { user } = useGlobalContext();

  return [
    {
      id: 1,
      title: 'Dashboard',
      icon: dashboard,
      link: '/dashboard',
    },
    {
      id: 2,
      title: 'Campaign',
      icon: transactions,
      link: '/campaign',
    },
    {
      id: 3,
      title: user.role === 'User' ? 'Settings' : 'Customers',
      icon: user.role === 'User' ? trend : customerIcon,
      link: user.role === 'User' ? '/settings' : '/customers',
    },
    {
      id: 4,
      title: 'Items',
      icon: expenses,
      link: '/orders',
    },
  ];
};
