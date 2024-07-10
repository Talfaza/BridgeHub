import { CrossCircledIcon } from "@radix-ui/react-icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export function LoginError() {
  return (
    <Alert className="fixed top-4 right-4 max-w-xs p-4 flex items-center " variant="destructive">
      <CrossCircledIcon className="h-4 w-4 mr-2" />
      <div>
        <AlertTitle className="font-semibold text-sm">Login Failed:</AlertTitle>
        <AlertDescription className="text-xs">
          Please check your credentials!
        </AlertDescription>
      </div>
    </Alert>
  );
}
