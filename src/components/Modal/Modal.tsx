import { useCallback, useContext, useEffect, useRef } from "react";
import { ModalContext } from "./ModalContext";
import { AnimatePresence, motion } from "framer-motion";

export default function Modal() {
  const { isOpen, close, children } = useContext(ModalContext);
  const modal = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => !modal.current?.contains(e.target as Node) && close?.(),
    [close],
  );

  useEffect(() => {
    if (isOpen)
      addEventListener("click", handleClickOutside, { capture: true });
    else removeEventListener("click", handleClickOutside, { capture: true });

    document.body.style.pointerEvents = isOpen ? "none" : "auto";

    return () => {
      removeEventListener("click", handleClickOutside, { capture: true });
    };
  }, [isOpen, handleClickOutside]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          layoutId="modal"
          className="pointer-events-auto absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modal}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="max-h-[800px] w-96 overflow-y-auto rounded-md bg-white p-4 shadow-lg"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
