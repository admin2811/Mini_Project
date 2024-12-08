import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import GroupSelection from '@/models/groupSelection';

export async function POST(request: Request){
    try {
        const {name ,email, msv, compatibility, group} = await request.json();
        console.log("Received group selection data:", {name, email, msv, compatibility, group});
        if(!name || !email || !msv || !compatibility || !group){
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }
        if (mongoose.connection.readyState === 0) {
            await connectToDatabase();
        }
        const groupUsers = await GroupSelection.find({ group }).sort({ compatibility: 1 });
        if(groupUsers.length < 5){
            const newGroupSelection = new GroupSelection({
                name, email, msv, compatibility, group, createdAt: new Date()
            })
            await newGroupSelection.save();
            return NextResponse.json({ message: "Group selection saved successfully" }, { status: 201 });
        }else{
            const lowestCompatibilityUser = groupUsers[0];
            if (parseFloat(compatibility.toString()) > parseFloat(lowestCompatibilityUser.compatibility.toString())) {
                await GroupSelection.findByIdAndUpdate(lowestCompatibilityUser._id, {
                    name,
                    email,
                    msv,
                    compatibility,
                    group,
                    updatedAt: new Date(),
                });

                return NextResponse.json({ message: "Group selection updated successfully" }, { status: 200 });
            } else {
                return NextResponse.json({ message: "Your compatibility is not high enough to join this group" }, { status: 400 });
            }
        }
    }catch(error){
        console.error("Error handling group selection: ", error);
        return NextResponse.json({ message: "Something went wrong, please try again later!" }, { status: 500 });
    }
}