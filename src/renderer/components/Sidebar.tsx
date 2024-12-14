import React from "react";
import { Button } from "@mui/base";
import SearchInput from "../ui/SearchInput";
import { FolderPlus } from "react-feather";
import FolderView from "./FolderView";

function Sidebar() {

    return (
        <section className="border-r-slate-200 border-r-2 w-[25%] min-w-[200px] min-h-[100vh] px-2">
            <h1 className="text-lg font-bold text-rose-900 text-center mb-6">
                Everything-Bookmarks
            </h1>
            <div className="flex justify-center align-middle gap-2">
                <Button>
                    <FolderPlus className="text-rose-500 hover:text-rose-600" />
                </Button>
                <SearchInput/>
            </div>
            <div className="mt-4">
                <FolderView  />
            </div>
        </section>
    );
}
export default Sidebar;
