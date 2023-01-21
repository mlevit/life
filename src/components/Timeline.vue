<script setup>
import Event from "./Event.vue";
import LifeConfig from "../assets/life.config.json";
import LifeEvents from "../assets/life.md?raw";
</script>

<script>
export default {
  data() {
    return {
      eventsData: [],
      firstYear: null,
      yearWidth: (365 * (LifeConfig.yearLength / 12 / 30)).toFixed(2),
      years: [],
    };
  },
  methods: {
    parseLifeEvents() {
      var ref = this;
      var eventsData = [];

      var list = LifeEvents.match(/\-\s+[^\n\r]+/gi);
      list.forEach(function (l) {
        var matches = l.match(/\-\s+([\d\/\-\~]+)\s(.*)/i);
        var time = matches[1];
        var text = matches[2];

        var tags = text.match(/(\s{1}#[A-Za-z0-9_-]+)/gm);
        if (tags) {
          for (var tag of tags) {
            // remove tag from text
            text = text.replace(tag, "");
          }
          tags = tags.join(" ");
          tags = tags.trim();
        }

        var note = text.match(/\{(.*)\}/gm);
        if (note) {
          note = note[0];

          // remove note from text
          text = text.replace(note, "");

          note = note.replace("{", "");
          note = note.replace("}", "");
          note = note.trim();
        }

        eventsData.push({
          time: ref.parseTime(time, "start"),
          text: text,
          tags: tags ?? null,
          note: note ?? null,
        });
      });

      return eventsData;
    },
    parseTime(time, point) {
      if (!point) point = "start";
      var timeData = {};
      if (/^\~\d+$/.test(time)) {
        // ~YYYY
        timeData = {
          startYear: parseInt(time.slice(1), 10),
          estimate: true,
        };
        timeData.title = time;
      } else if (/^\d+$/.test(time)) {
        // YYYY
        timeData[point + "Year"] = parseInt(time, 10);
        timeData.title = time;
      } else if (/^\d+\/\d+$/.test(time)) {
        // MM/YYYY
        var t = time.split("/");
        timeData[point + "Month"] = parseInt(t[0], 10);
        timeData[point + "Year"] = parseInt(t[1], 10);
        timeData.title =
          this.parseMonth(parseInt(t[0], 10)) + " " + parseInt(t[1], 10);
      } else if (/^\d+\/\d+\/\d+$/.test(time)) {
        // DD/MM/YYYY
        var t = time.split("/");
        timeData[point + "Date"] = parseInt(t[0], 10);
        timeData[point + "Month"] = parseInt(t[1], 10);
        timeData[point + "Year"] = parseInt(t[2], 10);
        timeData.title =
          parseInt(t[0], 10) + " " + this.parseMonth(parseInt(t[1], 10));
      } else if (/\d\-/.test(time)) {
        // TIME-TIME
        var splitTime = time.split("-");
        var startTime = this.parseTime(splitTime[0]);
        var endTime = this.parseTime(splitTime[1], "end");
        for (var k in startTime) {
          timeData[k] = startTime[k];
        }
        for (var k in endTime) {
          timeData[k] = endTime[k];
        }
        timeData.title = startTime.title + " - " + endTime.title;
      } else if (time == "~") {
        // NOW
        var now = new Date();
        timeData.endYear = now.getFullYear();
        timeData.endMonth = now.getMonth() + 1;
        timeData.endDate = now.getDate();
        timeData.title = time;
      }
      return timeData;
    },
    parseMonth(number) {
      const date = new Date();
      date.setMonth(number - 1);
      return date.toLocaleString("en-US", { month: "short" });
    },
    getYears() {
      var firstYear = new Date().getFullYear();
      var lastYear = firstYear;

      this.eventsData.forEach(function (d) {
        var time = d.time;
        var startYear = time.startYear;
        var endYear = time.endYear;
        if (startYear && startYear < firstYear) firstYear = startYear;
        if (endYear && endYear > lastYear) lastYear = endYear;
      });
      this.firstYear = firstYear;

      var years = [];
      for (var year = firstYear; year <= lastYear; year++) {
        years.push(year);
      }
      return years;
    },
    getAge(year) {
      return year - this.firstYear;
    },
  },
  mounted: function () {
    this.eventsData = this.parseLifeEvents();
    this.years = this.getYears();
  },
};
</script>

<template>
  <div
    id="life"
    class="absolute bottom-0 left-0 right-0 top-0 cursor-grab overflow-auto"
  >
    <div
      id="life-events"
      class="relative pt-10 pb-20 after:clear-left after:block after:content-['']"
    >
      <div
        id="life-years"
        class="comment_ pointer-events-none absolute bottom-0 top-0 whitespace-nowrap"
      >
        <div
          class="box-border inline-block h-full whitespace-nowrap border-l border-dashed font-light border-gray-300 first:border-l-0 last:border-r"
          v-bind:style="`min-width: ${yearWidth}px`"
          v-for="year in years"
        >
          <span class="sticky top-0 z-30 block p-[10px] text-black bg-stone-100"
            >{{ year }}
            <i v-if="LifeConfig.showAge">({{ getAge(year) }})</i></span
          >
        </div>
      </div>
      <Event
        v-for="event in eventsData"
        v-bind:event="event"
        v-bind:firstYear="firstYear"
      />
    </div>
  </div>
</template>
