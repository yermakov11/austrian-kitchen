import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";
import { registerUser } from "../actions/register";

interface SignUpProps{
    onClose: ()=>void;
}


const RegistrationForm = ({onClose}: SignUpProps) =>{
   
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const validateEmail = (email: string)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault()
        const result = await registerUser(formData)
        console.log("Form submitted: ", formData);
        console.log(result);
        onClose()
    }

  return (
    <Form className="w-full max-w-xs" onSubmit={handleSubmit}>
      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
        value={formData.email}
        classNames = {{
            inputWrapper: "bg-default-100",
            input: "text-sm focus:online-none"
        }}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        validate={(value) => {
          if (!validateEmail(value)) {
            return "Please enter a valid email";
          }
          return true;
        }}
      />
      <Input
        isRequired
        errorMessage="Please enter your password"
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your password"
        type="password"
        value={formData.password}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:online-none"
        }}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validate={(value) => {
          if (!value || value.length < 6) {
            return "Password must be at least 6 characters";
          }
          return true;
        }}
      />
      <Input
        isRequired
        errorMessage="Passwords do not match"
        label="Confirm Password"
        labelPlacement="outside"
        name="confirmPassword"
        placeholder="Confirm your password"
        type="password"
        value={formData.confirmPassword}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm focus:online-none"
        }}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        validate={(value) => {
          if (value !== formData.password) {
            return "Passwords do not match";
          }
          return true;
        }}
      />
      <div className="flex w-[100%] gap-4 items-center pt-8 justify-end">
            <Button variant="light" onPress={onClose}>Decline</Button>
            <Button color="primary" type="submit">Sign up</Button>
      </div>
      
    </Form>
  );
}


export default RegistrationForm;