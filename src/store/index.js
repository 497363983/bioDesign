import { createPinia } from "pinia"
import { useUserStore } from "./user"
import { useCompetitionStore } from "./competition"

const pinia = createPinia()

export {
    pinia,
    useUserStore,
    useCompetitionStore
}