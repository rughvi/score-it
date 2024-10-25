"use client";
import { useEffect, useState } from "react";
import { GameTeams } from "../enums/GameTeams";
import { TeamPlayer } from "../models/TeamPlayer";

export default function Teams(){
    const [teamPlayers, setTeamPlayers] = useState<TeamPlayer[]>([]);
    const [guestTeam, setGuestTeam] = useState<GameTeams>(GameTeams.Team1);
    const [guestName, setGuestName] = useState('');
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

    const onGuestTeamClick = (team: GameTeams) => {
        setGuestTeam(team);
    }

    const onAddGuest = () => {
        if(guestName === ''){
            return;
        }
        let tps = teamPlayers.map(tp => tp);
        tps.push({
            id: Math.max(...tps.map(tp => tp.id), 0) + 1,
            name: guestName,
            team: guestTeam
        })

        setTeamPlayers(tps);
        setGuestName('');
        setGuestTeam(GameTeams.Team1);
    };

    return(
        <div className="grid items-center justify-items-center min-h-screen p-0 pb-5 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-1 items-center sm:items-center">
                <div>
                    Make teams
                </div>
                
                <ul>
                    {teamPlayers.map((tp:TeamPlayer) => (
                    <li key={tp.id}>
                        <div className="grid grid-cols-3 gap-3 items-center py-1">
                            <div>{tp.name}</div>
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
            <footer className="row-start-5 flex gap-2 flex-wrap items-center justify-center">
                <div>
                    <input className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full focus:outline-none focus:bg-white focus:border-black py-1 px-3" name="guestName" placeholder="Enter guest name"
                        value={guestName}
                        onChange={(event) => setGuestName(event.target.value)}/>
                    <div className="grid grid-cols-2 gap-2 justify-items-center items-center py-2">
                        <div className={`rounded-full border border-solid ${ guestTeam === GameTeams.Team1? 'border-transparent' : 'border-black'} transition-colors flex items-center justify-center ${ guestTeam === GameTeams.Team1 ? 'bg-foreground text-background': '' } gap-2 text-sm sm:text-base h-8 sm:h-8 px-4 sm:px-5`}
                            onClick={() => onGuestTeamClick(GameTeams.Team1)}>
                            Team 1
                        </div>

                        <div className={`rounded-full border border-solid ${ guestTeam === GameTeams.Team2? 'border-transparent' : 'border-black'} transition-colors flex items-center justify-center ${ guestTeam === GameTeams.Team2 ? 'bg-foreground text-background': '' } gap-2 text-sm sm:text-base h-8 sm:h-8 px-4 sm:px-5`}
                            onClick={() => onGuestTeamClick(GameTeams.Team2)}>
                            Team 2
                        </div>
                    </div>
                    <div>
                        <button className="w-full bg-gray-200 rounded border-2 text-sm sm:text-base h-8 sm:h-8" onClick={() => onAddGuest()}>Add Guest</button>
                    </div>
                </div>
            </footer>
        </div>
    )
}