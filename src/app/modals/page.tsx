import "./modal.css"

export default function ModalContent({ onClose, children } : {onClose: () => void, children: any} ) {
    return (
      <div className="modal">
        <div>I'm a modal dialog</div>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    );
  }