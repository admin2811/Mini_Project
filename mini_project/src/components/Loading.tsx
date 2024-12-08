"use client"
import React from 'react'
import '@/css/Loading.css'
const Loading = () => {
  return (
    <div>
      <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      </div>
    </div>
  )
}

export default Loading
