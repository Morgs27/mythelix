import React from 'react';

import './confirmModal.scss';

interface ConfirmModalProps {
    isOpen: boolean;
    message: any;
    onConfirm: any;
    setIsOpen: any;
}

const ConfirmModal = ({isOpen,message,setIsOpen,onConfirm} : ConfirmModalProps) => {

    const handleModalClick = (e: any) => {
        if (e.target.classList.contains('confirm-modal')) setIsOpen(false);
    }

    return (
        <div 
            className={`confirm-modal ${!isOpen ? 'hide' : ''}`} 
            onClick={(e) => handleModalClick(e)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="modal-content" tabIndex={-1}>
                <h2 id="modal-title">{message}</h2>
                <div className="modal-actions">
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={() => setIsOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;