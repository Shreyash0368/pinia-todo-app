import { defineStore } from "pinia";
import * as Realm from 'realm-web'

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    loading: false,
  }),
  getters: {
    getAll() {
      return this.tasks;
    },
    getFavs() {
      return this.tasks.filter((t) => t.isFav === true);
    },
    getCount() {
      return this.tasks.length;
    },
    getFavCount() {
      return this.tasks.filter((t) => t.isFav === true).length;
    },
  },
  actions: {
    async fetchTasks() {
      this.loading = true;
      const userStore = useUserStore();
      const todos = await userStore.collection.find();

      this.tasks = todos.map((t) => ({ ...t, _id: t._id.toString() }));
      console.log(this.tasks);
      this.loading = false;
    },
    async addTask(message) {
      const userStore = useUserStore();
      const newTask = await userStore.collection.insertOne({
        message,
        isFav: false,
      });
      this.tasks.push({ _id: newTask.insertedId.toString(), message });
    },
    async deleteTask(id) {
      const userStore = useUserStore();
      await userStore.collection.deleteOne({ _id: new Realm.BSON.ObjectId(id) });
      this.tasks = this.tasks.filter((t) => t._id !== id);
    },
    async updateTask(id, newMessage) {
      const userStore = useUserStore();
      await userStore.collection.updateOne(
        { _id: new Realm.BSON.ObjectId(id) },
        {
          $set: { message: newMessage },
        }
      );
      const task = this.tasks.find((t) => t._id === id);
      task.message = newMessage;
    },
    async toggleFavourite(id) {
      const userStore = useUserStore();
      const task = this.tasks.find((t) => t._id === id);
      task.isFav = !task.isFav;
      const flag = task.isFav;
      console.log(id);
      

      await userStore.collection.updateOne(
        { _id: new Realm.BSON.ObjectId(id) },
        {
          $set: { isFav: flag },
        }
      );
    },
  },
});
