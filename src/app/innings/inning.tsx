import { InningTeams } from "../models/inningTeams";

export default function Inning({teams}: {teams: InningTeams}) {
    return(
        <div className="grid items-center justify-items-center min-h-screen p-0 pb-5 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
                <div className="text-lg font-medium">
                    {teams.id}
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