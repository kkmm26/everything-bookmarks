function transformBookmarks(bookmarks) {
    return bookmarks.map((bookmark) => ({
        id: `bookmark-${bookmark.bookmarkId}`,
        label: bookmark.title,
        type: "bookmark",
        bookmarkId: bookmark.bookmarkId,
    }));
}

export function buildFolderTree(folders) {
    const folderMap = new Map();

    folders.forEach((folder) => {
        folderMap.set(folder.folderId, { ...folder, childFolders: [] });
    });

    const rootFolders = [];

    folders.forEach((folder) => {
        if (folder.parentFolderId === null) {
            rootFolders.push(folderMap.get(folder.folderId));
        } else {
            const parentFolder = folderMap.get(folder.parentFolderId);
            if (parentFolder) {
                parentFolder.childFolders.push(folderMap.get(folder.folderId));
            }
        }
    });

    return rootFolders;
}

export function transformFolders(folders) {
    const transformedFolders = [];

    folders.forEach((folder) => {
        const transformedChildren = folder.childFolders
            ? transformFolders(folder.childFolders)
            : [];

        transformedFolders.push({
            id: `folder-${folder.folderId}`,
            label: folder.name,
            children: [
                ...transformBookmarks(folder.bookmarks || []),
                ...transformedChildren,
            ],
            type: "folder",
            folderId: folder.folderId,
        });
    });

    return transformedFolders;
}
