"use client"

export default function WriteBlog() {
    return (
        <div>
            <h1>Write Blog</h1>
            <form>
                <input type="text" placeholder="Title" />
                <textarea placeholder="Content" />
                <input type="text" placeholder="Category" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}