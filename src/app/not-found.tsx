import { LanguageProvider } from "../shared/services";
import NotFoundPage from "../features/not-found/NotFoundPage";

export default function NotFound() {
  return (
    <LanguageProvider>
      <NotFoundPage />
    </LanguageProvider>
  );
}
