    // Function to fetch news data from the GNews API
    async function fetchNews(category) {
        const apiKey = '88d454cdacf8a6ed352b54c3e11dc36d';
    const apiUrl = `https://gnews.io/api/v4/top-headlines?topic=${category}&token=${apiKey}`;

    try {
            const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
        } catch (error) {
        console.error('Error fetching news:', error);
        }
    }

    // Function to display news cards
    async function displayNews(category) {
        const newsContainer = document.getElementById('cards-container');
    newsContainer.innerHTML = '';

    const newsData = await fetchNews(category);
    const template = document.getElementById('template-news-card');

        newsData.forEach(article => {
            const clone = document.importNode(template.content, true);

    clone.querySelector('#news-img').src = article.image || 'https://via.placeholder.com/150';
    clone.querySelector('#news-title').textContent = article.title;
    clone.querySelector('#news-source').textContent = article.source.name;
    clone.querySelector('#news-desc').textContent = article.description;

    newsContainer.appendChild(clone);
        });
    }

    // Event handler for navigation item clicks
    function onNavItemClick(category) {
        displayNews(category);
    }

    // Event handler for search button click
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
        const searchText = document.getElementById('search-text').value;
    displayNews(searchText);
    });

    // Initial display
    displayNews('general'); // You can change this to the default category you prefer