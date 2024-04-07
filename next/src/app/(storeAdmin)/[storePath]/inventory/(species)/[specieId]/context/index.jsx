import { createContext, useContext, useReducer } from 'react';

export const PageStateContext = createContext(null);


const stepReducer = (state, action) => {
  const { type, payload } = action;
  const { sections } = state;
// debugger
  switch (type)  {
    case "UPDATE_SECTION_STATE":
      console.log("LOADING REDUCDER",payload)
      // debugger
      const { section, isOpen, isDisabled, isLoading } = payload;
      const newSections = { ...sections };
      if (typeof isOpen === 'boolean') newSections[section].isOpen = isOpen;
      if (typeof isDisabled === 'boolean') newSections[section].isDisabled = isDisabled;
      if (typeof isLoading === 'boolean') {
        newSections[section].isLoading = isLoading};
      // console.log({ ...state, sections: {...newSections}  })
      return { ...state, sections: {...newSections} };
    default:
      return { ...state }
  }
}


const initialState = {
  sections: {
    description: {
      index: 0,
      isDisabled: false,
      isLoading: false,
      isOpen: true,
    },
    skus: {
      index: 1,
      // isPristine: true,
      isOpen: true,
    }
  }
};


export const PageStateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stepReducer, initialState)

  return (
    <PageStateContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PageStateContext.Provider>
  )
}

