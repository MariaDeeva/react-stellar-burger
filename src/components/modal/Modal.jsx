import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from './modal.module.css';
import ModalOverlay from "../modal-overlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export default function Modal({ children, onClose }) {
    useEffect(() => {
        const handleEscKeyPress = (event) => {
            if (event.isComposing || event.key === "Escape") {
                onClose();
            }
            
        };
      
        document.addEventListener("keydown", handleEscKeyPress);

        return () => {
            document.removeEventListener("keydown", handleEscKeyPress);
        };
    }, [onClose]);

    return createPortal(
        <div className={styles.popup}>
            <div className={styles.modal}>
                {children}
              <div className={styles['modal-button']}> <CloseIcon onClick={onClose}/></div>
            </div>

            <ModalOverlay onClick={onClose} />
        </div>,
        document.getElementById("modal-root")
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};


