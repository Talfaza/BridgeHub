import { CheckCircledIcon } from "@radix-ui/react-icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export function SignupSuccess() {
  return (
    <Alert className="fixed top-4 right-4 max-w-xs p-4 flex items-center">
      <CheckCircledIcon className="h-4 w-4 mr-2" />
      <div>
        <AlertTitle className="font-semibold text-sm">Signup Successful:</AlertTitle>
        <AlertDescription className="text-xs">
          You can now log in!
        </AlertDescription>
      </div>
    </Alert>
  );
}
