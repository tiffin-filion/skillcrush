// select div with class of overview - will show profile info
const profileInfo = document.querySelector(".overview");
// save github username
const username = "tiffin-filion";

// fetch github profile
const fetchGitHubProfile = async function() {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    displayInfo(data);
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

fetchGitHubProfile();