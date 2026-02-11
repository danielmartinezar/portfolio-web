import type { Metadata } from "next";
import AboutPage from "../../features/about/AboutPage";

export const metadata: Metadata = {
  title: "Daniel Martinez | About",
};

export default function Page() {
  return <AboutPage />;
}
