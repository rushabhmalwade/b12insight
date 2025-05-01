'use client';

import React, { useState } from 'react';
// import type { Metadata } from 'next'; // Metadata cannot be exported from client components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, FileText, Download, Video, Search, Filter, XCircle, Loader2, AlertTriangle, Newspaper, ExternalLink } from 'lucide-react'; // Added Newspaper, ExternalLink
import Image from 'next/image';
import Link from 'next/link'; // Import Link component
import { cn } from '@/lib/utils'; // Import cn
import { format } from 'date-fns'; // Import date-fns for formatting

// Note: Metadata cannot be exported from a 'use client' component.
// Define page metadata in layout.tsx or parent Server Components if needed.

// Placeholder data (Consider fetching this from a CMS or API)
const allArticles = [
  { id: 1, title: 'Sublingual B12 vs. Oral Tablets: Which is Better?', image: 'https://picsum.photos/seed/article1/600/400', dataAiHint: "pills sublingual tablet comparison", excerpt: 'An evidence-based look at the absorption rates, bioavailability, and effectiveness of different B12 supplement forms.', tags: ['Advanced', 'Supplements', 'Absorption'] },
  { id: 2, title: 'Vitamin B12 for Children & Teens: A Parent\'s Guide', image: 'https://picsum.photos/seed/article2/600/400', dataAiHint: "child parent healthy eating", excerpt: 'Understanding the crucial role of B12 in growth, development, and cognitive function during childhood and adolescence.', tags: ['Beginner', 'Family Health', 'Diet'] },
  { id: 3, title: 'Decoding Brain Fog: Can Vitamin B12 Deficiency Be the Culprit?', image: 'https://picsum.photos/seed/article3/600/400', dataAiHint: "brain fog thinking confusion", excerpt: 'Exploring the complex link between low B12 levels and common cognitive symptoms like poor memory and concentration.', tags: ['Symptoms', 'Cognition', 'Doctor Advice'] },
  { id: 4, title: 'Top 5 Reliable Vegan Sources of Fortified B12', image: 'https://picsum.photos/seed/article4/600/400', dataAiHint: "vegan food nutritional yeast fortified", excerpt: 'A practical guide to finding consistently fortified foods like nutritional yeast, plant milks, and cereals for a plant-based diet.', tags: ['Vegan', 'Sources', 'Diet'] },
  { id: 5, title: 'Pernicious Anemia Explained: An Autoimmune Cause of B12 Deficiency', image: 'https://picsum.photos/seed/article5/600/400', dataAiHint: "anemia blood cell medical", excerpt: 'Learn how this condition prevents B12 absorption from food and why injections are often necessary.', tags: ['Medical Condition', 'Advanced', 'Absorption'] },
  { id: 6, title: 'The Link Between B12 Deficiency and Mental Health', image: 'https://picsum.photos/seed/article6/600/400', dataAiHint: "mental health brain psychology", excerpt: 'Investigating how low B12 levels can contribute to symptoms of depression, anxiety, and mood disorders.', tags: ['Mental Health', 'Symptoms', 'Advanced'] },
   { id: 7, title: 'Understanding B12 Blood Tests: Serum vs. MMA vs. Homocysteine', image: 'https://picsum.photos/seed/article7/600/400', dataAiHint: "blood test lab results doctor", excerpt: 'A clear explanation of different B12 tests, their pros and cons, and what the results might mean.', tags: ['Testing', 'Doctor Advice', 'Advanced'] },
];

const downloadables = [
  { id: 1, title: 'Printable B12 Symptom Tracker', type: 'PDF', description: 'A helpful checklist to monitor potential B12 deficiency symptoms over time.', icon: FileText, href: '/downloads/symptom-checklist.pdf' }, // Example path
  { id: 2, title: 'Vegan B12 Fortification Guide', type: 'PDF', description: 'Tips and list of common foods fortified with Vitamin B12 for plant-based diets.', icon: FileText, href: '/downloads/vegan-b12-guide.pdf' },
  { id: 3, title: 'B12-Rich Foods Reference Chart', type: 'PDF', description: 'Quick reference for common animal-based food sources and their typical B12 content.', icon: FileText, href: '/downloads/b12-foods-chart.pdf' },
];

