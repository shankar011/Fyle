// index.js

const perPage = 10;
let currentPage = 1;

function fetchPage(direction) {
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next') {
        currentPage++;
    }

    fetchGitHubRepos();
}

function fetchGitHubRepos() {
    const username = 'shankar011'; 
    const apiUrl = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${currentPage}`;

    $('#card-container').empty(); 

    $.get(apiUrl, function (data) {
        data.forEach(repo => {
            const card = `
                <div class="card">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available'}</p>
                    <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                </div>
            `;
            $('#card-container').append(card);
        });

        $('#prev-btn').prop('disabled', currentPage === 1);
        $('#next-btn').prop('disabled', data.length < perPage);
    });
}


fetchGitHubRepos();
