import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";

interface AlertSignUpProps {
  message: string;
}

const AlertSignUpError: React.FC<AlertSignUpProps> = ({ message }) => {
  return (
    <Alert className="absolute top-0 right-0 mt-4 mr-4 max-w-md" status="error" variant="destructive">
      <AlertTitle>Signup Error : </AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default AlertSignUpError;
