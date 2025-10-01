'use client'

import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  title: string;
  children: React.ReactNode;
}

const CustomModal = ({ isOpen, onClose, size="xs", title, children, }: CustomModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalContent>
        <ModalHeader className="border-b">
          <h3 className="text-xl text-background font-semibold">{title}</h3>
        </ModalHeader>
        <ModalBody className="space-y-4 py-6">{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
