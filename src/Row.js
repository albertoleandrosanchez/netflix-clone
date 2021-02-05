import React, { useState, useEffect } from 'react';
import axios from "./axios";
import "./Row.css"

function Row({title, fetchUrl,isLargeRow}) {

    let baseURL="https://image.tmdb.org/t/p/w500/"
    //seteo una lista vacia con useState
    const [movies, setMovies] = useState([]);

    useEffect(()=> {
        //si dejamos los [], corre cuando el Row cargue y no corras mas
        //si le paso[movies] va a correr tantas veces como movies cambie, depende de movies
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]) //ponemos como dependencia fetchUrl ya que queremos que cambie la info si esta es cambiada en algun momento.

    

    //el return es lo que va a mostrar siempre
    return (
        <div className="row">
            <h2 className="row__title">{title}</h2>
            <div className="row__posters">
                {movies.map(movie =>(
                    <img 
                    key={movie.id}
                    className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                    //&& hace que si se cumple la condicion AGREGA lo siguiente
                    src={`${baseURL}${isLargeRow? movie.poster_path: movie.backdrop_path}`} alt={movie.name}
                    />
                ))}
            </div>
        </div>
    )
}

export default Row