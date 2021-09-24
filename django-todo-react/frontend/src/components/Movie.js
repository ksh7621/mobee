import React, {Component} from 'react';
import axios from "axios";
class Movie extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            MovieData : [],
            id : 597,
            title : '',
        }
    }

    MovieDetail = async (id) => {
        await axios.get(
            `https://api.themoviedb.org/3/movie/${id}`
            ,{params:{
                    api_key :  '0655af6a0804b569e7765257be725158',
                }})
            .then((res) => this.setState({ MovieData: res.data }))
    }

    componentDidMount() {
        this.state.id = this.props.id;
        this.MovieDetail(this.state.id);

    }

    renderMovieDetail = () => {

        this.MovieDetail(this.props.id)
        const newDetail = this.state.MovieData

        return (
          newDetail.title
        );
    };


    render(){

        return(
            <div>
                {this.renderMovieDetail()}

            </div>

        )
    }
}

export default Movie