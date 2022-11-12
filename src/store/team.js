import { defineStore } from 'pinia'

export const useTeamStore = defineStore('team', {
    state: () => ({
        id: "",
        member: [],
        title: "",
        abstract: "",
        news: "",
        paper: null,
        leader: "",
    })
})