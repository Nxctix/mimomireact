import React,{useState,useEffect} from "react";

const Users = () => {
    const [usuarios,setUsuarios] = useState([]);
    useEffect(()=>{
        const traerUsuarios = async()=>{
            const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
            if(!respuesta.ok){
                console.log("Ocurrió un error");
            }else{
                const data = await respuesta.json();
                setUsuarios(data);
                //console.log(data);
            }
        };
        traerUsuarios();
    },[]);
    return(
        <div>
            <h1>Lista de usuarios</h1>
            <ul>
                {usuarios.map(usuario=>(
                    <li key={usuario.id}>
                        {usuario.name}{usuario.phone}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Users;