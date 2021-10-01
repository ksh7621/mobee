import axios from "axios";

import React, {useEffect, useState} from 'react'
import {API_KEY, API_URL, IMAGE_BASE_URL} from "../Config";
import Switching from "./Search/switching";
import {Row} from "antd";
import GridCards from "./GridCards";

function NewMovie() {
    const [movie, setMovie] = useState([]);
    const [dbmovie, setDbmovie] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
// const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0);

    const fetchmovie = async() => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            setMovie(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);
            const response = await axios.get(
                `${API_URL}movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=KR`
            );

            setMovie(response.data.results); // 데이터는 response.data 안에 들어있습니다. json으로 변환해야함
            setCurrentPage(response.data.results.page);
            console.log(response.data.results)

            //setMainMovieImage(response.data.results[0])
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect (() => {
        fetchmovie();
    }, []);

    return (

        <div style={{width: '100%', margin: '0'}}>
            {/*<div style={{textAlign: 'center'}}>*/}
            {/*    <input type="text" placeholder="Enter title to be searched" onChange={onchange}/>*/}
            {/*    <button onClick={onclick}>Search</button>*/}
            {/*</div>*/}

            <div style={{width: '85%', margin: '1rem auto'}}>

                <h2>Now playing</h2>




                <hr/>
                <Row gutter={[16, 16]}>
                    {movie && movie.map((movie, index) => (
                        <React.Fragment key={index}>

                            <GridCards
                                search
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                                moviedate ={movie.release_date}
                            />

                            {/*{movie.original_title}*/}
                            {/*{movie.release_date}*/}

                            <br/>

                        </React.Fragment>
                    ))}

                </Row>

            </div>

        </div>
    );
}
export default NewMovie


// import React, {useState} from 'react'
// import axios from "axios"
//
// function NewMovie(){
//     const [movie, setMovie] = useState([]);
//
//     const response = axios.get('http://localhost:8000/Nowlist/')
//         setMovie(response.data.results)
//
//     return(
//
//     )
//
//
// }
//
// export default NewMovie

