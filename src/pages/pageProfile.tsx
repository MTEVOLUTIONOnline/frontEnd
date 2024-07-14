import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import UpdateUsernameCard from '@/components/UpdateUsernameCard';

export const PageProfile: React.FC = () => {
  return (
    <>
      <div className="grid gap-6">
        <div>
          <h1>Profile</h1>
        </div>
        <UpdateUsernameCard />
        <Card x-chunk="dashboard-04-chunk-2">
          <CardHeader>
            <CardTitle>Email address</CardTitle>
            <CardDescription>The email address associated with this account</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Project Name"
              defaultValue="njnastevulgoinocencio@gmail.com"
            />
          </CardContent>
          <CardHeader>
            <CardTitle>Phone number</CardTitle>
            <CardDescription>The phone number associated with this account</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Project Name"
              defaultValue="844928546"
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};