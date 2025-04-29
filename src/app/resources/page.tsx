
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, FileText, Download, Video, Search, Filter } from 'lucide-react';
import Image from 'next/image';

// Placeholder data
const articles = [
  { id: 1, title: 'Is Sublingual B12 Better Than Oral?', image: 'https://picsum.photos/seed/article1/600/400', excerpt: 'Exploring the absorption rates and benefits of different B12 supplement forms...', tags: ['Advanced', 'Supplements'] },
  { id: 2, title: 'B12 for Kids: What Parents Should Know', image: 'https://picsum.photos/seed/article2/600/400', excerpt: 'Understanding the importance of Vitamin B12 during childhood development and dietary needs.', tags: ['Beginner', 'Family Health'] },
  { id: 3, title: 'Can Vitamin B12 Really Cure Brain Fog?', image: 'https://picsum.photos/seed/article3/600/400', excerpt: 'Investigating the link between B12 deficiency and cognitive symptoms like brain fog.', tags: ['Symptoms', 'Doctor Advice'] },
  { id: 4, title: 'Top 5 Vegan Sources of Fortified B12', image: 'https://picsum.photos/seed/article4/600/400', excerpt: 'A guide to finding reliable B12 in a plant-based diet through fortified foods.', tags: ['Vegan', 'Sources'] },
  { id: 5, title: 'Understanding Pernicious Anemia and B12', image: 'https://picsum.photos/seed/article5/600/400', excerpt: 'Learn about this autoimmune condition that affects B12 absorption.', tags: ['Medical Condition', 'Advanced'] },
];

const downloadables = [
  { id: 1, title: 'Printable B12 Deficiency Symptom Checklist', type: 'PDF', description: 'A handy checklist to track potential B12 deficiency symptoms.', icon: FileText, href: '#' },
  { id: 2, title: 'Vegan B12 Guide', type: 'PDF', description: 'Comprehensive guide on ensuring adequate B12 intake on a vegan diet.', icon: FileText, href: '#' },
  { id: 3, title: 'B12 Foods Reference Chart', type: 'PDF', description: 'Quick reference chart for common food sources and their B12 content.', icon: FileText, href: '#' },
];

const videos = [
  { id: 1, title: 'Expert Talk: The Importance of B12 Testing', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }, // Placeholder URL
  { id: 2, title: 'How B12 Supplements Work', embedUrl: 'https://www.youtube.com/embed/oHg5SJYRHA0' }, // Placeholder URL
  { id: 3, title: 'Cooking with B12-Rich Foods', embedUrl: 'https://www.youtube.com/embed/QH2-TGUlwu4' }, // Placeholder URL
];


export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(articles.flatMap(a => a.tags)));

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? article.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  // Placeholder for load more functionality
  const [visibleArticles, setVisibleArticles] = useState(3);
  const loadMoreArticles = () => {
      setVisibleArticles(prev => Math.min(prev + 3, filteredArticles.length));
  };


  return (
    <div className="container mx-auto px-4 py-8 space-y-12 font-inter">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 text-center">Resources & Learning Hub</h1>

      {/* Sticky Search and Filter Bar Placeholder */}
       <section className="sticky top-16 z-40 bg-background/90 backdrop-blur-sm py-4 mb-8 border-b">
            <div className="container mx-auto px-4 flex flex-col md:flex-row gap-4 items-center">
               <div className="relative flex-grow w-full md:w-auto">
                  <Input
                     type="search"
                     placeholder="Search articles..."
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="pl-10"
                     aria-label="Search articles"
                  />
                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
               </div>
                <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                   <Button
                      variant={selectedTag === null ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTag(null)}
                      className="flex items-center gap-1"
                  >
                      <Filter className="w-4 h-4"/> All Tags
                   </Button>
                    {allTags.map(tag => (
                       <Button
                          key={tag}
                          variant={selectedTag === tag ? 'secondary' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedTag(tag)}
                       >
                          {tag}
                       </Button>
                    ))}
                </div>
            </div>
       </section>


      {/* Articles/Blog Posts Section */}
      <section>
        <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center flex items-center justify-center gap-2">
           <BookOpen className="w-7 h-7" /> Latest Articles & Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.slice(0, visibleArticles).map((article) => (
             <Card key={article.id} className="overflow-hidden group transition-all duration-300 hover:shadow-xl flex flex-col">
               <div className="relative overflow-hidden">
                  <Image
                     src={article.image}
                     alt={article.title}
                     width={600}
                     height={400}
                     className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
               </div>
               <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                     {article.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                     ))}
                  </div>
                 <CardTitle className="font-serif text-xl leading-snug">{article.title}</CardTitle>
               </CardHeader>
               <CardContent className="flex-grow">
                 <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
               </CardContent>
                <CardContent>
                  <Button variant="link" className="p-0 h-auto text-primary">Read More →</Button>
               </CardContent>
             </Card>
          ))}
        </div>
         {/* Load More Button */}
         {visibleArticles < filteredArticles.length && (
            <div className="text-center mt-12">
               <Button onClick={loadMoreArticles} variant="outline" size="lg">
                  Load More Articles
               </Button>
            </div>
         )}
          {filteredArticles.length === 0 && (
             <p className="text-center text-muted-foreground mt-8">No articles found matching your criteria.</p>
          )}
      </section>

      {/* Downloadables Section */}
      <section className="bg-muted/30 py-12 rounded-lg">
        <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center flex items-center justify-center gap-2">
           <Download className="w-7 h-7" /> Downloadable Guides & Checklists
        </h2>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {downloadables.map((item) => (
             <Card key={item.id} className="text-center group transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
               <CardHeader className="items-center">
                 <div className="p-3 bg-primary/10 rounded-full mb-3 inline-block transition-transform duration-300 group-hover:scale-110">
                    <item.icon className="w-8 h-8 text-primary/80" />
                 </div>
                 <CardTitle className="text-lg font-serif">{item.title}</CardTitle>
                  <Badge variant="outline" className="mt-1">{item.type}</Badge>
               </CardHeader>
               <CardContent>
                 <CardDescription className="mb-4">{item.description}</CardDescription>
                 <Button asChild variant="secondary" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <a href={item.href} download>
                      Download <Download className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                   </a>
                 </Button>
               </CardContent>
             </Card>
          ))}
        </div>
      </section>

      {/* Videos Section */}
      <section>
        <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center flex items-center justify-center gap-2">
           <Video className="w-7 h-7" /> Expert Videos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden shadow-md">
               <CardHeader>
                  <CardTitle className="font-serif text-lg truncate">{video.title}</CardTitle>
               </CardHeader>
               <CardContent>
                  {/* Responsive Video Embed */}
                  <div className="aspect-video relative">
                      <iframe
                          className="absolute top-0 left-0 w-full h-full rounded-md"
                          src={video.embedUrl}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                      ></iframe>
                  </div>
               </CardContent>
            </Card>
          ))}
        </div>
      </section>

        {/* Disclaimer */}
        <Card className="mt-12 border-dashed border-primary/50">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Disclaimer:</strong> The resources provided on this page are for informational purposes only and do not constitute medical advice. Content, including articles and videos, reflects the views of the authors/speakers and not necessarily B12 Insight. Always consult with a qualified healthcare professional for personal health guidance.
            </p>
          </CardContent>
        </Card>

    </div>
  );
}
 
    