import Link from "next/link";

export default function NotFound() {
    return (
        <div className="container">
            <h3 className="mt-3 mb-3">&times; Page not found</h3>
            <form>
                <p className="mt-4">Already a user? <Link href="/login">Login</Link></p>                
                <p className="mt-4">New user? <Link href="/signup">Sign up</Link></p>       
            </form>
        </div>
    )
};