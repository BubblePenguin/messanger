"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
  onClose: () => void;
  isOpen: boolean;
  image?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ onClose, isOpen, image }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-fit h-fit  ">
        <Image
          src={image ? image : "/img/avatar.png"}
          alt="image"
          width={700}
          height={700}
          className="object-cover max-h-[90vh] w-auto min-w-40 min-h-40"
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
