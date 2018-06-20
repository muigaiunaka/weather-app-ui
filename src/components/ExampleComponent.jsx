import React, { Component } from 'react';
import ExamplePresentationalComponent from './ExamplePresentationalComponent';

class ExampleComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {}
    componentDidUpdate() {}
    componentWillReceiveProps() {}

    render() {
        const title = "Example Component";
        return (
            <div>
                <p>{title}</p>
                <ExamplePresentationalComponent key="" example="Prop sent to Example" />
            </div>
        )
    }
}

export default ExampleComponent;