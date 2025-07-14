import { ArrowLeft, Mail, MapPin, Phone, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            Get In <span className="text-brand-primary">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about StroomUp? Want to partner with us? We'd love to
            hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-black mb-8">Send us a message</h2>

              {!isSubmitted ? (
                <Card className="shadow-2xl">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Name *
                          </label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="h-12"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Email *
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="h-12"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Subject *
                        </label>
                        <Input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="h-12"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-brand-primary hover:bg-brand-secondary h-14 text-lg font-bold"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            Send Message <Send className="w-5 h-5" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-2xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. We'll get back to you within
                      24 hours.
                    </p>
                    <Button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          subject: "",
                          message: "",
                        });
                      }}
                      variant="outline"
                      className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                    >
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-4xl font-black mb-8">Contact Information</h2>

              <div className="space-y-8">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <p className="text-muted-foreground">hello@stroomup.rw</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-secondary rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Phone</h3>
                      <p className="text-muted-foreground">+250 788 123 456</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        Kigali, Rwanda
                        <br />
                        East Africa
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Business Hours */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Business Hours</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="font-semibold">8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span className="font-semibold">9:00 AM - 3:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-semibold">Closed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about StroomUp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">When will StroomUp launch?</h3>
                <p className="text-muted-foreground">
                  We're launching soon! Sign up for early access to be notified
                  first.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">Is StroomUp free to use?</h3>
                <p className="text-muted-foreground">
                  We offer both free and premium tiers with different features
                  and monetization options.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">How do creators get paid?</h3>
                <p className="text-muted-foreground">
                  Creators receive instant payouts through multiple payment
                  methods including mobile money.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">
                  What makes StroomUp different?
                </h3>
                <p className="text-muted-foreground">
                  Ultra-low latency, instant payouts, and focus on the Rwandan
                  market with global reach.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
