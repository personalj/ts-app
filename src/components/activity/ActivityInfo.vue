<template>
  <div>
    <div class="tile mb-4">
      <div
        v-for="item in activity.steps"
        :key="item.id"
        class="button is-size-7 mr-3 mb-2"
        :class="{ 'is-selected is-info': item.id === activeStep.id }"
        @click="chooseStep(item.id)"
      >
        {{ item.type }}
      </div>
    </div>
    <div v-if="activeStep.asset">
      <div
        v-if="
          activeStep.type === 'play_media' ||
          activeStep.type === 'multiple_choice'
        "
      >
        <img :src="activeStep.asset.url" alt="img" />
      </div>
      <div v-if="activeStep.type === 'voice_input'">
        <video controls>
          <source :src="activeStep.asset.url" type="video/mp4" />
        </video>
      </div>
    </div>
    <div v-else class="is-size-6">No asset</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import activitiesModule from "@/store/modules/activities";
import ActivityInterface from "@/interfaces/activity";
import StepInterface from "@/interfaces/step";

@Component
export default class ActivityInfo extends Vue {
  get activity(): ActivityInterface | undefined {
    return activitiesModule.activityList;
  }

  get activeStep(): StepInterface | undefined {
    return activitiesModule.stepActive;
  }

  async created() {
    await activitiesModule.getActivity("WKZKPR");
    if (this.activity) {
      const { steps } = this.activity;
      activitiesModule.getActiveStep(steps[0].id);
    }
  }

  chooseStep(id: string): void {
    activitiesModule.getActiveStep(id);
  }
}
</script>
