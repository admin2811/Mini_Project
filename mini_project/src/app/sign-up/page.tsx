// src/app/dangky/page.tsx
"use client"
import React, {useState,useEffect} from "react";
import ParticlesBackground from "@/components/Particles";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardDescription,
    CardContent,
    CardTitle,
  } from "@/components/ui/card";
  
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Link from "next/link";
import {toast} from "sonner"
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import Loading from "./loading";
export default function SignUp() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        msv: "",
        hobby: "",
        workingSkill: "",
        mainActivity: "",
        infoSource: "",
    });
    const handleDropdownChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
    };
      const [pending, setPending] = useState(false);
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(false);
      useEffect(() => {
        if (window.performance) {
            const entries = performance.getEntriesByType("navigation");

            if (entries.length && (entries[0] as PerformanceNavigationTiming).type === "navigate") {
                window.location.reload();
            }
        }
    }, []);
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data: ", form);
        setPending(true);
        setError(null);
        try {
            const response = await fetch("http://127.0.0.1:8080/api/post-student-data/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Something went wrong");
            }
            const data = await response.json();
            console.log("Response from API:", data);
            const data1 = data.data;
            if (data1 && response.ok) {
                localStorage.setItem("data", JSON.stringify(data1));
                setLoading(true);
                setPending(false);
                setTimeout(() => {
                    setLoading(false);
                    router.push("/notification");
                }, 10000);
            } else {
                throw new Error("Invalid data received from API");
            }
        } catch (err: any) {
            console.error("Error during API call:", err);
            setError(err.message || "Something went wrong");
            toast.error("Đã xảy ra lỗi!");
        } finally {
            setPending(false);
        }
    };
    if (loading) {
        return <Loading />; 
    }
    return (
        <>
        <div className="h-full flex items-center justify-center ">
                <ParticlesBackground/>
                <div className="bg-white rounded-lg">
                    <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
                        <CardHeader>
                        <CardTitle className="text-center">Sign up</CardTitle>
                        <CardDescription className="text-sm text-center text-accent-foreground">
                            Use email or service, to create account
                        </CardDescription>
                        </CardHeader>
                        {!!error && (
                        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6"
                        role="alert"
                        aria-live="assertive"
                        >
                            <TriangleAlert />
                            <p>{error}</p>
                        </div>
                        )}
                        <CardContent className="px-2 sm:px-6">
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <Input
                            type="text"
                            disabled={pending}
                            placeholder="Họ và tên"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            />
                            <Input
                            type="email"
                            disabled={pending}
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                            />
                            <Input
                            type="password"
                            disabled={pending}
                            placeholder="Mật khẩu"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                            />
                            <Input
                            type="password"
                            disabled={pending}
                            placeholder="Xác nhận lại mật khẩu"
                            value={form.confirmPassword}
                            onChange={(e) =>
                                setForm({ ...form, confirmPassword: e.target.value })
                            }
                            required
                            />
                            <Input
                            type="text"
                            step="0.1"
                            disabled={pending}
                            placeholder="MSV"
                            value={form.msv}
                            onChange={(e) =>
                                setForm({ ...form, msv: e.target.value })
                            }
                            required
                            /> 
                            <div className="flex flex-col gap-4">
                                <Dropdown className="text-black/50 w-10">
                                            <DropdownTrigger>
                                                <Button className="w-full text-black/50" variant="outline">
                                                    {form.hobby || "Sở thích"}
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu
                                                aria-label="Sở thích"
                                                onAction={(key) => handleDropdownChange("hobby", key as string)}
                                            >
                                                <DropdownItem key="Kinh tế">Kinh tế</DropdownItem>
                                                <DropdownItem key="Nông nghiệp">Nông nghiệp</DropdownItem>
                                                <DropdownItem key="Bất động sản">Bất động sản</DropdownItem>
                                                <DropdownItem key="Giáo dục">Giáo dục</DropdownItem>
                                            </DropdownMenu>
                                </Dropdown>
    
                                <Dropdown className="text-black/50">
                                            <DropdownTrigger>
                                                <Button className="text-black/50" variant="outline">
                                                    {form.workingSkill || "Kĩ năng làm việc"}
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu
                                                aria-label="Kỹ năng làm việc"
                                                onAction={(key) => handleDropdownChange("workingSkill", key as string)}
                                            >
                                                <DropdownItem key="Tổng hợp">Tổng hợp</DropdownItem>
                                                <DropdownItem key="Tìm task">Tìm task</DropdownItem>
                                                <DropdownItem key="Phân chia task">Phân chia task</DropdownItem>
                                                <DropdownItem key="Tìm công việc mới">Tìm công việc mới</DropdownItem>
                                            </DropdownMenu>
                                </Dropdown>
                                <Dropdown className="text-black/50">
                                            <DropdownTrigger>
                                                <Button className="text-black/50" variant="outline">
                                                    {form.mainActivity || "Hoạt động chính"}
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu
                                                aria-label="Hoạt động chính"
                                                onAction={(key) => handleDropdownChange("mainActivity", key as string)}
                                            >
                                                <DropdownItem key="Phân tích tài chính">Phân tích tài chính</DropdownItem>
                                                <DropdownItem key="Sản xuất">Sản xuất</DropdownItem>
                                                <DropdownItem key="Đầu tư">Đầu tư</DropdownItem>
                                                <DropdownItem key="Đào tạo">Đào tạo</DropdownItem>
                                            </DropdownMenu>
                                </Dropdown>
                                <Dropdown className="text-black/50">
                                            <DropdownTrigger>
                                                <Button className="text-black/50" variant="outline">
                                                    {form.infoSource || "Nguồn thông tin"}
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu
                                                aria-label="Nguồn thông tin"
                                                onAction={(key) => handleDropdownChange("infoSource", key as string)}
                                            >
                                                <DropdownItem key="Người dùng cá nhân">Người dùng cá nhân</DropdownItem>
                                                <DropdownItem key="Môi trường">Sản xuất</DropdownItem>
                                                <DropdownItem key="Địa lý">Địa lý</DropdownItem>
                                                <DropdownItem key="Học tập">Học tập</DropdownItem>
                                            </DropdownMenu>
                                </Dropdown>
                            </div>
                            <Button className="w-full" size="lg" disabled={pending}>
                            Continue
                            </Button>
                        </form>
                        <Separator />
                        <p className="text-center text-sm mt-2 text-muted-foreground">
                            Already have an account?
                            <Link
                            className="text-sky-700 ml-4 hover:underline cursor-pointer"
                            href="sign-in"
                            >
                            Sign in{" "}
                            </Link>
                        </p>
                        </CardContent>
                    </Card>
                 </div>
            </div>
    </>
    );
}
  