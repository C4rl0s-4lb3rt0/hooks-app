import { UserContext } from "@/09-useContext/context/UserContext";
import { use } from "react";
import { Link } from "react-router";
export const AboutPage = () => {

    const { isAuthenticated , logout} = use(UserContext)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold">About Page</h1>

            <hr />

            <div className="flex flex-col gap-2">

                {
                    isAuthenticated && (
                        <Link to="/profile" className="hover:text-blue-500 underline text-2xl">Go to Profile</Link>
                    )
                }
                {
                    isAuthenticated ? (
                        <Link to="/logout" className="hover:text-blue-500 underline text-2xl" onClick={logout}>Logout</Link>
                    ):(
                        <Link to="/login" className="hover:text-blue-500 underline text-2xl">Go to Login</Link>
                    )
                }
            </div>
        </div>
    )
}