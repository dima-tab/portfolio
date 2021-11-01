<template>
  <div class="wrapper">
    <div class="slider">
      <a href="#" class="btn btn-left" @click="offsetBy(-1)">
        <i class="fas fa-chevron-left"/>
      </a>
      <div class="slider-list" v-if="!!images?.length">
        <div
          v-for="img in slides" :key="img.url"
          @click="offsetBy(5 - img.position)"
          class="slide"
        >
          <a href="#">
            <img :src="img.url" alt="pony">
          </a>
        </div>
      </div>
      <a href="#" class="btn btn-right" @click="offsetBy(1)">
        <i class="fas fa-chevron-right"/>
      </a>
    </div>
  </div>
</template>

<script>
import toastr from 'toastr'
import 'toastr/build/toastr.css'
const imgArr = require.context('../assets/slides', false, /\.(png|jpe?g|svg)$/)

export default {
  name: 'SliderDrum',
  data () {
    return {
      order: 1,
      slides: null
    }
  },
  methods: {
    offsetBy: function (num) {
      if (!this?.images?.length) return toastr.error('Images not loaded!', 'Error', { timeOut: 3500 })

      while (num > 0) { // to right
        this.slides.unshift(...this.slides.splice(this.slides.length - 1, 1))
        num--
      }
      while (num < 0) { // to left
        this.slides.push(this.slides.shift())
        num++
      }
      this.slides.forEach((slide, i) => {
        slide.position = i + 1
      })
    }
  },
  computed: {
    images: () => imgArr.keys().map((img, i) => {
      return { url: imgArr(img), position: i + 1 }
    })
  },
  mounted: function () {
    this.slides = this.images
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  padding: 0 5px;
  position: relative;
}
.slider {
  height: 225px;
  padding: 15px 0;
  /*background-color: darkcyan;*/
}

/* region Buttons */
.btn {
  font-size: 24px;
  position: absolute;
  top: calc(50% - 9px);
  color: var(--HighLight);
}
.btn-left {
  left: 10px;
}
.btn-right {
  right: 10px;
}
/* endregion */

/* region Slider */
.slider-list {
  position: relative;
  display: flex;
  /*align-items: flex-end;*/
  align-items: center;
  max-width: 1350px;
  min-height: 100%;
  overflow: hidden;
}

.slide {
  margin-right: 15px;
  transition: all 1s ease;
}
.slider-list img {
  width: 60px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
  /*border: var(--HighLight) 1px solid;*/
  box-sizing: border-box;
}
.slider-list > div:nth-child(1),
.slider-list > div:nth-child(9) {
  opacity: 0;
}
.slider-list > div:nth-child(1) {
  margin-left: -75px;
}

.slider-list > div:nth-child(2) img,
.slider-list > div:nth-child(8) img {
  width: 120px;
  height: 100px;
}
.slider-list > div:nth-child(3) img,
.slider-list > div:nth-child(7) img {
  width: 180px;
  height: 150px;
}
.slider-list > div:nth-child(5) img {
  width: 240px;
  height: 210px;
}
.slider-list > div:nth-child(4) img,
.slider-list > div:nth-child(6) img {
  width: 210px;
  height: 180px;

}

.slider-list * {
  transition: all 1.2s ease;
}
/* endregion */

/* region @media */
@media (max-width: 1200px) {
  .slider-list {
    max-width: 970px;
    height: 210px;
    overflow: hidden;
  }
  .slider-list > div:nth-child(1),
  .slider-list > div:nth-child(2) {
    position: absolute;
    left: -180px;
  }
  .slider-list > div:nth-child(3) img,
  .slider-list > div:nth-child(7) img {
    width: 160px;
    height: 150px;
    object-fit: cover;
  }
  .slider-list > div:nth-child(4) img,
  .slider-list > div:nth-child(6) img {
    width: 180px;
    height: 180px;
    object-fit: cover;
  }
  .slider-list > div:nth-child(5) img {
    width: 230px;
    height: 210px;
    object-fit: cover;
  }
  .slider-list > div:nth-child(7) {
    margin: 0px;
  }
}

@media (max-width: 992px) {
  .slider-list {
    max-width: 690px;
    height: 210px;
    overflow: hidden;
  }

  .slider-list > div:nth-child(1), .slider-list > div:nth-child(2), .slider-list > div:nth-child(3) {
    position: absolute;
    left: -210px;
  }

  .slider-list > div:nth-child(4) img, .slider-list > div:nth-child(6) img {
    width: 210px;
    height: 180px;
    object-fit: cover;
  }

  .slider-list > div:nth-child(5) img {
    width: 240px;
    height: 210px;
    object-fit: cover;
  }

  .slider-list > div:nth-child(6) {
    margin: 0px;
  }
}

@media (max-width: 767px) {
  .slider-list {
    max-width: 280px;
    height: 210px;
    overflow: hidden;
    flex-direction: column;
  }

  .slider-list > div:nth-child(4), .slider-list > div:nth-child(1), .slider-list > div:nth-child(2), .slider-list > div:nth-child(3) {
    position: absolute;
    left: -240px;
  }

  .slider-list > div:nth-child(5) img {
    width: 240px;
    height: 210px;
    object-fit: cover;
  }

  .slider-list > div:nth-child(4) img, .slider-list > div:nth-child(6) img {
    width: 240px;
    height: 210px;
    object-fit: cover;
  }
}
/* endregion */

</style>
