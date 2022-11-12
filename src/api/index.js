import { request } from "./request";
import { MD5 } from "crypto-js";
import { token, timestamp, username } from "../utils";
import { useTeamStore, useUserStore } from "../store";
import { ElMessage } from "element-plus";
import { transHtml } from "../utils";

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
 * @param {Function} callback 
 */
export const login = async (callback) => {
    request.post('/api/login.php', {
        username: useUserStore().username,
        password: MD5(useUserStore().password).toString(),
        timestamp: timestamp.value
    }).then(res => {
        console.log(res)
        if (res) {
            username.value = res.username;
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

/**
 * 
 * @param {Function} callback 
 */
export const isLogin = (callback) => {
    request.post('/api/isLogin.php', {
        username: username.value,
        timestamp: timestamp.value
    }).then(res => {
        console.log('isLogin', res)
        if (res) {
            token.value = res.token;
            useUserStore().username = username.value;
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

export const registry = (callback) => {
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

export const createTeam = (callback) => {
    request.post('api/createTeam.php', {
        username: useUserStore().username,
        timestamp: timestamp.value
    }).then(res => {
        if (res) {
            useTeamStore().id = res.id;
            useTeamStore().abstract = res.subtitle ? transHtml(res.subtitle) : "";
            useTeamStore().title = res.title ? transHtml(res.subtitle) : "";
            useTeamStore().leader = res.leader;
            useTeamStore().member = res.member;
            useTeamStore().news = res.news ? transHtml(res.news) : "";
            useTeamStore().paper = res.paper;
            ElMessage({
                type: "success",
                message: "创建成功",
            });
            callback && typeof callback === "function" ? callback() : null
        }
    })
}


export const uploadInformation = (success, failure) => {
    request.post('/api/uploadInformation.php', {
        username: useUserStore().username,
        timestamp: timestamp.value,
        title: useTeamStore().title,
        abstract: useTeamStore().abstract,
        news: useTeamStore().news,
        id: useUserStore().team
    }).then(res => {
        if (res) {
            ElMessage({
                type: "success",
                message: "上传成功"
            })
            success && typeof success === "function" ? success(res) : null
        }
    }).catch(res => {
        failure && typeof failure === "function" ? failure(res) : null
    })
}

export const getTeamInformation = (id, callback) => {
    request.get('/api/getTeamInformation.php', {
        id
    }).then((res) => {
        if (res) {
            useTeamStore().id = res.id;
            useTeamStore().abstract = res.subtitle ? transHtml(res.subtitle) : "";
            useTeamStore().title = res.title ? transHtml(res.subtitle) : "";
            useTeamStore().leader = res.leader;
            useTeamStore().member = res.member;
            useTeamStore().news = res.news ? transHtml(res.news) : "";
            useTeamStore().paper = res.paper;
            callback && typeof callback === "function" ? callback() : null
        }
    })
}

export const searching = (kind, type, target) => request.get("/api/searching.php", { kind, type, target });

/**
 * 
 * @param {String[]} member 
 * @param {Function} callback 
 */
export const addMember = (member, callback) => {
    request.post('/api/addMember.php', {
        username: useUserStore().username,
        id: useUserStore().team,
        member
    }).then(() => {
        getTeamInformation(useUserStore().team)
        callback && typeof callback === "function" ? callback() : null
    })
}


export const removeMember = (target, callback) => {
    request.post("/api/removeMember.php", {
        username: useUserStore().username,
        id: useUserStore().team,
        timestamp: timestamp.value,
        target
    }).then(() => {
        callback && typeof callback === "function" ? callback() : null
    })
}