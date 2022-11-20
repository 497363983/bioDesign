import { defineStore } from 'pinia'
import { useStorage } from "@vueuse/core"

export const useUserStore = defineStore('user', {
    state: () => ({
        name: "",
        password: "",
        re_password: "",
        username: "",
        role: "admin",
        team: null,
        token: useStorage('token', null),
        isAuthenticated: false,
        college: "",
        grade: "",
    })
})