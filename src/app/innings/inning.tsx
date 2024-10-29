import { useState } from "react";
import { InningTeams } from "../models/inningTeams";
import { useSelector, useDispatch } from "react-redux";
import ModalContent from "../modals/page";
import { createPortal } from "react-dom";
import InOver from "../inOver.tsx/page";
import { startOver } from "@/redux/slices/inningsSlice";

export default function Inning({teams}: {teams: InningTeams}) {
    const battingTeam = useSelector((state) => state.innings.battingTeam);
    const bowlingTeam = useSelector((state) => state.innings.bowlingTeam);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const onStartOverClick = () => {
        dispatch(startOver());
        setShowModal(true);
    }

    return(
        <div className="grid items-center justify-items-center min-h-screen p-0 pb-5 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-1 row-start-2 items-stretch sm:items-stretch w-full">
                <div className="flex text-lg font-medium justify-center">
                    Innings {teams.id}
                </div>
                <div className="flex justify-around flex-row">
                    <div className="flex ">Batting: <span>Team {battingTeam.toString()}</span></div>
                    <div className="flex ">Bowling: <span>Team {bowlingTeam.toString()}</span></div>
                </div>
                <div className="flex justify-around flex-row">
                    <div className="flex ">Total</div>
                    <div className="flex ">Overs</div>
                </div>
            </main>
            {showModal && createPortal(
                <ModalContent onClose={() => setShowModal(false)}>
                    <InOver ></InOver>                    
                </ModalContent>,
                document.body
            )}
            <div className="row-start-6 flex flex-col  space-y-3">
                <button className="rounded-full bg-gray-200 border-solid border-2 p-2 w-32"
                    onClick={() => onStartOverClick()}>Start over</button>
                <button className="rounded-full bg-gray-200 border-solid border-2 p-2 w-32"
                    >Continue</button>
            </div>
            <footer className="row-start-7 flex gap-2 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}