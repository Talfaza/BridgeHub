import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

export function LoginCard({ setLoginSuccess, setLoginError }: { setLoginSuccess: (success: boolean) => void, setLoginError: (error: boolean) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      });

      if (response.data.message === 'Login successful') {
        document.cookie = `jwt=${response.data.token}`;
        localStorage.setItem('userId', response.data.user.id);

        setLoading(false);
        setLoginSuccess(true);

        setTimeout(() => {
          navigate('/dashboard');
        }, 3000); // Redirect after 3 seconds
      } else {
        setLoginError(true);
        setTimeout(() => {
          setLoginError(false);
        }, 3000); // Hide error after 3 seconds
        console.log('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false);
      }, 3000); // Hide error after 3 seconds
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="username">Email :</Label>
          <Input
            id="username"
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
        <Button onClick={handleLogin} disabled={loading}>
          {loading ? 'Login...' : 'Login !'}
        </Button>
      </CardFooter>
    </Card>
  );
}
