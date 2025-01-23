import { Button } from "@mui/base";
import { CreateNewFolderSharp } from "@mui/icons-material";
import React from "react";
import { DataContext } from "../providers/DataProvider";
import { pink } from "@mui/material/colors";

function NewFolderBtn({ lastClickedFolder }: any) {
    const { createNewFolder } = React.useContext(DataContext);

    function handleAddFolderClicked() {
        if (lastClickedFolder && lastClickedFolder.type === "folder") {
            createNewFolder("New Folder", lastClickedFolder.folderId);
        } else {
            createNewFolder("New Folder");
        }
    }
    return (
        <div className="self-center">
            <Button
                onClick={handleAddFolderClicked}
                className="group hover:bg-pink-100 rounded px-2"
            >
                <CreateNewFolderSharp
                    sx={{ color: pink[500], fontSize: "1.6rem" }}
                />
            </Button>
        </div>
    );
}
export default NewFolderBtn;
