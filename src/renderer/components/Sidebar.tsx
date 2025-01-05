import React from "react";
import { Button } from "@mui/base";
import SearchInput from "../ui/SearchInput";
import { CreateNewFolderSharp, AddLinkSharp } from "@mui/icons-material";
import FolderView from "./FolderView";
import { pink } from "@mui/material/colors";
import { DataContext } from "../providers/DataProvider";

function Sidebar() {
    const [lastClickedFolder, setLastClickedFolder] = React.useState(null);

    const { addNewFolder } = React.useContext(DataContext);

    function handleAddLinkClicked() {
        return;
    }
    function handleAddFolderClicked() {
        if (lastClickedFolder && lastClickedFolder.type === "folder") {
            addNewFolder("New Folder", lastClickedFolder.folderId);
        } else {
            addNewFolder("New Folder");
        }
    }

    return (
        <section className="border-r-slate-200 border-r-2 w-[25%] min-w-[320px] min-h-[100vh] px-2">
            <h1 className="text-lg font-bold text-rose-900 text-center my-4">
                Everything-Bookmarks
            </h1>
            <div className="flex justify-center align-middle">
                <Button
                    onClick={handleAddLinkClicked}
                    className="group hover:bg-pink-100 rounded px-2"
                >
                    <AddLinkSharp
                        sx={{ color: pink[500], fontSize: "1.6rem" }}
                    />
                </Button>
                <Button
                    onClick={handleAddFolderClicked}
                    className="group hover:bg-pink-100 rounded px-2"
                >
                    <CreateNewFolderSharp
                        sx={{ color: pink[500], fontSize: "1.6rem" }}
                    />
                </Button>
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
