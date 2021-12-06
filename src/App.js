import Header from "./components/header";
import UserCard from "./components/userCards";
import Footer from "./components/footer";
// import "./assets/css/animated.min.css";
import "./assets/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <UserCard />
        <Footer />
      </div>
    </div>
  );
}

export default App;