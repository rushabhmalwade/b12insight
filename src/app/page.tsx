'use client';

import { B12InfoDisplay } from '@/components/b12-info-display';
import { B12SourcesDisplay } from '@/components/b12-sources-display';
import { SymptomChecker } from '@/components/symptom-checker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getB12Info, type B12Info } from '@/services/b12-info';
import { getB12Sources, type B12Source } from '@/services/b12-sources';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [b12Info, setB12Info] = useState<B12Info | null>(null);
  const [b12Sources, setB12Sources] = useState<B12Source[] | null>(null);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [loadingSources, setLoadingSources] = useState(true);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  const [errorSources, setErrorSources] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoadingInfo(true);
        const info = await getB12Info();
        setB12Info(info);
        setErrorInfo(null);
      } catch (err) {
        setErrorInfo('Failed to load B12 information.');
        console.error(err);
      } finally {
        setLoadingInfo(false);
      }

      try {
        setLoadingSources(true);
        const sources = await getB12Sources();
        setB12Sources(sources);
        setErrorSources(null);
      } catch (err) {
        setErrorSources('Failed to load B12 sources.');
        console.error(err);
      } finally {
        setLoadingSources(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-12">
      {/* Introduction Section */}
      <section className="text-center py-16 bg-gradient-to-r from-secondary via-background to-accent rounded-lg shadow-sm">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">
          Welcome to B12 Insight
        </h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Discover the vital role of Vitamin B12, understand deficiency symptoms,
          and explore ways to improve your well-being.
        </p>
      </section>

      {/* Core Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 items-start">

        {/* Left Column */}
        <div className="space-y-8">
          {/* B12 Info Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flask-conical"><path d="M10 2v7.31"/><path d="M14 9.31V2"/><path d="M3 13a2 2 0 0 0 .14 2.82L5 17.94a1.5 1.5 0 0 0 2.12 0L9.3 15.7a2 2 0 0 1 2.83 0L14.3 17.9a1.5 1.5 0 0 0 2.12 0L18.86 15.82A2 2 0 0 0 19 13v-1a2 2 0 0 0-2-2h-1a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1a2 2 0 0 1-2 2v1a2 2 0 0 1-2 2H7a2 2 0 0 0-2 2v1Z"/><path d="M8.29 14.29 9.7 15.7a1 1 0 0 0 1.4 0l1.19-1.19"/></svg>
                About Vitamin B12
              </CardTitle>
            </CardHeader>
            <CardContent>
              <B12InfoDisplay
                info={b12Info}
                loading={loadingInfo}
                error={errorInfo}
              />
            </CardContent>
          </Card>

          {/* B12 Sources Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-utensils-crossed"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 1.8.7 2.5 0l7.3-7.3a4.2 4.2 0 0 0 0-6L15 15Zm0 0 7.3 7.3"/><path d="m2.1 2.1 6.4 6.4"/></svg>
                Sources of B12
              </CardTitle>
            </CardHeader>
            <CardContent>
              <B12SourcesDisplay
                sources={b12Sources}
                loading={loadingSources}
                error={errorSources}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="sticky top-8"> {/* Make Symptom Checker sticky */}
          {/* Symptom Checker Section */}
          <Card className="bg-accent/30 border-primary/30">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-check"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>
                Symptom Checker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SymptomChecker />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
