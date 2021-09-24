import React, { Component } from "react";
import axios from "axios";

import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

class App extends Component {

  constructor(props) {

    super(props);
    console.log(props)

    this.state = {
      CommentList : [],
      movie_id : this.props.searchid,
      activeItem: {
        Movie_ID: 0,
        Writer : "",
        CommentText : "",
        score : 0,
      },
    };
  }
  componentDidMount() {
    this.state.activeItem.Movie_ID = this.props.searchid;
    this.refreshList(this.state.movie_id);
  }
  refreshList = (mov_id) => {
    axios
        .get(`http://localhost:8000/api/${mov_id}/Comments/`)
        .then(res => this.setState({ CommentList: res.data }))
        .catch(err => console.log(err));
  };

  renderItems = () => {

    const newItems = this.state.CommentList.filter(
        item => item.Movie_ID = this.state.movie_id
    );
    return newItems.map(item => (
        <li
            key={item.Movie_ID}
            className="list-group-item d-flex justify-content-between align-items-center"
        >
        <span
            title={item.CommentText}
        >
          {item.CommentText}
        </span><span>
          {item.score}
        </span>
          <span>
          <button
              onClick={() => this.handleDelete(item)}
              className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
        </li>
    ));
  };

  handleChange = (e) => {
    let { name, value } = e.target;

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  handleSubmit = (item, mov_id) => {
    axios
        .post(`http://localhost:8000/api/${mov_id}/Comments/`, item)
        .then(res => this.refreshList(mov_id));
  };
  handleDelete = item => {
    axios
        .delete(`http://localhost:8000/api/${this.state.movie_id}/Comments/${item.id}/`)
        .then(res => this.refreshList(this.state.movie_id));
  };
  createItem = () => {
    const item = { Movie_ID: this.props.searchid, CommentText: "", Writer: "", Score: 0};
    this.setState({ activeItem: item });
  };

  render() {
    const mov = this.props.searchid;
    return (
        <main className="content">
          <h1 className="text-white text-uppercase text-center my-4"></h1>
          <div className="row ">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3">
                <div className="">
                  {this.createItem}
                </div>
                <ul className="list-group list-group-flush">
                  {this.renderItems()}
                </ul>
              </div>
            </div>


            <div>{this.state.movie_id} Comment</div>

            <div>

              <Form>
                <FormGroup>
                  <Label for="movie-Writer">Writer</Label>
                  <Input
                      type="text"
                      id="movie-Writer"
                      name="Writer"
                      value={this.state.activeItem.Writer}
                      onChange={this.handleChange}
                      placeholder="Enter Comment Writer"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="movie-Comment">Comment</Label>
                  <Input
                      type="text"
                      id="movie-Comment"
                      name="CommentText"
                      value={this.state.activeItem.CommentText}
                      onChange={this.handleChange}
                      placeholder="Enter Movie Comments"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="movie-score">평점</Label>
                  <Input
                      type="number"
                      name="score"
                      min="0"
                      max="5"
                      value={this.state.activeItem.score}
                      onChange={this.handleChange}
                  />
                </FormGroup>
              </Form>
            </div>
            <div>
              <Button color="success" onClick={() => this.handleSubmit(this.state.activeItem, mov)}>
                입력
              </Button>
            </div>
          </div>
        </main>
    );
  }
}
export default App;
