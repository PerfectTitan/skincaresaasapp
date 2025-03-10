import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Your Skin Type: The First Step to Great Skin",
    excerpt:
      "Learn how to identify your skin type and why it's crucial for building an effective skincare routine.",
    image:
      "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?w=800&q=80",
    date: "June 15, 2023",
    author: "Dr. Michael Chen",
    category: "Skin Basics",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "The Science Behind Hyaluronic Acid: Hydration Hero",
    excerpt:
      "Discover why hyaluronic acid has become a staple in modern skincare and how it works to keep your skin plump and hydrated.",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
    date: "July 3, 2023",
    author: "Aisha Patel",
    category: "Ingredients",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Morning vs. Evening Routines: Why You Need Both",
    excerpt:
      "Learn the importance of having separate morning and evening skincare routines and what each should include for optimal results.",
    image:
      "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=800&q=80",
    date: "August 12, 2023",
    author: "Sarah Johnson",
    category: "Routines",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Dealing with Acne: Myths and Facts",
    excerpt:
      "Separate fact from fiction when it comes to treating acne, with evidence-based approaches that actually work.",
    image:
      "https://images.unsplash.com/photo-1564361647168-576232f638ce?w=800&q=80",
    date: "September 5, 2023",
    author: "Dr. Michael Chen",
    category: "Skin Concerns",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "Sunscreen 101: Why It's Non-Negotiable",
    excerpt:
      "Understand the critical importance of daily sunscreen use and how to choose the right one for your skin type.",
    image:
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&q=80",
    date: "October 18, 2023",
    author: "James Wilson",
    category: "Sun Protection",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "The Role of Diet in Skin Health",
    excerpt:
      "Explore the connection between what you eat and how your skin looks, with evidence-based dietary recommendations.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    date: "November 7, 2023",
    author: "Aisha Patel",
    category: "Lifestyle",
    readTime: "9 min read",
  },
];

const categories = [
  "All",
  "Skin Basics",
  "Ingredients",
  "Routines",
  "Skin Concerns",
  "Sun Protection",
  "Lifestyle",
];

export default function BlogPage() {
  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto py-20 px-4">
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">
            The GlowSage Blog
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Expert advice, skincare tips, and the latest in dermatological
            research
          </p>
        </div>

        <div className="flex overflow-x-auto pb-4 mb-8 gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm whitespace-nowrap"
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg overflow-hidden bg-card flex flex-col"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t">
                  <div className="text-sm">
                    <span className="text-muted-foreground">
                      By {post.author}
                    </span>
                    <span className="text-muted-foreground block">
                      {post.date}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>

        <div className="mt-20 bg-muted/30 rounded-lg p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-6">
              Get the latest skincare tips, product recommendations, and
              exclusive content delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
