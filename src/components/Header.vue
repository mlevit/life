<script setup>
import LifeConfig from "../assets/life.config.json";
import LifeEvents from "../assets/life.md?raw";
import nightwind from "nightwind/helper";
import { initDropdowns } from "flowbite";
</script>

<script>
export default {
  data() {
    return {
      avatarUrl: "",
      filterTerm: null,
      name: "Your Life",
      darkMode: false,
    };
  },
  methods: {
    getName() {
      if (LifeEvents) {
        this.name = LifeEvents.split("\n")[0];
      } else {
        this.name = "Your Life";
      }
      document.title = this.name;
    },
    getAvatarUrl() {
      this.avatarUrl = LifeConfig.avatarUrl;
    },
    filterEvents() {
      var searchString = this.filterTerm.toLowerCase();
      var events = document.getElementsByName("event");
      for (var e of events) {
        var text = e.innerText.toLowerCase();
        if (!searchString) {
          if (!text.includes(searchString)) {
            e.classList.remove("hidden");
          }
        } else {
          if (text.includes(searchString)) {
            e.classList.remove("hidden");
          } else {
            e.classList.add("hidden");
          }
        }
      }
    },
    darkModeToggle() {
      nightwind.toggle();
      if (this.darkMode) {
        this.darkMode = false;
      } else {
        this.darkMode = true;
      }
    },
  },
  mounted: function () {
    this.getName();
    this.getAvatarUrl();

    this.darkMode = nightwind.checkNightMode;
  },
};
</script>

<template>
  <div
    class="w-full max-w-sm rounded-lg border p-6 shadow-md bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex flex-col items-center">
      <img
        class="mb-4 h-24 w-24 rounded-full shadow-lg"
        v-bind:src="avatarUrl"
        v-if="avatarUrl"
      />
      <h5 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        {{ name }}
      </h5>
      <form class="mb-4 flex items-center" action="#">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          >
            <svg
              aria-hidden="true"
              class="h-5 w-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            class="block w-full rounded-lg border p-2.5 pl-10 text-sm text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Filter events"
            v-model="filterTerm"
            v-on:keyup="filterEvents()"
          />
        </div>
      </form>
      <div class="flex flex-col items-center">
        <button
          type="button"
          class="mr-2 rounded-lg border px-3 py-2.5 text-center text-sm font-medium text-blue-700 border-blue-700 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:text-blue-500 dark:border-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          v-on:click="darkModeToggle()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
            v-if="darkMode"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
            v-else
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
