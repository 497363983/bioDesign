import { request } from "./request";
import { MD5 } from "crypto-js";
import { token } from "../utils";
import { useUserStore } from "../store";

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
        console.log(res)
        token.value = res.token;
        useUserStore().college = res.college;
        useUserStore().grade = res.grade;
        useUserStore().name = res.name;
        useUserStore().role = res.role;
        useUserStore().team = rea.team;
        useUserStore().isAuthenticated = true;
        console.log(useUserStore())
    })
}
