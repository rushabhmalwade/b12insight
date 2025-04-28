'use client';

import type { B12Info } from '@/services/b12-info';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle } from 'lucide-react';

interface B12InfoDisplayProps {
  info: B12Info | null;
  loading: boolean;
  error: string | null;
}

export function B12InfoDisplay({ info, loading, error }: B12InfoDisplayProps) {
  if (loading) {
    return <B12InfoSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!info) {
    return <p>No B12 information available.</p>;
  }

  return (
    <Accordion type="single" collapsible defaultValue="item-1" className="w-full space-y-4">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg font-medium">What is Vitamin B12?</AccordionTrigger>
        <AccordionContent className="text-foreground/80 space-y-2">
          <p>{info.description}</p>
          <h3 className="font-semibold text-md pt-2">Biological Role:</h3>
          <p>{info.biologicalRole}</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger className="text-lg font-medium">Recommended Dosage (mcg/day)</AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Age Group</TableHead>
                <TableHead className="text-right">Dosage (mcg)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Infants (0-6 months)</TableCell>
                <TableCell className="text-right">{info.recommendedDosage.infants0to6Months}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Infants (7-12 months)</TableCell>
                <TableCell className="text-right">{info.recommendedDosage.infants7to12Months}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Children (1-3 years)</TableCell>
                <TableCell className="text-right">{info.recommendedDosage.children1to3Years}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Children (4-8 years)</TableCell>
                <TableCell className="text-right">{info.recommendedDosage.children4to8Years}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Children (9-13 years)</TableCell>
                <TableCell className="text-right">{info.recommendedDosage.children9to13Years}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Adults (14+ years)</TableCell>
                <TableCell className="text-right">{info.recommendedDosage.adults}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-2">
            Note: Recommended Dietary Allowances (RDAs) may vary. Consult with a healthcare professional for personalized advice.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function B12InfoSkeleton() {
  return (
    <div className="space-y-6">
       <Skeleton className="h-8 w-3/4" />
       <div className="space-y-2">
         <Skeleton className="h-4 w-full" />
         <Skeleton className="h-4 w-5/6" />
         <Skeleton className="h-4 w-full" />
       </div>
       <Skeleton className="h-8 w-1/2" />
       <div className="space-y-2">
         <Skeleton className="h-4 w-full" />
         <Skeleton className="h-4 w-5/6" />
       </div>
    </div>
  );
}
