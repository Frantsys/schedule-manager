import { HeaderPublic } from "@/modules/public/components/molecules/HeaderPublic";


export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <HeaderPublic />
      <main className="flex-1 w-full flex flex-col overflow-y-auto">
        {children}
      </main>
    </div>
  );
}