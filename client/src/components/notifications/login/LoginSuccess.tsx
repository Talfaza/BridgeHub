import { RocketIcon } from "@radix-ui/react-icons"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function LoginSucces() {
  return (
    <Alert>
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Login Successfully : </AlertTitle>
      <AlertDescription>
        You Will Be Redirected To The Dashboard !
      </AlertDescription>
    </Alert>
  )
}
