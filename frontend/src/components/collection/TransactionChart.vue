<template>
  <div class="bg-gray-700 rounded shadow-lg p-4 relative">
    <h3 class="text-white text-2xl text-bold">Transactions</h3>
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
import Spinner from "../Spinner.vue";
import {getTransactionByCollection, TransactionCount} from "../../api/covalent";

Chart.register(...registerables)

export default defineComponent({
  name: "TransactionChart",
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
    const transactions = ref();

    const mapTransactionsToChartData = (transactions: TransactionCount) => {
      return {
        transactions: {
          x: transactions.date.substring(0, 10),
          y: transactions.count
        }
      }
    };

    const options: ChartOptions = {
      color: 'rgb(229 231 235)',
      scales: {
        y: {
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
          label: 'Transactions 30 Days',
          data: transactions.value,
          borderColor: '#7b3fe4',
          tension: 0.25,
          yAxisID: 'y'
        }
      ]
    }));

    getTransactionByCollection(props.chain, props.address)
        .then(transactionCounts => transactionCounts.map(mapTransactionsToChartData).reverse())
        .then(transactionCounts => {
              transactions.value = transactionCounts.map(item => item.transactions);
              loading.value = false;
            }
        )
        .catch(error => console.error(error));

    return {
      loading,
      chartData,
      options
    };
  }
});
</script>