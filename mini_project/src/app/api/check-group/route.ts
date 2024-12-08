// app/api/check-group/route.ts

import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';  // Kết nối MongoDB
import GroupSelection from '@/models/groupSelection';     // Import Model Group

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');  // Lấy email từ query params

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    await connectMongo();  // Kết nối đến MongoDB

    // Tìm người dùng theo email và lấy tên, group
    const user = await GroupSelection.findOne({ email }).select('name group');

    if (user) {
      return NextResponse.json({
        exists: true,
        name: user.name,
        group: user.group,
      });
    } else {
      return NextResponse.json({ exists: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
