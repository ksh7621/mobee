import React, { Component } from "react";
import axios from "axios";
import "./Comment.css"

import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

class Comment extends Component {

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
        .get(`http://localhost:8000/movie/${mov_id}/Comments/`)
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
            className="list-group-items"
        >
          <div className="container">
            <div className="row">
              <div className="col-8">
                <div className="card">
                  <div className="post-heading">
                    <div className="float-left meta">
                      <div className="title h5">
                        <a href="#"><b>{item.Writer}</b></a>
                      </div>
                    </div>
                  </div>
                  <div className="post-description">
                    의견 : {item.CommentText}

                  </div>
                  <div>
                    {item.score}점
                  </div>
                </div>
              </div>

            </div>
          </div>
          <span>
          <button
              onClick={() => this.handleDelete(item)}
              className="delete_btn"
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
        .post(`http://localhost:8000/movie/${mov_id}/Comments/`, item)
        .then(res => this.refreshList(mov_id));
  };
  handleDelete = item => {
    axios
        .delete(`http://localhost:8000/movie/${this.state.movie_id}/Comments/${item.id}/`)
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
          <h1 ></h1>
          <div>
            <div >
              <div >
                <div>
                  {this.createItem}
                </div>
                <ul className="list">
                  {this.renderItems()}
                </ul>
              </div>
            </div>


            <div>의견 작성</div>

            <div>

              <Form className = "form-box">
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
export default Comment;
