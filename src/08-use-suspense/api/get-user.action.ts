
export interface User {
    id: string;
    name: string;
    location: string;
    role: string;
}


export const getUserAction = async (id:number) => {
    console.log('función llamar');
    
    await new  Promise((res) => setTimeout(res, 2000))
    
    console.log('función resolvió');
    return {
        id:id,
        name: "C@rlos",
        location: "San Valdemar No.1",
        role: "Un rol del usuario"
    }
}
