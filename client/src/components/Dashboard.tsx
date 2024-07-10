import React, { useState } from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export type IconProps = React.HTMLAttributes<SVGElement>;

export function Dashboard() {
  const [name, setName] = useState("");
  const [hostname, setHostname] = useState("");
  const [ip, setIp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleAddServer = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/addserver",
        {
          name,
          hostname,
          ipaddress: ip,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Server added successfully:", response.data);
        setName("");
        setHostname("");
        setIp("");
        setPassword("");
      } else {
        console.error("Failed to add server");
      }
    } catch (error) {
      console.error("Error adding server:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Logged out successfully");
        navigate('/')
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative flex flex-col items-center justify-center w-full max-w-[40rem] overflow-hidden rounded-lg bg-background p-8">
        <span className="pointer-events-none whitespace-pre-wrap bg-clip-text text-center text-8xl font-semibold leading-none">
          BridgeHub
        </span>
        <Dock>
          <DockIcon>
            <Dialog>
              <DialogTrigger asChild>
                <button>
                  <Icons.add className="h-6 w-6" />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Server:</DialogTitle>
                  <DialogDescription>
                      <br/>
                    <div className="space-y-1">
                      <Label htmlFor="name" className="text-white">
                        Name:
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-white"
                      />
                      <br/>

                      <Label htmlFor="hostname" className="text-white">
                        Hostname:
                      </Label>
                      <Input
                        type="text"
                        id="hostname"
                        placeholder="Hostname"
                        value={hostname}
                        onChange={(e) => setHostname(e.target.value)}
                        className="text-white"
                      />

                      <br/>


                      <Label htmlFor="ip" className="text-white">
                        IP Address:
                      </Label>
                      <Input
                        type="text"
                        id="ip"
                        placeholder="eg: 192.168.1.1"
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                        className="text-white"
                      />

                      <br/>
                      <Label htmlFor="password" className="text-white">
                        Password:
                      </Label>
                      <Input
                        type="password"
                        id="password"
                        placeholder="***********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-white"
                      />

                      <br/>

                      <Button onClick={handleAddServer} disabled={loading}>
                        {loading ? 'Adding Server...' : 'Add Server !'}
                      </Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </DockIcon>
          <DockIcon>
            <Icons.servers className="h-6 w-6" />
          </DockIcon>
          <DockIcon>
            <Icons.manage className="h-6 w-6" />
          </DockIcon>
          <DockIcon>
            <button onClick={handleLogout}>
              <Icons.logout className="h-6 w-6" />
            </button>
          </DockIcon>
        </Dock>
      </div>
    </div>
  );
}

const Icons = {
  add: (props: IconProps) => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  servers: (props: IconProps) => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  manage: (props: IconProps) => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.07095 0.650238C6.67391 0.650238 6.32977 0.925096 6.24198 1.31231L6.0039 2.36247C5.6249 2.47269 5.26335 2.62363 4.92436 2.81013L4.01335 2.23585C3.67748 2.02413 3.23978 2.07312 2.95903 2.35386L2.35294 2.95996C2.0722 3.2407 2.0232 3.6784 2.23493 4.01427L2.80942 4.92561C2.62307 5.2645 2.47227 5.62594 2.36216 6.00481L1.31209 6.24287C0.924883 6.33065 0.650024 6.6748 0.650024 7.07183V7.92897C0.650024 8.32601 0.924883 8.67015 1.31209 8.75794L2.36228 8.99603C2.47246 9.375 2.62335 9.73652 2.80979 10.0755L2.2354 10.9867C2.02367 11.3225 2.07267 11.7602 2.35341 12.041L2.95951 12.6471C3.24025 12.9278 3.67795 12.9768 4.01382 12.7651L4.92506 12.1907C5.26384 12.377 5.62516 12.5278 6.0039 12.6379L6.24198 13.6881C6.32977 14.0753 6.67391 14.3502 7.07095 14.3502H7.92809C8.32512 14.3502 8.66927 14.0753 8.75705 13.6881L8.99505 12.6383C9.37411 12.5282 9.73573 12.3773 10.0748 12.1909L10.986 12.7653C11.3218 12.9771 11.7595 12.9281 12.0403 12.6473L12.6464 12.0412C12.9271 11.7605 12.9761 11.3228 12.7643 10.9869L12.1899 10.0757C12.3764 9.73665 12.5273 9.37522 12.6375 8.99624L13.6877 8.75815C14.0749 8.67037 14.3497 8.32622 14.3497 7.92918V7.07204C14.3497 6.674 14.0749 6.32985 13.6877 6.24207L12.6376 6.00399C12.5275 5.62502 12.3767 5.2635 12.1902 4.92451L12.7646 4.01329C12.9764 3.67743 12.9274 3.23972 12.6466 2.95898L12.0405 2.35288C11.7598 2.07214 11.3221 2.02314 10.9862 2.23486L10.075 2.80923C9.73621 2.62283 9.37489 2.47204 8.99615 2.36192L8.75803 1.31185C8.67024 0.924639 8.3261 0.650238 7.92809 0.650238H7.07095ZM5.50003 7.50001C5.50003 6.39543 6.39546 5.50001 7.50003 5.50001C8.60461 5.50001 9.50003 6.39543 9.50003 7.50001C9.50003 8.60458 8.60461 9.50001 7.50003 9.50001C6.39546 9.50001 5.50003 8.60458 5.50003 7.50001Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  logout: (props: IconProps) => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.89999 2.10001C3.50463 2.10001 3.2 2.40463 3.2 2.80001V12.2C3.2 12.5954 3.50463 12.9 3.89999 12.9H7.30001C7.69537 12.9 8 13.2046 8 13.6C8 13.9954 7.69537 14.3 7.30001 14.3H3.89999C2.84948 14.3 2 13.4505 2 12.4V2.80001C2 1.74949 2.84948 0.90001 3.89999 0.90001H7.30001C7.69537 0.90001 8 1.20463 8 1.60001C8 1.99539 7.69537 2.30001 7.30001 2.30001H3.89999ZM9.23157 4.73156C9.51017 4.45296 9.98705 4.45296 10.2657 4.73156L12.8342 7.30001L10.2657 9.86846C9.98705 10.1471 9.51017 10.1471 9.23157 9.86846C8.95297 9.58986 8.95297 9.11299 9.23157 8.83439L10.1658 7.90001H5.00001C4.60464 7.90001 4.30001 7.59539 4.30001 7.20001C4.30001 6.80463 4.60464 6.50001 5.00001 6.50001H10.1658L9.23157 5.56564C8.95297 5.28704 8.95297 4.81017 9.23157 4.53156Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
};
