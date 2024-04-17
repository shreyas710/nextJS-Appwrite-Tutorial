"use client";

import {useEffect, useState} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UserProfile({params}: any) {
    const router = useRouter();

    const [user, setUser] = useState("");

    useEffect(() => {   
        getUserNameFromId();
    });

    const getUserNameFromId = async () => {
        try {
            const response = await axios.get(`/api/users/me`);
            if(response.data.user._id) {
                toast.success(response.data.message);
                setUser(response.data.user.username);
            } else {
                toast.error(response.data.message);
            }
        } catch(error: any) {
            console.log("Error getting user data", error.message);
            toast.error("Error getting user data");
        }
    }

    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
            router.push("/login");
        } catch (error: any) {
            console.log("Error logging out", error.message);
            toast.error("Error logging out");
        }
    }

    return (
         <div className="container">
            <nav className="navbar">
                <h1 className="mt-3 mb-3">Hello <span style={{color: "orange"}}>{user}</span></h1>
                <button onClick={logout} className="btn btn-primary">Logout</button>
            </nav>
        </div>
    );
}