import StepInterface from "@/interfaces/step";

interface ActivityInterface {
  name: string;
  publishedRevision: {
    rawData: string;
  };
  steps: Array<StepInterface>;
}

export default ActivityInterface;
