import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AppLogo } from '@/components/icons';

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/40 px-4">
       <Card className="w-full max-w-md text-center shadow-2xl">
        <CardHeader className="items-center">
          <AppLogo className="h-16 w-16 text-primary mb-4" />
          <CardTitle className="text-4xl font-headline">Welcome to CityFlow</CardTitle>
          <CardDescription className="pt-2">
            Your unified platform for inter-ministry data exchange and document processing.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-4">
            <Button asChild size="lg">
              <Link href="/login">Login or Register</Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
