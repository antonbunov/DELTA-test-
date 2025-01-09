<template>


  <table class="table">
    <thead class="table__head">
      <th class="table__head-item" v-for="(item, index) in columns">
        {{ item }}
      </th>
    </thead>
    <tbody class="table__body" v-for="(value, index) in table">
      <!-- <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="Consistency" name='{{ index }}'>
        </el-collapse-item>
      </el-collapse> -->
      <tr class="table__row" v-on:click="openGraphic(index)">
        <td class="table__row-title" scope="row">
          {{ value.label }}
        </td>
        <td class="table__row-today">
          {{ prettify(days[0].today[index]) }}
        </td>
        <td class="table__row-yesterday">
          {{ prettify(days[1].yesterday[index]) }}
          <span v-bind:class='{
            "red": relate < 0,
            "green": relate > 0,
          }'>
            {{ Math.round(currentRelate(days[0].today[index], days[1].yesterday[index])) }} %</span>

        </td>
        <td class="table__row-day-of-week">
          {{ prettify(days[0].today[index]) }}
        </td>

      </tr>
      <tr>
        <td colspan="4" v-if="selected == index">
          <highcharts :options="chartOptions"></highcharts>
        </td>
      </tr>


    </tbody>
  </table>

</template>

<style scoped>
.table {
  border-collapse: separate;
}

[colspan="4"] {
  padding: 0;
}

td,
th {
  background-color: #fafafa;
  padding: 5px 20px;
}

.red {
  color: red;
}

.green {
  color: green;
}
</style>



<script>


export default {

  data() {
    return {
      test: 10,
      selected: false,
      relate: false,
      columns: ['Показатель', 'Текущий день', 'Вчера', 'Этот день недели'],
      table: [
        { label: 'Выручка, руб' },
        { label: 'Надичные' },
        { label: 'Безналичный рассчет' },
        { label: 'Кредитные карты' },
        { label: 'Средний чек, руб' },
        { label: 'Средний гость, руб' },
        { label: 'Удаление из чека(после оплаты, руб)' },
        { label: 'Удаление из чека(до оплаты, руб)' },
        { label: 'Количество чеков' },
        { label: 'Количество гостей' },
      ],
      days: [
        { today: [500521, 300000, 100000, 100521, 1300, 1200, 1000, 1300, 34, 34] },
        { yesterday: [480521, 300000, 100000, 100521, 900, 800, 1100, 1300, 36, 36] },
        { dayBeforeYesterday: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] }
      ],

      dayOfWeek: [4805121, 300000, 100000, 100521, 900, 800, 900, 900, 34, 32],
      chartOptions: {
        chart: {
          type: 'spline'
        },
        title: false,
        series: [{
          //data: newGraph,

          // data: [1, 3, 10,]
          data: [this.test],
          // data: this.dayOfWeek.slice(1),
        }]
      },
      title: ''
    }
  },

  methods: {
    currentRelate(today, yesterday) {
      this.relate = (today - yesterday) / yesterday * 100
      return (today - yesterday) / yesterday * 100
    },
    newGraph(value, key) {
      this.$set(
        this.chartOptions.series[0].data = 100
        // index,
        // (Math.random() * 1000) | 0
      );
    },
    prettify(num) {
      let n = num.toString();
      return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    },
    openGraphic(index) {
      this.selected = index
    }
  },
  watch: {
    title(newValue) {
      if (newValue === '') {
        this.chartOptions.title.text = 'Entire title'
      } else {
        this.chartOptions.title.text = newValue
      }
    }
  }
}

</script>