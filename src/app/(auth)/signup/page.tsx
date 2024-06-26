"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import classNames from "classnames";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [loading, setLoading] = useState(false);

    const onSignup = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Response", response.data);
            if(response.data.error) {
                toast.error(response.data.error, {
                    style: {
                        borderRadius: '10px',
                        backgroundColor: "#f44336",
                        color: "#ffffff",
                    },
                });
                return;
            }
            toast.success("User created. Please verify mail", {
                style: {
                    borderRadius: '10px',
                    backgroundColor: "#4caf50",
                    color: "#ffffff",
                },
            });
            router.push("/login");
        } catch(error: any) {
            console.log("Error signing up", error.message);
            toast.error("Error signing up", {
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
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
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
            <h3 className="mt-3 mb-3 fw-bold">Sign Up</h3>
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
                    <label htmlFor="email" className="mb-2">Email address</label>
                    <input 
                        type="email" 
                        value={user.email} 
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        className="form-control" 
                        id="email" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email"
                    />
                    <small id="emailHelp" className="form-text text-muted">We&apos;ll never share your email with anyone else.</small>
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
                <button onClick={onSignup} type="submit" disabled={buttonDisabled} className={btnClass}>{buttonDisabled && !loading ? "Fill All Details" : !loading ? "Submit" : ""}</button>
                <p className="mt-4">Already a user? <Link href="/login">Login</Link></p>                
            </form>
        </div>
    );
}