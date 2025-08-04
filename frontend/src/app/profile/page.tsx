import {cookies} from "next/headers";
import {redirect} from "next/navigation";

interface ProtectedResponse {
    message: string;
    userId: string;
}

export default async function ProfilePage() {

    const cookieStore = await cookies();
    const token = cookieStore?.get("token")?.value;
    console.log("token", token);
    if (!token) {
        redirect("/auth/login");
        // console.log("1/auth/login");
    }

    try {
        const res = await fetch("http://localhost:3000/api/auth/protected", {
            headers: {Authorization: `Bearer ${token}`},
        });
        // console.log("res", res);
        if (!res.ok) {
            redirect("/auth/login");
            // console.log("2/auth/login");
        }

        const data: ProtectedResponse = await res.json();

        return (
            <div className="min-h-screen flex items-center justify-center ">
                <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
                    <p className="text-center">Welcome, User ID: {data.userId}</p>
                    <p className="mt-4 text-center">
                        <a href="/auth/login" className="text-blue-500 hover:underline">
                            Logout (Go to Login)
                        </a>
                    </p>
                </div>
            </div>
        );
    } catch (error) {
        redirect("/auth/login");
        // console.log("3/auth/login");
    }
    return(<div>test</div>)
}