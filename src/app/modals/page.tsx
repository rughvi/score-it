import "./modal.css"

export default function ModalContent({ onClose, children } : {onClose: () => void, children: any} ) {
    return (
      <div className="modal">
        <div></div>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    );
  }