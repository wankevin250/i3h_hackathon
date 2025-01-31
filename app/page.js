import DropdownMenus from "./component";

export default function Home() {
  return (
    <main className="container mx-auto py-6 flex justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Cell Type and Stimulant Selection</h1>
        <DropdownMenus />
      </div>
    </main>
  );
}
