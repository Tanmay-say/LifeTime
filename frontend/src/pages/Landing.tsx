import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Users, Droplets, Bot, ArrowRight, Shield, Clock, MapPin } from 'lucide-react';

const stats = [
  { value: '50,000+', label: 'Lives Saved' },
  { value: '12,000+', label: 'Active Donors' },
  { value: '500+', label: 'Partner Hospitals' },
  { value: '98%', label: 'Success Rate' },
];

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Matching',
    description: 'Smart algorithms connect donors with urgent needs in real-time.',
  },
  {
    icon: Shield,
    title: 'Health Tracking',
    description: 'Monitor your eligibility and health metrics for safe donations.',
  },
  {
    icon: Clock,
    title: 'Quick Response',
    description: 'Average confirmation time under 4 hours for critical requests.',
  },
  {
    icon: MapPin,
    title: 'Nearby Drives',
    description: 'Find donation opportunities within your community.',
  },
];

export const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-xl text-foreground">LifeLink</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/user/dashboard">
                <Button variant="ghost">Donor Portal</Button>
              </Link>
              <Link to="/admin/dashboard">
                <Button variant="outline">Hospital Login</Button>
              </Link>
              <Link to="/user/dashboard">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Every Drop Counts
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Donate Blood.{' '}
              <span className="text-primary">Save Lives.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join LifeLink's intelligent blood donation network. Connect with hospitals in need, track your health, and make a real impact in your community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/user/dashboard">
                <Button size="lg" className="gap-2">
                  Start Donating <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/user/drives">
                <Button size="lg" variant="outline">
                  Find a Drive
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              AI-Powered Impact
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              LifeLink uses advanced technology to make blood donation efficient, safe, and impactful.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Your blood donation can save up to 3 lives. Join thousands of donors who are making an impact every day.
          </p>
          <Link to="/user/dashboard">
            <Button size="lg" variant="secondary" className="gap-2">
              Join LifeLink Today <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-xl text-foreground">LifeLink</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 LifeLink. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
