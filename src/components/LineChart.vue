<script lang="ts">
import Vue from "vue";
import { Line, mixins } from "vue-chartjs";
import { Component, Prop } from "vue-property-decorator";

@Component({
  extends: Line,
  mixins: [mixins.reactiveProp],
})
export default class LineChart extends Vue<Line> {
  constructor() {
    super();
  }

  @Prop({
    default: {
      labels: [],
      datasets: [],
    },
  })
  @Prop()
  readonly chartData!: ChartData;
  @Prop() readonly chartOptions!: ChartOptions;
  mounted() {
    console.log("chartData", this.chartData);
    console.log("chartOptions", this.chartOptions);
    this.renderChart(this.chartData, this.chartOptions);
  }
}

export interface ChartData {
  labels: Array<string>;
  datasets: Array<Dataset>;
}

export interface Dataset {
  label: string | undefined;
  data: Array<number>;
  backgroundColor?: Array<string>;
  borderColor?: Array<string> | string;
  fill?: boolean;
  lineTension?: number;
}

export interface ChartOptions {
  responsive: boolean;
  lineTension?: number;
}
</script>
