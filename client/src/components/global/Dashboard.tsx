import  { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useNavigate } from 'react-router-dom';

interface DashboardResponse {
  message: string;
}

export function Dashboard() {
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get<DashboardResponse>('http://localhost:3001/api/dashboard', {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        if (response.status === 200) {
          setMessage(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setMessage('Error loading dashboard. Please try again.');
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response && axiosError.response.status === 401) {
            navigate('/login'); // Redirect to login if not authenticated
          }
        }
      }
    };

    fetchDashboard();
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{message}</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" defaultValue="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
