import React, { FC, ReactElement } from "react";

interface CustomModalProps {
  children: ReactElement;
}

const CustomModal: FC<CustomModalProps> = ({ children }) => {
  return (
    <div className="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none flex items-center justify-center">
      {children}
    </div>
  );
};

export default CustomModal;
