import { CheckCircledIcon } from "@radix-ui/react-icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export function Logout() {
  return (
    <Alert className="fixed top-4 right-4 max-w-xs p-4 flex items-center">
      <CheckCircledIcon className="h-4 w-4 mr-2" />
      <div>
        <AlertTitle className="font-semibold text-sm">Logout :</AlertTitle>
        <AlertDescription className="text-xs">
        You Will Be Redirected ! 
        </AlertDescription>
      </div>
    </Alert>
  );
}
