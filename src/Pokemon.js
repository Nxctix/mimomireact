import React, {useState, useEffect} from "react";
import {Grid,Card,CardContent,Typography,CircularProgress,Container,CardActionArea,Button} from "@mui/material";

const Pokemon = () => {
    const[pokemones,setPokemones] = useState([]);
    const[loading,setLoading] = useState(true);
    const[error,setError] = useState(null);
    const[pokemonSeleccionado,setPokemonSeleccionado] = useState(null);
    useEffect(()=>{
        const traerPokemones = async()=>{
            const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
            if(!respuesta.ok){
                console.log("Ocurrió un error");
            }else{
                const data = await respuesta.json();
                setPokemones(data.results);
                console.log(data.results);
            }
        };
        traerPokemones();
    },[]);
    const fetchDetallePokemon = async(id)=>{
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        if(!respuesta.ok){
            console.log("Ocurrió un error");
        }else{
            const data = await respuesta.json();
            setPokemonSeleccionado(data);
            console.log(data);
        }
    };
    return(
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={4}>
                            <Typography variant="h4">Lista de Pokémon</Typography>
                                {pokemones.map((pokemon,index)=>(
                                <li key={index}>
                                    {pokemon.name} <Button variant="outlined" onClick={()=>fetchDetallePokemon(index+1)}>Seleccionar Pokémon</Button>
                                 </li>
                                ))}
                        </Grid>
                   </Grid>
                    <Typography variant="h4">Detalle de Pokémon</Typography>
                    {pokemonSeleccionado&&
                        <Grid item>
                            <Typography variant="h5">Nombre: {pokemonSeleccionado.name}</Typography>
                            <img src={pokemonSeleccionado.sprites.front_default}/>
                            <Typography variant="h6">Altura: {pokemonSeleccionado.height}</Typography>
                            <Typography variant="h6">Peso: {pokemonSeleccionado.weight}</Typography>
                        </Grid>
                    }
                </CardContent>
            </Card>
    )
};
export default Pokemon;