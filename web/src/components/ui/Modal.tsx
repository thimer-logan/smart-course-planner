import React from "react";
import ReactDOM from "react-dom";

interface BackdropProps {
  onClose?: () => void;
}

function Backdrop({ onClose }: BackdropProps) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-20 bg-[rgba(0, 0, 0, 0.75)]"
      onClick={onClose}
    ></div>
  );
}

interface ModalOverlayProps {
  className?: string;
  children: React.ReactNode;
}

function ModalOverlay({ className, children }: ModalOverlayProps) {
  return (
    <div
      className={`fixed top-[15vh] left-[15%] w-[90%] overflow-auto bg-slate-100 p-4 rounded-2xl shadow-lg z-30 md:w-[40rem] ${className}`}
    >
      <div>{children}</div>
    </div>
  );
}

interface ModalProps extends BackdropProps, ModalOverlayProps {}

function Modal({ onClose, className, children }: ModalProps) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById("overlays") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay className={className}>{children}</ModalOverlay>,
        document.getElementById("overlays") as HTMLElement
      )}
    </>
  );
}

export default Modal;
