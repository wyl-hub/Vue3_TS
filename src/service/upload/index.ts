import uploadRequest from "./upload";


export const uploadSingle = data => uploadRequest({ url: '/page/upload', data })