import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import UpdateUsernameCard from '@/components/UpdateUsernameCard';
import { getUserDetails } from '@/acesse/UserDetailsCard';

export const PageProfile: React.FC = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const data = await getUserDetails();
        setUserDetails(data);
      } catch (error: any) {
        setMessage(error.message);
      }
    }

    fetchUserDetails();
  }, []);

  if (message) {
    return <div>{message}</div>;
  }

  if (!userDetails) {
    return <div>Carregando...</div>;
  }
  
  return (
    <>
      <div className="grid gap-6">
        <div>
          <h1>Profile <b>{(userDetails.username)}</b></h1>
        </div>
        <UpdateUsernameCard />
        <Card x-chunk="dashboard-04-chunk-2"> 
          {/* username */}
          <CardHeader>
            <CardTitle>Email address</CardTitle>
            <CardDescription>The email address associated with this account</CardDescription>
          </CardHeader>
          <CardContent>
            <Input disabled
              placeholder="Project Name"
              defaultValue={(userDetails.email)}
            />
          </CardContent>
          <CardHeader>
            <CardTitle>Phone number</CardTitle>
            <CardDescription>The phone number associated with this account</CardDescription>
          </CardHeader>
          <CardContent>
            <Input disabled 
              placeholder="Project Name"
              defaultValue={(userDetails.PhoneNumber)}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};