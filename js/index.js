// when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    searchLinkEvent()
})


//event listeners
function searchLinkEvent(){
    document.getElementById('github-form').addEventListener('submit', handleSubmit)
}


//event handlers

function handleSubmit(e){
    e.preventDefault()
    let formInput = document.querySelector('#search').value
    console.log(formInput)
    fetch(`https://api.github.com/search/users?q=${formInput}`, {
        method: "GET",
        headers: {
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            searchResults = data.items
            console.log(searchResults)
            searchResults.forEach(result => renderCard(result))
        })
}




//renderers 


function renderCard(user){
    const searchDisplay = document.getElementById('user-list')
    
    let card = document.createElement('div')
    card.innerHTML = `
    <h2>${user.login}</h2>
    <img src="${user.avatar_url}"">
    <div><a href="${user.html_url}">Visit ${user.login}'s profile</a> </div>
    `
    searchDisplay.appendChild(card)

    card.addEventListener('click', (e) => {
        fetch(`https://api.github.com/users/${user.login}/repos`, {
            method: "GET",
            headers: {
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
        }
        })
        .then(res => res.json())
        .then(data => {
            searchResults = data.owner
            console.log(data.owner)
            searchResults.forEach(result => renderRepo(result))
        })
    })
    
}

function renderRepo(repoData){
    const reposDisplay = document.getElementById('repos-list')
    let repoCard = document.createElement('div')
    repoCard.innerHTML = `
        <h4>${repoData.login}'s Repositories</h4>
        <div>
            <p>Description: ${repoData.description}</p>
            <p>Link to Repo: <a href = "${repoData.url}">click here</a></p>
        </div>
    `
    reposDisplay.appendChild(repoCard)
}