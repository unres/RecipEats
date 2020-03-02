import React from "react";

class Modal extends React.Component {
    onClose = event => {
        this.props.onClose &&  this.props.onClose(event);
    };

    render() {
        if(!this.props.show){
            return null;
        }
        return (
            <div>
                <div>{this.props.children}</div>
            </div>
        );
    }
}
export default Modal;