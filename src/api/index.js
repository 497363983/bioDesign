import { request } from "./request";
import { MD5 } from "crypto-js";
import { token, timestamp, username } from "../utils";
import { useUserStore } from "../store";
import { ElMessage } from "element-plus";

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

/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @param {Number} timestamp 
 */
export const login = async (callback) => {
    request.post('/api/login.php', {
        username: useUserStore().username,
        password: MD5(useUserStore().password).toString(),
        timestamp: timestamp.value
    }).then(res => {
        console.log(res)
        if (res) {
            token.value = res.token;
            useUserStore().college = res.college;
            useUserStore().grade = res.grade;
            useUserStore().name = res.name;
            useUserStore().role = res.role;
            useUserStore().team = res.team;
            useUserStore().isAuthenticated = true;
            ElMessage({
                type: "success",
                message: "登陆成功",
            });
            callback && typeof callback === "function" ? callback() : null
        }
    }).catch(err => {
        console.log(err)
        // ElMessage({
        //     type: "error",
        //     message: "err.message",
        // });
    })
}


export const isLogin = (callback) => {
    request.post('/api/isLogin.php', {
        username: username.value,
        timestamp: timestamp.value
    }).then(res => {
        if (res) {
            token.value = res.token;
            useUserStore().college = res.college;
            useUserStore().grade = res.grade;
            useUserStore().name = res.name;
            useUserStore().role = res.role;
            useUserStore().team = res.team;
            useUserStore().isAuthenticated = true;
            callback && typeof callback === "function" ? callback(res) : null;
        } else {
            token.value = null;
            useUserStore().college = "";
            useUserStore().grade = "";
            useUserStore().name = "";
            useUserStore().role = "";
            useUserStore().team = "";
            useUserStore().isAuthenticated = false;
        }
    })
}

export const registry = () => {
    request.post('/api/signup.php', {
        username: useUserStore().username,
        password: MD5(useUserStore().password).toString(),
        timestamp: timestamp.value,
        name: useUserStore().name,
        college: useUserStore().college,
        grade: useUserStore().grade,
        role: 'player'
    }).then(res => {
        if (res) {
            ElMessage({
                type: "success",
                message: "注册成功",
            });
            callback && typeof callback === "function" ? callback() : null
        }
    })
}
