export interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  badgeClass?: string;
  body?: string; // HTML body for the blog
}
