'use client';

import type { B12Source } from '@/services/b12-sources';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { AlertCircle, Beef, Leaf, Pill } from 'lucide-react'; // Added icons

interface B12SourcesDisplayProps {
  sources: B12Source[] | null;
  loading: boolean;
  error: string | null;
}

export function B12SourcesDisplay({ sources, loading, error }: B12SourcesDisplayProps) {
  if (loading) {
    return <B12SourcesSkeleton />;
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

  if (!sources || sources.length === 0) {
    return <p>No B12 sources available.</p>;
  }

  const animalSources = sources.filter(s => s.category === 'Animal');
  const plantBasedSources = sources.filter(s => s.category === 'Plant-Based');
  const supplementSources = sources.filter(s => s.category === 'Supplement');

  const renderSourceList = (sourceList: B12Source[]) => {
    if (sourceList.length === 0) {
        return <p className="text-muted-foreground text-sm italic p-4 text-center">No sources found in this category.</p>;
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {sourceList.map((source) => (
          <Card key={source.name} className="p-4 shadow-sm hover:shadow-md transition-shadow duration-200 bg-background/70">
            <CardTitle className="text-md font-semibold mb-1">{source.name}</CardTitle>
            <CardDescription className="text-sm text-foreground/70">{source.description}</CardDescription>
          </Card>
        ))}
        </div>
    );
  };


  return (
    <Tabs defaultValue="animal" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-muted p-1 rounded-lg">
        <TabsTrigger value="animal" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <Beef size={16} /> Animal
        </TabsTrigger>
        <TabsTrigger value="plant" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <Leaf size={16} /> Plant-Based
        </TabsTrigger>
        <TabsTrigger value="supplement" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <Pill size={16} /> Supplements
        </TabsTrigger>
      </TabsList>
      <TabsContent value="animal" className="mt-4">
        {renderSourceList(animalSources)}
      </TabsContent>
      <TabsContent value="plant" className="mt-4">
        {renderSourceList(plantBasedSources)}
      </TabsContent>
      <TabsContent value="supplement" className="mt-4">
        {renderSourceList(supplementSources)}
      </TabsContent>
    </Tabs>
  );
}

function B12SourcesSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full rounded-lg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
