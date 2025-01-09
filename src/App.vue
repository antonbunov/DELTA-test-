<template>


  <table class="table">
    <thead class="table__head">
      <th class="table__head-item" v-for="(item, index) in columns">
        {{ item }}
      </th>
    </thead>
    <tbody>
      <template class="table__body" v-for="(value, index) in table">
        <tr class="table__row" v-on:click="openGraphic(index)">
          <td class="table__row-title" scope="row">
            {{ value.label }}
          </td>
          <td class="table__row-today">
            {{ prettify(value.data[0]) }}
          </td>
          <td class="table__row-yesterday">
            {{ prettify(value.data[1]) }}
            <span v-bind:class='{
              "red": currentRelate(value.data[0], value.data[1]) < 0,
              "green": currentRelate(value.data[0], value.data[1]) > 0,
            }'>
              {{ currentRelate(value.data[0], value.data[1]) }} %</span>
          </td>
          <td class="table__row-day-of-week">
            {{ prettify(dayOfWeek[index]) }}
          </td>

        </tr>
        <tr>
          <td colspan="4" v-if="selected === index">
            <!-- <highcharts :options="chartOptions"></highcharts> -->
            <highcharts :options="getOptions(value)"></highcharts>
          </td>
        </tr>
      </template>

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
      columns: ['Показатель', 'Текущий день', 'Вчера', 'Этот день недели'],
      table: [
        {
          label: 'Выручка, руб',
          data: [500521, 480521, 836430, 292804, 702360, 921885, 914501,],
        },
        {
          label: 'Наличные',
          data: [300000, 300000, 252706, 154128, 796840, 200643, 402370],
        },
        {
          label: 'Безналичный рассчет',
          data: [100000, 100000, 563553, 659358, 610986, 380508, 245224],
        },
        {
          label: 'Кредитные карты',
          data: [100521, 100521, 601236, 106063, 979514, 327537, 532547],
        },
        {
          label: 'Средний чек, руб',
          data: [1300, 900, 5672, 8048, 4364, 4853, 6495],
        },
        {
          label: 'Средний гость, руб',
          data: [1200, 800, 5520, 2936, 1026, 8595, 8389],
        },
        {
          label: 'Удаление из чека(после оплаты, руб)',
          data: [1000, 1100, 5692, 4403, 2454, 6372, 5643],
        },
        {
          label: 'Удаление из чека(до оплаты, руб)',
          data: [1300, 1300, 6798, 3192, 7359, 5289, 8719],
        },
        {
          label: 'Количество чеков',
          data: [34, 34, 51, 67, 40, 49, 27],
        },
        {
          label: 'Количество гостей',
          data: [36, 36, 58, 19, 33, 57, 68],
        },
      ],
      // days: [


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
      return Math.round((today - yesterday) / yesterday * 100)
    },
    getOptions(graphEl) {
      const templateCopy = JSON.parse(JSON.stringify(this.chartOptions));
      templateCopy.series[0].data = graphEl.data;
      return templateCopy;
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
  }
}

</script>