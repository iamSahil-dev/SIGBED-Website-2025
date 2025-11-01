import { Card, CardContent } from "./card";
import { Button } from "./buttons";
import Particles from "./Particles";
const PlaceholderCard = ({ i }: { i: number }) => {
  return (
    <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-blue-400/30 backdrop-blur-xl hover:border-blue-300/60 hover:shadow-2xl hover:shadow-blue-400/20 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-300 group overflow-hidden">
      <CardContent className="p-0">
        <div className="h-48 bg-gradient-to-br from-blue-600/20 to-white/10 flex items-center justify-center text-8xl rounded-t-lg overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-400 opacity-30" />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-blue-300 mb-3">Project {i + 1}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            hi
          </p>
          <div className="mt-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full">
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const Projects = (): JSX.Element => {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white min-h-screen overflow-x-hidden">
      <Particles />
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/50 border-b border-blue-400/20">
        <div className="w-full px-8 h-20 flex items-center">
          <div className="flex items-center gap-4 group cursor-pointer mr-auto">
            
            
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-lg justify-center w-full">
            <button>
                <div className="bthbutton">
                    <a href="#/" className="text-gray-300 hover:text-white transition-colors">Back to Home</a>
                </div>
            </button>
            
          </nav>
        </div>
      </header>

      <main className="pt-28 pb-24">
        <div className="container mx-auto px-8">
          <h2 className="text-6xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, i) => (
              <PlaceholderCard key={i} i={i} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;
