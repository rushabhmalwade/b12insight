import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-12 container mx-auto px-4 py-8">
        {/* Skeleton for Introduction Section */}
        <section className="text-center py-16 bg-secondary/20 rounded-lg">
            <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
        </section>

        {/* Skeleton for Core Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left Column Skeletons */}
            <div className="space-y-8">
                {/* B12 Info Skeleton Card */}
                <div className="border rounded-lg p-6">
                    <Skeleton className="h-7 w-1/3 mb-4" />
                    <div className="space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                         <Skeleton className="h-6 w-1/2 mt-4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                </div>
                {/* B12 Sources Skeleton Card */}
                 <div className="border rounded-lg p-6">
                    <Skeleton className="h-7 w-1/3 mb-4" />
                    <Skeleton className="h-10 w-full rounded-lg mb-4" />
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                        <div key={i} className="p-4 border rounded-lg space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column Skeleton (Symptom Checker) */}
            <div className="sticky top-8 border rounded-lg p-6">
                 <Skeleton className="h-7 w-1/3 mb-6" />
                 <div className="space-y-6">
                    <div className="space-y-2">
                         <Skeleton className="h-4 w-1/4" />
                         <Skeleton className="h-10 w-full" />
                    </div>
                     <div className="space-y-2">
                         <Skeleton className="h-4 w-1/4" />
                         <Skeleton className="h-10 w-full" />
                    </div>
                     <div className="space-y-2">
                         <Skeleton className="h-4 w-1/4" />
                         <Skeleton className="h-20 w-full" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                 </div>
            </div>
        </div>
    </div>
  );
}
