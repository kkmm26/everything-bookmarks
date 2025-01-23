import React from "react";
import { Button } from "@mui/base";
import SearchInput from "../ui/SearchInput";
import { CreateNewFolderSharp, AddLinkSharp } from "@mui/icons-material";
import FolderView from "./FolderView";
import { pink } from "@mui/material/colors";
import { DataContext } from "../providers/DataProvider";
import NewBookmarkBtn from "./NewBookmarkBtn";
import CreateNewFolderBtn from "./CreateNewFolderBtn";

function Sidebar() {
    const [lastClickedFolder, setLastClickedFolder] = React.useState(null);
    

    return (
        <section className="border-r-slate-200 border-r-2 w-[25%] min-w-[320px] min-h-[100vh] px-2">
            <h1 className="text-lg font-bold text-rose-900 text-center my-4">
                Everything-Bookmarks
            </h1>
            <div className="flex justify-center align-middle h-[100%]">
                <NewBookmarkBtn />
                <CreateNewFolderBtn lastClickedFolder={lastClickedFolder} />
                <SearchInput />
            </div>
            <div className="mt-4">
                <FolderView
                    lastClickedFolder={lastClickedFolder}
                    setLastClickedFolder={setLastClickedFolder}
                />
            </div>
        </section>
    );
}
export default Sidebar;
