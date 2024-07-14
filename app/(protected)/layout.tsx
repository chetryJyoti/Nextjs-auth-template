// import Navbar from "@/components/navbar";
import Navbar from "./_components/navbar";
interface ProtectedLayerProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ProtectedLayerProps) {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400 to-green-800">
      <Navbar />
      {children}
    </div>
  );
}
