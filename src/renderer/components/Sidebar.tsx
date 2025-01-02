import React from "react";
import { Button } from "@mui/base";
import SearchInput from "../ui/SearchInput";
import { CreateNewFolderSharp, AddLinkSharp } from "@mui/icons-material";
import FolderView from "./FolderView";
import { pink, red } from "@mui/material/colors";

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
                    className="group hover:bg-pink-100 rounded px-2"
                >
                    <AddLinkSharp sx={{color: pink[500], fontSize: '1.6rem'}}/>
                    </Button>
                <Button
                    onClick={handleFolderClicked}
                    className="group hover:bg-pink-100 rounded px-2"
                >
                    <CreateNewFolderSharp sx={{color: pink[500], fontSize: '1.6rem'}} />
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
