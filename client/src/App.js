import HomeScreen from './Pages/HomeScreen';
import Home from './components/Home';
import { useState } from 'react';

function App() {
  const [loggedIn, setloggedIn] = useState(
    localStorage.getItem('id_token') ? true : false
  );

  return (
    <>
      {loggedIn ? (
        <HomeScreen setloggedIn={setloggedIn} />
      ) : (
        <Home setloggedIn={setloggedIn} />
      )}
    </>
  );
}

export default App;
