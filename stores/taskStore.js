import { defineStore } from "pinia";

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
      const data = await useRealmApp().getRecords();
      this.tasks = [...data];
      this.loading = false;
    },
    async addTask(message) {
      const newTask = await useRealmApp().addRecord(message);
      this.tasks.push(newTask);
    },
    async deleteTask(id) {
      await useRealmApp().deleteRecord(id);
      this.tasks = this.tasks.filter((t) => t._id !== id);
    },
    async updateTask(id, newMessage) {
      await useRealmApp().updateRecord(id, newMessage);
      const task = this.tasks.find((t) => t._id === id);
      task.message = newMessage;
    },
    async toggleFavourite(id) {
      const task = this.tasks.find((t) => t._id === id);
      task.isFav = !task.isFav;
      await useRealmApp().setFavourite(id, task.isFav);     
    },
  },
});
