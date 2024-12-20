
"use client";
import { useRouter } from "next/navigation";
import { GameTeams } from "../enums/GameTeams";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as inningSliceActions from "@/redux/slices/inningsSlice";
import Image from 'next/image'

export default function Toss(){

    const dispatch = useDispatch();
    const router = useRouter();
    const [battingTeam, setBattingTeam] = useState(GameTeams.Team1);
    const [bowlingTeam, setBowlingTeam] = useState(GameTeams.Team2);
    const teams = useSelector((state) => state.innings.teams);

    const onContinueClick = () => {
        console.log(battingTeam);
        dispatch(inningSliceActions.setBattingTeam(battingTeam));
        router.push("/innings");
    }

    const onBattingTeamClick = (team: GameTeams) => {
        setBattingTeam(team);
        setBowlingTeam(team === GameTeams.Team1 ? GameTeams.Team2 : GameTeams.Team1);
    }


    return(
        <div className="grid items-center justify-items-center min-h-screen p-0 pb-5 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center w-full">
                <div className="text-lg font-medium">
                    Toss - todo
                </div>
                <div>
                    Choose batting team
                </div>
                <div className="flex flex-row justify-around">
                    <div className={`rounded-full border border-solid ${ battingTeam === GameTeams.Team1? 'border-transparent' : 'border-black'} transition-colors flex items-center justify-center ${ battingTeam === GameTeams.Team1 ? 'bg-foreground text-background': '' } gap-2 text-sm sm:text-base h-8 sm:h-8 px-4 sm:px-5`}
                        onClick={() => onBattingTeamClick(GameTeams.Team1)}>
                        Team 1
                    </div>
                    <div className="mx-5">

                    </div>
                    <div className={`rounded-full border border-solid ${ battingTeam === GameTeams.Team2? 'border-transparent' : 'border-black'} transition-colors flex items-center justify-center ${ battingTeam === GameTeams.Team2 ? 'bg-foreground text-background': '' } gap-2 text-sm sm:text-base h-8 sm:h-8 px-4 sm:px-5`}
                        onClick={() => onBattingTeamClick(GameTeams.Team2)}>
                        Team 2
                    </div>
                </div>
                <div>
                    Bowling team is:
                </div>
                <div className="flex flex-row justify-around">
                    { bowlingTeam === GameTeams.Team1 && <div className={`rounded-full border border-solid ${ bowlingTeam === GameTeams.Team1? 'border-transparent' : 'border-gray'} transition-colors flex items-center justify-center ${ bowlingTeam === GameTeams.Team1 ? 'bg-gray-200 text-black': '' } gap-2 text-sm sm:text-base h-8 sm:h-8 px-4 sm:px-5`}>
                        Team 1
                    </div>}
                    { bowlingTeam === GameTeams.Team2 && <div className={`rounded-full border border-solid ${ bowlingTeam === GameTeams.Team2? 'border-transparent' : 'border-gray'} transition-colors flex items-center justify-center ${ bowlingTeam === GameTeams.Team2 ? 'bg-gray-200 text-black': '' } gap-2 text-sm sm:text-base h-8 sm:h-8 px-4 sm:px-5`}>
                        Team 2
                    </div>}
                </div>
                <div className="flex flex-col items-center w-full space-y-5">
                    <div className="flex items-center text-sm text-gray-400">
                        {battingTeam === GameTeams.Team1 ?
                         <Image src="/bat.svg" alt="Next.js logo" width={30} height={38} className="mx-5"/>: 
                         <Image src="/ball.svg" alt="Next.js logo" width={30} height={38} className="mx-5"/>}
                        {teams.filter(t => t.team === GameTeams.Team1).map(t => t.name).toString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                        {battingTeam === GameTeams.Team2 ?
                         <Image src="/bat.svg" alt="Next.js logo" width={30} height={38} className="mx-5"/>: 
                         <Image src="/ball.svg" alt="Next.js logo" width={30} height={38} className="mx-5"/>}
                        {teams.filter(t => t.team === GameTeams.Team2).map(t => t.name).toString()}
                    </div>
                </div>
            </main>
            <div className="row-start-6 flex flex-col  space-y-3">
                <button className="rounded-full bg-gray-200 border-solid border-2 p-2 w-32"
                    onClick={() => onContinueClick()}>Continue</button>
            </div>
            <footer className="row-start-7 flex gap-2 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}