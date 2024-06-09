import React from 'react';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import { dateFormat } from './dateFormat';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { customers, orders } = useGlobalContext();

  const data = {
    labels: customers.map((inc) => {
      const { date } = inc;
      return dateFormat(date);
    }),
    datasets: [
      {
        label: 'Customer',
        data: [
          ...customers.map((customer) => {
            const { visits } = customer.number_of_visits;
            return visits;
          }),
        ],
        backgroundColor: 'green',
        tension: 0.2,
      },
      {
        label: 'Orders',
        data: [
          ...orders.map((order) => {
            const { amount } = order.order_amount;
            return amount;
          }),
        ],
        backgroundColor: 'red',
        tension: 0.2,
      },
    ],
  };

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

export default Chart;
