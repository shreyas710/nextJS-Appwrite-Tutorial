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
    }, []);

    const getUserNameFromId = async () => {
        try {
            const response = await axios.get(`/api/users/me`);
            if(response.data.user._id) {
                toast.success("Logged in successfully",{
                    style: {
                        borderRadius: '10px',
                        backgroundColor: "#4caf50",
                        color: "#ffffff",
                    },
                });
                setUser(response.data.user.username);
            } else {
                toast.error(response.data.message, {
                    style: {
                        borderRadius: '10px',
                        backgroundColor: "#f44336",
                        color: "#ffffff",
                    },
                });
            }
        } catch(error: any) {
            console.log("Error getting user data", error.message);
            toast.error("Error logging out", {
                style: {
                    borderRadius: '10px',
                    backgroundColor: "#f44336",
                    color: "#ffffff",
                },
            });
        }
    }

    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            if (response.data.success) {
                 toast.success(response.data.message,{
                    style: {
                        borderRadius: '10px',
                        backgroundColor: "#4caf50",
                        color: "#ffffff",
                    },
                });
            } else {
                 toast.error(response.data.message, {
                    style: {
                        borderRadius: '10px',
                        backgroundColor: "#f44336",
                        color: "#ffffff",
                    },
                });
            }
            router.push("/login");
        } catch (error: any) {
            console.log("Error logging out", error.message);
             toast.error("Error logging out", {
                style: {
                    borderRadius: '10px',
                    backgroundColor: "#f44336",
                    color: "#ffffff",
                },
            });
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