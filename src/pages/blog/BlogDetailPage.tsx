import { blogServices } from "./services/blog.services";
import BlogDetail from "../../views/blog/blogDetail";

export default function BlogDetailPage() {
  return <BlogDetail blogServices={blogServices} />;
}
