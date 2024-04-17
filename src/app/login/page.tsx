"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import classNames from "classnames";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        password: "",
        username: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [loading, setLoading] = useState(false);

    const onLogin = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Response", response.data);
            toast.success("Logged in successfully");
            router.push("/profile");
        } catch(error: any) {
            console.log("Error logging in", error.message);
            toast.error("Error logging in");
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        if(user.password.length > 0 && user.username.length > 0) {
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
            <h1 className="mt-3 mb-3">Log In</h1>
            <form>
                <div className="form-group mb-4">
                    <label htmlFor="username" className="mb-2">User Name</label>
                    <input 
                        type="text" 
                        value={user.username} 
                        onChange={(e) => setUser({...user, username: e.target.value})} 
                        className="form-control" 
                        id="username" 
                        placeholder="Enter username"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="password" className="mb-2">Password</label>
                    <input 
                        type="password" 
                        value={user.password} 
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                    />
                </div>
                <button onClick={onLogin} type="submit" disabled={buttonDisabled} className={btnClass}>{buttonDisabled && !loading ? "Fill All Details" : !loading ? "Submit" : ""}</button>
                <p className="mt-4">New user? <Link href="/signup">Sign up</Link></p>                
            </form>
        </div>
    );
}