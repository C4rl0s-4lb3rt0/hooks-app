import { useState, type PropsWithChildren, createContext, useEffect } from "react";
import { users, type User } from "../data/user-mock.data";

type AuthStatus = 'checking'|'authenticated' | 'not-authenticated'; 

interface UserContextProps{

    authStatus: AuthStatus;
    user: User | null;
    isAuthenticated: boolean;
    login: (userId:number)=> boolean;
    logout: ()=> void;
}

// The context and provider intentionally live together in this module.
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({} as UserContextProps);


export const UserContextProvider = ({children}:PropsWithChildren) => {
    
    const [authStatus, setAuthStatus] = useState<AuthStatus>('checking')
    const [user, setUser] = useState<User | null>(null);
    
    const handleLogin = (userId: number)=> {
        // Implement login logic here

        const foundUser = users.find(user => user.id === userId);
        if(!foundUser) {
            console.log(`User with ID ${userId} not found`);
            setUser(null);
            setAuthStatus('not-authenticated');
            return false;
        }
        setUser(foundUser);
        setAuthStatus('authenticated');
        localStorage.setItem('userId', userId.toString());
        console.log({userId})
        return true;
    };
    
    const handleLogout = () => {
        // Implement logout logic here
        console.log('User logged out');
        setAuthStatus('not-authenticated');
        setUser(null);
        localStorage.removeItem('userId');
    };
    
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if(storedUserId) {
            handleLogin(+storedUserId);
        } else {
            setAuthStatus('not-authenticated');
            handleLogout();
        }
    }, []);
    

    return (
        <UserContext value={{
            authStatus: authStatus,
            isAuthenticated:authStatus === 'authenticated',
            user: user,
            login: handleLogin,
            logout: handleLogout
        }}>
            <h1>{children}</h1>
        </UserContext>
    )
}

