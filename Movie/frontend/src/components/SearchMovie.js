import React, {Component} from "react";
import App from "../App";

class SearchMovie extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value : 0,
            show : false,
            title : '',
        }
    }

    handleChange = (e) => {
        this.setState({
            value : e.target.value
        })
    }

    Click = () => {
        this.setState({show: true})
    }


    render(){
        const {show} = this.state;
        return(
            <div>
                <form>
                    <input
                        ref="search"
                        onChange = {this.handleChange}
                        type="number"
                        placeholder= 'Movie ID'
                        value = {this.state.value}
                        id = "search"
                    />
                    <button type="button" onClick={this.Click}>Search</button>


                </form>
                {show && <App searchid = {this.state.value}/>}


            </div>
        )
    }
}

export default SearchMovie
