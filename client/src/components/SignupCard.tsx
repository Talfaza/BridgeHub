import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupCard({
  setSignupSuccess,
  setSignupError,
  onSignupSuccess,
}: {
  setSignupSuccess: (success: boolean) => void,
  setSignupError: (error: boolean) => void,
  onSignupSuccess: () => void,
}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        username,
        email,
        password,
      });

      console.log('Signup successful!', response.data);

      setSignupSuccess(true);
      setTimeout(() => {
        setSignupSuccess(false);
      }, 3000); 

      setUsername('');
      setEmail('');
      setPassword('');

      onSignupSuccess(); 
    } catch (error) {
      console.error('Signup error:', error);

      setSignupError(true);
      setTimeout(() => {
        setSignupError(false);
      }, 3000); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Signup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="username">Username :</Label>
          <Input
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email :</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password :</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup} disabled={loading}>
          {loading ? 'Signing up...' : 'Signup !'}
        </Button>
      </CardFooter>
    </Card>
  );
}
