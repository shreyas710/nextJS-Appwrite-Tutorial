export default function UserProfile({params}: any) {
    return (
        <div className="container">
            <h1 className="mt-3 mb-3">Profile</h1>
            <p>Profile page {params.id}</p>
        </div>
    );
}