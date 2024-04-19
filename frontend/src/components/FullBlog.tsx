import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"
export const FullBlog = ({blog} : { blog : Blog}) => {
    return <div>
            <Appbar />
            <div className="flex justify-center py-10">
                <div className="grid w-full grid-cols-12 px-20 max-w-screen-2xl">
                    <div className="col-span-8">
                        <div className="text-3xl font-extrabold">
                            { blog.title || "Anonymous" }
                        </div>
                        <div className="text-slate-500 pt-2">
                            Posted on 2nd March 2023
                        </div>
                        <div className="text-m font-serif pt-4">
                            { blog.content || "" }
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="text-slate-500">Author</div>
                        <div className="flex pt-4 w-full">
                            <div className="pr-2 flex flex-col justify-center">
                                <Avatar name={ blog.author.name || "Anonymous" } />
                            </div>
                            <div className="flex flex-col">
                                <div className="text-xl font-bold">
                                    { blog.author.name || "Anonymous" }
                                </div>
                                <div className="pt-2 text-slate-500">
                                    Random Catch phase for distict user
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div> 

}