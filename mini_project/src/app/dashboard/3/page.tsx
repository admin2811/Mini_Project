"use client"
import React, {useEffect } from 'react'
import SideBar from '@/components/SideBar'
import Header from '@/components/Header'
import User from '@/components/User'
import { SessionProvider } from 'next-auth/react'
const Dashboard = () => {
  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
        <div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
		</div>
      <SideBar />
      <SessionProvider>
         <User group={3}/>
      </SessionProvider>
    </div>
  )
}

export default Dashboard
