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

export function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      });

      if (response.data.message === 'Login successful') {
        document.cookie = `jwt=${response.data.token}`;

        localStorage.setItem('userId', response.data.user.id);

      setLoading(false);
        navigate('/dashboard');
      } else {
        console.log('Login failed. Please check your credentials.');
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
