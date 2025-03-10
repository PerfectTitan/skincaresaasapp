import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

export default function PricingPage() {
  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-20 px-4">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for your skincare journey. All plans
            include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="border rounded-lg overflow-hidden bg-card">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Free</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">$0</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Perfect for beginners starting their skincare journey
              </p>
            </div>
            <div className="p-6 space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                  <span>Basic skin assessment</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                  <span>Personalized routine recommendations</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                  <span>Progress tracking (up to 5 photos)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                  <span>Basic skin metrics</span>
                </li>
              </ul>
              <Link to="/signup">
                <Button variant="outline" className="w-full mt-6">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="border rounded-lg overflow-hidden bg-card relative">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
              Popular
            </div>
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Pro</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                For skincare enthusiasts who want deeper insights
              </p>
            </div>
            <div className="p-6 space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                  <span>Advanced skin assessment with AI analysis</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                  <span>Personalized routine with product alternatives</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                  <span>Unlimited progress photos</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                  <span>Advanced skin metrics with trend analysis</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                  <span>Weekly personalized tips</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                  <span>Priority customer support</span>
                </li>
              </ul>
              <Link to="/signup">
                <Button className="w-full mt-6">Start Free Trial</Button>
              </Link>
            </div>
          </div>

          {/* Pro Max Plan */}
          <div className="border rounded-lg overflow-hidden bg-card">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Pro Max</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">$19.99</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                For skincare professionals and serious enthusiasts
              </p>
            </div>
            <div className="p-6 space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                  <span>Everything in Pro plan</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                  <span>Monthly virtual consultation with dermatologist</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                  <span>Custom ingredient analysis for all products</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                  <span>Seasonal skincare routine adjustments</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                  <span>Early access to new features</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                  <span>Exclusive product discounts</span>
                </li>
              </ul>
              <Link to="/signup">
                <Button variant="outline" className="w-full mt-6">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. If you
                cancel, you'll still have access to your plan until the end of
                your billing period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                How does the free trial work?
              </h3>
              <p className="text-muted-foreground">
                All paid plans come with a 14-day free trial. You won't be
                charged until the trial period ends, and you can cancel anytime
                before then.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Can I switch between plans?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. If you
                upgrade, the change will take effect immediately. If you
                downgrade, the change will take effect at the end of your
                current billing cycle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is my data secure?</h3>
              <p className="text-muted-foreground">
                We take data security seriously. All your personal information
                and photos are encrypted and stored securely. We never share
                your data with third parties without your explicit consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
