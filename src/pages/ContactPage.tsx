import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-20 px-4">
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help you?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Please provide as much detail as possible..."
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-muted-foreground mb-1">
                    For general inquiries:
                  </p>
                  <a
                    href="mailto:info@glowsage.com"
                    className="text-primary hover:underline"
                  >
                    info@glowsage.com
                  </a>
                  <p className="text-muted-foreground mb-1 mt-2">
                    For support:
                  </p>
                  <a
                    href="mailto:support@glowsage.com"
                    className="text-primary hover:underline"
                  >
                    support@glowsage.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="text-muted-foreground mb-1">
                    Customer Service:
                  </p>
                  <a
                    href="tel:+18005551234"
                    className="text-primary hover:underline"
                  >
                    +1 (800) 555-1234
                  </a>
                  <p className="text-muted-foreground mb-1 mt-2">
                    Technical Support:
                  </p>
                  <a
                    href="tel:+18005555678"
                    className="text-primary hover:underline"
                  >
                    +1 (800) 555-5678
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Visit Us</h3>
                  <p className="text-muted-foreground">
                    GlowSage Headquarters
                    <br />
                    123 Skincare Avenue
                    <br />
                    San Francisco, CA 94105
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM (PST)
                    <br />
                    Saturday: 10:00 AM - 4:00 PM (PST)
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden h-[400px] mb-16">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.77791667087!2d-122.43149379509717!3d37.77492951312436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858080b9b0a253%3A0x70b8c1b4e71be321!2sSan%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1656543301408!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Follow us on social media for skincare tips, product
            recommendations, and the latest updates.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
