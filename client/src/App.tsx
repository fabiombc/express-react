import {Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import {useEffect, useState} from "react";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
            <nav className="p-4 flex gap-4">
                <Link to="/" className="text-blue-500 hover:underline">Home</Link>
                <Link to="/about" className="text-blue-500 hover:underline">About</Link>
            </nav>

            <Routes>
                <Route index path="/"  element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>

            <div>
                {message}
            </div>
        </div>
    );
}

export default App;
