import Header from "./components/Header";
import HomePage from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-bg-primary px-6 md:px-[170px] max-w-[1900px] mx-auto">
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
