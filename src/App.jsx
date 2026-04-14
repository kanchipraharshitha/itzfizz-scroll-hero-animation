import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const letterRefs = useRef([]);
  const carRef = useRef(null);
  const statsRef = useRef(null);

  const letters = 'PRAHARSHITHA'.split('');

  // Initial load animation - stagger fade in for letters
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered letter animation on load
      gsap.from(letterRefs.current, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        duration: 0.8,
        stagger: 0.03,
        ease: 'back.out(1.7)',
      });

      // Fade in stats
      gsap.from(statsRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 1.5,
        ease: 'power3.out',
      });

      // Scroll-triggered car/object movement
      gsap.fromTo(
        carRef.current,
        { x: -300, rotation: -5 },
        {
          x: window.innerWidth + 300,
          rotation: 5,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
          ease: 'none',
        }
      );

      // Parallax effect on heading
      gsap.to(headingRef.current, {
        y: 150,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Scroll-indicating car/object */}
        <div
          ref={carRef}
          className="absolute top-1/3 text-6xl opacity-80 z-10"
          style={{ willChange: 'transform' }}
        >
          🚀
        </div>

        {/* Innovative Letter-Spaced Heading */}
        <div
          ref={headingRef}
          className="relative z-20 text-center px-4"
          style={{ willChange: 'transform' }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
          </div>

          <h1
            ref={headingRef}
            className="text-5xl sm:text-6xl md:text-8xl font-black tracking-[1.2em] uppercase"
            style={{
              textShadow: '0 0 40px rgba(168, 85, 247, 0.6), 0 0 80px rgba(147, 51, 234, 0.4)',
            }}
          >
            {letters.map((letter, index) => (
              <span
                key={index}
                ref={(el) => (letterRefs.current[index] = el)}
                className={`inline-block ${letter === ' ' ? 'mx-2' : ''}`}
                style={{
                  background: letter === ' ' ? 'transparent' : 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #3b82f6 100%)',
                  WebkitBackgroundClip: letter === ' ' ? 'unset' : 'text',
                  WebkitTextFillColor: letter === ' ' ? 'transparent' : 'transparent',
                  color: letter === ' ' ? 'transparent' : 'transparent',
                }}
              >
                {letter === ' ' ? '\u00A0\u00A0' : letter}
              </span>
            ))}
          </h1>

          <div className="flex items-center justify-center mt-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
          </div>

          {/* Subtitle */}
          <p
            className="mt-8 text-lg sm:text-xl text-gray-300 font-light tracking-widest uppercase opacity-0"
            style={{
              animation: 'fadeInUp 1s ease-out 2s forwards',
            }}
          >
            Scroll Down to Explore
          </p>
        </div>

        {/* Impact Metrics / Statistics */}
        <div
          ref={statsRef}
          className="absolute bottom-16 left-0 right-0 flex justify-center gap-8 sm:gap-16 px-4 opacity-0"
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              10K+
            </div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              98%
            </div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              24/7
            </div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">Support Available</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Content Section for Scroll */}
      <section className="min-h-screen bg-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            What We Do
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">Creative Design</h3>
              <p className="text-gray-400">Stunning visuals that captivate your audience and elevate your brand presence.</p>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Fast Performance</h3>
              <p className="text-gray-400">Optimized code and smooth animations for the best user experience.</p>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
              <p className="text-gray-400">Flawless experience across all devices and screen sizes.</p>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Modern Tech Stack</h3>
              <p className="text-gray-400">Built with cutting-edge technologies for future-ready solutions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
