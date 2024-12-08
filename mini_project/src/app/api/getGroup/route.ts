import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import GroupSelection from "@/models/groupSelection";

export async function GET(req: Request){
   try{
    const { searchParams } = new URL(req.url);
    const group = searchParams.get('group');
    console.log(group);
    if (!group) {
       return NextResponse.json({ message: "Group parameter is required" }, { status: 400 });
    }
    const groupDetails = await GroupSelection.find({ group });
      // Trả về thông tin nhóm
      return NextResponse.json(groupDetails, { status: 200 });   }catch(error){
    console.error("Error fetching group detail:", error);
    return NextResponse.json({ message: "Failed to fetch group details" }, { status: 500 })
   }
}