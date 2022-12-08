
export interface Folder {
  name: string,
  files: File[],
  folders: Folder[],
  parentFolder: Folder | null
}

export interface File {
  name: string,
  size: number,
}

interface DirectorySize {
  name: string,
  size: number,
}

export function traverse(currentDir: Folder | null, folderName: string): Folder {
  if (folderName === '..') {
    return (currentDir as Folder).parentFolder as Folder;
  }

  const newFolder: Folder = {
    name: folderName,
    parentFolder: currentDir,
    files: [],
    folders: [],
  };

  if (currentDir !== null) {
    currentDir.folders.push(newFolder);
  }

  return newFolder;
}

let directorySizes: DirectorySize[] = [];

export function calculateAllDirectoriesSize(root: Folder | null) {
  if (!root) {
    throw Error("Root does not exist!");
  }
  directorySizes = [];

  calculateDirectorySize(root);

  return directorySizes;
}

function calculateDirectorySize(folder: Folder) {
  let size = folder.files.reduce((acc, current) => acc + current.size, 0);
  for (const childFolder of folder.folders) {
    size += calculateDirectorySize(childFolder);
  }

  directorySizes.push({
    name: folder.name,
    size
  })
  return size;
}