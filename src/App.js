import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Signup, Login } from './pages/index';
import Nav from './components/Nav';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { isAuthReady, user } = useAuthContext();

  return (
    <>
      {isAuthReady ? (
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={user !== null ? <Home /> : <Navigate replace={true} to="/login" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      ) : (
        'Loading...'
      )}
    </>
  );
}

export default App;
