import React, {useState, useEffect} from 'react';
import './App.css';
import List from './components/List';
import withListLoading from './components/withListLoading';
import axios from 'axios';

function App() {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    apis: null,
  });

  // // Fetch method()
  // useEffect(() => {
  //   setAppState({ loading: true});
  //   const apiUrl = `https://api.github.com/users/hacktivist123/repos`;
  //   fetch(apiUrl)
  //     .then((res) => res.json())
  //     .then((apis) => {
  //       setAppState({loading: false, apis: apis});
  //     });
  // }, [setAppState]);

  // // Axios method()
  useEffect(() =>  {
    setAppState({loading: true});
    const apiUrl = 'https://api.github.com/users/hacktivist123/repos';
    console.log(apiUrl)
    axios.get(apiUrl).then((apis) => {
      const allApis = apis.data;
      setAppState({loading: false, apis: allApis});
    });
  }, [setAppState]);

  return (
    <div className="App">
      <div className="container">
        <h1>MY APIs</h1>
      </div>
      <div className='api-container'>
        <ListLoading isLoading={appState.loading} apis = {appState.apis} />
      </div>
      <footer>
        <div className='footer'>
          Built{' '}
          <span role='img' aria-label='love'>
            💚
          </span>{' '}
          with by Shedrack Akintayo
        </div>
      </footer>
    </div>
  );
}

export default App;
