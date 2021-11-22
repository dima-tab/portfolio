<template>
   <div
      class="wrapper"
      tabindex="-1"
      @keyup.left="offsetBy(-1)"
      @keyup.right="offsetBy(1)"
   >
      <div class="slider">
         <a href="#" class="btn btn-left" @click="offsetBy(-1)">
            <i class="fas fa-chevron-left"/>
         </a>
         <div v-if="!!images?.length" class="slider-list">
            <div
               v-for="img in slides"
               :key="img.url"
               class="slide"
               @click="offsetBy(5 - img.position)"
            >
               <a href="#">
                  <img :src="img.url" alt="pony">
               </a>
               <p class="info">
                  Lorem ipsum dolor sit amet.
               </p>
               <button class="details"
               @click="showDetails = !showDetails">
                  details
               </button>
            </div>
         </div>
         <a href="#" class="btn btn-right" @click="offsetBy(1)">
            <i class="fas fa-chevron-right"/>
         </a>
      </div>
   </div>
   <div v-if="showDetails"
      class="description">
      {{ currentDescription }}
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
      slides: null,
      showDetails: false
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
    }),
    currentDescription: function () { return this.slides ? this.slides[5]?.url : null }
  },
  mounted: function () {
    this.slides = this.images
  },
  created: function () {
    window.addEventListener('wheel', e => {
      this.offsetBy(Math.round(e.deltaY / 120))
      // console.log(e);
    })
  }
}
</script>

<style scoped>
.wrapper {
   position: relative;
   display: flex;
   justify-content: center;
   padding: 0 5px;
   outline: none;
}

.slider {
   height: 225px;
   padding: 15px 0;
}

/* region Buttons */
.btn {
   position: absolute;
   top: calc(50% - 9px);
   font-size: 24px;
   color: var(--HighLight);
}

.btn-left {
   left: 10px;
}

.btn-right {
   right: 10px;
}

.details {
   position: absolute;
   right: 5px;
   bottom: 15px;
   padding: 5px;
   border: darkgrey 2px solid;
   border-radius: 15px;
   background: var(--HighLight);
   color: var(--Primary);
   transition: 0.3s;
}
.details:hover {
   padding: 6px;
   border: darkgrey 1px solid;
   background: var(--Secondary);
   color: var(--HighLight);
   transition: 0.3s;
}
/* endregion */

/* region Slider */
.slider-list {
   position: relative;
   display: flex;
   align-items: center;
   max-width: 1200px;
   min-height: 100%;
   overflow: hidden;
}

.slide {
   position: relative;
   margin-right: 15px;
   border-radius: 15px;
   border: darkgrey 2px solid;
   box-sizing: border-box;
   background: white;
}

.slider-list img {
   width: 60px;
   height: 50px;
   border-radius: 15px 15px 0 0;
   object-fit: cover;
}

.info {
   width: 50px;
   padding: 5px;
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
   font-size: 12px;
   color: #0c101c;
}

.description{
   width: 70%;
   margin: 40px auto;
   text-align: center;
}

.slider-list > div:not(:nth-child(5)) img{
   opacity: 0.7;
}

.slider-list > div:not(:nth-child(5)):hover img {
   filter: none;
   opacity: 1;
   box-sizing: border-box;
}

.slider-list > div:nth-child(1),
.slider-list > div:nth-child(9) {
   opacity: 0;
}

.slider-list > div:nth-child(1) {
   margin-left: -77px;
}

.slider-list > div:nth-child(2) img,
.slider-list > div:nth-child(8) img {
   width: 110px;
   height: 90px;
}
.slider-list > div:nth-child(2) button,
.slider-list > div:nth-child(8) button {
   display: none;
}
.slider-list > div:nth-child(2) p,
.slider-list > div:nth-child(8) p {
   width: 100px;
}

.slider-list > div:nth-child(3) img,
.slider-list > div:nth-child(7) img {
   width: 140px;
   height: 120px;
}

.slider-list > div:nth-child(3) p,
.slider-list > div:nth-child(7) p {
   width: 100px;
}

.slider-list > div:nth-child(5) img {
   width: 220px;
   height: 200px;
   opacity: 1;
}

.slider-list > div:nth-child(5) p {
   width: 160px;
}

.slider-list > div:nth-child(4) img,
.slider-list > div:nth-child(6) img {
   width: 180px;
   height: 150px;
}

.slider-list > div:nth-child(4) p,
.slider-list > div:nth-child(6) p {
   width: 130px;
}

.slider-list * {
   transition: all 1.2s ease;
}

/* endregion */

/* region @media */
@media (max-width: 1200px) {
   .slider-list {
      max-width: 940px;
   }

   .slider-list > div:nth-child(1),
   .slider-list > div:nth-child(2) {
      position: absolute;
      left: -180px;
   }
}

@media (max-width: 992px) {
   .slider-list {
      max-width: 622px;
   }

   .slider-list > div:nth-child(1), .slider-list > div:nth-child(2), .slider-list > div:nth-child(3) {
      position: absolute;
      left: -210px;
   }
}

@media (max-width: 767px) {
   .slider-list {
      max-width: 230px;
   }

   .slider-list > div:nth-child(4), .slider-list > div:nth-child(1), .slider-list > div:nth-child(2),
   .slider-list > div:nth-child(3) {
      position: absolute;
      left: -245px;
   }

   .slider-list > div:nth-child(4) img, .slider-list > div:nth-child(6) img {
      width: 220px;
      height: 200px;
   }
}

/* endregion */

</style>
