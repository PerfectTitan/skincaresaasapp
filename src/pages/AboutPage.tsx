import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-20 px-4">
        <div className="space-y-6 max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">
            About GlowSage
          </h1>
          <p className="text-xl text-muted-foreground text-center">
            We're on a mission to revolutionize skincare through personalization
            and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img
              src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80"
              alt="Our mission"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              At GlowSage, we believe that everyone deserves skincare that works
              specifically for them. Our mission is to demystify skincare by
              combining cutting-edge AI technology with dermatological expertise
              to create truly personalized skincare routines.
            </p>
            <p className="text-lg text-muted-foreground">
              We understand that skincare isn't one-size-fits-all. That's why
              we've built a platform that adapts to your unique skin needs,
              tracks your progress, and evolves with you on your skincare
              journey.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1 space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-lg text-muted-foreground">
              GlowSage was founded in 2023 by a team of skincare enthusiasts,
              dermatologists, and tech innovators who were frustrated with the
              overwhelming and often contradictory skincare advice available
              online.
            </p>
            <p className="text-lg text-muted-foreground">
              After years of research and development, we created an AI-powered
              platform that could analyze individual skin profiles and generate
              personalized routines based on scientific evidence rather than
              marketing hype.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, GlowSage helps thousands of users achieve their skin goals
              with routines that are tailored to their unique needs,
              preferences, and budget.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&q=80"
              alt="Our story"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-8 mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-3">
                Science-Based Approach
              </h3>
              <p className="text-muted-foreground">
                We believe in skincare that's backed by scientific research, not
                trends. All our recommendations are evidence-based and
                dermatologist-approved.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-3">Personalization</h3>
              <p className="text-muted-foreground">
                We recognize that everyone's skin is unique. Our technology
                creates truly personalized routines that address your specific
                concerns and goals.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-3">Transparency</h3>
              <p className="text-muted-foreground">
                We're committed to being honest about what works and what
                doesn't. We provide clear information about ingredients,
                products, and expected results.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="aspect-square rounded-full overflow-hidden mb-4 max-w-[200px] mx-auto">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold">Sarah Johnson</h3>
              <p className="text-sm text-muted-foreground">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="aspect-square rounded-full overflow-hidden mb-4 max-w-[200px] mx-auto">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                  alt="Dr. Michael Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold">Dr. Michael Chen</h3>
              <p className="text-sm text-muted-foreground">
                Chief Dermatologist
              </p>
            </div>
            <div className="text-center">
              <div className="aspect-square rounded-full overflow-hidden mb-4 max-w-[200px] mx-auto">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha"
                  alt="Aisha Patel"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold">Aisha Patel</h3>
              <p className="text-sm text-muted-foreground">Lead AI Engineer</p>
            </div>
            <div className="text-center">
              <div className="aspect-square rounded-full overflow-hidden mb-4 max-w-[200px] mx-auto">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=James"
                  alt="James Wilson"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold">James Wilson</h3>
              <p className="text-sm text-muted-foreground">Product Director</p>
            </div>
          </div>
        </div>

        <div className="text-center bg-primary/5 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Skincare Routine?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have discovered their perfect skincare
            routine with GlowSage.
          </p>
          <Link to="/quiz">
            <Button size="lg">Start Your Skin Assessment</Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
