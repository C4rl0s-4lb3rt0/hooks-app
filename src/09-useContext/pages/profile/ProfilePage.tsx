import { Button } from "@/components/ui/button"
import { useContext } from "react"
import { UserContext } from "@/09-useContext/context/UserContext"
export const ProfilePage = () => {

    const { user , logout} = useContext(UserContext);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Perfil del usuario</h1>
            <hr />
            <p>Información del perfil del usuario se mostrará aquí.</p>
            <pre className="my-4 w-[50%] over-flow-auto">
                {JSON.stringify(user, null, 2)}
            </pre>

            <Button variant="destructive" onClick={logout}>
                Salir
            </Button>

        </div>
    )
}

