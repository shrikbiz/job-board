import { Action, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators';
import { DarkTheme, LightTheme, ThemeList } from '@/constants/theme';
import api from '@/api';

export const STORE_KEY = '$_jobsearch';

@Module({
    namespaced: true,
    name: STORE_KEY,
})
export default class AppStore extends VuexModule {
    darkTheme: object = DarkTheme;
    lightTheme: object = LightTheme;
    isDarkTheme = false;
    isSideBar = false;
    gitJobData = {};
    gitJobError = {};
    isGitDataAvailable = false;

    @Mutation
    changeStoreTheme() {
        this.isDarkTheme = !this.isDarkTheme;
    }

    @Mutation
    sideBarStatus() {
        this.isSideBar = !this.isSideBar;
    }

    @Mutation
    hideSideBar() {
        this.isSideBar = false;
    }

    @Mutation
    isGitJobApiLoaded(data: boolean) {
        this.isGitDataAvailable = data;
    }

    @Mutation
    addGitJobData(args: any) {
        this.gitJobData = args.data;
        this.gitJobError = args.dataError;
    }
    @Action({ commit: 'addGitJobData' })
    async getGitJobData() {
        this.context.commit('isGitJobApiLoaded', false);
        let data: any;
        let dataError: Record<string, string> = {};
        try {
            console.log(`🚀 -> AppStore -> getGitJobData -> getGitJobData`);
            data = api.getJobApi();
            console.log(`🚀 -> AppStore -> getGitJobData -> data`, data);
            this.context.commit('isGitJobApiLoaded', true);
        } catch (e) {
            dataError = { serviceSegment: e };
        }
        return {
            data,
            dataError,
        };
    }
}
