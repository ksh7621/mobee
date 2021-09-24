import react, {Component} from "react"
import SearchMovie from "./components/SearchMovie";
class Main extends Component{
    constructor(props) {
        super(props);
        this.state= {
            movie_id : 0,
        }
    }

    render(){
        return(
            <div>

                <div>
                    <SearchMovie/>
                </div>
            </div>


        );
    }

}

export default Main