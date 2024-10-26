import { useEffect, useState } from "react";
import { TeamPlayer } from "../models/teamPlayer";
import { GameTeams } from "../enums/GameTeams";

export default function TeamsConfirmation({teamPlayers}: {teamPlayers: TeamPlayer[]}){
    return(
        <div className="flex flex-row space-x-10">
            <div className="flex flex-col space-y-1">
                <div className="rounded-full flex justify-center bg-gray-200 border-solid border-2 p-2 w-32">
                    Team 1
                </div>
                <ul className="flex flex-col">
                    {teamPlayers.filter(tp => tp.team == GameTeams.Team1).map(tp => (
                        <li key={tp.id} className="flex justify-center">{tp.name}</li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col space-y-1">
                <div className="rounded-full flex justify-center bg-gray-200 border-solid border-2 p-2 w-32">
                    Team 2
                </div>
                <ul className="flex flex-col">
                    {teamPlayers.filter(tp => tp.team == GameTeams.Team2).map(tp => (
                        <li key={tp.id} className="flex justify-center">{tp.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}