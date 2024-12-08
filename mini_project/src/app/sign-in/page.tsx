"use client";
//shadcn ui
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
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";
import ParticlesBackground from "@/components/Particles";
import { signIn } from 'next-auth/react'
export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const group = searchParams.get('group');
  console.log(group) 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const res = await signIn('credentials', {
        redirect: false,
        email,
        password
    });
    const checkGroupRes = await fetch(`/api/check-group?email=${email}`);
    const data = await checkGroupRes.json();
    if (data.exists) {
        // Nếu người dùng tồn tại, chuyển hướng tới dashboard của nhóm
        const { name, group } = data;
        console.log("User:", name, "Group:", group);
        router.replace(`/dashboard/${group}`);
      } else {
        // Nếu người dùng không tồn tại, hiển thị thông báo lỗi
        setError("User not found.");
        setPending(false);
        router.replace('/admin')
    }
  }

  return (
    <div className="h-full flex items-center justify-center">
        <ParticlesBackground/>
        <div className="bg-white rounded-lg">
        <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
        <CardHeader>
            <CardTitle className="text-center">Sign in</CardTitle>
            <CardDescription className="text-sm text-center text-accent-foreground">
            Use email or service, to sign in
            </CardDescription>
        </CardHeader>
        {!!error && (
            <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert />
            <p>{error}</p>
            </div>
        )}
        <CardContent className="px-2 sm:px-6">
            <form onSubmit={handleSubmit} className="space-y-3">
            <Input
                type="email"
                disabled={pending}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                type="password"
                disabled={pending}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button className="w-full" size="lg" disabled={pending}>
                continue
            </Button>
            </form>
            <Separator />
            <p className="text-center text-sm mt-2 text-muted-foreground">
            Create new account
            <Link
                className="text-sky-700 ml-4 hover:underline cursor-pointer"
                href="sign-up"
            >
                Sign up{" "}
            </Link>
            </p>
        </CardContent>
        </Card>
        </div>
  </div>
  )
}