import { PageStateContext } from ".";
import { useContext } from 'react';

export default function usePageStateContext() {
  const context = useContext(PageStateContext);

  if (!context) {
    throw Error('PageStateContext must be inside its provider')
  }
  return context;
}