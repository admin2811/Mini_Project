import React from 'react'
import '@/css/Notification.css'
const Notifcation = () => {
  return (
    <div className=''>
        <div className="notification-popup">
        <button className="close-btn" aria-label="Close notification">
            <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="notification font-bold">
            <h2>Show notifications for</h2>
            <div className="notification-icon">
            <i className="fa-solid fa-bell"></i>
            <p>www.website.com</p>
            </div>
            <div className="button-container">
            <button className="block-btn">Block</button>
            <button className="allow-btn">Allow</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Notifcation
