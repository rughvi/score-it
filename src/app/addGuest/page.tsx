import { useState } from "react";
import { GameTeams } from "../enums/GameTeams";

export default function AddGuest ({onAddGuest}: {onAddGuest: (guestName:string, guestTeam: GameTeams) => void}) {
    const [guestTeam, setGuestTeam] = useState<GameTeams>(GameTeams.Team1);
    const [guestName, setGuestName] = useState('');

    const onGuestTeamClick = (team: GameTeams) => {
        setGuestTeam(team);
    }

    const onAddGuestClick = () => {
        onAddGuest(guestName, guestTeam);
        setGuestName('');
        setGuestTeam(GameTeams.Team1);

    }
    return(
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
                <button className="w-full bg-gray-200 rounded border-2 text-sm sm:text-base h-8 sm:h-8" 
                    onClick={() => onAddGuestClick()}>Add Guest</button>
            </div>
        </div>
    );
}