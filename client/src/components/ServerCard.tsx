import React, { useEffect, useState } from "react";
import { TrashIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

export function ServerCard() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/getservers`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setServers(response.data.servers);
        } else {
          console.error("Failed to fetch servers:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching servers:", error);
      }
    };

    fetchServers();
  }, []);

  const deleteServer = async (serverID) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/deleteserver/${serverID}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setServers(servers.filter(server => server.id !== serverID));
      } else {
        console.error("Failed to delete server:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting server:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 flex flex-col space-y-4">
        <Link to="/dashboard" className="text-white py-2 px-4 flex">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back
        </Link>
        <div className="flex overflow-x-auto space-x-4">
          {servers.map((server) => (
            <Card key={server.id} className="w-[350px] bg-secondary m-4">
              <CardHeader>
                <CardTitle>{server.name}</CardTitle>
                <br />
                <CardDescription>{server.hostname}@{server.ipaddress}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" onClick={() => deleteServer(server.id)} className="flex items-center">
                  <TrashIcon className="h-5 w-5 mr-2" />
                  Delete Server
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
