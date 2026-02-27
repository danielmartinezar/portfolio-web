import type { Metadata } from "next";
import HomePage from "../features/home/HomePage";
import { getRecentArticles } from "../blog/util/recent-articles";

export const metadata: Metadata = {
  title: "Daniel Martinez | Software Engineer",
};

export default function Page() {
  const recentArticles = getRecentArticles(3);
  return <HomePage recentArticles={recentArticles} />;
}
