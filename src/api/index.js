import { request } from "./request";

export const getTimeline = () => request.get('/api/timeline.json')

export const getJSON = (jsonFile) => request.get('/api/getJSON.php', { file: jsonFile })
