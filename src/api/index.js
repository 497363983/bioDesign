import { request } from "./request";
import { MD5 } from "crypto-js";
import { token } from "../utils";

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
    }).then(res => {
        token.value = res.token;
        useUserStore().college = res.data.college;
        useUserStore().grade = res.data.grade;
        useUserStore().name = res.data.name;
        useUserStore().role = res.data.role;
        useUserStore().team = rea.data.team;
    })
}
