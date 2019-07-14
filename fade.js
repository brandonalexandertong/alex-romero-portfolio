const aboutButton = document.querySelector("a.about-button")
const aboutBody = document.querySelector(".about-body")
const alexBody = document.querySelector("body")
const alexButton = document.querySelector(".alex-button")
const backButtons = document.querySelectorAll(".back-button, .alexander-button")
const listTag = document.querySelector(".series-list-container")

aboutButton.addEventListener("click", function() {
  hideTags = document.querySelectorAll("h1, .about-button, .news-button, .alex-button, .index-button, #series-section")
  hideTags.forEach(tag => {
    tag.style.display = `none`
  })

  aboutBody.style.display = `block`
  aboutBody.style.animation = `whiteToBlack 1s ease-in both`
  // listTag.classList.add("black-background")
  // aboutBody.classList.add("black-background")
  // aboutBody.style.backgroundColor = `#0b0b0b`
  // listTag.style.backgroundColor = `#ffffff`
})

backButtons.forEach(button => {
  button.addEventListener("click", function() {
    hideTags = document.querySelectorAll("h1, .about-button, .news-button, .alex-button, .index-button, #series-section")
    hideTags.forEach(tag => {
      tag.style.display = `block`
    })

    aboutBody.style.display = `none`
    listTag.style.animation = `blackToWhite 1s ease-in both`
    // listTag.classList.remove("black-background")
    // aboutBody.classList.remove("black-background")
    // aboutBody.style.backgroundColor = `#ffffff`
    // listTag.style.backgroundColor = `#ffffff`
  })
})
