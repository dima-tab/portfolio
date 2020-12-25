<template>
  <div class='hello'>
    <h1>{{ msg }}</h1>
    <p>{{ count }}</p>
    <p>{{ fnc(count) }}</p>
    <ul>
      <li
        v-for="(item, index) in arr"
        :key="'key_' + item.value"
      >
        - index: {{ index }} |
        - value: {{ item.value }} |
        - label: {{ item.label }}
      </li>
    </ul>
    <ul>
      <li
        v-for="(item, key) in bitcoinInfo"
        :key="'key_' + item.value"
      >
        - key: {{ key }} |
        - code: {{ item.code }} |
        - rate: {{ item.rate_float }}
      </li>
    </ul>
    <button @click='count++'>Кликни меня полностью для +1</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function () {
    return {
      bitcoinInfo: null,
      count: 0,
      arr: [
        { label: 'one', value: 1 },
        { label: 'two', value: 2 },
        { label: 'three', value: 3 }
      ]
    }
  },
  methods: {
    fnc: num => num * num * num
  },
  mounted: function () { // init
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => {
        this.bitcoinInfo = response.data.bpi
        console.log(response.data)
      })
      .catch(err => console.error(err))
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  text-align: left;
  list-style-type: none;
  padding: 0;
  max-width: 400px;
  margin: 0 auto;
}
li {
  margin: 10px;
}
a {
  color: #42b983;
}
</style>
