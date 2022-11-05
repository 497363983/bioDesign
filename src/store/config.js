import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
    state: () => ({
        upload: {
            start: "",
            end: "",
            open: false
        },
        result: {
            start: "",
            end: "",
            open: false
        },
        competition: {
            start: "",
            end: "",
            open: false
        }
    })
})