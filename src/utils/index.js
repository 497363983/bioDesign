import { useStorage, useTimestamp, useTitle } from "@vueuse/core"
import { computed } from "vue";
import { MD5, enc } from "crypto-js";

export const token = useStorage('token', null);

export const username = useStorage('username', null);

export const timestamp = useTimestamp({ offset: 0 });

export const title = useTitle('生物创新设计大赛');

/**
 * 
 * @param {Object} config 
 * @returns 
 */
export const isOpen = (config) => computed(() => {
    if (!config.open) {
        return false;
    } else if (config.open === 'auto') {
        const { start, end } = config;
        const pre = new Date(timestamp.value) - new Date(start);
        const ne = new Date(timestamp.value) - new Date(end);
        // return (pre >= 0) && (ne <= 0);
        return pre
    } else {
        return true;
    }
})

export const entityMap = {
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&nbsp;": " ",
    "&quot;": "\"",
    "&copy;": "©"
};

/**
 * 
 * @param {String} str 
 * @returns 
 */
export const transHtml = (str) => String(str).replace(/&\w+;|&#(\d+);/g, (s) => `${entityMap[s]}`);

/**
 * 
 * @param {File} file 
 * @returns 
 */
export const fileMD5 = (file) => new Promise(resolve => {
    const fileReader = new FileReader();
    fileReader.onloadend = ev => {
        resolve(MD5(enc.Latin1.parse(ev.target.result)).toString(enc.Hex))
    };
    fileReader.readAsBinaryString(file);
})


// export const 