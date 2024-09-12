import React, { useState } from 'react';
import './SubscribeModal.scss'
import { IoCloseOutline } from 'react-icons/io5';

interface SubscribeModalProps {
  onClose: () => void;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Subscribing with email:', email);
    onClose();
  };

  return (
    <div className="subscribe-modal">
      <div className="modal">
        <div className = 'row'>
        <h1>Subscribe for Updates</h1>
        <div  className="close-button fade-in-right fade-time-10" onClick={onClose}>
            <IoCloseOutline />
        </div>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default SubscribeModal;