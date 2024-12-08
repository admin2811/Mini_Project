import React from "react";
import Header from "./Header";
import UserTable from "./UserTable";

interface UserProps{
  group: number
}
const User: React.FC<UserProps> = ({ group }) => {
    return (
        <div className='flex-1 relative z-10'>
          <Header title={`Cụm ${group}`}  />
            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                <UserTable  group ={group}/>
            </main>
        </div>
    )
}
export default User