"use-client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from 'react';


const UserButton = ({ onSessionChange }: { onSessionChange: (session: any) => void }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Notify parent component of session change
  React.useEffect(() => {
    onSessionChange(session);
  }, [session]);

  if (status === "loading") {
    return <Loader className="size-6 mr-4 mt-4 float-right animate-spin" />;
  }

  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/sign-in");
  };

  return (
    <nav>
      {session ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="outline-none relative float-right p-4 md:p-8">
            <div className="flex gap-4 items-center">
              <span className="text-white">{session.user?.name}</span>
              <Avatar className="size-10 hover:opacity-75 transition">
                <AvatarImage
                  className="size-10 hover:opacity-75 transition"
                  src={session.user?.image || undefined}
                />
                <AvatarFallback className="bg-sky-900 text-white">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" side="bottom" className="w-50">
            <DropdownMenuItem className="h-10 text-white" onClick={() => handleSignOut()}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex justify-end p-4 gap-4">
          <Button>
            <Link href="sign-in">Sign in</Link>
          </Button>
          <Button>
            <Link href="sign-up">Sign up</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default UserButton;