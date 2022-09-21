  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { useParams, useNavigate, NavLink } from 'react-router-dom';

  export default function InfoChild() {
  const navigate = useNavigate() 
  const {id} = useParams() 
  const date = new Date();  
  const actualYear = date.getFullYear();
  console.log(actualYear)
  const params = useParams(); //then use with params.id
  const [child, setChild] = useState(null);
  const [change, setChange] = useState(false)
//Find child  by id
  useEffect(() => {
    const getData = async () => {
      try {      
        const getChild = await axios.get(`${process.env.REACT_APP_API_URL}/child/${id}`);   
        console.log(getChild.data.data)                    
         setChild(getChild.data.data)              
      } catch (error) { 
        console.error(error); 
      } 
    } 
    getData();
  }, [change]);  
  const handleConfirm=()=>{
    Swal.fire({
      title: 'Are you sure to delete child?',
      showDenyButton: true,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       handleDelete()
      } 
    })
  }  
  //Delete child by id
  const handleDelete= async ()=>{   
      try {      
        await axios.delete(`${process.env.REACT_APP_API_URL}/child/${id}`);               
       navigate("/ListChilds")
      } catch (error) { 
        console.error(error); 
      } 
    }       
  const resetPoints = async()=>{ 
      try {      
        const getChild = await axios.put(`${process.env.REACT_APP_API_URL}/child/resetPoints/${id}`);                           
        setChild(getChild.data.data) 
        setChange(!change)
        console.log(change)           
      } catch (error) { 
          console.error(error); 
      } 
    } 
    const resetCups = async()=>{ 
      try {      
        const getChild = await axios.put(`${process.env.REACT_APP_API_URL}/child/resetCups/${id}`);                           
        setChild(getChild.data.data) 
        setChange(!change)
        console.log(change)           
      } catch (error) { 
          console.error(error); 
      } 
    }  
  return (
    <div className='containerCardInfo'>      
      {child && (
        <div  className='cardInfo'>           
          <img width={100} src={child.imageUrl}/> 
          <h1 >{child.name}</h1>
          <rh/>
          <h2> Age {actualYear - child.yearOfBirth}</h2>             
          <rh/>
          <h2> Points : {child.points}</h2>    
          <rh/>
          <h2> Cups : {child.cups}</h2>      
        </div>
      )}   
      <div className='cardInfo'>
         {!child && <p>child not found</p>}
        <NavLink to={`/EditChild/${id}`}>
          <button >Edit child</button>
        </NavLink>         
        <NavLink to={`/ListTasks/${id}`}>
          <button>Add tasks</button>
        </NavLink>
        <NavLink to={`/DeleteTasksChild/${id}`}><button>Delete tasks</button></NavLink>
        <button onClick={()=>resetPoints()}>Reset Points</button>
        <button onClick={()=>resetCups()}>Reset Cups</button>
        <button onClick={()=>handleConfirm()}>Delete child</button>
        <NavLink to={`/PageRewards/${id}`}>
          <button>Rewards</button>
        </NavLink>
      </div>   
    </div>   
  )
} 