export function transformBookmarks(bookmarks) {
    return bookmarks.map((bookmark) => ({
        id: bookmark.bookmarkId,
        label: bookmark.title,
        type: "bookmark",
    }));

}
export function transformFolders(folders, processed = new Set()) {
    const newFolders = [];
    folders.forEach((folder) => {
        if (!processed.has(folder.folderId)) {
            processed.add(folder.folderId);
            newFolders.push({
                id: `${folder.folderId}-${crypto.randomUUID()}`,
                label: folder.name,
                children: [
                    ...transformBookmarks(folder.bookmarks || []),
                    ...(folder.childFolders ? transformFolders(folder.childFolders, processed) : []),
                ],
                type: "folder",
                folderId: folder.folderId
            });
        }
    });
    return newFolders;
}