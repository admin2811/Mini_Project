import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function POST(request: Request) {
    try {
        const { name, email, password, msv, hobby, workingSkill, mainActivity, infoSource, similarity_scores, suitable_group } = await request.json();
        console.log("Received request data:", { name, email, password, msv, hobby, workingSkill, mainActivity, infoSource, similarity_scores, suitable_group });
        if (!name || !email || !password || !msv || !hobby || !workingSkill || !mainActivity || !infoSource || !similarity_scores || !suitable_group) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }
        const isValidEmail = (email: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };
        if (!isValidEmail(email)) {
            return NextResponse.json({ message: "Email không đúng định dạng!" }, { status: 400 });
        }
        if (password.length < 5) {
            return NextResponse.json({ message: "Mật khẩu phải có ít nhất 5 ký tự!" }, { status: 400 });
        }
        if (mongoose.connection.readyState === 0) {
            await connectToDatabase();
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "Người dùng đã tồn tại!" }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            msv,
            hobby,
            workingSkill,
            mainActivity,
            infoSource,
            similarity_scores,
            suitable_group,
        });
        try {
            await newUser.save();
        } catch (error) {
            console.error("Lỗi lưu người dùng:", error);
            return NextResponse.json({ message: "Lỗi lưu người dùng vào CSDL!" }, { status: 500 });
        }
        return NextResponse.json({ message: "Đăng ký thành công" }, { status: 201 });

    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        return NextResponse.json({ message: "Something went wrong, please try again later!" }, { status: 500 });
    }
}
