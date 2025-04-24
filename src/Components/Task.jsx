import { useState } from "react";
function Task({id,text, state = "pendiente"}) {
    const [state, setState] = useState({state});
    let tarea;


    if(state==="pendiente"){
        tarea = <p id={id}>{text}</p>;
    }
    if(state==="completada"){
        tarea = <p id={id}><s>{text}</s></p>;
    }


    return (
        <>
        <input type={"checkbox"} onSelect={()=> setState("completada")}></input>
            {tarea}
        </>
    );
}
export default Task;