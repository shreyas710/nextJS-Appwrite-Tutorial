"use client";

import {useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            router.push("/login");
        } catch (error: any) {
            console.log("Error logging out", error.message);
        }
    }

    const getUserData = async () => {
        const response = await axios.get("/api/users/me");
        console.log(response.data);
        if(response.data.user._id) {
            router.push(`/profile/${response.data.user._id}`);
        } else {
            router.push("/login");
        }
    };

    useEffect(() => {
        getUserData();
    });

    return (
        <div className="container">
            <nav className="navbar">
                <h3 className="mt-3 mb-3">Profile</h3>
                <button onClick={logout} className="btn btn-primary">Logout</button>
            </nav>
        </div>
    );
}