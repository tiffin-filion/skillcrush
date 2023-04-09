// select div with class of overview - will show profile info
const profileInfo = document.querySelector("div.overview");
// select unordered list of repos
const repoList = document.querySelector("ul.repo-list");
// select section with class of repos
const repoSection = document.querySelector("section.repos");
// select section with individual repo info
const repoData = document.querySelector("section.repo-data");
// select back to repo gallery button
const backBtn = document.querySelector("button.view-repos");
// select search input
const filterInput = document.querySelector("input.filter-repos");
// save github username
const username = "tiffin-filion";

// fetch github profile
const fetchGitHubProfile = async function() {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if(response.status !== 200) {
        let div = document.createElement("div");
        div.classList.add("error");
        div.innerHTML = response.status + ": " + response.statusText;
        profileInfo.append(div);
    } else {
        const data = await response.json();
        displayInfo(data);
    }
}

// fetch & display user info
const displayInfo = function(data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    profileInfo.append(div);
}

// fetch repository info
const fetchRepos = async function() {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if(response.status !== 200) {
        let div = document.createElement("div");
        div.classList.add("error");
        div.innerHTML = response.status + ": " + response.statusText;
        profileInfo.append(div);
    } else {
        const data = await response.json();
        displayRepos(data);
        filterInput.classList.remove("hide");
    }
}

// display repo info on page
const displayRepos = function(repos) {
    for(let repo of repos) {
        let li = document.createElement("li");
        let h3 = document.createElement("h3");
        li.classList.add("repo");
        h3.innerText = `${repo.name}`;
        li.append(h3);
        repoList.append(li);
    }
}

// on click of repo list item
repoList.addEventListener("click", function(e) {
    if(e.target.matches("h3")) {
        let repoName = e.target.innerText;
        fetchRepoInfo(repoName);
    }
})

// fetch repo language info
const fetchRepoInfo = async function(repoName) {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await response.json();
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    const languages = [];
    for(let l in languageData) {
        languages.push(l);
    }
    displayRepoLanguage(repoInfo, languages);
}

// display single repo info
const displayRepoLanguage = function(repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(div);
    repoData.classList.remove("hide");
    repoList.classList.add("hide");
    backBtn.classList.remove("hide");
}

// back to gallery button functionality
backBtn.addEventListener("click", function() {
    repoList.classList.remove("hide");
    repoData.classList.add("hide");
    backBtn.classList.add("hide");
})

// search box functionality
filterInput.addEventListener("input", function(e) {
    const inputText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchText = inputText.toLowerCase();
    for(let repo of repos) {
        let repoName = repo.innerText;
        if(repoName.includes(searchText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
})

fetchGitHubProfile();
fetchRepos();