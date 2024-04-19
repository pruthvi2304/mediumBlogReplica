import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom" 
export const Appbar = () => {
    return <div className="py-4 border-b-4 flex justify-between px-10 w-full">
        <div className="font-bold flex flex-col justify-center cursor-pointer">
        <Link to={'/'}>
            Medium
        </Link>
        </div>
        <div>
            <Avatar name="Pruthvi" />
        </div>
    </div>
}