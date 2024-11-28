import { useGlobalContext } from '../context/globalContext';

import React from "react";

const Route = () => {
  const {id} = useGlobalContext();
    const route={
    customerAdd:`add/customer`,
    customerGet:`get/all/customers`,
    customerGetById:`get/customer/${id}`,
    customerDelete:`delete/customer/${id}`,
    customerUpdate:`update/customer/${id}`,
  }};

export default Route;
