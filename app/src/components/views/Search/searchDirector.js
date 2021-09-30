import React, {useEffect, useState} from 'react'
//import { FaCode } from "react-icons/fa";
//import MainImage from './Sections/MainImage'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import {Row} from 'antd'
import axios from "axios";
import GridCards from "../GridCards";
import Switch from 'react-switch';

import Switching from "./switching";


//영화명 감독명 switch로 구분
function SearchDirector() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    //const [switching, setSwitching] = useState(false);
    const [director, setDirector] = useState([]);
    // const [MainMovieImage, setMainMovieImage] = useState(null)

    const [qq, setQq] = useState("Enter director to be searched");
    const [vari, setVari] = useState("");


    const onchange = (e) => {
        setQq(e.target.value);
        //console.log(e.target.value);
    }

    const onclick = (e) => {
        setVari(qq);
    }

    useEffect(() => {
        const fetchdirector = async () => {
            try {
                // 요청이 시작 할 때에는 error 와 users 를 초기화하고
                setError(null);
                setDirector(null);
                // loading 상태를 true 로 바꿉니다.
                setLoading(true);
                const response = await axios.get(
                    `${API_URL}search/person?api_key=${API_KEY}&language=ko-KR&query=${qq}`
                );

                setDirector(response.data.results); // 데이터는 response.data 안에 들어있습니다.
                console.log(response.data.results);

                //setMainMovieImage(response.data.results[0])
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };
        fetchdirector();


    }, [vari]); //deps가 변화할때 useEffect 실행되기 때문에 onclick 할때 변수 변하도록 설정함


    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!director) return null;


    return (
        <div style={{width: '100%', margin: '0'}}>
            <div style={{textAlign: 'center'}}>
                <input type="text" placeholder="Enter director to be searched" onChange={onchange}/>
                <button onClick={onclick}>Search</button>
            </div>

            <div style={{width: '85%', margin: '1rem auto'}}>

                <h2>Directors</h2>

                <span>movie</span>
                <Switching
                    checked={true}
                />
                <span>director</span>

                <hr/>
                <Row gutter={[16, 16]}>
                    {director && director.map((director, index) => (
                        <React.Fragment key={index}>

                            {director.known_for.map((dir, idx) => (
                                <React.Fragment key={idx}>

                                    <GridCards
                                        image={dir.poster_path ?
                                            `${IMAGE_BASE_URL}w500${dir.poster_path}` : null}
                                        movieId={dir.id}
                                        movieName = {dir.original_title}
                                    />


                                </React.Fragment>
                            ))}

                        </React.Fragment>
                    ))}

                </Row>

            </div>

        </div>
    );
}

export default SearchDirector;


