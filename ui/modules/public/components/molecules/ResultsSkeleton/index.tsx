export function ResultsSkeleton() {
    return (
        <main className="flex-1 p-4 md:p-6 overflow-y-auto animate-pulse">
            <div className="h-8 w-48 bg-border rounded mb-2" />
            <div className="h-4 w-64 bg-border rounded mb-6" />
            <div className="h-40 w-full bg-border rounded-lg" />
        </main>
    )
}