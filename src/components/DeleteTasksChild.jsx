/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { NavLink , useParams} from 'react-router-dom';
export default function ListTasks() {
  //Tenemos el id porque ya estamos en la página con la ruta id del child
const {id} = useParams()
const [child, setChild] = useState(null)
const [task, setTask] = useState(null); 
useEffect(()=>{
  const getDataTasksChilds = async () => {
     try {      
       const getChild = await axios.get(`${process.env.REACT_APP_API_URL}/child/${id}`);     
       setChild(getChild.data.data)   
     } catch (error) { 
       console.error(error); 
     } 
   }   
   getDataTasksChilds() 

  const getData = async () => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/task/`);       
          setTask(response.data.data)
      } catch (error) {
          console.error(error); 
      }
  }
  getData();   
},[task]); 

const handleConfirm=(e)=>{
  Swal.fire({
    title: 'Are you sure to delete task?',
    showDenyButton: true,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
     handleDelete(e)
    } 
  })
} 
const handleDelete = async (e)=>{
    try{
        await axios.put(`${process.env.REACT_APP_API_URL}/child/deleteTask/${id}/${e}`)
        toast.success('Delete task !')  
    }catch(error){
        console.log(error)
    }
}
  return (
    <div>
      <h2>What tasks do you want to delete?</h2> 
      <div className='containerListTasks'>
        {child && (
          child.tasks.map((e)=>{
            return (
              <div  className='cardTasks' onClick={()=>{handleConfirm(e._id)}} key={e._id}>
                <h3>{e.name}</h3>
                <img src={e.imageUrl}></img>  
              </div>               
            )            
          }) 
        )}    
      </div>          
      <NavLink to="/ListChilds"><button>Done</button> </NavLink>                  
    </div>
  )
}      