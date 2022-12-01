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
            open: false,
            promotion: 0,
            thirdPrize: 0,
            encouragement: 0
        },
        competition: {
            start: "",
            end: "",
            open: false
        }
    })
})