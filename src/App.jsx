import { useState,useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './App.css'
import authService  from './appwrite/auth'
import {login,logout} from './store/authSlice'
import { Footer, Header } from './components'
import {Outlet} from 'react-router-dom'
import conf from './conf/conf'
function App() {
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch();
  const authStatus = useSelector(state => state.auth.status)
useEffect(() => {
  
  authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }
    })
    .catch((error) => {
      // Handle AppwriteException here
      console.error("Error getting current user:", error);
      // You might want to dispatch logout or show an error message to the user
    })
    .finally(() => setLoading(false));
}, []);

 return !loading ?(//agar loading khtm hogyi toh
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header/>
      <main>
        {console.log(conf)}
        TODO:<Outlet/>
      </main>
      <Footer/>
    </div>
  </div>//yeh display hoyega
 ):null//loading finish nhi huya toh kuch bhi display ni hoga
}

export default App
// Overall, this code ensures that the user is authenticated before rendering the component's UI. If the user is authenticated, it renders the UI with the appropriate data; otherwise, it renders nothing until the loading state is updated.