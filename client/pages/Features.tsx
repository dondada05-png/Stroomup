import { ArrowLeft, Play, Users, Star, Zap, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export default function Features() {
  const features = [
    {
      icon: Play,
      title: "Ultra-Low Latency",
      description: "Sub-second streaming delay for real-time interaction",
      color: "brand-primary",
    },
    {
      icon: Users,
      title: "Creator-First Platform",
      description: "Built by creators, for creators with better monetization",
      color: "brand-secondary",
    },
    {
      icon: Star,
      title: "4K Premium Quality",
      description: "Crystal clear streaming with spatial audio technology",
      color: "brand-primary",
    },
    {
      icon: Zap,
      title: "Instant Payouts",
      description: "Get paid immediately for your creative content",
      color: "brand-secondary",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security for creators and viewers",
      color: "brand-primary",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect Rwandan creators with worldwide audiences",
      color: "brand-secondary",
    },
  ];

  const StroomcoinIcon = () => (
    <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center">
      <span className="text-white font-bold text-lg">SC</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="relative">
              <img
                src="https://cdn.builder.io/api/v1/assets/ca8bde47d0f2460ebb2309d2c38bd41f/group-4-4d2e09?format=webp&width=800"
                alt="StroomUp Logo"
                className="w-24 h-24 md:w-28 md:h-28 object-contain hover:scale-105 transition-transform"
              />
            </div>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-brand-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-black mb-8">
            Powerful <span className="text-brand-primary">Features</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-16">
            Everything you need to create, stream, and monetize your content on
            Rwanda's most advanced platform.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className={`group border-2 border-transparent hover:border-${feature.color} transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
                >
                  <CardContent className="p-10 text-center h-full flex flex-col">
                    <div
                      className={`w-24 h-24 bg-${feature.color} rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed flex-1">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">See It In Action</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of streaming with our interactive platform
              preview.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-brand-primary to-brand-secondary relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm hover:scale-110 transition-transform cursor-pointer">
                        <Play className="w-16 h-16 text-white ml-2" />
                      </div>
                      <h3 className="text-3xl font-bold mb-4">
                        Interactive Platform Demo
                      </h3>
                      <p className="text-xl opacity-90">
                        Click to explore StroomUp's features
                      </p>
                    </div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                    <span className="text-white font-semibold">
                      Ultra-Low Latency: &lt;500ms
                    </span>
                  </div>
                  <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                    <span className="text-white font-semibold">4K Quality</span>
                  </div>
                  <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                    <span className="text-white font-semibold">
                      Instant Payouts
                    </span>
                  </div>
                  <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                    <span className="text-white font-semibold">
                      Global Reach
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stroomcoins Section */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <StroomcoinIcon />
              <h2 className="text-5xl font-black">Stroomcoins (SC)</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The revolutionary digital currency that powers the StroomUp
              ecosystem, enabling seamless transactions, rewards, and creator
              monetization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Earn SC</h3>
                <p className="text-muted-foreground">
                  Earn Stroomcoins by streaming, watching content, engaging with
                  creators, and participating in the community.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Tip Creators</h3>
                <p className="text-muted-foreground">
                  Support your favorite creators with instant SC tips that go
                  directly to their wallet.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Premium Access</h3>
                <p className="text-muted-foreground">
                  Use SC to unlock premium features, exclusive content, and
                  enhanced streaming quality.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Global Exchange</h3>
                <p className="text-muted-foreground">
                  Convert SC to local currency or other digital assets through
                  our secure exchange system.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">Technical Excellence</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge technology for unmatched performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-black text-brand-primary mb-2">
                &lt;500ms
              </div>
              <div className="text-muted-foreground">Latency</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-brand-secondary mb-2">
                4K@60fps
              </div>
              <div className="text-muted-foreground">Max Quality</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-brand-primary mb-2">
                99.9%
              </div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-brand-secondary mb-2">
                Global
              </div>
              <div className="text-muted-foreground">CDN</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-black mb-6 text-white">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of creators already signed up for early access.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-white text-brand-primary font-bold rounded-xl hover:bg-gray-100 transition-colors"
          >
            Get Early Access Now
          </Link>
        </div>
      </section>
    </div>
  );
}
