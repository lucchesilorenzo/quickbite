export function createMockFileList(files: File[]) {
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = true;

  const fileList = Object.create(input.files);

  files.forEach((file, index) => {
    fileList[index] = file;
  });

  Object.defineProperty(fileList, "length", {
    value: files.length,
  });

  return fileList as FileList;
}
