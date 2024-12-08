import mongoose, { Schema, Model, Document } from 'mongoose';

// Định nghĩa interface cho User
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  msv: string;
  hobby: string;
  workingSkill: string;
  mainActivity: string;
  infoSource: string;
  similarity_scores: {
    group_1: { similarity_score: number };
    group_2: { similarity_score: number };
    group_3: { similarity_score: number };
    group_4: { similarity_score: number };
  };
  suitable_group: number;
}
// Tạo Schema cho User
const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true, // Bắt buộc
    },
    msv: {
      type: String,
      required: true,
    },
    hobby: {
      type: String,
      required: true,
      enum: ['Kinh tế', 'Nông nghiệp', 'Bất động sản', 'Giáo dục'], // Giá trị có thể chọn
    },
    workingSkill: {
      type: String,
      required: true,
      enum: ['Tổng hợp', 'Tìm công việc mới', 'Phân chia task','Tìm task'], // Giá trị có thể chọn
    },
    mainActivity: {
      type: String,
      required: true,
      enum: ['Phân tích tài chính', 'Sản xuất', 'Đầu tư', 'Đào tạo'], // Giá trị có thể chọn
    },
    infoSource: {
      type: String,
      required: true,
      enum: ['Người dùng cá nhân', 'Môi trường', 'Địa lý', 'Học tập'], // Giá trị có thể chọn
    },
    similarity_scores: {
      group_1: { similarity_score: { type: Number, required: true } },
      group_2: { similarity_score: { type: Number, required: true } },
      group_3: { similarity_score: { type: Number, required: true } },
      group_4: { similarity_score: { type: Number, required: true } },
    },
    suitable_group: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Tạo model User
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
