import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";

function Row({title, fetchUrl,isLargeRow}) {

    let baseURL="https://image.tmdb.org/t/p/w500/";
    //seteo una lista vacia con useState
    const [movies, setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl] = useState('');

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

    const opts = {
        height:"390",
        width: "100%",
        playerVars: {
            autoplay:1,
        },
    };

    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl('');
        }
        else{
            movieTrailer(movie?.title || movie?.name || movie?.original_name ||movie?.original_title).then((url) =>{
                console.log(url)
                const urlParams = new URLSearchParams( new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch(err => console.log(movie));
        }
    }

    //el return es lo que va a mostrar siempre
    return (
        <div className="row">
            <h2 className="row__title">{title}</h2>
            <div className="row__posters">
                {movies.map(movie =>(
                    <img 
                    key={movie.id}
                    onClick={() => handleClick(movie)}
                    className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                    //&& hace que si se cumple la condicion AGREGA lo siguiente
                    src={`${baseURL}${isLargeRow? movie.poster_path: movie.backdrop_path}`} alt={movie.name}
                    />
                    
                ))}
            </div>
            
            
           {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row