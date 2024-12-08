import React from "react";

function App() {
    return (
        <button
            onClick={() => window.api.saveBookmark("bookmark")}
            className="bg-sky-300"
        >
            Click me!
        </button>
    );
}

export default App;
