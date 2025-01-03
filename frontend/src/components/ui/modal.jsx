import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{title}</h2>
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
