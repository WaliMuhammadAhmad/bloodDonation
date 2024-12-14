import React from 'react'
import Topbar from '../dashboard/Topbar'
import User from '../dashboard/User'
import Admin from '../dashboard/Admin'


function Dashboard(props) {
  
    const person = {
        name: 'Wali Muhammad',
        img: 'img/social/founder.jpg'
    }

    const admin = {
      name: 'Wali Muhammad',
      img: 'img/social/founder.jpg'
  }
    
  if (props.text === 'user') {
    return (
      <div className='bg-zinc-900 text-white'>
          <Topbar {...person} />
          <User />
      </div>
    )
  } else if (props.text == 'admin') {
    return (
      <div className='bg-zinc-900 text-white'>
          <Topbar {...admin} />
          <Admin />
      </div>
    )
  }
  else 
    return null;
}

export default Dashboard