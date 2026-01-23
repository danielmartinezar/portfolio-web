import { blogServices } from "./services/blog.services";
import Blog from "../../views/blog/blog";

export default function BlogPage() {
  return <Blog blogServices={blogServices} />;
}
