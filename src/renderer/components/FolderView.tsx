import * as React from "react";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeItem2 } from "@mui/x-tree-view/TreeItem2";
import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2";
import { Folder } from "react-feather/dist";

const MUI_X_PRODUCTS = [
    {
        id: "grid",
        label: "Data Grid",
        children: [
            { id: "grid-community", label: "@mui/x-data-grid" },
            { id: "grid-pro", label: "@mui/x-data-grid-pro" },
            { id: "grid-premium", label: "@mui/x-data-grid-premium" },
            {
                id: "g",
                label: "Data Grid",
                children: [
                    { id: "g-community", label: "@mui/x-data-grid" },
                    { id: "g-pro", label: "@mui/x-data-grid-pro" },
                    { id: "g-premium", label: "@mui/x-data-grid-premium" },
                ],
            },
        ],
    },
    {
        id: "pickers",
        label: "Date and Time Pickers",
        children: [
            { id: "pickers-community", label: "@mui/x-date-pickers" },
            { id: "pickers-pro", label: "@mui/x-date-pickers-pro" },
        ],
    },
    {
        id: "charts",
        label: "Charts",
        children: [{ id: "charts-community", label: "@mui/x-charts" }],
    },
    {
        id: "tree-view",
        label: "Tree View",
        children: [{ id: "tree-view-community", label: "@mui/x-tree-view" }],
    },
    {
        id: "123",
        label: "New Folder",
        children: [],
    },
];

function CustomLabel({ children, className, numberOfChildren }: any) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
            flexGrow={1}
            className={className}
        >
            <Typography>{children}</Typography>

            {numberOfChildren > 0 && (
                <Chip label={numberOfChildren} size="small" />
            )}
        </Stack>
    );
}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
    props: any,
    ref
) {
    const { publicAPI } = useTreeItem2(props);

    const childrenNumber = publicAPI.getItemOrderedChildrenIds(
        props.itemId
    ).length;

    return (
        <TreeItem2
            {...props}
            ref={ref}
            slots={{
                label: CustomLabel,
            }}
            slotProps={{
                label: { numberOfChildren: childrenNumber },
            }}
        />
    );
});

function transformFolders(folders) {
    return folders.map((folder) => ({
        id: folder.folderId,
        label: folder.name,
    }));
}

export default function FolderView() {
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        async function fetchFolders() {
            const res = await window.api.getAllFoldersWithBookmarks();
            const data = JSON.parse(res);
            console.log(transformFolders(data));
            setItems(transformFolders(data))
        }
        fetchFolders();
    }, []);
    return (
        <RichTreeView
            items={items}
            slots={{
                item: CustomTreeItem,
                expandIcon: Folder,
                collapseIcon: Folder,
                endIcon: Folder,
            }}
        />
    );
}
