import { request } from "./request";

/**
 * 
 * @returns 
 */
export const getTimeline = () => request.get('/api/timeline.php');

/**
 * 
 * @returns 
 */
export const getQuestions = () => request.get('/api/questions.php');
