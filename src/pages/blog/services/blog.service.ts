import type { IBlogService } from './types';
import { LocalMarkdownBlogService } from './local-markdown-blog.service';

class BlogServiceWrapper implements IBlogService {
  private service: IBlogService;

  constructor(service: IBlogService) {
    this.service = service;
  }

  setService(service: IBlogService) {
    this.service = service;
  }

  getArticles(...args: Parameters<IBlogService['getArticles']>) {
    return this.service.getArticles(...args);
  }

  getArticleBySlug(...args: Parameters<IBlogService['getArticleBySlug']>) {
    return this.service.getArticleBySlug(...args);
  }

  getAllArticles(...args: Parameters<IBlogService['getAllArticles']>) {
    return this.service.getAllArticles(...args);
  }
}

export const blogService = new BlogServiceWrapper(new LocalMarkdownBlogService());
