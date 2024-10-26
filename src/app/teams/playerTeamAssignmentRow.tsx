import { GameTeams } from "../enums/GameTeams";
import { TeamPlayer } from "../models/TeamPlayer";

export default function PlayerTeamAssignmentRow({tp, onTeamClick}: {tp: TeamPlayer, onTeamClick: (team: GameTeams, id:number) => void}){
    return (
        <div className="grid grid-cols-3 gap-3 items-center py-1">
            <div>{tp.name} {tp.isGuest && <span>(G)</span>}</div>
            <div className={`rounded-full border border-solid ${ tp.team === GameTeams.Team1? 'border-transparent' : 'border-black'} transition-colors flex items-center justify-center ${ tp.team === GameTeams.Team1 ? 'bg-foreground text-background': '' } gap-2 text-sm sm:text-base h-8 sm:h-8 px-4 sm:px-5`}
                onClick={() => onTeamClick(GameTeams.Team1, tp.id)}>
                Team 1
            </div>
            <div className={`rounded-full border border-solid ${ tp.team === GameTeams.Team2? 'border-transparent' : 'border-black'} transition-colors flex items-center justify-center ${ tp.team === GameTeams.Team2 ? 'bg-foreground text-background': '' } gap-2 text-sm sm:text-base h-8 sm:h-8 px-4 sm:px-5`}
                onClick={() => onTeamClick(GameTeams.Team2, tp.id)}>
                Team 2
            </div>
        </div>
    );
}