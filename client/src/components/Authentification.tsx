import { useState } from 'react';
import { LoginCard } from "./LoginCard";
import { SignupCard } from "./SignupCard";
import { LoginSuccess } from "./notifications/login/LoginSuccess";
import { LoginError } from "./notifications/login/LoginError";
import { SignupSuccess } from "./notifications/signup/SignupSuccess";
import { SignupError } from "./notifications/signup/SignupError";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function Authentification() {
  const [tabValue, setTabValue] = useState('signup');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">BridgeHub</h1>
      <div className="w-[400px]">
        <Tabs value={tabValue} onValueChange={setTabValue}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Signup</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <SignupCard 
              setSignupSuccess={setSignupSuccess} 
              setSignupError={setSignupError} 
              onSignupSuccess={() => setTabValue('login')} 
            />
          </TabsContent>
          <TabsContent value="login">
            <LoginCard setLoginSuccess={setLoginSuccess} setLoginError={setLoginError} />
          </TabsContent>
        </Tabs>
      </div>
      {loginSuccess && (
        <div className="absolute top-4 left-4">
          <LoginSuccess />
        </div>
      )}
      {loginError && (
        <div className="absolute top-4 left-4">
          <LoginError />
        </div>
      )}
      {signupSuccess && (
        <div className="absolute top-4 left-4">
          <SignupSuccess />
        </div>
      )}
      {signupError && (
        <div className="absolute top-4 left-4">
          <SignupError />
        </div>
      )}
    </div>
  );
}
