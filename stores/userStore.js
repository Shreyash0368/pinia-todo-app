import { defineStore } from "pinia";
import * as Realm from "realm-web";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    collection: null,
    loading: false,
    app: null,
  }),
  actions: {
    async login() {
      if (!this.app) {
        console.error(
          "Realm app is not initialized. Call initializeApp() first."
        );
        return;
      }

      try {
        this.loading = true;
        const credentials = Realm.Credentials.anonymous();
        this.user = await this.app.logIn(credentials);
        const mongo = this.app.currentUser.mongoClient("mongodb-atlas");
        this.collection = mongo.db("nuxt-training").collection("todos");
        this.loading = false;
      } catch (error) {
        console.error("Failed to log in:", error);
      }
    },

    initalizeApp() {
      const config = useRuntimeConfig();
      this.app = new Realm.App({ id: config.public.realmAppId });
      console.log("app initalized");
      console.log(this.app);      
    },
  },
});
