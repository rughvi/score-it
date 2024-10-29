import { useSelector, useDispatch } from "react-redux";
import { finishOver, setScore } from "@/redux/slices/inningsSlice";

export default function InOver(){
    const currentOver = useSelector((state) => state.innings.currentOver);
    const score = useSelector((state) => state.innings.score);
    const dispatch = useDispatch();

    const onFinishOverClick = () => {
        dispatch(finishOver())
    }

    const onInputChange = (index: number, value: number) => {
        console.log(index);
        console.log(value);
        dispatch(setScore({index: index, value: value}));
    }

    return(
        <div className="flex flex-col w-full items-center sm:items-center">
            Over - {currentOver}
            <div className="flex flex-col space-y-2">
                <ul className="space-y-2">
                    {   score[currentOver].map((v:number, i:number) => (
                            <li key={i} className="flex flex-row">
                                <input className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full focus:outline-none focus:bg-white focus:border-black py-1 px-3" 
                                    value={v} onChange={(e) => onInputChange(i, Number(e.target.value))} type="number"></input>
                            </li>
                        )
                    )}
                </ul>                
                <div className="flex flex-row justify-center">
                    <button className="rounded-full bg-gray-200 border-solid border-2 p-2 w-32"
                        onClick={() => onFinishOverClick()}> Finish Over
                    </button>
                </div>
            </div>            
        </div>
    )
}