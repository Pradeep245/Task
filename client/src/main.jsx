import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
import Home from './pages/Home.jsx';
import Loader from './pages/Loader.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { Provider } from 'react-redux';
import {store,persistor} from './store.js';

import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "dashboard",
//         element: <Dashboard />,
//       },
//     ],
//   },
// ]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
     <BrowserRouter>
     <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>

    <App />
    </PersistGate>

    </Provider>
    </BrowserRouter>
    {/* <RouterProvider
    router={router}
    fallbackElement={<Loader />}
  /> */}
  </React.StrictMode>,
)
