import { ArrowLeft, Users, Target, Zap, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      <section className="py-20 bg-gradient-to-b from-brand-light to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            About <span className="text-brand-primary">StroomUp</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Rwanda's pioneering streaming platform built to revolutionize how
            creators connect with their audience and monetize their content.
          </p>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border border-border">
              <h2 className="text-3xl font-bold mb-6 text-brand-primary">
                Our Mission
              </h2>
              <p className="text-lg text-foreground leading-relaxed">
                To empower Rwandan creators with cutting-edge streaming
                technology, fostering a vibrant digital ecosystem that
                celebrates local talent while connecting with global audiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-16">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 border-transparent hover:border-brand-primary transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Community First</h3>
                <p className="text-muted-foreground">
                  Building a platform that puts creators and viewers at the
                  heart of every decision we make.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-brand-secondary transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Innovation</h3>
                <p className="text-muted-foreground">
                  Pushing the boundaries of streaming technology to deliver
                  unparalleled experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-brand-primary transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Excellence</h3>
                <p className="text-muted-foreground">
                  Committed to delivering world-class quality in every aspect of
                  our platform.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-12">Our Story</h2>

            <div className="bg-white rounded-3xl p-12 shadow-2xl">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg mb-6">
                  StroomUp was born from a simple observation: Rwanda's creative
                  talent deserved a platform that truly understood and served
                  their unique needs. As the country continues its remarkable
                  digital transformation, we saw an opportunity to be at the
                  forefront of the streaming revolution.
                </p>

                <p className="text-lg mb-6">
                  Our team combines deep understanding of the local market with
                  world-class technical expertise. We're not just building a
                  streaming platform – we're creating a digital ecosystem that
                  empowers creators, engages audiences, and drives economic
                  growth.
                </p>

                <p className="text-lg">
                  From ultra-low latency streaming to instant creator payouts,
                  every feature is designed with our community in mind. StroomUp
                  represents the future of digital content in Rwanda and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-6">
            Ready to Join the Revolution?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of Rwanda's streaming future. Get early access and exclusive
            benefits.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-secondary transition-colors"
          >
            Get Early Access
          </Link>
        </div>
      </section>
    </div>
  );
}
