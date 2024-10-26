"use client";
import { useEffect, useState } from "react";
import { GameTeams } from "../enums/GameTeams";
import { TeamPlayer } from "../models/TeamPlayer";
import ModalContent from "../modals/page";
import { createPortal } from "react-dom";
import AddGuest from "../addGuest/page";

export default function Teams(){
    const [teamPlayers, setTeamPlayers] = useState<TeamPlayer[]>([]);
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        fetch('/people.json')
          .then(response => response.json())
          .then((d:{"people":People[]}) => {
            let tps: TeamPlayer[] = [];
            for(const p of d.people){
                const r = Math.floor(Math.random() * d.people.length);
                if(r % 2 === 0){
                    let teamPlayer:TeamPlayer = {
                        id: p.id,
                        name: p.name,
                        team: GameTeams.Team1
                    }
                    tps.push(teamPlayer);
                }else{
                    let teamPlayer:TeamPlayer = {
                        id: p.id,
                        name: p.name,
                        team: GameTeams.Team2
                    }
                    tps.push(teamPlayer);
                }
            }
            setTeamPlayers(tps);
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);
      
    const onTeamClick = (team: GameTeams, id:number) => {
        let tps = teamPlayers.map(tp => (tp.id === id ? {...tp, team:team} : tp));
        setTeamPlayers(tps);
    }

    const onAddGuest = (guestName:string, guestTeam: GameTeams) => {
        if(guestName === ''){
            return;
        }
        let tps = teamPlayers.map(tp => tp);
        tps.push({
            id: Math.max(...tps.map(tp => tp.id), 0) + 1,
            name: guestName,
            team: guestTeam,
            isGuest: true
        })

        setTeamPlayers(tps);
    };

    return(
        <div className="grid items-center justify-items-center min-h-screen p-0 pb-5 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
                <div className="text-lg font-medium">
                    Make teams
                </div>
                
                <ul>
                    {teamPlayers.map((tp:TeamPlayer) => (
                    <li key={tp.id}>
                        <div className="grid grid-cols-3 gap-3 items-center py-1">
                            <div>{tp.name} {tp.isGuest && <span>(G)</span>}</div>
                            <div className={`rounded-full border border-solid ${ tp.team === GameTeams.Team1? 'border-transparent' : 'border-black'} transition-colors flex items-center justify-center ${ tp.team === GameTeams.Team1 ? 'bg-foreground text-background': '' } gap-2 text-sm sm:text-base h-8 sm:h-8 px-4 sm:px-5`}
                                onClick={() => onTeamClick(GameTeams.Team1, tp.id)}>
                                Team 1
                            </div>
                            <div className={`rounded-full border border-solid ${ tp.team === GameTeams.Team2? 'border-transparent' : 'border-black'} transition-colors flex items-center justify-center ${ tp.team === GameTeams.Team2 ? 'bg-foreground text-background': '' } gap-2 text-sm sm:text-base h-8 sm:h-8 px-4 sm:px-5`}
                                onClick={() => onTeamClick(GameTeams.Team2, tp.id)}>
                                Team 2
                            </div>
                        </div>                        
                    </li>
                    ))}
                </ul>               
            </main>
            <div className="row-start-6 flex flex-col  space-y-3">
                <button className="rounded-full bg-gray-200 border-solid border-2 p-2 w-32">Continue</button>
                <button className="rounded-full bg-gray-50 border-solid border-black border p-2 w-32"
                    onClick={() => setShowModal(true)}>Add Guest</button>
            </div>
            {showModal && createPortal(
                <ModalContent onClose={() => setShowModal(false)}>
                    <AddGuest onAddGuest={onAddGuest}></AddGuest>                    
                </ModalContent>,
                document.body
            )}
            <footer className="row-start-7 flex gap-2 flex-wrap items-center justify-center">
                
            </footer>
        </div>
    )
}