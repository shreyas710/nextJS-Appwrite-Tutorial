"use client"

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import classNames from "classnames";
import toast from "react-hot-toast";

export default function ResetPassword() {
    const [token, setToken] = useState("");
    const [resetpwd, setResetpwd] = useState(false);
    const [error, setError] = useState(false);
    const [password, setPassword] = useState("");

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [password]);

    useEffect(() => {
        const url = window.location.href.split("=")[1];
        setToken(url || "");
    }, []);

    const resetPassword = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post("/api/users/resetpassword", {token, password});
            setResetpwd(true);
            toast.success("Password reset. Please Login", {  
                style: {
                    borderRadius: '10px',
                    backgroundColor: "#4caf50",
                    color: "#ffffff",
                },
            });
        } catch (error: any) {
            console.log("Error resetting password", error.response.data);
            setError(true);
            toast.error("Error resetting password", {
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

    const btnClass = classNames('btn', {
        'btn-primary': !buttonDisabled && !loading,
        'btn-danger': buttonDisabled && !loading,
        'spinner-border': loading,
    })


    return (
        <div className="container">
            <h1 className="mt-3 mb-3">Reset Password</h1>
            {!resetpwd && (
                <form>
                    <div className="form-group mb-4">
                        <label htmlFor="password" className="mb-2">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="form-control" 
                            id="password" 
                            placeholder="Enter password"
                        />
                    </div>
                    <button onClick={resetPassword} type="submit" disabled={buttonDisabled} className={btnClass}>{buttonDisabled && !loading ? "Fill All Details" : !loading ? "Reset Password" : ""}</button>
                </form>
            )}
            
            {resetpwd && (
                <div>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error resetting password</h2>
                </div>
            )}
        </div>
    )
}