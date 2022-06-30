import { useContext } from 'react';
import Error from '../components/error';
import Loading from '../components/loading';
import CenterSection from '../components/centerSection';
import IntermidiaryList from '../components/intermidiaryList';
import { IntermidiaryListContext } from '../context/IntermidiaryListContext';

const Home = () => {
  const { error, isLoading, intermidiaries } = useContext(IntermidiaryListContext);

  return (
    <CenterSection>
      <h2>Intermidiaries</h2>
      {isLoading && <Loading />}
      {!isLoading && error && <Error />}
      {!isLoading && !error && (intermidiaries.length > 0 ? <IntermidiaryList /> : <p className="text-blue-400">No Intermidiaries found.</p>)}
    </CenterSection>
  )
}

export default Home