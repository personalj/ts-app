import {
  VuexModule,
  Module,
  getModule,
  Action,
  Mutation,
} from "vuex-module-decorators";
import gql from "graphql-tag";
import store from "@/store";
import graphqlClient from "@/utils/graphql";
import ActivityInterface from "@/interfaces/activity";
import StepInterface from "@/interfaces/step";

@Module({
  dynamic: true,
  namespaced: true,
  name: "ActivitiesModule",
  store,
})
class ActivitiesModule extends VuexModule {
  storeActivity?: ActivityInterface = {} as ActivityInterface;
  activityTitle = "";
  activityStep?: StepInterface = {} as StepInterface;

  @Mutation
  setActivityList(activity: ActivityInterface): void {
    if (activity) {
      this.storeActivity = JSON.parse(activity.publishedRevision.rawData);
      this.activityTitle = activity.name;
    }
  }

  @Mutation
  getActiveStep(activeId: string): void {
    if (this.storeActivity) {
      const { steps } = this.storeActivity;
      this.activityStep = steps.find((v: { id: string }) => v.id === activeId);
    }
  }

  @Action({ commit: "setActivityList" })
  async getActivity(code: string) {
    const response = await graphqlClient.query({
      query: gql`
        query activity($shortCode: String) {
          activity(shortCode: $shortCode) {
            activity {
              name
              # Custom types
              publishedRevision {
                rawData
              }
            }
          }
        }
      `,
      variables: {
        shortCode: code,
      },
    });
    return response.data.activity.activity;
  }

  get activityList() {
    return this.storeActivity;
  }

  get activityName() {
    return this.activityTitle;
  }

  get stepActive() {
    return this.activityStep;
  }
}

export default getModule(ActivitiesModule);
