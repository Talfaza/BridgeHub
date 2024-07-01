import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";

interface AlertSignUpProps {
  message: string;
}

const AlertSignUp: React.FC<AlertSignUpProps> = ({ message }) => {
  return (
    <Alert className="absolute top-0 right-0 mt-4 mr-4 max-w-md" status="success">
      <AlertTitle>Signup Succesfully : </AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default AlertSignUp;


