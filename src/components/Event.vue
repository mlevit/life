<script setup>
import { initTooltips } from "flowbite";
import LifeConfig from "../assets/life.config.json";
defineProps({
  event: {
    type: Object,
    required: true,
  },
  firstYear: {
    type: Number,
    required: true,
  },
});
</script>

<script>
export default {
  data() {
    return {
      id: Math.floor(Math.random() * 100000),
      note: this.event.note,
      offset: 0,
      tags: this.event.tags,
      text: "",
      time: "",
      width: 0,
    };
  },
  methods: {
    renderEvent() {
      var firstYear = this.firstYear;
      var yearLength = LifeConfig.yearLength;
      var monthLength = yearLength / 12;
      var dayLength = monthLength / 30;

      var time = this.event.time;
      var estimate = time.estimate;
      var startYear = time.startYear;
      var startMonth = time.startMonth;
      var startDate = time.startDate;
      var endYear = time.endYear;
      var endMonth = time.endMonth;
      var endDate = time.endDate;

      // Calculate offset
      var startTime = new Date(firstYear, 0, 1);
      var endTime = new Date(
        startYear,
        startMonth ? startMonth - 1 : 0,
        startDate || 1
      );
      var daysDiff = (endTime - startTime) / (24 * 60 * 60 * 1000);
      this.offset = (daysDiff * dayLength).toFixed(2);

      // Calculate width
      if (endYear) {
        var _endMonth = endMonth ? endMonth - 1 : 11;
        var _endDate = endDate || new Date(endYear, _endMonth + 1, 0).getDate();
        startTime = new Date(
          startYear,
          startMonth ? startMonth - 1 : 0,
          startDate || 1
        );
        endTime = new Date(endYear, _endMonth, _endDate);
        daysDiff = (endTime - startTime) / (24 * 60 * 60 * 1000);
        this.width = daysDiff * dayLength;
      } else {
        if (startDate) {
          this.width = dayLength;
        } else if (startMonth) {
          this.width = monthLength;
        } else {
          this.width = yearLength;
        }
      }
    },
    renderLinks() {
      var link = null;
      while (
        (link = this.text.match(/\[([^\]]+)\]\(([^)"]+)(?: \"([^\"]+)\")?\)/))
      ) {
        this.text = this.text.replace(
          link[0],
          `<a class="bg-white hover:bg-blue-50 text-blue-500 font-semibold px-1 py-0.5 rounded-md border border-blue-400" href="${link[2]}">${link[1]}</a>`
        );
      }
    },
  },
  mounted: function () {
    initTooltips();

    this.note = this.note;
    this.tags = this.tags;
    this.text = this.event.text;
    this.time = this.event.time.title;

    this.renderEvent();
    this.renderLinks();
  },
};
</script>

<template>
  <div
    name="event"
    class="relative float-left clear-left mb-1 whitespace-nowrap pb-[5px]"
    v-bind:style="`margin-left: ${offset}px;`"
  >
    <div
      name="timeline"
      class="relative -left-0.5 mr-3 inline-block h-0 overflow-hidden rounded-full border-4 border-blue-500"
      v-bind:style="`width: ${width}px`"
    ></div>
    <div class="inline-flex rounded-md" role="group">
      <span
        name="time"
        type="button"
        class="date rounded-l-lg border border-solid p-1 text-blue-500 bg-blue-50 border-blue-400"
        >{{ time }}</span
      >
      <span
        name="text"
        type="button"
        class="-ml-[1px] border border-solid p-1 text-stone-800 bg-stone-200 border-stone-400"
        v-bind:class="[tags ? '' : 'rounded-r-lg']"
        v-html="text"
      >
      </span>
      <span
        name="tags"
        type="button"
        class="-ml-[1px] rounded-r-lg border border-solid p-1 text-stone-800 bg-stone-50 border-stone-400"
        v-if="tags"
        >{{ tags }}</span
      >
    </div>
    <div
      class="ml-2 inline-flex h-5 w-5 cursor-default items-center justify-center rounded-full text-sm text-white bg-red-400"
      v-bind:data-tooltip-target="'tooltip-' + id"
      data-tooltip-placement="right"
      v-if="note != null"
    >
      !
    </div>
    <div
      v-bind:id="'tooltip-' + id"
      role="tooltip"
      class="tooltip invisible absolute inline-block rounded-lg px-3 py-2 text-sm font-medium opacity-0 shadow-sm transition-opacity duration-300 text-white bg-gray-700"
    >
      {{ note }}
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<style scoped></style>
