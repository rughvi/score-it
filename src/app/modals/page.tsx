import "./modal.css"

export default function ModalContent({ onClose, children } : {onClose: () => void, children: any} ) {
    return (
      <div className="modal flex flex-col space-y-2">
        {children}
        <button className="rounded-full bg-gray-200 border-solid border-2 p-2 w-32"
          onClick={onClose}>Close</button>
      </div>
    );
  }