"use client"
import React, {useState, useEffect} from 'react'
import { BarChart2, AppWindowIcon, User, Settings, Webhook, Menu, Moon, SunMoon, Notebook, Sidebar } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import '@/css/Sidebar.css'
const SideBar = () => {
    const SIDEBAR_ITEMS = [
        {
          name: 'Dashboard',
          icon: BarChart2,
          color: "#6366f1",
        },
        {
          name: 'Applications',
          icon: AppWindowIcon,
          color: "#8B5CF6",
        },
        {
          name: 'Users',
          icon: User,
          color: "#EC4899",
        },
        {
          name: 'Webhook',
          icon: Webhook,
          color: "#10B981",
        },
        {
          name: 'Settings',
          icon: Settings,
          color: "#3B82F6",
        },
        {
          name:'Logs',
          icon: Notebook,
          color: '#F87171',
        },
      ];
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  return (
    <motion.div
        className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"}`}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
        <div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
            >
                <Menu size={24} />
            </motion.button>
            <nav className='mt-8 flex-grow'>
                {SIDEBAR_ITEMS.map((item) => (
                    <motion.div
                    className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2`}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                    <AnimatePresence>
                      {(isSidebarOpen || hoveredItem === item.name) && (
                        <motion.span
                          className={`${isSidebarOpen ? "ml-4" : "ml-10"} whitespace-nowrap text-white`}
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2, delay: 0.3 }}
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
            </nav>
        </div>
      
    </motion.div>
  )
}

export default SideBar
