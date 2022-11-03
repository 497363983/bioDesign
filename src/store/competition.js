import { defineStore } from 'pinia'

export const useCompetitionStore = defineStore('competition', {
    state: () => ({
        upload: {
            start: "",
            end: "",
            open: false
        },
        result: {
            open: false
        }
    })
})