import { defineStore } from 'pinia'
import { useStorage } from "@vueuse/core"

export const useUserStore = defineStore('user', {
    state: () => ({
        name: "",
        password: "",
        re_password: "",
        username: "",
        role: "player",
        team: null,
        token: useStorage('token', null),
        isAuthenticated: false,
        college: "",
        grade: "",
    })
})