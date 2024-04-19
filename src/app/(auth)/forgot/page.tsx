"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/users/me", user);
            console.log(response.data.user);
            if(response.data.user === undefined) {
                toast.error("User not found", {
                    style: {
                        borderRadius: '10px',
                        backgroundColor: "#f44336",
                        color: "#ffffff",
                    },
                });
                return;
            }
            toast.success("Reset link has been mailed", {
                style: {
                    borderRadius: '10px',
                    backgroundColor: "#4caf50",
                    color: "#ffffff",
                },
            });
            router.push("/login");
        } catch(error: any) {
            console.log("Error fetching user data", error.message);
            toast.error("Error fetching user data", {
                style: {
                    borderRadius: '10px',
                    backgroundColor: "#f44336",
                    color: "#ffffff",
                },
            });
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        if(user.email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const btnClass = classNames('btn', {
        'btn-primary': !buttonDisabled && !loading,
        'btn-danger': buttonDisabled && !loading,
        'spinner-border': loading,
    })

    return (
        <div className="container">
            <h3 className="mt-3 mb-3 fw-bold">Enter Email ID</h3>
            <form>
                <div className="form-group mb-4">
                    <label htmlFor="username" className="mb-2">Email</label>
                    <input 
                        type="text" 
                        value={user.email} 
                        onChange={(e) => setUser({...user, email: e.target.value})} 
                        className="form-control" 
                        id="username" 
                        placeholder="Enter email"
                    />
                </div>
                <button onClick={onSubmit} type="submit" disabled={buttonDisabled} className={btnClass}>{buttonDisabled && !loading ? "Fill All Details" : !loading ? "Submit" : ""}</button>
                <p className="mt-4">Back to <Link href="/login">Log in</Link></p>                  
            </form>
        </div>
    );
}