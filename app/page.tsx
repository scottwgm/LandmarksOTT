import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold">Ottawa Landmarks Map</h1>
      </header>
      <main className="flex-grow">
        <Map />
      </main>
    </div>
  );
}