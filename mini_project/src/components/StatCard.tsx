"use client"
import * as React from "react";
import { motion } from "framer-motion";
interface StatCardProps {
    name: string;
    value: number | string;
}
const StatCard: React.FC<StatCardProps> = ({ name, value }) => {
    return (
        <motion.div 
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
        >
            <div className='px-4 py-5 sm:p-6'>
				<span className='flex items-center text-sm font-medium text-gray-400'>
					{name}
				</span>
				<p className='mt-1 text-3xl font-semibold text-gray-100'>{value}</p>
			</div>
        </motion.div>
    )

}