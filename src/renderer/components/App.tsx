import React from "react";
import Sidebar from "./Sidebar";
import MainView from "./MainView";
import { DataProvider } from "../providers/DataProvider";

function App() {
    return (
        <DataProvider>
            <main>
                <Sidebar />
                <MainView />
            </main>
        </DataProvider>
    );
}

export default App;
