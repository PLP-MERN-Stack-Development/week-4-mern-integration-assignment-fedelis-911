// Home.jsx - Home page component

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, PenTool, BookOpen, Users, TrendingUp } from 'lucide-react';
import { usePosts } from '../hooks/usePosts';
import { useCategories } from '../hooks/useCategories';
import PostCard from '../components/PostCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { posts, loading, error } = usePosts(1, 6, selectedCategory, searchTerm);
  const { categories } = useCategories();

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled automatically by the usePosts hook
  };

  const stats = [
    { label: 'Total Posts', value: '150+', icon: BookOpen },
    { label: 'Active Writers', value: '25+', icon: Users },
    { label: 'Categories', value: categories.length, icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Welcome to MERN Blog
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A full-stack blog application built with MongoDB, Express.js, React, and Node.js. 
            Share your thoughts, discover amazing content, and connect with fellow writers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/posts">
              <Button size="lg" className="text-lg px-8 py-3">
                <BookOpen className="h-5 w-5 mr-2" />
                Explore Posts
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <PenTool className="h-5 w-5 mr-2" />
                Start Writing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">
                      {stat.value}
                    </h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Latest Posts
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover the latest articles from our community
            </p>
          </div>

          {/* Search and Categories */}
          <div className="mb-8 space-y-4">
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </form>

            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category._id}
                    variant={selectedCategory === category._id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category._id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Posts Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded mb-4 w-3/4"></div>
                    <div className="h-3 bg-muted rounded mb-1"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <p className="text-muted-foreground">
                Unable to load posts. This might be because the server is not connected to a database.
              </p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No posts found
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || selectedCategory 
                  ? "Try adjusting your search or filter criteria."
                  : "Be the first to create a post!"
                }
              </p>
              <Link to="/create-post">
                <Button>
                  <PenTool className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link to="/posts">
                  <Button variant="outline" size="lg">
                    View All Posts
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose MERN Blog?
            </h2>
            <p className="text-lg text-muted-foreground">
              Built with modern technologies for the best user experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PenTool className="h-5 w-5 text-primary" />
                  <span>Rich Editor</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create beautiful posts with our intuitive editor. Add images, format text, and express your ideas perfectly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Community</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with fellow writers and readers. Comment on posts, share ideas, and build meaningful relationships.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track your post performance with detailed analytics. See views, engagement, and grow your audience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