const videos = [
  { id: 1, title: 'Expert Talk: Why B12 Testing Matters (Dr. Emily Carter)', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }, // Placeholder URL
  { id: 2, title: 'Animated Explainer: How B12 Supplements Work in Your Body', embedUrl: 'https://www.youtube.com/embed/oHg5SJYRHA0' }, // Placeholder URL
  { id: 3, title: 'Cooking Demo: Delicious B12-Rich Recipes (Vegan Options!)', embedUrl: 'https://www.youtube.com/embed/QH2-TGUlwu4' }, // Placeholder URL
];

// Placeholder data for News & Research Updates
const newsUpdates = [
  { id: 'news1', title: 'New Study Links Gut Microbiome Health to B12 Absorption Efficiency', excerpt: 'Researchers find specific bacterial strains influence how well dietary B12 is absorbed, suggesting potential probiotic interventions.', source: 'Journal of Nutritional Biochemistry', publishDate: new Date(2024, 9, 15), link: '#', tags: ['Research', 'Absorption', 'Gut Health'] },
  { id: 'news2', title: 'NIH Updates Recommendations for B12 Intake During Pregnancy', excerpt: 'The National Institutes of Health slightly increased the recommended B12 intake for pregnant individuals based on recent meta-analysis.', source: 'NIH News Release', publishDate: new Date(2024, 8, 28), link: '#', tags: ['Guidelines', 'Pregnancy', 'RDA'] },
  { id: 'news3', title: 'Investigating the Role of B12 in Preventing Age-Related Cognitive Decline', excerpt: 'Ongoing clinical trial explores high-dose B12 supplementation effects on memory and cognitive function in older adults.', source: 'ClinicalTrials.gov', publishDate: new Date(2024, 7, 5), link: '#', tags: ['Research', 'Cognition', 'Aging'] },
  { id: 'news4', title: 'Fortified Foods vs. Supplements: Consumer Preference Trends', excerpt: 'Market analysis shows growing consumer preference for fortified foods over traditional supplements for meeting B12 needs among specific demographics.', source: 'Food Industry Journal', publishDate: new Date(2024, 6, 20), link: '#', tags: ['Trends', 'Sources', 'Supplements'] },
];


