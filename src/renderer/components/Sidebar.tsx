import React from "react";
import { Button } from "@mui/base";
import SearchInput from "../ui/SearchInput";
import { FolderPlus, Link } from "react-feather";
import FolderView from "./FolderView";

function Sidebar() {
    return (
        <section className="border-r-slate-200 border-r-2 w-[25%] min-w-[320px] min-h-[100vh] px-2">
            <h1 className="text-lg font-bold text-rose-900 text-center my-4">
                Everything-Bookmarks
            </h1>
            <div className="flex justify-center align-middle">
                <Button
                    onClick={() => window.api.createFolder("testing folder" , 1)}
                    className="group hover:bg-rose-500 rounded px-2"
                >
                    <Link className="text-rose-500 group-hover:text-white" />
                </Button>
                <Button className="group hover:bg-rose-500 rounded px-2">
                    <FolderPlus
                        onClick={window.api.getAllFolders}
                        className="text-rose-500 group-hover:text-white"
                    />
                </Button>
                <SearchInput />
            </div>
            <div className="mt-4">
                <FolderView />
            </div>
        </section>
    );
}
export default Sidebar;
