import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import LogIn from './components/LogIn.jsx';
import Hero from "./components/Hero.jsx";
import store from './store.js';
import { Provider } from "react-redux";
import PrivateRoute from './components/PrivateRoute.jsx';
import ProfilePage from "./pages/ProfilePage.jsx";
import FAQ from './pages/FAQ.jsx';
import TasksPage from './pages/TasksPage.jsx';
import ActionsPage from './pages/ActionsPage.jsx';
import UsersListPage from './pages/UsersListPage.jsx';
import FormsPage from './pages/FormsPage.jsx';
import BrandPage from './pages/BrandPage.jsx';
import AddNewForm from './pages/AddNewForm.jsx';
import TaskViewer from './components/TaskViewer.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>

      {/**Rutas Publicas */}
      <Route index={true} path='/login' element={<LogIn />} />

      {/**Rutas Privadas */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/' element={<Hero />} />
        <Route path='/userProfile' element={<ProfilePage />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/tasks' element={<TasksPage />} />
        <Route path='/actions' element={<ActionsPage />} />
        <Route path='/usersList' element={<UsersListPage />} />
        <Route path='/forms' element={<FormsPage />} />
        <Route path='/brand' element={<BrandPage />} />
        <Route path='/forms/new' element={<AddNewForm />} />
        <Route path='/tasks/view/:id' element={<TaskViewer />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>,
)
