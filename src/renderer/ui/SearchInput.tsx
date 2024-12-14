import React from "react";
import { Input } from "@mui/base";
import { Search } from "react-feather";

function SearchInput() {
    return (
        <div className="relative">
            <Search className="absolute left-1 opacity-30 top-[50%] translate-y-[-50%] size-[20px]" />
            <Input
                placeholder="Search folder"
                slotProps={{
                    root: { className: "flex-2" },
                    input: {
                        className:
                            "py-1 px-2 rounded border-2 border-rose-400  outline-rose-600 min-h-[100%] w-[100%] placeholder:text-fluid pl-7",
                        
                        },
                }}
            />
        </div>
    );
}

export default SearchInput;
