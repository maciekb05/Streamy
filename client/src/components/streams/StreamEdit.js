import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends React.Component {
    componentDidMount() {
        if(!this.props.stream) {
            this.props.fetchStream(this.props.match.params.id);
        }
    }

    onSubmit = formValues => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render() {
        if (!this.props.stream) {
            return (
                <div className="ui active loader" />
            );
        }
        return (
            <StreamForm 
                onSubmit={this.onSubmit} 
                initialValues={_.pick(this.props.stream, 'title', 'description')}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
};

export default connect(
    mapStateToProps, 
    { 
        fetchStream, 
        editStream 
    }
)(StreamEdit);