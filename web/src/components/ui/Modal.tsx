import React from "react";
import ReactDOM from "react-dom";

interface BackdropProps {
  onClose: () => void;
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
  children: React.ReactNode;
}

function ModalOverlay({ children }: ModalOverlayProps) {
  return (
    <div className="fixed top-[15vh] left-[50%] -translate-x-1/2 w-[90%] max-h-[80vh] overflow-auto bg-slate-100 p-4 rounded-2xl shadow-md z-30 md:w-[40rem]">
      <div>{children}</div>
    </div>
  );
}

interface ModalProps extends BackdropProps, ModalOverlayProps {}

function Modal({ onClose, children }: ModalProps) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById("overlays") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        document.getElementById("overlays") as HTMLElement
      )}
    </>
  );
}

export default Modal;
