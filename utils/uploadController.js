import { getFileUrl, uploadFile } from "./upload";

export const uploadMany = async (files) => {
  const uploadedFileNames = [];

  try {
    for (const file of files) {
      const fileName = await uploadFile(file);
      uploadedFileNames.push(fileName);
    }

    return uploadedFileNames;
  } catch (error) {
    console.log("Error uploading files: " + error);
  }
};

export const getManyFileUrl = async (files) => {
  const fileUrls = [];

  try {
    for (const file of files) {
      const url = await getFileUrl(file);
      fileUrls.push(url);
    }

    return fileUrls;
  } catch (error) {
    console.log("Error fetching urls: " + error);
  }
};
