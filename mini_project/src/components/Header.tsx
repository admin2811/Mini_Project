'use client'
import React, {useState} from 'react';
import { NameInitialsAvatar } from 'react-name-initials-avatar';
import '@/css/Header.css'
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
interface HeaderProps {
  title: string
}
const Header: React.FC<HeaderProps> = ({ title }) => {
    const router = useRouter()
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
      };
    const handleSignOut = async () => {
        await signOut({
          redirect: false,
        });
        router.push("/sign-in");
    };
    const username = 'Admin'  
	return (
		<header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 flex justify-between relative z-10'>
			<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
				<h1 className='text-2xl font-semibold text-gray-100'>{title}</h1>
			</div>
            <div className='flex justify-between items-center mr-10 gap-x-5'>
            <p className='hidden lg:block'>{username}</p>
            <div className='cursor-pointer relative'>
                    <button className='text-white group' onClick={toggleMenu}>
                        <NameInitialsAvatar name={username} width={40} height={40} fontSize={20}  />
                        {menuOpen && (
                        <div className='absolute bg-white rounded-lg shadow w-32 z-20 top-full right-0 flex-col'>
                            <ul className='py-2 text-sm text-gray-950 flex-col'>
                            <li className='py-2 px-4 hover:bg-gray-200 cursor-pointer'>Profile</li>
                            <li className='py-2 px-4 hover:bg-gray-200 cursor-pointer' onClick={() => handleSignOut()}>Log Out</li>
                            </ul>
                        </div> 
                        )}
                    </button>
            </div>
        </div>
		</header>
	);
};
export default Header;
