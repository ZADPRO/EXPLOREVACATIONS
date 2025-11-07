import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { FoodProvider } from '../../Components/FoodContext';
import HomePage ,{ FoodProvider } from '../HomePage';
import DetailsPage from '../DetailsPage';
import SummaryPage from '../SummaryPage';
import Header from "../00-Header/Header";
import CookingSection from  '../../Components/01-About/About'
import './App.css'
import Footer from "../01-Footer/Footer";
import Contact from '../../Components/02-Contact Us/Contact Us';
function App() {
  return (
   <FoodProvider>
      <Router>
        <div className="app-layout">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/details" element={<DetailsPage />} />
              <Route path="/summary" element={<SummaryPage />} />
              <Route path="/about" element={<CookingSection />} />
               <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </FoodProvider>
  );
}

export default App;
