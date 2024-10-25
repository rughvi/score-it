"use client";
import { useEffect, useState } from "react";
import { GameTeams } from "../enums/GameTeams";
import { TeamPlayer } from "../models/TeamPlayer";
 
export default function Teams(){
    const [teamPlayers, setTeamPlayers] = useState<TeamPlayer[]>([]);
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
        console.log(team);
        console.log(id);
        if(team === GameTeams.Team1){
            let teamPlayer = teamPlayers.find((p:People) => p.id == id);
            if(teamPlayer){
                teamPlayer.team = GameTeams.Team1;
            }
        }
        else{
            let teamPlayer = teamPlayers.find((p:People) => p.id == id);
            if(teamPlayer){
                teamPlayer.team = GameTeams.Team2;
            }
        }
        //TODO below
        setTeamPlayers(teamPlayers);
    }

    return(
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <ul>
                    {teamPlayers.map((tp:TeamPlayer) => (
                    <li key={tp.id}>
                        <div className="grid grid-cols-3 gap-3 items-center py-1">
                            <div>{tp.name}</div>
                            <div className={`rounded-full border border-solid ${ tp.team === GameTeams.Team1? 'border-transparent' : 'border-black'} transition-colors flex items-center justify-center ${ tp.team === GameTeams.Team1 ? 'bg-foreground text-background': '' } gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-8 sm:h-8 px-4 sm:px-5`}
                                onClick={() => onTeamClick(GameTeams.Team1, tp.id)}>
                                Team 1
                            </div>
                            <div className={`rounded-full border border-solid ${ tp.team === GameTeams.Team2? 'border-transparent' : 'border-black'} transition-colors flex items-center justify-center ${ tp.team === GameTeams.Team2 ? 'bg-foreground text-background': '' } gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-8 sm:h-8 px-4 sm:px-5`}
                                onClick={() => onTeamClick(GameTeams.Team2, tp.id)}>
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