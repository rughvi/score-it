"use client";
import { useEffect, useState } from "react";
import { GameTeams } from "../enums/GameTeams";
import { TeamPlayer } from "../models/teamPlayer";
import ModalContent from "../modals/page";
import { createPortal } from "react-dom";
import AddGuest from "../addGuest/page";
import { useRouter } from "next/navigation";
import PlayerTeamAssignmentRow from "./playerTeamAssignmentRow";
import TeamsConfirmation from "./teamsConfirmation";
import { useAuthContext } from "@/context/AuthContext";
import { People } from "../models/people";
import { randomUUID, UUID } from "crypto";

export default function Teams(){
    const { user } = useAuthContext();
    const router = useRouter();
    const [teamPlayers, setTeamPlayers] = useState<TeamPlayer[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showTeamsConfirmation, setShowTeamsConfirmation] = useState(false);

    useEffect(() => {
        if(user === undefined || user === null){
            router.push("/signin");
            return;
        }
        fetch('/people.json')
          .then(response => response.json())
          .then((d:{"people":People[]}) => {
            distributePlayersToTeams(d);
          })
          .catch(error => console.error('Error fetching data:', error));
      }, [user]);
    
    const distributePlayersToTeams = (data: {"people":People[]}) => {
        let tps: TeamPlayer[] = [];
        for(const p of data.people){
            const r = Math.floor(Math.random() * data.people.length);
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
    }

    const onTeamClick = (team: GameTeams, id:UUID) => {
        let tps = teamPlayers.map(tp => (tp.id === id ? {...tp, team:team} : tp));
        setTeamPlayers(tps);
    }

    const onAddGuest = (guestName:string, guestTeam: GameTeams) => {
        if(guestName === ''){
            return;
        }
        let tps = teamPlayers.map(tp => tp);
        tps.push({
            id: randomUUID(),
            name: guestName,
            team: guestTeam,
            isGuest: true
        })

        setTeamPlayers(tps);
    };

    const onConfirmTeamsClick = () => {
        const teams1 = teamPlayers.filter(tp => tp.team === GameTeams.Team1);
        const teams2 = teamPlayers.filter(tp => tp.team === GameTeams.Team2);
        if(teams1.length !== teams2.length){
            alert('Are you sure?');
            return;
        }
        router.push('/toss');
    }

    return(
        <div className="grid items-center justify-items-center min-h-screen p-0 pb-5 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
                <div className="text-lg font-medium">
                    Make teams
                </div>                
                { !showTeamsConfirmation && 
                    <ul>
                        {teamPlayers.map((tp:TeamPlayer) => (
                        <li key={tp.id}>
                            <PlayerTeamAssignmentRow tp={tp} onTeamClick={onTeamClick}></PlayerTeamAssignmentRow>
                        </li>
                        ))}
                    </ul>}
                { showTeamsConfirmation && <TeamsConfirmation teamPlayers={teamPlayers}></TeamsConfirmation>}
            </main>
            <div className="row-start-6 flex flex-col  space-y-3">
                { !showTeamsConfirmation && <button className="rounded-full bg-gray-200 border-solid border-2 p-2 w-32"
                    onClick={() => setShowTeamsConfirmation(true)}>Continue</button>}
                {!showTeamsConfirmation && <button className="rounded-full bg-gray-50 border-solid border-black border p-2 w-32"
                    onClick={() => setShowModal(true)}>Add Guest</button>}
                { showTeamsConfirmation && <button className="rounded-full bg-gray-200 border-solid border-2 p-2 w-32"
                    onClick={() => onConfirmTeamsClick()}>Confirm</button>}
                { showTeamsConfirmation && <button className="rounded-full bg-gray-50 border-solid border-black border p-2 w-32"
                    onClick={() => setShowTeamsConfirmation(false)}>Go Back</button>}
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