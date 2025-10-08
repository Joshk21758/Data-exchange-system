import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApplicationForm } from "@/components/application-form";

export default function NewUserApplicationPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <div className="mx-auto grid max-w-4xl flex-1 auto-rows-max gap-4">
        <Card>
          <CardHeader>
            <CardTitle>New Document Application</CardTitle>
            <CardDescription>
              Fill out the form below to apply for a new document. Our AI will suggest the appropriate ministry for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApplicationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
