import React from 'react'
import StoreMinimumForm from './form'

const MinimumStoreActions = ({
  myStores,
  disabled,
  setDisabled,
}) => {

  const initialValues = {
    storeName: myStores[0]?.storeName,
    email: myStores[0]?.email,
    locationPostal: myStores[0]?.locationPostal,
  }

  const callback = () => {}
  const error = null;
  return (
    <div>
      <StoreMinimumForm
        onSubmit={callback}
        error={error}
        isLoading={!myStores}
        initialValues={initialValues}
        disabled={disabled}
        setDisabled={setDisabled}
      />
    </div>
  )
}

export default MinimumStoreActions