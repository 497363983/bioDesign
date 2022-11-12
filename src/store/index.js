import { createPinia } from "pinia"
import { useUserStore } from "./user"
import { useConfigStore } from "./config"
import { useTeamStore } from "./team"

const pinia = createPinia()

export {
    pinia,
    useUserStore,
    useConfigStore,
    useTeamStore
}