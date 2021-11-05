import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const findTaskIndex = (state, taskId) => {
  return state.todos.findIndex((item) => item.id === taskId);
};

const findTaskById = (state, taskId) => {
  return state.todos.filter((item) => item.id === taskId)[0];
};

const initialTags = () => {
  return [
    {
      label: "white",
      value: "white",
      text: "describe it",
    },
    { label: "black", value: "black", text: "describe it" },
    { label: "yellow", value: "yellow", text: "describe it" },
    { label: "red", value: "red", text: "describe it" },
    { label: "blue", value: "blue", text: "describe it" },
    { label: "aqua", value: "aqua", text: "describe it" },
  ];
};

export default new Vuex.Store({
  state: {
    todos: localStorage.getItem("todos")?.length
      ? JSON.parse(localStorage.getItem("todos"))
      : [],
    tags: localStorage.getItem("tags")?.length
      ? JSON.parse(localStorage.getItem("tags"))
      : initialTags(),
  },
  mutations: {
    addTask(state, item) {
      const todos = state.todos;
      todos.push(item);
      localStorage.setItem("todos", JSON.stringify(todos));
    },
    deleteTask(state, id) {
      const todos = state.todos;
      const currentIndex = findTaskIndex(state, id);
      todos.splice(currentIndex, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    },
    toggleStatus(state, id) {
      const todos = state.todos;
      const currentIndex = findTaskIndex(state, id);
      const currentItem = findTaskById(state, id);
      currentItem.status = !currentItem.status;
      todos.splice(currentIndex, 1, currentItem);
      localStorage.setItem("todos", JSON.stringify(todos));
    },
    changeStatus(state, { id, status }) {
      console.log("status: ", status);
      const todos = state.todos;
      const currentIndex = findTaskIndex(state, id);
      const currentItem = findTaskById(state, id);
      currentItem.status = status;
      todos.splice(currentIndex, 1, currentItem);
      localStorage.setItem("todos", JSON.stringify(todos));
    },
    changeTaskText(state, { id, text, type }) {
      const todos = state.todos;
      const currentIndex = findTaskIndex(state, id);
      const currentItem = findTaskById(state, id);
      currentItem[type] = text;
      todos.splice(currentIndex, 1, currentItem);
      localStorage.setItem("todos", JSON.stringify(todos));
    },
    changeTag(state, { id, tagValue }) {
      const todos = state.todos;
      const currentIndex = findTaskIndex(state, id);
      const currentItem = findTaskById(state, id);
      const currentTag = state.tags.filter((tag) => tag.value === tagValue)[0];
      currentItem.tag = currentTag;
      todos.splice(currentIndex, 1, currentItem);
      localStorage.setItem("todos", JSON.stringify(todos));
    },
    changeTagText(state, { value, text }) {
      const tags = state.tags;
      const currentIndex = tags.findIndex((tag) => tag.value === value);
      const currentTag = tags.filter((tag) => tag.value === value)[0];
      currentTag.text = text;
      tags.splice(currentIndex, 1, currentTag);
      localStorage.setItem("tags", JSON.stringify(tags));
    },
  },
  actions: {
    addTask({ commit }, item) {
      commit("addTask", item);
    },
    deleteTask({ commit }, id) {
      commit("deleteTask", id);
    },
    toggleStatus({ commit }, id) {
      commit("toggleStatus", id);
    },
    changeStatus({ commit }, { id, status }) {
      commit("changeStatus", { id, status });
    },
    changeTaskText({ commit }, { id, text, type }) {
      commit("changeTaskText", { id, text, type });
    },
    changeTag({ commit }, { id, tagValue }) {
      commit("changeTag", { id, tagValue });
    },
    changeTagText({ commit }, { value, text }) {
      commit("changeTagText", { value, text });
    },
  },
  modules: {},
  getters: {
    getTodoItems: (state) => {
      return state.todos.filter((item) => item.status === false);
    },
    getDoneItems: (state) => {
      return state.todos.filter((item) => item.status === true);
    },
    getCurrentTask: (state) => (id) => {
      return state.todos.filter((item) => item.id === id)[0];
    },
    getTags: (state) => {
      return state.tags;
    },
    getCurrentTagByValue: (state) => (value) => {
      return state.tags.filter((item) => item.value === value)[0];
    },
  },
});
