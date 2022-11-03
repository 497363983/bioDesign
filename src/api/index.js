import { request } from "./request";

/**
 * 
 * @param {String} jsonFile 
 * @returns 
 */
export const getJSON = (jsonFile) => request.get('/api/getJSON.php', { file: jsonFile })

export const getTimeline = () => request.get('/api/timeline.php');

export const getQuestions = ()=>request.get('/api/questions.php');
