import { IModalContext } from "@/models";
import { createContext, ReactNode, useCallback, useState } from "react";

export const ModalContext = createContext<IModalContext>({ isOpen: false });

export default function ModalProvider(props: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [children, setChildren] = useState<React.ReactNode>(null);

  const value: IModalContext = {
    isOpen,
    children,
    open: useCallback((children: React.ReactNode) => {
      setChildren(children);
      setIsOpen(true);
    }, []),
    close: useCallback(() => setIsOpen(false), []),
    toggle: useCallback(() => setIsOpen((prev) => !prev), []),
  };

  return <ModalContext.Provider {...props} value={value} />;
}
