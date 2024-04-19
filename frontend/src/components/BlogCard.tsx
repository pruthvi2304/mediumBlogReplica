import { Link } from "react-router-dom"
interface BlogCardProps {
    id: string,
    authorName : string,
    title : string,
    content : string,
    publishedDate : string
}

export const BlogCard = ({
    id,
    authorName, 
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`} ><div className="p-4 border-b-2 border-slate-400 pb-2">
        <div className="flex">
            <div className="flex flex-col justify-center"><Avatar name={authorName} /></div>
            <div className="font-extralight pl-2 text-stone-800"> {authorName} </div>
            <div className="pl-2 text-slate-400"> &#9679; </div>
            <div className="pl-2 font-thin text-slate-500"> {publishedDate} </div>
         </div>
        <div className="text-xl font-semibold">{title}</div>
        <div className="pt-2 text-sm font-thin font-serif">
            {content.slice(0, 100) + "..."}
        </div>
        <div className="pl-2 font-thin text-sm text-slate-500 pt-4">
            {`${Math.ceil(content.length / 100)}` + " Minutes(s) read.."}
        </div>
    </div>
    </Link>
}

export function Avatar({name}: {name: string}) {
    return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-small text-gray-600 dark:text-gray-300">{name[0]}</span>
</div>
}