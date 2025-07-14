import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Play,
  Users,
  Star,
  ArrowRight,
  Sparkles,
  Zap,
  Menu,
  X,
} from "lucide-react";

export default function Index() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Countdown timer state - set launch date to 30 days from now
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set launch date (30 days from now)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3010/api/early-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Show success message
        console.log("Successfully joined early access!");
      } else {
        console.error("Failed to submit early access");
        alert("Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting early access:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setEmail("");
    setName("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-8 flex items-center justify-between">
          <div className="flex items-center ml-8">
            <img
              src="https://cdn.builder.io/api/v1/assets/ca8bde47d0f2460ebb2309d2c38bd41f/group-4-4d2e09?format=webp&width=800"
              alt="StroomUp Logo"
              className="w-40 h-40 md:w-48 md:h-48 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex items-center gap-4 mr-8">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/features"
                className="text-muted-foreground hover:text-brand-primary transition-colors font-medium"
              >
                Features
              </Link>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-brand-primary transition-colors font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-brand-primary transition-colors font-medium"
              >
                Contact
              </Link>
            </nav>

            {/* Mobile Navigation Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed top-0 right-0 z-50 w-64 h-full bg-card border-l border-border shadow-2xl md:hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <img
                    src="https://cdn.builder.io/api/v1/assets/ca8bde47d0f2460ebb2309d2c38bd41f/group-4-4d2e09?format=webp&width=800"
                    alt="StroomUp Logo"
                    className="w-12 h-12 object-contain"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <nav className="space-y-4">
                  <Link
                    to="/features"
                    className="block py-3 px-4 text-foreground hover:text-brand-primary hover:bg-muted rounded-lg transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    to="/about"
                    className="block py-3 px-4 text-foreground hover:text-brand-primary hover:bg-muted rounded-lg transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="block py-3 px-4 text-foreground hover:text-brand-primary hover:bg-muted rounded-lg transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Hero Section */}
      <main>
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-6xl mx-auto">
              {/* Coming Soon Badge */}
              <div className="inline-flex items-center gap-2 bg-brand-light border border-brand-primary/20 rounded-full px-6 py-3 mb-8">
                <Sparkles className="w-5 h-5 text-brand-primary" />
                <span className="text-sm font-bold text-brand-primary uppercase tracking-wide">
                  Coming Soon
                </span>
              </div>

              {/* Rwanda Badge */}
              <div className="mb-12">
                <h2 className="text-4xl md:text-6xl font-black text-brand-primary mb-4">
                  Rwanda's First Streaming App
                </h2>
              </div>

              {/* Countdown Timer */}
              <div className="mb-16">
                <div className="flex items-center justify-center gap-4 md:gap-8">
                  <div className="text-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white border-2 border-brand-primary rounded-2xl flex items-center justify-center mb-3 shadow-lg hover:scale-105 transition-transform">
                      <span className="text-3xl md:text-4xl font-black text-brand-primary">
                        {timeLeft.days}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                      Days
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white border-2 border-brand-secondary rounded-2xl flex items-center justify-center mb-3 shadow-lg hover:scale-105 transition-transform">
                      <span className="text-3xl md:text-4xl font-black text-brand-secondary">
                        {timeLeft.hours}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                      Hours
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white border-2 border-brand-primary rounded-2xl flex items-center justify-center mb-3 shadow-lg hover:scale-105 transition-transform">
                      <span className="text-3xl md:text-4xl font-black text-brand-primary">
                        {timeLeft.minutes}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                      Minutes
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white border-2 border-brand-secondary rounded-2xl flex items-center justify-center mb-3 shadow-lg hover:scale-105 transition-transform">
                      <span className="text-3xl md:text-4xl font-black text-brand-secondary">
                        {timeLeft.seconds}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                      Seconds
                    </span>
                  </div>
                </div>
              </div>

              {/* Hero Title */}
              <div className="mb-12">
                <h1 className="text-6xl md:text-9xl font-black mb-8 leading-tight">
                  The Future of{" "}
                  <span className="text-brand-primary">Streaming</span>
                  <br />
                  <span className="text-brand-secondary">Starts Here</span>
                </h1>
              </div>

              {/* Hero Description */}
              <div className="mb-16 max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-6">
                  Join the next generation of streaming with{" "}
                  <span className="text-brand-primary font-bold">
                    revolutionary technology
                  </span>
                  . Experience seamless content, connect with creators, and be
                  part of a{" "}
                  <span className="text-brand-secondary font-bold">
                    groundbreaking platform
                  </span>{" "}
                  that puts you first.
                </p>
              </div>

              {/* Platform Preview */}
              <div className="mb-20 max-w-5xl mx-auto">
                <Card className="shadow-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-brand-primary to-brand-secondary relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm hover:scale-110 transition-transform cursor-pointer">
                            <Play className="w-16 h-16 text-white ml-2" />
                          </div>
                          <h3 className="text-3xl font-bold mb-4">
                            Experience StroomUp
                          </h3>
                          <p className="text-xl opacity-90">
                            Ultra-low latency • 4K Quality • Instant Payouts
                          </p>
                        </div>
                      </div>

                      {/* Live indicator */}
                      <div className="absolute top-6 left-6 bg-red-500 rounded-full px-4 py-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white text-sm font-bold">
                          LIVE
                        </span>
                      </div>

                      {/* Viewer count */}
                      <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                        <span className="text-white font-semibold">
                          12.5K viewers
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Early Access Form */}
              <div className="max-w-lg mx-auto mb-20">
                <Card className="shadow-2xl">
                  <CardContent className="p-10">
                    {!isSubmitted ? (
                      <>
                        <h3 className="text-3xl font-black mb-3 text-brand-primary">
                          Get Early Access
                        </h3>
                        <p className="text-muted-foreground mb-8 text-lg">
                          Be among the first to experience StroomUp and receive
                          exclusive rewards.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <Input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-14 text-lg"
                            required
                          />
                          <Input
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-14 text-lg"
                            required
                          />
                          <Button
                            type="submit"
                            className="w-full bg-brand-primary hover:bg-brand-secondary h-14 text-lg font-bold"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <div className="flex items-center gap-3">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Joining...
                              </div>
                            ) : (
                              <div className="flex items-center gap-3">
                                Join Waitlist <ArrowRight className="w-5 h-5" />
                              </div>
                            )}
                          </Button>
                        </form>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                        <h3 className="text-3xl font-black mb-3 text-green-600">
                          Welcome to StroomUp!
                        </h3>
                        <p className="text-muted-foreground mb-8 text-lg">
                          Thank you, {name}! You're now on our early access
                          list. We'll send you exclusive updates and rewards to{" "}
                          {email}.
                        </p>
                        <Button
                          onClick={resetForm}
                          variant="outline"
                          className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                        >
                          Thank You for Submitting
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-black text-brand-primary">
                    10K+
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Early Adopters
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-black text-brand-secondary">
                    24/7
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Live Streaming
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-black text-brand-primary">
                    Premium
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Content Quality
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-20 bg-brand-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-black mb-6">
                Why <span className="text-brand-primary">StroomUp?</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Built for the modern streaming experience with cutting-edge
                technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
              <Card className="border-2 border-transparent hover:border-brand-primary transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">Ultra-Low Latency</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Experience real-time streaming with industry-leading low
                    latency technology.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-transparent hover:border-brand-secondary transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-brand-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">Creator-First</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Built by creators, for creators. Better monetization and
                    audience engagement.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-transparent hover:border-brand-primary transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">Premium Quality</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    4K streaming, spatial audio, and advanced compression
                    technology.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-transparent hover:border-brand-secondary transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-brand-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">Instant Payouts</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Get paid instantly for your creative content with zero
                    delays.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-transparent hover:border-brand-primary transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-sm">SC</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3">Stroomcoins (SC)</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Our digital currency for tips, rewards, premium features,
                    and creator monetization.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-black mb-6">
              Ready to Join the{" "}
              <span className="text-brand-primary">Future</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be part of Rwanda's streaming revolution. Get early access and
              exclusive benefits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-brand-primary hover:bg-brand-secondary text-white px-8 py-4 text-lg font-bold h-auto">
                Get Early Access
              </Button>
              <Button
                variant="outline"
                className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-8 py-4 text-lg font-bold h-auto"
                asChild
              >
                <Link to="/features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src="https://cdn.builder.io/api/v1/assets/ca8bde47d0f2460ebb2309d2c38bd41f/group-4-4d2e09?format=webp&width=800"
                alt="StroomUp Logo"
                className="w-24 h-24 md:w-28 md:h-28 object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 StroomUp. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
