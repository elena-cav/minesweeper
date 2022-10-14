import React from "react";
import Modal from "react-modal";
import "../styles/gameover.scss";

interface GameOverProps {
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setGrid: React.Dispatch<React.SetStateAction<string[][] | null>>;
}

function GameOver({ modalIsOpen, setIsOpen, setGrid }: GameOverProps) {
  function closeModal() {
    setIsOpen(false);
    setGrid(null);
  }
  const customStyles = {
    content: {
      TextAlign: "center",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <div className="modal-wrapper">
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2 className="game-over">Game over</h2>
        <button onClick={closeModal}>Start again</button>
      </Modal>
    </div>
  );
}

export default GameOver;

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
