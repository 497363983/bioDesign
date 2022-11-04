import { request } from "./request";
import { MD5 } from "crypto-js";

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

/**
 * 
 * @param {String} config 
 * @returns 
 */
export const getConfig = (config) => request.get('/api/getConfig.php', { config });


export const login = (username, password, timestamp) => {
    console.log(MD5(password).toString(), timestamp)
    request.post('/api/login.php', {
        username,
        password: MD5(password).toString(),
        timestamp
    })
}
