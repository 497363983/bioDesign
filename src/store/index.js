import { createPinia } from "pinia"
import { useUserStore } from "./user"
import { useConfigStore } from "./config"

const pinia = createPinia()

export {
    pinia,
    useUserStore,
    useConfigStore
}