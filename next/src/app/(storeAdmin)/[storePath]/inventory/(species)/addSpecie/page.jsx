import React from 'react';
import { Main } from '@/app/components';
import CloneSpecieForm from './cloneSpecieForm';

const AddItem = () => {
  const heading = "Let's create a listing";
  return (
    <Main>
    <h1 className="text-2xl font-bold capitalize">{heading}</h1>
      <CloneSpecieForm/>
    </Main>
  )
}

export default AddItem