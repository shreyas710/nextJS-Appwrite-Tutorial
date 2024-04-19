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
            <nav className="navbar">
                <h3 className="mt-3 mb-3 fw-bold">Hello <span style={{color: "orange"}}>{user}</span></h3>

                <button onClick={writeBlog} className="btn btn-warning ms-auto me-3"><FaPencilAlt/> Write a New Blog</button>
                <button onClick={logout} className="btn btn-primary">Logout</button>
            </nav>
<div className="row g-5">
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


      {/* <article className="blog-post">
        
        <hr/>
        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. Well repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
        <h2>Blockquotes</h2>
        <p>This is an example blockquote in action:</p>
        <blockquote className="blockquote">
          <p>Quoted text goes here.</p>
        </blockquote>
        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. Well repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
        <h3>Example lists</h3>
        <p>This is some additional paragraph placeholder content. Its a slightly shorter version of the other highly repetitive body text used throughout. This is an example unordered list:</p>
        <ul>
          <li>First list item</li>
          <li>Second list item with a longer description</li>
          <li>Third list item to close it out</li>
        </ul>
        <p>And this is an ordered list:</p>
        <ol>
          <li>First list item</li>
          <li>Second list item with a longer description</li>
          <li>Third list item to close it out</li>
        </ol>
        <p>And this is a definition list:</p>
        <dl>
          <dt>HyperText Markup Language (HTML)</dt>
          <dd>The language used to describe and define the content of a Web page</dd>
          <dt>Cascading Style Sheets (CSS)</dt>
          <dd>Used to describe the appearance of Web content</dd>
          <dt>JavaScript (JS)</dt>
          <dd>The programming language used to build advanced Web sites and applications</dd>
        </dl>
        <h2>Inline HTML elements</h2>
        <p>HTML defines a long list of available inline tags, a complete list of which can be found on the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element">Mozilla Developer Network</a>.</p>
        <ul>
          <li><strong>To bold text</strong>, use <code className="language-plaintext highlighter-rouge">&lt;strong&gt;</code>.</li>
          <li><em>To italicize text</em>, use <code className="language-plaintext highlighter-rouge">&lt;em&gt;</code>.</li>
          <li>Abbreviations, like <abbr title="HyperText Markup Langage">HTML</abbr> should use <code className="language-plaintext highlighter-rouge">&lt;abbr&gt;</code>, with an optional <code className="language-plaintext highlighter-rouge">title</code> attribute for the full phrase.</li>
          <li>Citations, like <cite>— Mark Otto</cite>, should use <code className="language-plaintext highlighter-rouge">&lt;cite&gt;</code>.</li>
          <li><del>Deleted</del> text should use <code className="language-plaintext highlighter-rouge">&lt;del&gt;</code> and <ins>inserted</ins> text should use <code className="language-plaintext highlighter-rouge">&lt;ins&gt;</code>.</li>
          <li>Superscript <sup>text</sup> uses <code className="language-plaintext highlighter-rouge">&lt;sup&gt;</code> and subscript <sub>text</sub> uses <code className="language-plaintext highlighter-rouge">&lt;sub&gt;</code>.</li>
        </ul>
        <p>Most of these elements are styled by browsers with few modifications on our part.</p>
        <h2>Heading</h2>
        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. Well repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
        <h3>Sub-heading</h3>
        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. Well repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
        <pre><code>int a = 10;<br/>
            int b = 20;</code></pre>
        <p>This is some additional paragraph placeholder content. Its a slightly shorter version of the other highly repetitive body text used throughout.</p>
      </article> */}

    </div>

    <div className="col-md-4">
      <div className="position-sticky" style={{top: "2rem;"}}>

        <div className="p-4">
          <h4 className="fst-italic">Blog Categories</h4>
          <ol className="list-unstyled mb-0">
            <li className="mb-2"><button className="btn btn-danger" onClick={() => filterByType("Game Engine Development")}>Game Engine Development</button></li>
            <li><button className="btn btn-danger" onClick={() => filterByType("Machine Learning")}>Machine Learning</button></li>
          </ol>
          {filter && <button className="mt-4 btn border border-danger" onClick={clearFilterAndChangeBlogs}>&times; Clear Filter</button>}
        </div>

      </div>
    </div>
  </div>
        </div>
    );
}