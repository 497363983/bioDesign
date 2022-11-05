import { defineStore } from 'pinia'
import { useStorage } from "@vueuse/core"

export const useUserStore = defineStore('user', {
    state: () => ({
        name: "",
        password: "",
        username: "",
        role: "",
        team: "",
        token: useStorage('token', null),
        isAuthenticated: false
    })
})