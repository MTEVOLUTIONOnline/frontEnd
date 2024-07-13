import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

  
export function PageProfile(){

    return (
        <>
           <div className="grid gap-6">
            <div>
                <h1>Profile</h1>
            </div>
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Username</CardTitle>
                <CardDescription>
                modify user name
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Input placeholder="New name" />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Email address</CardTitle>
                <CardDescription>
                The email address associated with this account

                </CardDescription>
              </CardHeader>
              <CardContent>
                  <Input
                    placeholder="Project Name"
                    defaultValue="njnastevulgoinocencio@gmail.com"
                  />
                  
              </CardContent>
              <CardHeader>
                <CardTitle>Phone number</CardTitle>
                <CardDescription>
                The phone number associated with this account

                </CardDescription>
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
    )
}