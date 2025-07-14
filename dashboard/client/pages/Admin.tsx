import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Users,
  Play,
  DollarSign,
  TrendingUp,
  Settings,
  UserCheck,
  Activity,
  Eye,
  Clock,
  Star,
  Shield,
  BarChart3,
  Search,
  Filter,
  Download,
  RefreshCw,
  Bell,
  LogOut,
  Menu,
  X,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { io, Socket } from "socket.io-client";

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [earlyAccessSignups, setEarlyAccessSignups] = useState<any[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Initialize Socket.io connection
  useEffect(() => {
    const newSocket = io("http://localhost:3010");
    setSocket(newSocket);

    // Listen for real-time updates
    newSocket.on("contactSubmission", (newContact) => {
      setContactSubmissions(prev => [newContact, ...prev]);
    });

    newSocket.on("earlyAccessSignup", (newSignup) => {
      setEarlyAccessSignups(prev => [newSignup, ...prev]);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchEarlyAccessSignups();
    fetchContactSubmissions();
  }, []);

  const fetchEarlyAccessSignups = async () => {
    try {
      const response = await fetch("http://localhost:3010/api/early-access");
      if (response.ok) {
        const data = await response.json();
        setEarlyAccessSignups(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching early access signups:", error);
    }
  };

  const fetchContactSubmissions = async () => {
    try {
      const response = await fetch("http://localhost:3010/api/contact");
      if (response.ok) {
        const data = await response.json();
        setContactSubmissions(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
    }
  };

  const updateContactStatus = async (contactId: number, status: string) => {
    try {
      const response = await fetch(`http://localhost:3010/api/contact/${contactId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        // Update the local state
        setContactSubmissions(prev => 
          prev.map(contact => 
            contact.id === contactId 
              ? { ...contact, status } 
              : contact
          )
        );
      }
    } catch (error) {
      console.error("Error updating contact status:", error);
    }
  };

  const sendReply = async () => {
    if (!selectedContact || !replyMessage.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3010/api/contact/${selectedContact.id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: replyMessage }),
      });

      if (response.ok) {
        // Update the local state
        setContactSubmissions(prev => 
          prev.map(contact => 
            contact.id === selectedContact.id 
              ? { 
                  ...contact, 
                  status: "Replied",
                  replies: [...(contact.replies || []), {
                    id: Date.now(),
                    message: replyMessage,
                    date: new Date().toLocaleString(),
                  }]
                } 
              : contact
          )
        );
        setSelectedContact(null);
        setReplyMessage("");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateEarlyAccessStatus = async (signupId: number, status: string) => {
    try {
      const response = await fetch(`http://localhost:3010/api/early-access/${signupId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        // Update the local state
        setEarlyAccessSignups(prev => 
          prev.map(signup => 
            signup.id === signupId 
              ? { ...signup, status } 
              : signup
          )
        );
      }
    } catch (error) {
      console.error("Error updating early access status:", error);
    }
  };

  const stats = [
    {
      title: "Early Access Signups",
      value: earlyAccessSignups.length.toString(),
      change: `${earlyAccessSignups.filter(s => s.signupDate.includes(new Date().toDateString())).length} today`,
      icon: UserCheck,
      color: "text-brand-primary",
    },
    {
      title: "Contact Messages",
      value: contactSubmissions.length.toString(),
      change: `${contactSubmissions.filter(c => c.submittedDate.includes(new Date().toDateString())).length} today`,
      icon: Bell,
      color: "text-brand-secondary",
    },
    {
      title: "New Messages",
      value: contactSubmissions
        .filter((c) => c.status === "New")
        .length.toString(),
      change: contactSubmissions.filter((c) => c.status === "New").length > 0 ? "Need attention" : "All caught up",
      icon: Activity,
      color: "text-red-500",
    },
    {
      title: "Response Rate",
      value: contactSubmissions.length > 0 
        ? `${Math.round((contactSubmissions.filter(c => c.status === "Replied").length / contactSubmissions.length) * 100)}%`
        : "0%",
      change: contactSubmissions.length > 0 ? "Active" : "No messages",
      icon: TrendingUp,
      color: "text-green-500",
    },
  ];

  // Remove dummy data - only show real entries
  const recentActivity = [
    // This will be populated with real data from API
  ];

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "signups", label: "Early Access", icon: UserCheck },
    { id: "contacts", label: "Contact Messages", icon: Bell },
  ];

  const handleReply = (contact: any) => {
    setSelectedContact(contact);
    setReplyMessage("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="StroomUp Logo"
              className="w-40 h-40 object-contain" // Increased size to w-40 h-40
            />
            {/* Removed the StroomUp Admin text */}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-brand-primary text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Admin profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <div className="font-semibold">Admin User</div>
              <div className="text-xs text-muted-foreground">
                admin@stroomup.rw
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => console.log("Logout")}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  fetchEarlyAccessSignups();
                  fetchContactSubmissions();
                }}
              >
                <RefreshCw className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <Icon className={`w-8 h-8 ${stat.color}`} />
                          <Badge
                            variant="secondary"
                            className="text-green-600 bg-green-100"
                          >
                            {stat.change}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stat.title}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Charts and tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Signups */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserCheck className="w-5 h-5" />
                      Recent Early Access Signups
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {earlyAccessSignups.slice(0, 4).map((signup) => (
                        <div
                          key={signup.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                        >
                          <div>
                            <div className="font-semibold">{signup.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {signup.email}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                signup.status === "New"
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                signup.status === "New"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }
                            >
                              {signup.status}
                            </Badge>
                            <div className="text-xs text-muted-foreground mt-1">
                              {signup.signupDate}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Contact Messages */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Recent Contact Messages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contactSubmissions.slice(0, 4).map((contact) => (
                        <div
                          key={contact.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                        >
                          <div className="flex-1">
                            <div className="font-semibold">{contact.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {contact.subject}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {contact.submittedDate}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                contact.status === "New"
                                  ? "destructive"
                                  : contact.status === "In Progress"
                                    ? "default"
                                    : "secondary"
                              }
                              className="mb-2"
                            >
                              {contact.status}
                            </Badge>
                            <div className="text-xs text-muted-foreground">
                              {contact.priority} Priority
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activity feed */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-semibold">
                            {activity.type}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {activity.message}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {activity.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Early Access Signups tab */}
          {activeTab === "signups" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Early Access Signups</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search signups..."
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border">
                        <tr>
                          <th className="text-left p-4 font-semibold">Name</th>
                          <th className="text-left p-4 font-semibold">Email</th>
                          <th className="text-left p-4 font-semibold">
                            Signup Date
                          </th>
                          <th className="text-left p-4 font-semibold">
                            Status
                          </th>
                          <th className="text-left p-4 font-semibold">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {earlyAccessSignups.map((signup) => (
                          <tr
                            key={signup.id}
                            className="border-b border-border hover:bg-muted/50"
                          >
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold">
                                    {signup.name.charAt(0)}
                                  </span>
                                </div>
                                <div className="font-semibold">
                                  {signup.name}
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-muted-foreground">
                              {signup.email}
                            </td>
                            <td className="p-4 text-muted-foreground">
                              {signup.signupDate}
                            </td>
                            <td className="p-4">
                              <Badge
                                variant={
                                  signup.status === "New"
                                    ? "default"
                                    : "secondary"
                                }
                                className={
                                  signup.status === "New"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                                }
                              >
                                {signup.status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <Bell className="w-4 h-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>
                                        Contact {signup.name}
                                      </DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <label className="block text-sm font-semibold mb-2">
                                          Email Subject
                                        </label>
                                        <Input
                                          placeholder="Welcome to StroomUp Early Access!"
                                          defaultValue="Welcome to StroomUp Early Access!"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-sm font-semibold mb-2">
                                          Message
                                        </label>
                                        <textarea
                                          className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                          rows={6}
                                          placeholder={`Hi ${signup.name},\n\nThank you for signing up for StroomUp early access! We're excited to have you as part of our community.\n\nWe'll keep you updated on our launch progress and send you exclusive early access when we're ready.\n\nBest regards,\nThe StroomUp Team`}
                                          defaultValue={`Hi ${signup.name},\n\nThank you for signing up for StroomUp early access! We're excited to have you as part of our community.\n\nWe'll keep you updated on our launch progress and send you exclusive early access when we're ready.\n\nBest regards,\nThe StroomUp Team`}
                                        />
                                      </div>
                                      <Button className="w-full bg-brand-primary hover:bg-brand-secondary">
                                        Send Email
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => updateEarlyAccessStatus(signup.id, signup.status === "New" ? "Contacted" : "New")}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Contact Messages tab */}
          {activeTab === "contacts" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Contact Messages</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search messages..."
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button>
                    <Filter className="w-4 h-4 mr-2" />
                    Filter by Status
                  </Button>
                </div>
              </div>

              <div className="grid gap-6">
                {contactSubmissions.map((contact) => (
                  <Card
                    key={contact.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {contact.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">
                              {contact.name}
                            </h3>
                            <p className="text-muted-foreground">
                              {contact.email}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {contact.submittedDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              contact.status === "New"
                                ? "destructive"
                                : contact.status === "In Progress"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {contact.status}
                          </Badge>
                          <Badge variant="outline">
                            {contact.priority} Priority
                          </Badge>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">
                          Subject: {contact.subject}
                        </h4>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-sm leading-relaxed">
                            {contact.message}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => handleReply(contact)}
                              className="bg-brand-primary hover:bg-brand-secondary"
                            >
                              Reply
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Reply to {contact.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">
                                  Original Message:
                                </h4>
                                <p className="text-sm">{contact.message}</p>
                              </div>
                              <div>
                                <label className="block text-sm font-semibold mb-2">
                                  Your Reply
                                </label>
                                <textarea
                                  value={replyMessage}
                                  onChange={(e) =>
                                    setReplyMessage(e.target.value)
                                  }
                                  className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary bg-gray-800 text-white placeholder-gray-400"
                                  rows={8}
                                  placeholder={`Hi ${contact.name},\n\nThank you for reaching out to StroomUp!\n\n[Your response here]\n\nBest regards,\nThe StroomUp Team`}
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={sendReply}
                                  className="bg-brand-primary hover:bg-brand-secondary"
                                  disabled={!replyMessage.trim() || isLoading}
                                >
                                  {isLoading ? "Sending..." : "Send Reply"}
                                </Button>
                                <Button variant="outline">Save Draft</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="outline"
                          onClick={() => updateContactStatus(contact.id, contact.status === "New" ? "In Progress" : "Completed")}
                        >
                          Mark as{" "}
                          {contact.status === "New"
                            ? "In Progress"
                            : "Completed"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}



          {/* Other tabs can be added here */}
          {activeTab !== "dashboard" && activeTab !== "signups" && activeTab !== "contacts" && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4 capitalize">
                {activeTab} Section
              </h2>
              <p className="text-muted-foreground mb-8">
                This section is under development. Coming soon!
              </p>
              <Button onClick={() => setActiveTab("dashboard")}>
                Back to Dashboard
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
