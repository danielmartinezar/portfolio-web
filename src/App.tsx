import Header from "./components/Header";
import { HomePage } from "./pages/home";
import { ContentContainer } from "./components/layout";
import { LanguageProvider } from "./shared/services";

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-bg-primary">
        <ContentContainer>
          <Header />
        </ContentContainer>
        <HomePage />
      </div>
    </LanguageProvider>
  );
}

export default App;
