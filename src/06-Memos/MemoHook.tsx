import { useState } from 'react'
import { MyTitle } from './ui/MyTitile'
import { MySubtitle } from './ui/MySubtitle'
export const MemoHook = () => {
    const [title, setTitle] = useState("HOLA")
    const [subtitle, setSubtitle] = useState("Mi subtitulo ----")
    
    return (
        <div className="bg-gradient flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-thin text-white"> Memo App </h1>

            <MyTitle title = {title} />
            <MySubtitle subtitle = {subtitle} />

            <h6> Mi subtitulo </h6>

            <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" onClick={() => setTitle("HOLA MUNDO" + new Date().getTime())}>
                Click Me
            </button>

            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" 
                onClick={() => setSubtitle("Nuevo subtitulo")}
            >
                Change subtitle
            </button>

        </div>
    )

    
}

