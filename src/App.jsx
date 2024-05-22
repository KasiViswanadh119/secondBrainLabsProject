// src/App.jsx
import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig'; // Import the initialized auth
import { onAuthStateChanged, signOut } from 'firebase/auth';
import DataTable from './components/DataTable';
import Login from './components/Login';
import { Button } from '@mui/material';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      {user ? (
        <>
          <h1>Admin Dashboard</h1>
          <Button variant="contained" color="secondary" onClick={handleLogout} style={{ marginBottom: '20px' }}>
            Logout
          </Button>
          <DataTable />
        </>
      ) : (
        <Login onLogin={() => setUser(auth.currentUser)} />
      )}
    </div>
  );
};

export default App;
