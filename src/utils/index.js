import { useStorage, useTimestamp } from "@vueuse/core"
import { computed } from "vue";

export const token = useStorage('token', null);

export const timestamp = useTimestamp({ offset: 0 });

export const isOpen = (config) => computed(() => {
    console.log(config)
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