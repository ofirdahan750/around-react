import { Header } from "./Header.js";
import { Main } from "./Main.js";
import { Footer } from "./Footer.js";
function App() {
  return (
    <div className="page">
      <div className="page__content">
        {/* Was root class!!!!!!!!!!!!!!!s! */}
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
