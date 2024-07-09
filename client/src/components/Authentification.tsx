import { LoginCard } from "./LoginCard"
import { SignupCard } from "./SignupCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function Authentification() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">BridgeHub</h1>
      <div className="w-[400px]">
        <Tabs defaultValue="signup">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Signup</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <SignupCard />
          </TabsContent>
          <TabsContent value="login">
            <LoginCard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
