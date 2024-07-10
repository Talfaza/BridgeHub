import { CheckCircledIcon } from "@radix-ui/react-icons";
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert";

export function AddServerSucces() {
  return (
    <Alert className="fixed top-4 right-4 max-w-xs p-4 flex items-center">
      <CheckCircledIcon className="h-4 w-4 mr-2" />
      <div>
        <AlertTitle className="font-semibold text-sm">Server Added Successfully :</AlertTitle>
      </div>
    </Alert>
  );
}
