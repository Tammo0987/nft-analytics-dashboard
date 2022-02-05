<template>
  <div class="bg-gray-700 rounded shadow-lg p-4 relative">
    <h3 class="text-white text-2xl text-bold">Floor Price</h3>
    <div v-if="loading" class="flex justify-center items-center absolute top-1/2 left-1/2">
      <spinner/>
    </div>
    <LineChart :chartData="chartData" :options="options"/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {LineChart} from "vue-chart-3";
import {ChartOptions, registerables} from "chart.js";
import Chart from 'chart.js/auto';
import {useUSDFormat} from "../../composables";
import {CollectionPrice, getCollectionHistoryData} from "../../api/covalent";
import Spinner from "../Spinner.vue";

Chart.register(...registerables)

export default defineComponent({
  name: "FloorPriceChart",
  components: {Spinner, LineChart},
  props: {
    chain: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    }
  },
  setup: props => {
    const loading = ref(true);
    const usdData = ref();
    const weiData = ref();

    const mapPriceToChartData = (price: CollectionPrice) => {
      return {
        usd: {
          x: price.date,
          y: price.floorPriceUSD
        },
        wei: {
          x: price.date,
          y: price.floorPriceWei / 10 ** 18
        }
      }
    }

    const options: ChartOptions = {
      color: 'rgb(229 231 235)',
      scales: {
        A: {
          position: 'left',
          ticks: {
            color: 'rgb(229 231 235)',
            callback: value => useUSDFormat(Number(value)),
          }
        },
        B: {
          position: 'right',
          ticks: {
            color: 'rgb(229 231 235)',
          }
        },
        x: {
          ticks: {
            color: 'rgb(229 231 235)',
          }
        }
      }
    };

    const chartData = computed(() => ({
      datasets: [
        {
          label: 'Floor Price Quote 7 Days USD ($)',
          data: usdData.value,
          borderColor: '#7b3fe4',
          tension: 0.25,
          yAxisID: 'A'
        },
        {
          label: 'Floor Price ETH 7 Days',
          data: weiData.value,
          borderColor: '#00d8d5',
          tension: 0.25,
          yAxisID: 'B'
        }
      ],
    }));

    getCollectionHistoryData(props.chain, props.address)
        .then(prices => prices.map(mapPriceToChartData).reverse())
        .then(prices => {
              usdData.value = prices.map(price => price.usd);
              weiData.value = prices.map(price => price.wei);
              loading.value = false;
            }
        )
        .catch(error => console.error(error));

    return {chartData, options, loading};
  }
});
</script>
