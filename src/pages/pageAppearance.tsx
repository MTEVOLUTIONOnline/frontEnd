import { SelectDemo } from "@/components/Select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


export function PageAppearance()
{
    return(
        <>
            <div>
                <div>
                </div>
                <div>
                <Card x-chunk="dashboard-04-chunk-1 bg-red-600">
              <CardHeader>
                
                <CardTitle><h1 className="font-bold">Appearance</h1></CardTitle>
                <CardDescription>
                Customize the app's appearance. Automatically switch between day and night themes.
                </CardDescription>
              </CardHeader>
              <CardContent><hr /><br />
                <SelectDemo />
                <div className="mt-10">
                    <h2>Tem</h2>
                    <div>
                    </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
                </div>
            </div>
        </>
    )
}