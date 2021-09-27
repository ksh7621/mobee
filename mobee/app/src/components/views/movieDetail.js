import React, {useEffect, useState} from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../Config'
import {Row} from 'antd'
import axios from "axios";
import MovieInfo from "./movieInfo";


//영화명 감독명 switch로 구분
function MovieDetail(props) {

    let movieId = props.match.params.movieId;

    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchmovie = async () => {
            try {
                // 요청이 시작 할 때에는 error 와 users 를 초기화하고
                setError(null);
                setMovie(null);
                // loading 상태를 true 로 바꿉니다.
                setLoading(true);
                const response = await axios.get(
                    `${API_URL}movie/${movieId}?api_key=${API_KEY}`
                );
                setMovie(response.data); //json으로 변환해야함



            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };
        fetchmovie();

    }, []); //deps가 변화할때 useEffect 실행되기 때문에 onclick 할때 변수 변하도록 설정함


    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!movie) return null;
    return (
        <div style = {{width: '85%', margin: '1rem auto'}}>
                <MovieInfo
                    movie ={movie}
                />

            <br/>
        </div>
    );
}
export default MovieDetail;

