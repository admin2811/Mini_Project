"use client"
import React, {useEffect, useState} from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
const Form = () => {
    const [formData, setFormData] = useState({
        student_name: "",
        email: "",
        password: "",
        result_MIS: "",
        level_programs_skill: "",
        team_work_skill: "",
        priority_work: "",
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleDropdownChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = "http://localhost:8080/api/post-student-data/";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    student_name: formData.student_name,
                    email: formData.email,
                    password: formData.password,
                    result_MIS: formData.result_MIS,
                    level_programs_skill: formData.level_programs_skill,
                    team_work_skill: formData.team_work_skill,
                    priority_work: formData.priority_work,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error:", errorData);
                alert("Error occurred: " + errorData.error);
                return;
            }
            const data = await response.json();
            console.log("Response Data:", data);
            // Hiển thị thông báo thành công hoặc xử lý dữ liệu nhận được
            alert("Data processed successfully! Compatibility: " + data.data.similarity_index);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to send data to server.");
        }
    };
  useEffect(() => {
  })
  return (
    <div>
        <div className="flex flex-col items-center justify-center h-screen bg-white">
                <div className="w-full max-w-xl bg-[#1c2534] rounded-xl shadow-md py-8 px-8 mx-auto z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h2 className="text-[28px] font-bold text-white mb-6 text-center">Nhập thông tin</h2>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <div className="flex space-x-4 mb-4">
                            <input
                                placeholder="Họ và tên"
                                className="bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150"
                                type="text"
                                name="student_name"
                                value={formData.student_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex space-x-4 mb-4">
                            <input
                                placeholder="Email"
                                className="bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex space-x-4 mb-4">
                            <input
                                placeholder="Mật khẩu"
                                className="bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex space-x-4 mb-4">
                            <input
                                placeholder="Điểm trung bình môn gần nhất"
                                className="bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150"
                                type="number"
                                name="result_MIS"
                                value={formData.result_MIS}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex space-x-4 mb-4">
                            <div className="text-white flex gap-5">
                            <Dropdown>
                                    <DropdownTrigger>
                                        <Button className="text-white" variant="bordered">
                                            {formData.level_programs_skill || "Khả năng Lập trình"}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Khả năng Lập trình"
                                        onAction={(key) => handleDropdownChange("level_programs_skill", key as string)}
                                    >
                                        <DropdownItem key="1 - rất kém">1 - rất kém</DropdownItem>
                                        <DropdownItem key="2 - kém">2 - kém</DropdownItem>
                                        <DropdownItem key="3 - trung bình">3 - trung bình</DropdownItem>
                                        <DropdownItem key="4 - ổn">4 - ổn</DropdownItem>
                                        <DropdownItem key="5 - tốt">5 - tốt</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button className="text-white" variant="bordered">
                                            {formData.team_work_skill || "Làm việc nhóm"}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Làm việc nhóm"
                                        onAction={(key) => handleDropdownChange("team_work_skill", key as string)}
                                    >
                                        <DropdownItem key="tổng hợp">Tổng hợp</DropdownItem>
                                        <DropdownItem key="tìm task">Tìm task</DropdownItem>
                                        <DropdownItem key="phân chia task">Phân chia task</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button className="text-white" variant="bordered">
                                            {formData.priority_work || "Sở thích"}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Sở thích"
                                        onAction={(key) => handleDropdownChange("priority_work", key as string)}
                                    >
                                        <DropdownItem key="lập trình">Lập trình</DropdownItem>
                                        <DropdownItem key="thiết kế">Thiết kế</DropdownItem>
                                        <DropdownItem key="phân tích">Phân tích</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                        <button
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in duration-200"
                            type="submit"
                        >
                            Gửi thông tin
                        </button>
                    </form>
                </div>
            </div>
    </div>
  )
}

export default Form
