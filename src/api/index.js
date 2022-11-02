import { request } from "./request";

/**
 * 
 * @param {String} jsonFile 
 * @returns 
 */
export const getJSON = (jsonFile) => request.get('/api/getJSON.php', { file: jsonFile })
