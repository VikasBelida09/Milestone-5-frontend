import React from 'react'
import './navbar.css'
const Navbar = () => {
  const navItems=['visualizations','playground']
  return (
    <div className='navbar'>
      <div className='box1'>
        <h3>Milestone-5</h3>
       </div>
      <div className='box2'>
        {
            navItems.map((item)=>(
                <div key={item} className="navbar-item">{item}</div>
            ))
        }    
      </div>
    </div>
  )
}

export default Navbar
