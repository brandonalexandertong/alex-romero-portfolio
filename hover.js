const images  = document.querySelectorAll("div.image1, div.image2")
const tags = document.querySelectorAll("h1")

const shift = function() {
  images.forEach(image => {
    const imageHeight = image.getBoundingClientRect().height / 2
    const pixels = (window.pageYOffset)

    image.style.transform = `translate(0, ${pixels - imageHeight}px`
  })
}

document.addEventListener("scroll", function () {
  shift()
})

window.addEventListener("resize", function () {
  shift()
})

tags.forEach(tag => {
  tag.addEventListener("mouseover", function () {
    shift()
  })
})

shift()



const allSeries = document.querySelectorAll(
"a.s1, a.s3, a.s5, a.s6, a.s9, a.s10, a.s11,   a.s14, a.s15, a.s16, a.s17, a.s19, a.s22, a.s23, a.s24, a.s26")

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

allSeries.forEach(series => {
  series.addEventListener("mouseover", function () {
    shift()
    const imagesArray = `${series.getAttribute("data-images")}`
    var seriesImages = JSON.parse(imagesArray)
    seriesImages =  shuffle(seriesImages);



    const image1 = document.querySelector(`div.${series.getAttribute("data-series-1")}`)
    const image2 = document.querySelector(`div.${series.getAttribute("data-series-2")}`)

    image1.innerHTML =  `<img src="${seriesImages[0]}">`
    image2.innerHTML =  `<img src="${seriesImages[1]}">`
  })

})
