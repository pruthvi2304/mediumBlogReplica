import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupType } from "@pruthvi2304/medium-common-app";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect } from "react";
export const Auth = ({type} : {type : "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInput, setPostInput] = useState<SignupType>({
        name: "",
        email : "",
        password: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate('/blogs');
        }
    },[])
    
    async function sendRequest(){
        try{

            const response = await axios.post(`${BACKEND_URL}/api/v1/user${type === "signup" ? "/signup" : "/signin"}`, postInput);
            const jwt = response.data.jwt;
            localStorage.setItem('token', jwt);
            navigate('/blogs');
        } catch (e : any) {
            alert(e.message);
        }       
        
    }


    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-400">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?" }
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>{type==="signin" ? "Signup" : "Login" }</Link> 
                    </div>
                </div>
                <div>
                    {type === "signup" ? <LabelledInput label="Name" placeholder="Pruthvi Purohit..." type="text" onChange={(e) => {
                        setPostInput(c => ({ ...c,  name: e.target.value}))
                    }} /> : null}            
                    <LabelledInput label="Email" placeholder="pruthvipurohit@gmail.com" type="text" onChange={(e) => {
                        setPostInput(c => ({ ...c,  email: e.target.value}))
                    }} />
                    <LabelledInput label="Password" placeholder="********" type="password" onChange={(e) => {
                        setPostInput(c => ({ ...c,  password: e.target.value}))
                    }} />
                    <button type="button" onClick={sendRequest} className=" mt-3  w-full text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center me-2 mb-2">
                        { type === "signin" ? "Login" : "Sign Up" }
                    </button>
                </div>
            </div>
        </div>
    </div>
}


interface LabelledInput {
    label : string;
    placeholder : string;
    onChange : (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}


function LabelledInput({ label, placeholder, onChange, type }: LabelledInput) {
    return <div>
            <label className="block mt-2 mb-2 text-sm font-medium text-black">{label}</label>
            <input type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} onChange={onChange} required />
        </div>
}