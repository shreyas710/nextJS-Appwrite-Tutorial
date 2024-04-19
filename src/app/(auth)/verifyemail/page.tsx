/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function VerifyEmail() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const url = window.location.href.split("=")[1];
        setToken(url || "");
    }, []);

    useEffect(() => { 
        if(token.length > 0) {
            verifyEmail();
        }
    }, [token]);

    const verifyEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", {token});
            setVerified(true);
            toast.success("Email verified", {
                style: {
                    borderRadius: '10px',
                    backgroundColor: "#4caf50",
                    color: "#ffffff",
                },
            });
        } catch (error: any) {
            console.log("Error verifying email", error.response.data);
            setError(true);
        }
    }

    return (
        <div className="container">
            <h3 className="mt-3 mb-3">Verify Email</h3>
            {verified && (
                <div>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error verifying mail</h2>
                </div>
            )}
        </div>
    )
}