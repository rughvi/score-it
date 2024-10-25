"use client";
import { useEffect, useState } from "react";

export default function Teams(){
    const [data, setData] = useState({"people": []});
    const [team1, setTeam1] = useState<number[]>([]);
    const [team2, setTeam2] = useState<number[]>([]);
    useEffect(() => {
        fetch('/people.json')
          .then(response => response.json())
          .then(data => {
            setData(data);
            for(const p of data.people){
                const r = Math.floor(Math.random() * data.people.length);
                if(r % 2 === 0){
                    team1.push(p.id);
                }else{
                    team2.push(p.id);
                }
            }
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);
      
    return(
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <ul>
                    {data.people.map((p:People) => (
                    <li key={p.id}>
                        <div className="grid grid-cols-3 gap-3 items-center py-1">
                            <div>{p.name}</div>
                            <div className={`rounded-full border border-solid ${ team1.includes(p.id)? 'border-transparent' : 'border-black'} transition-colors flex items-center justify-center ${ team1.includes(p.id) ? 'bg-foreground text-background': '' } gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-8 sm:h-8 px-4 sm:px-5`}>
                                Team 1
                            </div>
                            <div className={`rounded-full border border-solid ${ team2.includes(p.id)? 'border-transparent' : 'border-black'} transition-colors flex items-center justify-center ${ team2.includes(p.id) ? 'bg-foreground text-background': '' } gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-8 sm:h-8 px-4 sm:px-5`}>
                                Team 2
                            </div>
                        </div>
                        
                    </li>
                    ))}
                </ul>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    )
}