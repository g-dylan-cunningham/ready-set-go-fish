const countDecimals = (value) => {
  if (!value || Math.floor(value) === value) return 0;
  return value.toString().split('.')[1].length || 0;
};

const getMinSkuPrice = (skus) => {
  const priceArr = skus.map(sku => parseFloat(sku.price, 10))
  return "$" + Math.min(...priceArr);
}

const getServerDomain = () => {
  return "http://localhost:4000";
}

const updateLocalStorageWithNewStore = (payload) => {
  // update local storage so that after page refresh, all items (including `user`, are present)
  const oldStore = JSON.parse(localStorage.getItem('details'));
  const newStore = {
    ...oldStore, // includes user obj
    token: payload.token, // updates token to support new store
    store: payload.store, // adds store details
  };
  localStorage.setItem("details", JSON.stringify(newStore));
}


const deepEqual = (obj1, obj2) => {
  // Base case: If both objects are identical, return true.
  if (obj1 === obj2) {
    return true;
  }
  // Check if both objects are objects and not null.
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return false;
  }
  // Get the keys of both objects.
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  // Check if the number of keys is the same.
  if (keys1.length !== keys2.length) {
    return false;
  }
  // Iterate through the keys and compare their values recursively.
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  // If all checks pass, the objects are deep equal.
  return true;
}

export {
  countDecimals,
  getMinSkuPrice,
  getServerDomain,
  updateLocalStorageWithNewStore,
  deepEqual,
};
