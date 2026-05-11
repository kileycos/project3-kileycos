import ArtPortfolio from './artPortfolio';
import CodingPortfolio from './codingPortfolio';
import ContactPage from './contactPage';
import Home from './home';
import ProfilePage from './profilePage';
import 'bootstrap/dist/css/bootstrap.css';
import { HashRouter, Routes, Route} from 'react-router-dom';
import { SearchProvider } from "./searchContext";

export default function App() {
  return(
    <HashRouter>
          <SearchProvider>
            <Routes>
                  <Route path = "/" element = {<Home />} />
                  <Route path = "/profile" element = {<ProfilePage />} />
                  <Route path = "/art" element = {<ArtPortfolio />} />
                  <Route path = "/code" element = {<CodingPortfolio />} />
                  <Route path = "/contact" element = {<ContactPage />} />
              </Routes>
          </SearchProvider>
    </HashRouter>
  );
}


