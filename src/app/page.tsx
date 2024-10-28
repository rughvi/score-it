"use client";
import Image from "next/image";
import { addGame } from "@/firebase/firestore/addData";
import {v4 as uuidv4} from 'uuid';
import { useRouter } from 'next/navigation'
import { useDispatch } from "react-redux";
import { startGame } from "@/redux/slices/gameSlice";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const onStartAGameClick = async () => {
    let id = uuidv4();
    let {result, error} = await addGame("games", {id: id, createdAt: Date.now()});
    if(error === undefined || error === null){
      dispatch(startGame(id));
      router.push('/teams');
    }
    else{
      console.log(error)
    }    
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={() => onStartAGameClick()}> Start a game </button>          
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div>
          Welcome
        </div>        
      </footer>
    </div>
  );
}
