import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import { InnerLayout } from '../styles/Layouts';
// import Form from '../Form/Form';
import FormItems from '../components/FormItems';
import OrdersForm from '../components/OrdersForm';

function Orders() {
  const { orders, getOrders, deleteOrder, totalOrders } =
    useGlobalContext();
  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, []);
  return (
    <OrderStyled>
      <InnerLayout>
        <h1>Orders</h1>
        <h2 className='total-Orders'>
          Total Orders: <span>{totalOrders()}</span>
        </h2>
        <div className='order-content'>
          <div className='form-container'>
            <OrdersForm />
          </div>
          <div className='orders'>
            {/* {orders.data?.map((order) => {
              const { _id, title, amount, date, category, description, type } =
                order;
              console.log(order);
              return (
                <FormItems key={_id} id={_id} title={title} description={description} amount={amount} date={date} type={type} category={category} indicatorColor='var(--color-red)' deleteItem={deleteOrder} />
              );
            })} */}
          </div>
        </div>
      </InnerLayout>
    </OrderStyled>
  );
}

const OrderStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-Orders {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .total-Order {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-red);
    }
  }
  .order-content {
    display: flex;
    gap: 2rem;
    .orders {
      flex: 1;
    }
  }
`;

export default Orders;
