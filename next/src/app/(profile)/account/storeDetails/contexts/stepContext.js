import { createContext, useReducer } from 'react';

export const StepContext = createContext();

/*
current step idx
all steps list (config)
  step:
    * is section pristine (allows skipping without warning) default true
    * is section dirty && unsaved (shows warning modal)
    * current section
*/




// state = {
//   currentIdx: Number
//   steps: [],
// }

export const stepReducer = (state, action) => {
  const { type, payload } = action;
  const { steps, currentIdx } = state;
  /*
    payload: {
      id: String
      isPristine
    }
  */

  switch (type)  {
    case "SET_DIRTY": 
      const { id } = payload;
      const updatedSteps = steps.reduce((acc, obj) => {
        if (obj.id === id) {
          // Clone the object and modify the property
          const modifiedObj = { ...obj, isPristine: false };
          acc.push(modifiedObj);
        } else {
          // No modification needed, push the original object
          acc.push(obj);
        }
        return acc;
      }, []);
      return { ...state, steps: updatedSteps}
    case "SET_STEP":
      const { value } = payload;
      // console.log('value', value)
      return { ...state, currentIdx: currentIdx + value}
    // case "ADD_TODO":
    //   return { ...state, todos: [payload, ...state.todos] }
    // case "UPDATE_TODO":
    //   // const todos = ;
    //   const todos = [ ...state.todos ].map(elem => {
    //     if (payload.id && elem.id === payload.id) {
    //       return payload;
    //     }
    //     return elem
    //   })
    //   return { ...state, todos }
    // case "DELETE_TODO":
    //   return { ...state }
    default:
      return { ...state }
  }
}

const steps = [
  { id: "basic", title: "Basic Info", isPristine: true },
  { id: "contact", title: "Contact", isPristine: true  },
  { id: "prefs", title: "Preferences", isPristine: true  },
  { id: "desc", title: "Description", isPristine: true  },
];

export const StepContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stepReducer, { currentIdx: 0, steps })
  // console.log('state-', state)
  return (
    <StepContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StepContext.Provider>
  )
}