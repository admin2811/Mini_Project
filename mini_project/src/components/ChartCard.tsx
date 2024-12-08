"use client"
import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ChartCardProps {
    name: string;
    value: string;
    color: string;
    percentage: number;
}
const ChartCard: React.FC<ChartCardProps> = ({name, value, color, percentage}) => {
    const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = percentage;
    const duration = 1000;
    const incrementTime = 150;
    const totalSteps = duration / incrementTime; 
    const increment = (end - start) / totalSteps;
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(interval);
        start = end;
      }
      setProgress(Math.round(start));
    }, incrementTime);
    return () => clearInterval(interval);
  }, [percentage]);
    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 flex justify-between min-w-[250px]"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
        >
            <div className="p-3 items-center justify-center text-center mx-auto">
                <span className='flex items-center text-sm font-medium text-gray-400'>
                    {name}
                </span>
                <p className='text-sm font-semibold text-white mt-12'>
                    {value}
                </p>
            </div>
            <div style={{ width: '200px', height: '200px' }} className='p-10 flex items-center justify-center'>
                <CircularProgressbar 
                    value={progress} 
                    text={`${progress}%`} 
                    styles={buildStyles({
                        textColor: color,
                        pathColor: color,
                    })} 
                    />
            </div>  
        </motion.div>
    )
}

export default ChartCard;