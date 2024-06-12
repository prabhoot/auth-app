import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from '../context/globalContext';
import Button from '../utils/Button';
import { plus } from '../utils/Icons';

function CustomerForm() {
  const { addCustomer, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    name: 'test23',
    email: 'test23@test.com',
    date: '',
    role: 'Customer',
    password: 'test23',
    description: 'i am Test23',
  });

  const { name, email, date, role, password, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(`inputState is ${JSON.parse.stringify(inputState)}`);
      
      const response = await addCustomer(JSON.stringify(inputState));
      if (response && response.success) {
        setInputState({
          name: '',
          email: '', 
          date: '',
          role: '',
          password: '',
          description: '',
        });
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };
  

  return (
    <CustomerFormStyled onSubmit={handleSubmit}>
      {error && <p className='error'>{error}</p>}
      <div className='input-control'>
        <input type='text' value={name} name={'name'} placeholder='Customer name' onChange={handleInput('name')}/>
      </div>
      <div className='input-control'>
        <input value={email} type='text' name={'email'} placeholder={'Customer email'} onChange={handleInput('email')}
        />
      </div>
      <div className='input-control'>
        <DatePicker id='date' placeholderText='Enter A Date' selected={date} dateFormat='dd/MM/yyyy' onChange={(date) => {   setInputState({ ...inputState, date: date }); }}/>
      </div>
      <div className='selects input-control'>
        <select required value={role} name='role' id='role' onChange={handleInput('role')}>
          <option value='' disabled>
            Select Option
          </option>
          <option value='admin'>Admin</option>
          <option value='customer'>Customer</option>
        </select>
      </div>
      <div className='input-control'>
        <input type='text' value={password} name={'password'} placeholder='Password' onChange={handleInput('password')}/>
      </div>
      <div className='input-control'>
        <textarea
          name='description'
          value={description}
          placeholder='Add A Reference'
          id='description'
          cols='30'
          rows='4'
          onChange={handleInput('description')}></textarea>
      </div>
      <div className='submit-btn'>
        <Button
          name={'Add Customer'}
          bPad={'.8rem 1.6rem'}
          bRad={'30px'}
          bg={'var(--color-accent'}
          color={'#fff'}
        />
      </div>
    </CustomerFormStyled>
  );
}

const CustomerFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
`;

export default CustomerForm;
