import React from "react";

interface ModalProps {
  isOpen?: boolean;
  setIsOpen?: () => void;
  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  className?: string
}

export default function Modal({
  isOpen,
  status,
  setStatus,
  children,
  className,
}: ModalProps) {
  function handleModalStateChange(e: any) {
    if (e.target.classList.contains("modalBg")) {
      setStatus(false);
    }
  }

  return (
    <>
      {status && (
        <div
          id="modal"
          onClick={handleModalStateChange}
          className={`
          modalBg
          w-auto h-auto absolute inset-0 bg-zinc-900/90 flex justify-center items-center p-12 rounded-lg
          ${className}
          `}
        >
          <div className="p-8 flex justify-center bg-white rounded-lg">
            {children}
          </div>
        </div>
      )}
    </>
  );
}
