import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Gestion from './components/Gestion';
import Informe from './components/Informe';
const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
      path: 'gestion',
      element: <Gestion />
    },
    {
      path: 'informe',
      element: <Informe />
    }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router}>
      {}
      {router}
    </RouterProvider>
  );
}

export default App;
