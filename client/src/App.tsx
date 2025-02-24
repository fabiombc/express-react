import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
    return (
        <>
            <Routes>
                <Route index path="/" element={<Home/>} />
                <Route path="/about" element={<About/>}/>
            </Routes>
            <div>
                <div className="flex min-h-screen items-center justify-center bg-gray-100">
                    <h1 className="text-3xl font-bold text-blue-500">
                        Hello, Tailwind!
                    </h1>
                </div>
            </div>
        </>
    );
}

export default App;
