import { CrossCircledIcon } from "@radix-ui/react-icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export function SignupError() {
  return (
    <Alert className="fixed top-4 right-4 max-w-xs p-4 flex items-center ">
      <CrossCircledIcon className="h-4 w-4 mr-2" />
      <div>
        <AlertTitle className="font-semibold text-sm">Signup Failed:</AlertTitle>
        <AlertDescription className="text-xs">
          Please try again.
        </AlertDescription>
      </div>
    </Alert>
  );
}
