"use client";
import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SignInProps{
    onClose: ()=>void;
}


const LoginForm = ({ onClose }: SignInProps) =>{
    const router = useRouter();
   
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault()
        console.log("Form submitted: ", formData);
        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
                callbackUrl: '/ingredients'
            });
            console.log("result: ", result);
            if (result && result.ok) {
                if (result.url) router.push(result.url);
                onClose();
            } else if (result && result.error) {
                console.error("Sign in failed", result.error);
            } else {
                console.error("Sign in failed", result);
            }
            window.location.reload();
        } catch (err) {
            console.error("Sign in error:", err)
        }
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
      />
      <div className="flex w-[100%] gap-4 items-center pt-8 justify-end">
            <Button variant="light" onPress={onClose}>Decline</Button>
            <Button color="primary" type="submit">Sign in</Button>
      </div>
      
    </Form>
  );
}


export default LoginForm;