'use client';

import { NewsArticle } from '@/types/news';
import './NewsCard.css';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateText = (text: string | null, maxLength: number = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="news-card glass-card">
      {article.urlToImage && (
        <div className="news-image-container">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="news-image"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="news-content">
        <div className="news-header">
          <span className="news-source">{article.source.name}</span>
          {article.publishedAt && (
            <span className="news-date">{formatDate(article.publishedAt)}</span>
          )}
        </div>

        <h2 className="news-title">{article.title}</h2>

        {article.description && (
          <p className="news-description">{truncateText(article.description)}</p>
        )}

        {article.author && (
          <p className="news-author">By {article.author}</p>
        )}

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="news-link"
        >
          Read Full Article →
        </a>
      </div>
    </div>
  );
}

