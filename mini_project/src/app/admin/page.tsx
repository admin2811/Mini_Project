'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { SessionProvider, useSession } from "next-auth/react";
import Logo from '@/assets/logo.svg'
import ChartCard from '@/components/ChartCard'
import InfoCard from '@/components/InfoCard'
import { useRouter } from 'next/navigation';
import UserButton from "@/components/user-button";
import { TypeAnimation } from 'react-type-animation';

interface SimilarityScores {
    [key: string]: {
      similarity_score: number;
    };
  }
const AdminComponent:React.FC = () => {
  const [cum1, setCum1] = useState(0)
  const [cum2, setCum2] = useState(0)
  const [cum3, setCum3] = useState(0)
  const [cum4, setCum4] = useState(0)
  const [session, setSession] = useState<any>(null); // Lưu session trong state
  const { data: sessionData } = useSession(); // Dữ liệu session từ next-auth
  const [showAlert, setShowAlert] = useState(false); // Trạng thái để hiển thị thông báo
  const [message, setMessage] = useState<string | null>(null); // Lưu thông báo kết quả
  const [similarityScores, setSimilarityScores] = useState<SimilarityScores>({});
  const [msv, setMsv] = useState("")
  useEffect(() => {
    const storeData = localStorage.getItem('data');
    console.log(storeData);
    if (storeData) {
      try {
        const data = JSON.parse(storeData);
        if (data && data.similarity_scores) {
          setSimilarityScores(data.similarity_scores);
          setMsv(data.msv);
        } else {
          console.log("Dữ liệu không hợp lệ");
        }
      } catch (error) {
        console.error("Lỗi khi parse JSON", error);
      }
    } else {
      console.log("No similarity scores found.");
    }
  }, []);
  

  const topicMap = {
    group_1: "1",
    group_2: "2",
    group_3: "3",
    group_4: "4",
  };
  
  const imageMap = {
    group_1: "https://littlevisuals.co/images/red_dawn.jpg",
    group_2: "https://littlevisuals.co/images/sunset.jpg",
    group_3: "https://littlevisuals.co/images/tail.jpg",
    group_4: "https://littlevisuals.co/images/steam.jpg",
  };

  const scoresArray = similarityScores
  ? Object.keys(similarityScores).map((groupKey) => ({
      group: groupKey as keyof typeof topicMap,
      similarity_score: similarityScores[groupKey]?.similarity_score || 0,
    }))
  : [];
  
  console.log(scoresArray)

  
  const [pending, setPending] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const storeData = localStorage.getItem('data') // Lấy dữ liệu từ localStorage

    if (storeData) {
      const data = JSON.parse(storeData) // Chuyển chuỗi JSON thành đối tượng
      console.log(data)
      const similarityScores = data.similarity_scores;
      console.log(similarityScores)
      setCum1(similarityScores.group_1.similarity_score);
      setCum2(similarityScores.group_2.similarity_score);
      setCum3(similarityScores.group_3.similarity_score);
      setCum4(similarityScores.group_4.similarity_score);
    }
  }, []); 

  const handleJoinGroup = async (group: string, compatibility: string) => {
    setPending(true);
    if (!session) {
        setShowAlert(true);
        return;
    }

    if (!session?.user?.email || !session?.user?.name) {
        setMessage("Session is invalid. Please log in again.");
        return;
    }

    try {
        const response = await fetch("/api/saveGroup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: session.user.name, // Lấy tên từ session
                email: session.user.email,
                msv: msv,
                compatibility,
                group,
            }),
        });
        if (response.ok) {
            setPending(false);
            const data = await response.json();
            setMessage(data.message);
            router.push(`/dashboard/${group}`);
        } else {
            const errorData = await response.json();
            setMessage(errorData.message);
        }
    } catch (error) {
        console.error("Error joining group:", error);
        setMessage("An error occurred while saving the group selection.");
    }
  };
  return (
    <div className='w-full h-full bg-slate-800'>
        <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
            <header className='sticky top-3 z-20 mx-3 flex items-center justify-between rounded-2xl bg-[#0b0d0c] px-[5%] py-5 shadow-lg xl:px-12;'>
                <UserButton
                    onSessionChange={(newSession) => setSession(newSession)} // Cập nhật session khi có sự thay đổi
                />
            </header>
            <main className='flex flex-col items-center space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-12;'>
                <section className='w-full space-y-4'>
                <TypeAnimation
                    className='font-bold md:text-36-bold text-white text-8xl'
                    sequence={[
                      // Same substring at the start will only be typed out once, initially
                      'Welcome 👋',
                      1000, // wait 1s before replacing "Mice" with "Hamsters"
                      'Bạn đang hiện tại ở trang chọn nhóm theo ý thích',
                      1000,
                      'Hãy lựa chọn cẩn thận',
                      1000,
                      'Khi chọn nhóm bạn sẽ phải thực hiện chọn lại nhóm',
                      1000
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: '2em', display: 'inline-block' }}
                    repeat={Infinity}
                  />
                    <p className='text-gray-500'>Start the day with managing new</p>
                </section>
                <section className='flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10'>
                    <ChartCard name="Thông số" value="Nhóm 1" color="#6366F1" percentage={cum1} />
                    <ChartCard name="Thông số" value="Nhóm 2" color='#EC4899' percentage={cum2} />
                    <ChartCard name="Thông số" value="Nhóm 3" color='#8B5CF6' percentage={cum3} />
                    <ChartCard name="Thông số" value="Nhóm 4" color="#6366F1" percentage={cum4} />
                </section>
                <section className='flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10'>
                {scoresArray.map(({ group, similarity_score }) => (
                    <InfoCard
                        key={group}
                        group={topicMap[group]}
                        compatibility={`${similarity_score.toFixed(2)}%`}
                        imageURL={imageMap[group]}
                        studentCount="4"
                        onClick={() => handleJoinGroup(topicMap[group], similarity_score.toFixed(2))}
                    />
                    ))}
                </section>
            </main>
        </div>
    </div>
  )
}
const Admin: React.FC = () => {
    return (
      <SessionProvider>
        <AdminComponent />
      </SessionProvider>
    );
  };
  
export default Admin
