function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")

    const ufValue = event.target.value

    const url = ``

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )

}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

