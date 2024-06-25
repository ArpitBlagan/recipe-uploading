"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

const FormButton = ({ normal, normalS }: any) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="bg-green-600" disabled={pending}>
      {pending ? normalS : normal}
    </Button>
  );
};

export default FormButton;
