"use client"

import CustomModal from "@/components/common/modal";
import RegistrationForm from "@/app/form/registration.form";

interface ModalProps{
    isOpen: boolean;
    onClose: ()=>void;
}


const RegistrationModal = ({ isOpen, onClose }:ModalProps) =>{
     return (
        <CustomModal isOpen={isOpen} onClose={onClose} title='create account'>
            <RegistrationForm onClose={onClose}/>
        </CustomModal>
     );
}

export default RegistrationModal;