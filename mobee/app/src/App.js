import logo from './logo.svg';
import './App.css';
import React, {Suspense, useEffect} from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom";
import axios from "axios";

import SearchDirector from "./components/views/Search/searchDirector";
import Search from "./components/views/Search/search.js";
import MovieDetail from "./components/views/movieDetail";

function App() {


    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            {/*<NavBar />*/}
            <div style={{paddingTop: '69px', minHeight: 'calc(100vh - 80px)'}}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/search" component={Search}/>
                        <Route exact path="/search/searchDirector" component={SearchDirector}/>
                        <Route exact path="/movie/:movieId" component={MovieDetail}/>
                    </Switch>
                </BrowserRouter>

            </div>
            {/*<Footer />*/}
        </Suspense>
    );
}

export default App;

// import React, { Component } from 'react';
//
// class App extends Component {
//     state = {
//         posts: []
//     };
//
//     async componentDidMount() {
//         try {
//             const res = await fetch('http://127.0.0.1:8000/api/');
//             const posts = await res.json();
//             this.setState({
//                 posts
//             });
//         } catch (e) {
//             console.log(e);
//         }
//     }
//
//     render() {
//         return (
//             <div>
//                 {this.state.posts.map(item => (
//                     <div key={item.id}>
//                         <h1>{item.title}</h1>
//                         <span>{item.content}</span>
//                     </div>
//                 ))}
//             </div>
//         );
//     }
// }
//
// export default App;


// import React, { Component } from 'react';
//
// class App extends Component {
//     state = {
//         posts: []
//     };
//
//     async componentDidMount() {
//         try {
//             const res = await fetch('http://127.0.0.1:8000/api/');
//             const posts = await res.json();
//             this.setState({
//                 posts
//             });
//         } catch (e) {
//             console.log(e);
//         }
//     }
//
//     render() {
//         return (
//             <div>
//                 {this.state.posts.map(item => (
//                     <div key={item.id}>
//                         <h1>{item.title}</h1>
//                     </div>
//                 ))}
//             </div>
//         );
//     }
// }
//
// export default App;
