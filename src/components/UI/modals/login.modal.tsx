"use client"

import CustomModal from "@/components/common/modal";
import LoginForm from "@/app/form/login.form";

interface ModalProps{
    isOpen: boolean;
    onClose: ()=>void;
}


const LoginModal = ({ isOpen, onClose }:ModalProps) =>{
     return (
        <CustomModal isOpen={isOpen} onClose={onClose} title='login account'>
            <LoginForm onClose={onClose}/>
        </CustomModal>
     );
}

export default LoginModal;