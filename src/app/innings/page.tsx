"use client";
import { useEffect, useState } from "react";
import Inning from "./inning";
import { InningTeams } from "../models/inningTeams";
import { useSelector } from "react-redux";

export default function Innings() {
    const [inning1, setInning1] = useState<InningTeams>({id: 1, battingTeam:{name: '', players: []}, bowlingTeam:{name: '', players: []}});
    const [inning2, setInning2] = useState<InningTeams>({id: 2, battingTeam:{name: '', players: []}, bowlingTeam:{name: '', players: []}});
    const gameId = useSelector((state) => state.game.gameId);
    
    useEffect(() => {
        
    }, []);
    return(
        <div>
            <Inning teams={inning1}></Inning>
        </div>
    );
}