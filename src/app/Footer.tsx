export default function Footer() {
    return (
        <footer className="footer mt-auto py-3 bg-dark">
            <div className="container text-center">
                <span className="text-light">Copyright &copy; <span>{new Date().getFullYear()}</span> by Shreyas Kulkarni</span>
            </div>
        </footer>
    )
}