import { useState, useEffect } from "react";
import { ShoppingCart, Sparkles, Store, Coffee, Cake, Cookie, Star, Heart, Zap } from "lucide-react";
import "../App.css";

export const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // Hide splash screen after 5 seconds

    // Staggered animations
    const stageTimers = [
      setTimeout(() => setAnimationStage(1), 300),
      setTimeout(() => setAnimationStage(2), 600),
      setTimeout(() => setAnimationStage(3), 900),
      setTimeout(() => setAnimationStage(4), 1200),
      setTimeout(() => setAnimationStage(5), 1500)
    ];

    return () => {
      clearTimeout(timer);
      stageTimers.forEach(clearTimeout);
    };
  }, []);

  if (!isVisible) return null;

  // Floating particles component
  const FloatingParticles = () => (
    <>
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            background: `linear-gradient(45deg, #ec4899, #f59e0b)`,
            animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </>
  );

  // Animated ring component
  const AnimatedRing = ({ delay = 0, size = "large" }) => {
    const sizeClasses = size === "small" 
      ? "h-24 w-24 border-2" 
      : size === "medium" 
      ? "h-32 w-32 border-4" 
      : "h-40 w-40 border-4";
    
    return (
      <div 
        className={`absolute inset-0 ${sizeClasses} rounded-full border-transparent border-t-pink-500 border-r-amber-500 border-b-orange-500 border-l-yellow-400 animate-spin`}
        style={{ 
          animationDuration: `${Math.random() * 4 + 3}s`,
          animationDelay: `${delay}s`
        }}
      />
    );
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center splash-screen overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <FloatingParticles />
      </div>
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: "1s" }}></div>
      
      <div className="text-center relative z-10 max-w-2xl px-4">
        {/* Animated rings */}
        <div className="relative flex items-center justify-center mb-10">
          <AnimatedRing delay={0} size="large" />
          <AnimatedRing delay={0.5} size="medium" />
          <AnimatedRing delay={1} size="small" />
          
          {/* Main icon with enhanced 3D effect */}
          <div className="relative z-10">
            <div className="absolute -inset-8 bg-gradient-to-r from-pink-600 to-amber-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-700 transform transition-all duration-500 hover:scale-105 hover:shadow-pink-500/20">
              <div className="bg-gradient-to-br from-pink-500 to-amber-500 p-4 rounded-xl shadow-lg">
                <ShoppingCart className="h-16 w-16 text-white" />
              </div>
            </div>
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg animate-bounce">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Main title with 3D text effect */}
        <div className="mb-6 relative">
          <h1 className="text-4xl md:text-6xl font-black mb-3 relative">
            <span className="relative z-10 bg-gradient-to-r from-pink-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
              Muheza's
            </span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Delicious Zone
            </span>
          </h1>
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-600/20 to-amber-600/20 blur-lg -z-10"></div>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center mb-8">
          {[Star, Heart, Zap].map((Icon, index) => (
            <div 
              key={index}
              className={`mx-2 p-2 rounded-full bg-slate-800/50 border border-slate-700 ${
                animationStage >= index + 1 ? 'splash-fade-in-scale' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Icon className="h-6 w-6 text-pink-400" />
            </div>
          ))}
        </div>

        {/* Subtitle with gradient border */}
        <div className={`mb-8 overflow-hidden rounded-full bg-gradient-to-r from-pink-500/20 to-amber-500/20 p-1 ${
          animationStage >= 2 ? 'splash-fade-in-scale' : 'opacity-0'
        }`}>
          <div className="bg-slate-900 px-6 py-3 rounded-full">
            <p className="text-lg md:text-xl font-semibold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Premium Point of Sale Experience
            </p>
          </div>
        </div>

        {/* Feature tags with 3D cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 ${
          animationStage >= 3 ? 'splash-fade-in-scale' : 'opacity-0'
        }`}>
          {[
            { text: "Smart Inventory", icon: Store, color: "from-blue-500 to-cyan-500" },
            { text: "Instant Sales", icon: ShoppingCart, color: "from-pink-500 to-rose-500" },
            { text: "Real Analytics", icon: Sparkles, color: "from-amber-500 to-orange-500" }
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-pink-500/10"
                style={{ animationDelay: `${0.8 + index * 0.2}s` }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} mb-3`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-200">{item.text}</h3>
              </div>
            );
          })}
        </div>

        {/* Enhanced loading indicator */}
        <div className={`mb-8 ${
          animationStage >= 4 ? 'splash-fade-in-scale' : 'opacity-0'
        }`}>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-3 w-3 bg-gradient-to-r from-pink-500 to-amber-500 rounded-full animate-ping"></div>
            <div className="h-3 w-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-ping" style={{ animationDelay: "0.2s" }}></div>
            <div className="h-3 w-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping" style={{ animationDelay: "0.4s" }}></div>
          </div>
          
          {/* Progress bar with gradient */}
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 via-amber-500 to-cyan-500 h-2 rounded-full w-full animate-progress"></div>
          </div>
        </div>

        {/* Tagline */}
        <p className={`text-sm text-slate-400 font-medium ${
          animationStage >= 5 ? 'splash-fade-in-scale' : 'opacity-0'
        }`}>
          Serving sweetness since forever 🍬
        </p>
      </div>
    </div>
  );
};