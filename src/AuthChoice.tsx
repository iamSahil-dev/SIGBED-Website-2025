import { useNavigate } from "react-router-dom";
import { Button } from "./buttons";
import { Card, CardContent } from "./card";
import { LogIn, UserPlus } from "lucide-react";

export function AuthChoice() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white min-h-screen">
      {/* Animated Background - Same as Desktop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(161,0,255,0.1),transparent_50%)]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/50 border-b border-purple-500/20">
        <div className="w-full px-8 h-20 flex items-center">
          <div className="flex items-center gap-4 group cursor-pointer mr-auto" onClick={() => navigate('/')}>
          <img 
              src="public/logo.png" 
              alt="SIGBED Logo" 
              className="h-14 w-auto object-contain transform group-hover:scale-110 transition-transform cursor-pointer"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              MUJ ACM SIGBED
            </h1>
          </div>
        </div>
      </header>

      {/* Auth Choice Section */}
      <section className="relative min-h-screen pt-20 px-8 flex items-center justify-center">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Join ACM SIGBED
            </h2>
            <p className="text-gray-400 text-lg">
              Choose an option to get started
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Login Card */}
            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-purple-500/30 backdrop-blur-xl hover:border-purple-500/50 transition-all cursor-pointer group" onClick={() => navigate('/login')}>
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LogIn className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Login
                </h3>
                <p className="text-gray-400 mb-8">
                  Already have an account? Sign in to access your dashboard and member benefits.
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                >
                  Sign In
                </Button>
              </CardContent>
            </Card>

            {/* Register Card */}
            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-purple-500/30 backdrop-blur-xl hover:border-purple-500/50 transition-all cursor-pointer group" onClick={() => navigate('/register')}>
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserPlus className="w-10 h-10 text-pink-400" />
                </div>
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Register
                </h3>
                <p className="text-gray-400 mb-8">
                  New to ACM SIGBED? Create an account to become a member of India's First SIGBED Chapter.
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                >
                  Sign Up
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="flex-1 border-purple-500/30 text-black hover:bg-purple-500/20"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

