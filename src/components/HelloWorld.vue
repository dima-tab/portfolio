<template>
<section class="root">
    <div class="header-secton">
      <div>
        FONT AWESOME
        <i class="far fa-question-circle"></i> <!-- solid style of the question circle icon -->
        <i class="fas fa-question-circle"></i> <!-- solid style of the question circle icon -->
        <i class="fab fa-facebook"></i>        <!-- facebook brand icon-->
        <i class="fab fa-facebook-f"></i>      <!-- facebook "f" brand icon-->
      </div>
      <div class="center">
            <p>Ololo <span class="highlight">ololo</span></p>
        </div>
    </div>
    <div class="main-section">
        <div class="center">
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
        </div>
    </div>
    <div class="footer-section">
        <div class="center">
            <div class="colorScheme-block">
                <div class="colorScheme-btn" @click="colorSchemeToggle">
                  <span class="colorScheme-dot" v-bind:style="{transform: `translateY(${colorSchemeCounter * 100}%)`}"></span>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import axios from 'axios'
import '@fortawesome/fontawesome-free/js/all.js' // https://fontawesome.com/license

import toastr from 'toastr'
import 'toastr/build/toastr.css'

// __________ ColorScheme toggle __________
// const colorSchemeBtn = document.getElementsByClassName('colorScheme-btn')
const colorSchemeArray = [
  { // custom
    '--Primary': '#0c101c',
    '--Secondary': '#394b65',
    '--FontColor': '#fff',
    '--HighLight': '#7ba0d9'
  },
  { // dark
    '--Primary': '#000',
    '--Secondary': '#1b1b1b',
    '--FontColor': '#fff',
    '--HighLight': '#f90'
  },
  { // light
    '--Primary': '#b7b7b7',
    '--Secondary': '#e1e1e1',
    '--FontColor': '#7a7a7a',
    '--HighLight': '#040404'
  }
]
const colorSchemeLength = colorSchemeArray.length
// __________ //ColorScheme toggle __________

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function () {
    return {
      bitcoinInfo: null,
      count: 0,
      colorSchemeCounter: 0,
      arr: [
        { label: 'one', value: 1 },
        { label: 'two', value: 2 },
        { label: 'three', value: 3 }
      ]
    }
  },
  methods: {
    fnc: num => num * num * num,
    colorSchemeToggle: function () {
      toastr.warning('My name is Inigo Montoya. You killed my father, prepare to die!', 'title', { timeOut: 5000 })
      toastr.success('success !', 'success title', { timeOut: 5000 })
      toastr.error('error !', 'error title', { timeOut: 5000 })
      toastr.info('sone info!', 'info title', { timeOut: 5000 })
      if (this.colorSchemeCounter < colorSchemeLength - 1) {
        this.colorSchemeCounter++
      } else {
        this.colorSchemeCounter = 0
      }
      const Obj = colorSchemeArray[this.colorSchemeCounter]
      for (const key in Obj) {
        document.documentElement.style.setProperty(key, Obj[key])
      }
    }
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
.colorScheme-btn {
  height: 22px;
  width: 10px;
  position: relative;
  border: 1px solid var(--Secondary);
  border-radius: 5px;
  cursor: pointer;
}
.colorScheme-dot {
  content: "";
  position: absolute;
  height: 6px;
  width: 6px;
  top: 1px;
  right: 0;
  left: 0;
  margin: 0 auto;
  background-color: var(--Secondary);
  border-radius: 50%;
  transform: translateY(0);
  transition: transform .3s linear;
}
</style>
