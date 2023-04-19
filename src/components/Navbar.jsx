import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
const Navbar = () => {
  const navItems=[{name:'visualizations',link:'/'},{name:'Topic Modelling',link:'/topics'}]
  return (
    <div className='navbar'>
      <div className='box1'>
        <h3>Milestone-5</h3>
       </div>
      <div className='box2'>
        {
            navItems.map((item)=>(
                <Link to={item.link} className="navbar-item"><div key={item.name}>{item.name}</div></Link>
            ))
        }    
      </div>
    </div>
  )
}

export default Navbar
