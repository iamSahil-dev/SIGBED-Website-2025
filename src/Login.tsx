import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "./buttons";
import { Card, CardContent } from "./card";
import { supabase } from "./lib/supabase";

export function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      alert('Login successful!');
      navigate('/');
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

      {/* Login Form with Robot */}
      <section className="relative min-h-screen pt-20 px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Login Form - Left Side */}
            <div className="w-full order-1 lg:order-1">
            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-purple-500/30 backdrop-blur-xl">
              <CardContent className="p-12">
                <h2 className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Welcome Back
                </h2>
                <p className="text-center text-gray-400 mb-8">
                  Login to access your ACM SIGBED account
                </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-purple-500/30 text-black-300 hover:bg-purple-500/20"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0"
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </div>

                <div className="text-center pt-4">
                  <p className="text-gray-400 text-sm">
                    Don't have an account?{" "}
                    <Link 
                      to="/register" 
                      className="text-purple-400 hover:text-purple-300 underline transition-colors"
                    >
                      Register here
                    </Link>
                  </p>
                </div>
              </form>
              </CardContent>
            </Card>
            </div>

            {/* Robot - Right Side */}
            <div className="w-full h-[500px] lg:h-[600px] order-2 lg:order-2">
              <iframe
                className="w-full h-full border-0 rounded-lg"
                src="https://my.spline.design/untitled-rCWXqbudUZIG7LumSy7fXJfi/?transparent=1"
                frameBorder="0"
                allow="fullscreen; xr-spatial-tracking; clipboard-write"
                allowTransparency
                style={{ background: 'transparent' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

