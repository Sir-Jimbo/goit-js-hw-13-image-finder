const API_KEY = '19218870-71f36f70ade4b80d770277c0f';
const BASE_URL = 'https://pixabay.com/api'

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
    const searchParams = new URLSearchParams({
        image_type: 'photo',
        orientation: 'horizontal',
        q: this.searchQuery,
        page: this.page,
        per_page: 12,
        key: API_KEY,
    });

    
        const url = `${BASE_URL}?${searchParams}`;
        //const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
        
        return fetch(url)
        .then(response => response.json())
            .then(({ hits }) => {
                this.incrementPage();
                return hits;
        });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}