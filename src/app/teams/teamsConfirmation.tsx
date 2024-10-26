import { useEffect, useState } from "react";
import { TeamPlayer } from "../models/TeamPlayer";
import { GameTeams } from "../enums/GameTeams";

export default function TeamsConfirmation({teamPlayers}: {teamPlayers: TeamPlayer[]}){
    const [team1, setTeam1] = useState<TeamPlayer[]>([]);
    const [team2, setTeam2] = useState<TeamPlayer[]>([]);

    useEffect(() => {
        console.log(teamPlayers);

        setTeam1(teamPlayers.filter(tp => tp.team.toString() === GameTeams.Team1.toString()));
        setTeam2(teamPlayers.filter(tp => tp.team.toString() === GameTeams.Team2.toString()));
        console.log(team1);
        console.log(team2);
    }, []);

    return(
        <div className="flex flex-row space-x-10">
            <div className="flex flex-col space-y-1">
                <div className="rounded-full flex justify-center bg-gray-200 border-solid border-2 p-2 w-32">
                    Team 1
                </div>
                <ul className="flex flex-col">
                    {teamPlayers.filter(tp => tp.team == GameTeams.Team1).map(tp => (
                        <li className="flex justify-center">{tp.name}</li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col space-y-1">
                <div className="rounded-full flex justify-center bg-gray-200 border-solid border-2 p-2 w-32">
                    Team 2
                </div>
                <ul className="flex flex-col">
                    {teamPlayers.filter(tp => tp.team == GameTeams.Team2).map(tp => (
                        <li className="flex justify-center">{tp.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}