export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // For Load More simulation

  const allTags = Array.from(new Set(allArticles.flatMap(a => a.tags))).sort();

  const filteredArticles = allArticles.filter(article => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const matchesSearch = article.title.toLowerCase().includes(lowerSearchTerm) ||
                          article.excerpt.toLowerCase().includes(lowerSearchTerm) ||
                          article.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm));
    const matchesTag = selectedTag ? article.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  // Placeholder for load more functionality
  const articlesPerPage = 6;
  const [visibleArticlesCount, setVisibleArticlesCount] = useState(articlesPerPage);

  const loadMoreArticles = () => {
      setIsLoading(true);
      // Simulate network delay
      setTimeout(() => {
        setVisibleArticlesCount(prev => Math.min(prev + articlesPerPage, filteredArticles.length));
        setIsLoading(false);
      }, 750);
  };


  return (
    <div className="container mx-auto px-4 py-12 md:py-16 space-y-16 md:space-y-20 font-inter">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 md:mb-12 text-center tracking-tight animate-fade-in">
         Resources & Learning Hub
      </h1>

      {/* Sticky Search and Filter Bar */}
       <section className="sticky top-[72px] z-40 bg-background/90 backdrop-blur-md py-4 mb-10 border-b border-border/50 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="container mx-auto px-4 flex flex-col md:flex-row gap-4 items-center">
               {/* Search Input */}
               <div className="relative flex-grow w-full md:w-auto md:max-w-xs lg:max-w-sm">
                  <Input
                     type="search"
                     placeholder="Search articles by title, tag, or keyword..."
                     value={searchTerm}
                     onChange={(e) => {
                       setSearchTerm(e.target.value);
                       setVisibleArticlesCount(articlesPerPage); // Reset pagination on search
                     }}
                     className="pl-10 h-11 text-base border-border/60 focus:border-primary"
                     aria-label="Search articles"
                  />
                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                   {searchTerm && (
                      <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full"
                          onClick={() => { setSearchTerm(''); setVisibleArticlesCount(articlesPerPage); }}
                          aria-label="Clear search"
                      >
                          <XCircle className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </Button>
                   )}
               </div>
                {/* Tag Filters */}
                <div className="flex gap-2 flex-wrap justify-center items-center md:justify-start flex-grow">
                   <Button
                      variant={selectedTag === null ? 'secondary' : 'outline'}
                      size="sm"
                      onClick={() => { setSelectedTag(null); setVisibleArticlesCount(articlesPerPage); }}
                      className={cn(
                        "flex items-center gap-1 rounded-full transition-all h-8 px-3",
                        selectedTag === null && "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                      )}
                  >
                      <Filter className="w-3.5 h-3.5"/> All Tags
                   </Button>
                    {allTags.map(tag => (
                       <Button
                          key={tag}
                          variant={selectedTag === tag ? 'secondary' : 'outline'}
                          size="sm"
                          onClick={() => { setSelectedTag(tag); setVisibleArticlesCount(articlesPerPage); }}
                          className={cn(
                            "rounded-full transition-all h-8 px-3",
                             selectedTag === tag && "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                          )}
                       >
                          {tag}
                       </Button>
                    ))}
                </div>
            </div>
       </section>


      {/* Articles/Blog Posts Section */}
      <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10 md:mb-12 text-center flex items-center justify-center gap-3 tracking-tight">
           <BookOpen className="w-8 h-8" /> Latest Articles & Insights
        </h2>
        {filteredArticles.length > 0 ? (
           <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.slice(0, visibleArticlesCount).map((article) => (
                 <Card key={article.id} className="overflow-hidden group transition-all duration-300 hover:shadow-xl flex flex-col rounded-xl border border-border/50 bg-card/90 backdrop-blur-sm transform hover:-translate-y-1.5">
                   <div className="relative overflow-hidden h-56 w-full">
                      <Image
                         src={article.image}
                         alt={`Featured image for article titled: ${article.title}`} // Descriptive alt text
                         layout="fill"
                         style={{objectFit:"cover"}}
                         className="transition-transform duration-500 group-hover:scale-105"
                         loading="lazy" // Lazy load article images
                         data-ai-hint={article.dataAiHint}
                      />
                      {/* Optional: Gradient overlay */}
                      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div> */}
                   </div>
                   <CardHeader className="pt-4 pb-2 px-5">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                         {article.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs font-medium rounded-full px-2 py-0.5 bg-secondary/70 dark:bg-secondary/50">
                               {tag}
                            </Badge>
                         ))}
                      </div>
                     <CardTitle className="font-serif text-xl lg:text-2xl leading-tight tracking-tight group-hover:text-primary transition-colors">
                         {/* Placeholder Link - Update when article pages are implemented */}
                         <a href="#" className="stretched-link focus:outline-none">
                             <span className="absolute inset-0" aria-hidden="true"></span>
                             {article.title}
                         </a>
                     </CardTitle>
                   </CardHeader>
                   <CardContent className="flex-grow px-5 pb-3">
                     <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{article.excerpt}</p>
                   </CardContent>
                    <CardContent className="px-5 pb-5 mt-auto">
                      <span className="text-primary font-medium text-sm group-hover:underline">Read More →</span>
                   </CardContent>
                 </Card>
              ))}
            </div>
             {/* Load More Button */}
             {visibleArticlesCount < filteredArticles.length && (
                <div className="text-center mt-16">
                   <Button onClick={loadMoreArticles} variant="outline" size="lg" disabled={isLoading} className="min-w-[180px]">
                      {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Load More Articles'}
                   </Button>
                </div>
             )}
           </>
        ) : (
             <p className="text-center text-muted-foreground mt-8 text-lg bg-muted/50 py-6 rounded-lg">
                No articles found matching "{searchTerm || selectedTag || 'your criteria'}". Try adjusting your search or filter.
             </p>
        )}
      </section>

      {/* News & Research Updates Section */}
      <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10 md:mb-12 text-center flex items-center justify-center gap-3 tracking-tight">
           <Newspaper className="w-8 h-8" /> News & Research Updates
        </h2>
         <div className="space-y-6">
            {newsUpdates.map((update) => (
               <Card key={update.id} className="transition-all duration-300 hover:shadow-xl rounded-xl border border-border/50 bg-card/90 backdrop-blur-sm transform hover:-translate-y-1 group overflow-hidden">
                  <CardContent className="p-5 md:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
                     <div className="flex-grow">
                       <div className="flex flex-wrap gap-1.5 mb-2">
                          {update.tags.map(tag => (
                             <Badge key={tag} variant="outline" className="text-xs font-medium rounded-full px-2 py-0.5">{tag}</Badge>
                          ))}
                       </div>
                        <CardTitle className="font-serif text-lg lg:text-xl leading-tight tracking-tight mb-1 group-hover:text-primary transition-colors">
                           <a href={update.link} target="_blank" rel="noopener noreferrer" className="focus:outline-none">
                               <span className="absolute inset-0" aria-hidden="true"></span>
                               {update.title}
                           </a>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{update.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                           <span>Source: <em className="font-medium not-italic">{update.source}</em></span>
                           <time dateTime={format(update.publishDate, 'yyyy-MM-dd')}>
                             {format(update.publishDate, 'MMM d, yyyy')}
                           </time>
                        </div>
                     </div>
                      <div className="flex-shrink-0 self-center sm:self-start mt-2 sm:mt-0">
                         <Button variant="ghost" size="sm" asChild className="text-primary group-hover:underline">
                             <a href={update.link} target="_blank" rel="noopener noreferrer" className="relative z-10">
                                Read More <ExternalLink className="w-3.5 h-3.5 ml-1.5"/>
                             </a>
                         </Button>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>
          {/* Optional: Link to external news source or archive */}
           <div className="text-center mt-12">
             <Button variant="outline" size="lg" disabled>
               View More News (Coming Soon)
             </Button>
           </div>
      </section>


      {/* Downloadables Section */}
      <section className="bg-gradient-to-br from-muted/40 to-secondary/30 py-16 md:py-20 rounded-2xl shadow-inner animate-fade-in" style={{ animationDelay: '0.4s' }}> {/* Increased opacity */}
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10 md:mb-12 text-center flex items-center justify-center gap-3 tracking-tight">
           <Download className="w-8 h-8" /> Downloadable Guides & Checklists
        </h2>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {downloadables.map((item) => (
             <Card key={item.id} className="text-center group transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1.5 rounded-xl border border-border/50 bg-card/95 backdrop-blur-sm flex flex-col p-6">
               <CardHeader className="items-center p-0 mb-4">
                 <div className="p-4 bg-primary/10 rounded-full mb-3 inline-block transition-transform duration-300 group-hover:scale-110 text-primary">
                    <item.icon className="w-9 h-9" />
                 </div>
                 <CardTitle className="text-lg font-serif tracking-tight">{item.title}</CardTitle>
                  <Badge variant="outline" className="mt-2 text-xs font-mono">{item.type}</Badge>
               </CardHeader>
               <CardContent className="p-0 flex-grow mb-5">
                 <CardDescription className="text-sm text-muted-foreground leading-relaxed">{item.description}</CardDescription>
               </CardContent>
                <div className="mt-auto">
                 <Button asChild variant="secondary" size="default" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors w-full shadow hover:shadow-md">
                    <a href={item.href} download={item.title.replace(/ /g, '_') + '.pdf'}>
                      Download <Download className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                   </a>
                 </Button>
                </div>
             </Card>
          ))}
        </div>
      </section>

      {/* Videos Section */}
      <section className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10 md:mb-12 text-center flex items-center justify-center gap-3 tracking-tight">
           <Video className="w-8 h-8" /> Expert Videos & Explainers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden shadow-lg rounded-xl border border-border/50 bg-card/90 backdrop-blur-sm group transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1.5">
               <CardHeader className="px-5 pt-5 pb-3">
                  <CardTitle className="font-serif text-lg lg:text-xl tracking-tight line-clamp-2 group-hover:text-primary transition-colors">{video.title}</CardTitle>
               </CardHeader>
               <CardContent className="px-5 pb-5">
                  {/* Responsive Video Embed */}
                  <div className="aspect-video relative overflow-hidden rounded-lg border border-border/30 shadow-inner">
                      <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={video.embedUrl}
                          title={video.title}
                          frameBorder="0" // Use frameBorder instead of frameborder
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy" // Add lazy loading to videos
                      ></iframe>
                  </div>
               </CardContent>
            </Card>
          ))}
        </div>
         {/* Link to YouTube channel or more videos */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
               <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  View More Videos on YouTube <Video className="w-5 h-5 ml-2" />
               </a>
            </Button>
         </div>
      </section>

        {/* Disclaimer */}
         <Card className="mt-16 border-2 border-dashed border-amber-500/50 bg-amber-50/30 dark:bg-amber-900/20 rounded-lg animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <CardContent className="p-5 md:p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0" />
              <div>
                 <h3 className="font-semibold text-amber-700 dark:text-amber-400">Content Disclaimer</h3>
                 <p className="text-sm text-amber-800/90 dark:text-amber-300/90 mt-1">
                   The resources provided here are for informational purposes only and do not replace professional medical advice. Content reflects the views of respective authors/creators. Always consult a qualified healthcare provider for personal health guidance and treatment decisions.
                 </p>
              </div>
            </div>
          </CardContent>
        </Card>

    </div>
  );
}
