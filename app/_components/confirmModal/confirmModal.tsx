import React, {userRef} from 'react';

import './confirmModal.scss';

interface ConfirmModalProps {
    isOpen: boolean;
    message: JSX.Element | string;
    onConfirm: () => void;
    setIsOpen: () => void;
}

const ConfirmModal = ({isOpen,message,setIsOpen,onConfirm} : ConfirmModalProps) => {

    const handleModalClick = (e) => {
        if (e.target.classList.contains('confirm-modal')) setIsOpen(false);
    }

    return (
        <div className={`confirm-modal ${isOpen == false ? 'hide' : ''}`} onClick = {(e) => handleModalClick(e)}>
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={() => setIsOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;