import * as React from "react";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeItem2, TreeItem2Label } from "@mui/x-tree-view/TreeItem2";
import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2";
import { transformFolders } from "../utils";
import { FolderSharp, LinkSharp } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { pink } from "@mui/material/colors";

function CustomLabel({ icon: Icon, numOfChildren, children, ...other }: any) {
    return (
        <TreeItem2Label
            {...other}
            sx={{
                display: "flex",
                alignItems: "center",
            }}
        >
            {Icon && (
                <Box
                    component={Icon}
                    className="labelIcon"
                    color="inherit"
                    sx={{ mr: 1, fontSize: "1.2rem" }}
                />
            )}

            <Typography>{children}</Typography>
            {numOfChildren > 0 && (
                <Chip
                    label={numOfChildren}
                    sx={{ position: "absolute", right: "0" }}
                    size="small"
                />
            )}
        </TreeItem2Label>
    );
}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
    props: any,
    ref
) {
    const { publicAPI } = useTreeItem2(props);

    const numOfChildren = publicAPI.getItemOrderedChildrenIds(
        props.itemId
    ).length;
    const item = publicAPI.getItem(props.itemId);
    const FolderIcon = () => (
        <FolderSharp sx={{ color: pink[400], marginRight: "10px" }} />
    );
    const LinkIcon = () => (
        <LinkSharp sx={{ color: pink[300], marginRight: "10px" }} />
    );
    const icon = item.type === "bookmark" ? LinkIcon : FolderIcon;

    return (
        <TreeItem2
            {...props}
            ref={ref}
            slots={{
                label: CustomLabel,
            }}
            slotProps={{
                label: { icon, numOfChildren },
            }}
        />
    );
});

export default function FolderView() {
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        async function fetchFolders() {
            const res = await window.api.getAllFoldersWithBookmarks();
            const data = JSON.parse(res);
            setItems(transformFolders(data));
        }
        fetchFolders();
    }, []);

    return (
        <RichTreeView
            items={items}
            slots={{
                item: CustomTreeItem,
            }}
        />
    );
}
