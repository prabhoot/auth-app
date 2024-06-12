import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import { InnerLayout } from '../styles/Layouts';
import CustomerForm from '../components/CustomerForm';
import FormItems from '../components/FormItems';

function Customers() {
  const {
    addCustomer,
    customers,
    getCustomers,
    deleteCustomer,
    totalCustomers,
    id,
  } = useGlobalContext();
  useEffect(() => {
    getCustomers();
    console.log(` the customer is: ${customers}`);
  }, []);
  return (
    <CustomerStyled>
      <InnerLayout>
        <h1>Customers</h1>
        <h2 className='total-customers'>
          Total Customers: <span>{totalCustomers()}</span>
        </h2>
        <div className='customers-content'>
          <div className='form-container'>
            <CustomerForm />
          </div>
          <h2 className='list-heading'>
              <span>All Customers</span>
          </h2>
          <div className='customers'>
            {customers.data.map((customer) => {
              const { _id, name, email, role, total_spends, last_visit_date, isOnline, } = customer;
              return (
                <FormItems key={_id} id={_id} title={name} email={email} amount={total_spends} date={last_visit_date} role={role}
                 indicatorColor={ isOnline ? 'var(--color-green)' : 'var(--color-red)'}
                  deleteCustomer={()=>{deleteCustomer(id)}}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </CustomerStyled>
  );
}

const CustomerStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-customers {
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

  .total-Customer {
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
  .list-heading{
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
  }
  .customer-content {
    display: flex;
    gap: 2rem;

    .customers {
      flex: 1;
    }
  }
`;

export default Customers;
