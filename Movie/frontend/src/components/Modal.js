import React, { Component } from "react";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";

export class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,

        };
    }

    handleChange = (e) => {
        let { name, value } = e.target;

        const activeItem = { ...this.state.activeItem, [name]: value };

        this.setState({ activeItem });
    };

    render() {
        const { onSave } = this.props;

        return (
            <div>
                <div>Comment</div>
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
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        입력
                    </Button>
                </div>
            </div>
        );
    }
}

export default CustomModal