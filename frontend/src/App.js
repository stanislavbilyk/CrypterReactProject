import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Creator from "./components/Creator";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import ItemPage from "./pages/ItemPage";
import Item from "./pages/Item";
import Listing from "./pages/Listing";
import ListingPage from "./pages/ListingPage";
import Collection from "./pages/Collection";
import CollectionDetail from "./pages/CollectionDetail";
import Genre from "./pages/Genre";
import GenreDetail from "./pages/GenreDetail";
import Auction from "./pages/Auction";
import AuctionPage from "./pages/AuctionDetail";

function App() {
  return (
    <div className="App">
        <Sidebar/>
        <div className="layout-content">
            <Header title="Nft Cards"/>
            <main>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Creator />}/>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/user/:id" element={<UserProfile />} />
                        <Route path="/nftcard" element={<Item />} />
                        <Route path="/nftcard/:id" element={<ItemPage />} />
                        <Route path="/listing" element={<Listing />} />
                        <Route path="/listing/:id" element={<ListingPage />} />
                        <Route path="/collection" element={<Collection />} />
                        <Route path="/collection/:id" element={<CollectionDetail />} />
                        <Route path="/genre" element={<Genre />} />
                        <Route path="/genre/:id" element={<GenreDetail />} />
                        <Route path="/auction" element={<Auction />} />
                        <Route path="/auction/:id" element={<AuctionPage />} />
                    </Routes>
                </div>
            </main>
            <Footer/>
        </div>
        <aside>

        </aside>
    </div>

  );
}


export default App;


