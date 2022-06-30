import useAxiosFetch from '../hooks/useAxiosFetch';
import { createContext, useState, useEffect } from 'react';
import sortIntermidiaries from '../helpers/sortIntermidiaries';

export const IntermidiaryListContext = createContext({});

export const IntermidiaryListContextProvider = ({ children }) => {
  const [intermidiaries, setIntermidiaries] = useState([]);
  const { data, error, isLoading } = useAxiosFetch('http://localhost:8000/intermidiaries');

  const sortedIntermidiaries = sortIntermidiaries(data)

  useEffect(() => {
    setIntermidiaries(sortedIntermidiaries);
  }, [sortedIntermidiaries])

  return (
    <IntermidiaryListContext.Provider value={{ error, isLoading, intermidiaries, setIntermidiaries }}>
      {children}
    </IntermidiaryListContext.Provider>
  )
}

export default IntermidiaryListContextProvider;