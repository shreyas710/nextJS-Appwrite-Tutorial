"use client";

import {useEffect, useState} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaPencilAlt } from "react-icons/fa";
import {FaThumbsUp} from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import Link from "next/link";

export default function UserProfile({params}: any) {
    const router = useRouter();

    const [user, setUser] = useState("");

    const [blogs, setBlogs] = useState([]);

    const [tempBlogs, setTempBlogs] = useState([]);

    const [filter, setFilter] = useState("");

    useEffect(() => {   
        getUserNameFromId();
        getBlogs();
    }, []);

    const getBlogs = async () => {  
        try {
            const response = await axios.get("/api/blogs/blog");
            if(response.data) {
                setBlogs(response.data);
                setTempBlogs(response.data);
                console.log(response.data);
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
            console.log("Error getting blogs", error.message);
            toast.error("Error getting blogs", {
                style: {
                    borderRadius: '10px',
                    backgroundColor: "#f44336",
                    color: "#ffffff",
                },
            });
        }
    }

    const getUserNameFromId = async () => {
        try {
            const response = await axios.get(`/api/users/me`);
            if(response.data.user._id) {
                // toast.success("Logged in successfully",{
                //     style: {
                //         borderRadius: '10px',
                //         backgroundColor: "#4caf50",
                //         color: "#ffffff",
                //     },
                // });
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

    const writeBlog = () => {   
        router.push("/writeblog");
    }

    const filterByType = (type: string) => {
        setFilter(type);
        const temp = tempBlogs;
        setBlogs(temp.filter((blog: any) => blog.category === type));
    }

    const clearFilterAndChangeBlogs = () => {
        setFilter("");
        setBlogs(tempBlogs);
    }

    return (
         <div className="container">
            <div className="navbar">
                <h3 className="mt-3 mb-3 fw-bold">Hello <span style={{color: "orange"}}>{user}</span></h3>

                <button onClick={writeBlog} className="btn btn-warning ms-auto me-3"><FaPencilAlt/> Write a New Blog</button>
                <button onClick={logout} className="btn btn-primary">Logout</button>
            </div>
            
            <div className="row">
                 <div className="col-md-4">
                <div className="position-sticky" style={{top: "2rem;"}}>

                    <div className="p-4">
                    <h4 className="fst-italic">Blog Categories</h4>
                    <div className="dropdown">
                        <a href="#" onClick={() => filterByType("Game Engine Development")}>Game Engine Development</a>
                        <br />
                        <br />
                        <a href="#" onClick={() => filterByType("Machine Learning")}>Machine Learning</a>
                    </div>
                    <br />
                    {filter && <a href="#" onClick={clearFilterAndChangeBlogs}>&times; Clear Filter</a>}
                    </div>

                </div>
                </div>
                <div className="col-md-8">
                    <hr />

                        {blogs.map((blog: any) => {     
                            return (
                                <div key={blog._id}>
                                    <h2 className="blog-post-title"><Link href="#">{blog.title}</Link></h2>
                                    <p className="blog-post-meta">{blog.createdAt} by <strong>{blog.author}</strong> in <em>{blog.category}</em></p>
                                    <p>{blog.summContent}</p>
                                    <div className="row">
                                        <div className="col-4">
                                            <FaThumbsUp/> : {blog.likes}
                                        </div>
                                        <div className="col-4">
                                            <FaComment/> : {blog.comments}
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            )
                            
                        })}
                </div>
            </div>
        </div>
    );
}