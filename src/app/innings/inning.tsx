import { InningTeams } from "../models/inningTeams";
import { useSelector } from "react-redux";

export default function Inning({teams}: {teams: InningTeams}) {
    const battingTeam = useSelector((state) => state.innings.battingTeam);
    const bowlingTeam = useSelector((state) => state.innings.bowlingTeam);

    return(
        <div className="grid items-center justify-items-center min-h-screen p-0 pb-5 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-4 row-start-2 items-stretch sm:items-stretch w-full">
                <div className="flex text-lg font-medium justify-center">
                    Innings {teams.id}
                </div>
                <div className="flex justify-around flex-row">
                    <div className="flex ">Batting</div>
                    <div className="flex ">Bowling</div>
                </div>
                <div className="flex justify-around flex-row">
                    <div className="flex ">{battingTeam}</div>
                    <div className="flex ">{bowlingTeam}</div>
                </div>
            </main>
            <div className="row-start-6 flex flex-col  space-y-3">
                <button className="rounded-full bg-gray-200 border-solid border-2 p-2 w-32"
                    >Continue</button>
            </div>
            <footer className="row-start-7 flex gap-2 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}