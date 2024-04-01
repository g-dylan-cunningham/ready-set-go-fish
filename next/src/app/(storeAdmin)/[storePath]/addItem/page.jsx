import React from 'react';
import { Main } from '@/app/components';
import AddForm from './addForm';

const AddItem = () => {
  const heading = "Let's create a listing";
  return (
    <Main>
    <h1 className="text-2xl font-bold capitalize">{heading}</h1>
      <AddForm />
    </Main>
  )
}

export default AddItem