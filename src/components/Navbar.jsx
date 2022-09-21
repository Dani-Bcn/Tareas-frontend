
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import {motion} from "framer-motion"

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOutUser= ()=>{
    Swal.fire({
      title: 'You want to go?',
      showDenyButton: true,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
       logOutUser() 
       navigate('/')
    } 
  }) 
}
return (
    <motion.div className='nav'
    animate={{
      y:[-200,50,0], 
    transition:{delay:2 ,duration:1.5}   
    }}
    >    
      <ul>
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="./Sectionchilds"><h3>Home</h3></NavLink></li>}   
        {!isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/signup"><h3>Sign up</h3></NavLink></li>}
        {!isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/login"><h3>Login</h3></NavLink></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/ListChilds"><h3>Childs</h3></NavLink></li>}
        {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/Tasks"><h3>Task</h3></NavLink></li>}                  
      </ul>
    </motion.div>
  )
}