import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Input } from 'rsuite';

class SettingsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localName: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(value, i) {
        this.setState({
            localName: value
        });
    }
    handleSubmit(e) {
        this.props.commitChange({
            localName: this.state.localName
        });
    }

    render() {
        return (
            <Modal onHide={this.props.onHide} show={this.props.visible}>
                <Modal.Header>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please enter your name:</p>
                    <Input style={{ width: 300 }} onChange={ this.handleChange} placeholder="Name" />
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance="primary" onClick={ this.handleSubmit }>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

SettingsDialog.propTypes = {
    visible: PropTypes.bool,
    commitChange: PropTypes.func,
    onHide: PropTypes.func,
};
  

export default SettingsDialog;