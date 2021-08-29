<template>
  <div class="container pl-3 pr-3">
    <div class="is-size-3 has-text-weight-bold mt-3 mb-2">
      {{ activityTitle }}
    </div>
    <div class="mb-2">
      <activity-info />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import activitiesModule from "@/store/modules/activities";
import ActivityInfo from "@/components/activity/ActivityInfo.vue";

@Component({
  components: {
    ActivityInfo,
  },
})
export default class Activity extends Vue {
  get activityTitle(): string | undefined {
    return activitiesModule.activityName;
  }
}
</script>
