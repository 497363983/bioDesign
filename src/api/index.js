import { request } from "./request";

export const getJSON = (jsonFile) => request.get('/api/getJSON.php', { file: jsonFile })
