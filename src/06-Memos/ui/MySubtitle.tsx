import { memo } from "react";

interface MySubtitleProps {
    subtitle: string
}

export const MySubtitle = memo(({ subtitle }: MySubtitleProps) => {
    console.log('My Subtitle re-render');
    
    
    console.log('Tarea super Pesadísima');

    return (
        <>   
            <h6>{subtitle}</h6>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded cursor-pointer">
                Llamar a función
            </button>
        </>
    )
})
