import React from "react";
import { Button } from "@mui/base";
import SearchInput from "../ui/SearchInput";
import { FolderPlus, Link } from "react-feather";
import FolderView from "./FolderView";

function Sidebar() {
    function handleLinkClicked() {
        window.api.saveBookmark("bm 2", "url 2", "des 2", 2)
        return;
    }
    function handleFolderClicked() {
        window.api.createFolder("New Folder", 1);
        return;
    }

    return (
        <section className="border-r-slate-200 border-r-2 w-[25%] min-w-[320px] min-h-[100vh] px-2">
            <h1 className="text-lg font-bold text-rose-900 text-center my-4">
                Everything-Bookmarks
            </h1>
            <div className="flex justify-center align-middle">
                <Button
                    onClick={handleLinkClicked}
                    className="group hover:bg-rose-500 rounded px-2"
                >
                    <Link className="text-rose-500 group-hover:text-white" />
                </Button>
                <Button
                    onClick={handleFolderClicked}
                    className="group hover:bg-rose-500 rounded px-2"
                >
                    <FolderPlus className="text-rose-500 group-hover:text-white" />
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
