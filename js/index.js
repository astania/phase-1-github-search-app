// when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    
})


//event listeners
function searchLinkEvent(){
    document.getElementById('github-form').addEventListener('submit', handleSubmit)
}


//event handlers

function handleSubmit(e){
    e.preventDefault()
    let formInput = e.target.value
    fetch(`https://api.github.com/search/users?q=${formInput}`, {
        method: "GET",
        headers: {
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then()
}