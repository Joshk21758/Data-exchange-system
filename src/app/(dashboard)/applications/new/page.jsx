import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApplicationForm } from "@/components/application-form";

export default function NewApplicationPage() {
  return (
    <div className="mx-auto grid max-w-4xl flex-1 auto-rows-max gap-4">
      <Card>
        <CardHeader>
          <CardTitle>New Document Application</CardTitle>
          <CardDescription>
            Fill out the form below to apply for a new document.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ApplicationForm />
        </CardContent>
      </Card>
    </div>
  );
}
