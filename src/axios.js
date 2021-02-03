import axios from "axios";

/*   url base a la que le voy a hacer requests   */ 

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
});



export default instance;