import { getConfig } from "@/api"

export const init = (option) => {
    return async ({ store }) => {
        if (store.$id === "config") {
            console.log('con')
            const upload = await getConfig('upload');
            const competition = await getConfig('competition');
            const result = await getConfig('result');
            store.$state.upload = upload;
            store.upload = upload;
            store.$state.result = result;
            store.result = result;
            store.$state.competition = competition;
            store.competition = competition;
        }
    }
}