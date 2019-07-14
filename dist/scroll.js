const sections = document.querySelectorAll("section.content")
const dimensionTag =  document.querySelector("p.dimension")
const materialTag = document.querySelector("p.material")
const dateTag =  document.querySelector("p.date")
const nameTag = document.querySelector("h2.name")
const sizeTag = document.querySelector("p.dimension")


document.addEventListener("scroll", function() {
  const pixels = window.pageYOffset
  sections.forEach(section => {
    if (section.offsetTop <= pixels) {
      nameTag.innerHTML = section.getAttribute("data-name")
      sizeTag.innerHTML = section.getAttribute("data-size")
    }
  })
})


const imageTags = document.querySelectorAll("img")

const fadeIn = function() {
  imageTags.forEach(tag => {
    const tagTop = tag.getBoundingClientRect().top
    const tagBottom = tag.getBoundingClientRect().bottom
    if (tagTop < window.innerHeight && tagBottom > 0) {
      tag.style.animation = `fadeIn 1s ease-in both`
    } else {
      tag.style.opacity = 0
      tag.style.animation =  ""
    }
  })
}

fadeIn()

document.addEventListener("scroll", function() {
  fadeIn()
})

window.addEventListener("resize", function() {
  fadeIn()
})
