// PostCard.jsx - Post card component

import { Link } from 'react-router-dom';
import { Calendar, User, Eye, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

const PostCard = ({ post }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getImageUrl = (imageName) => {
    if (!imageName || imageName === 'default-post.jpg') {
      return 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop';
    }
    return `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}/uploads/${imageName}`;
  };

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={getImageUrl(post.featuredImage)}
            alt={post.title}
            className="w-full h-48 object-cover rounded-t-lg"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop';
            }}
          />
          {post.category && (
            <Badge 
              className="absolute top-3 left-3"
              style={{ backgroundColor: post.category.color }}
            >
              {post.category.name}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-3">
          <Link to={`/posts/${post.slug || post._id}`}>
            <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>
          
          {post.excerpt && (
            <p className="text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              {post.author && (
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{post.author.name}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{post.viewCount || 0}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments?.length || 0}</span>
              </div>
            </div>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{post.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;

