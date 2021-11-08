<template>
	<div
		class="wrapper"
		tabindex="-1"
		@keyup.left="offsetBy(-1)"
		@keyup.right="offsetBy(1)"
		@scroll="offsetBy(-1)"
	>
		<div class="slider">
			<a href="#" class="btn btn-left" @click="offsetBy(-1)">
				<i class="fas fa-chevron-left" />
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
					<button class="details">
						details
					</button>
				</div>
			</div>
			<a href="#" class="btn btn-right" @click="offsetBy(1)">
				<i class="fas fa-chevron-right" />
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
	data() {
		return {
			order: 1,
			slides: null,
		}
	},
	methods: {
		offsetBy: function(num) {
			if (!this?.images?.length) return toastr.error('Images not loaded!', 'Error', { timeOut: 3500 });

			while (num > 0) { // to right
				this.slides.unshift(...this.slides.splice(this.slides.length - 1, 1));
				num--;
			}
			while (num < 0) { // to left
				this.slides.push(this.slides.shift());
				num++;
			}
			this.slides.forEach((slide, i) => {
				slide.position = i + 1;
			})
		}
	},
	computed: {
		images: () => imgArr.keys().map((img, i) => {
			return { url: imgArr(img), position: i + 1 }
		})
	},
	mounted: function() {
		this.slides = this.images;
	},
	created: function() {
		window.addEventListener('wheel', e => {
			this.offsetBy(Math.round(e.deltaY / 120));
			// console.log(e);
		})
	},
}
</script>

<style scoped>
.wrapper {
	display: flex;
	justify-content: center;
	padding: 0 5px;
	position: relative;
	outline: none;
}

.slider {
	height: 225px;
	padding: 15px 0;
	/*background-color: darkcyan;*/
	scroll-snap-align: center;
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
	align-items: center;
	max-width: 1200px;
	min-height: 100%;
	overflow: hidden;
	/*overflow-x: scroll;*/
	/*scroll-snap-type: x mandatory;*/
}

.slide {
	margin-right: 15px;
	transition: all 1s ease;
	border-radius: 15px;
	border: darkgrey 2px solid;
	box-sizing: border-box;
	background: white;
	position: relative;
}

.slider-list img {
	width: 60px;
	height: 50px;
	border-radius: 15px 15px 0 0;
	object-fit: cover;
}

.info {
	color: #0c101c;
	width: 50px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	padding: 5px;
}

.details {
	background: #7ba0d9;
	border: darkgrey 2px solid;
	padding: 5px;
	border-radius: 15px;
	position: absolute;
	right: 5px;
	bottom: 15px;
}

.slider-list > div:not(:nth-child(5)) {
	filter: blur(1px);
	opacity: 0.7;
}

.slider-list > div:not(:nth-child(5)):hover {
	filter: none;
	opacity: 1;
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
	width: 110px;
	height: 90px;
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
