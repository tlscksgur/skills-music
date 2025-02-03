async function Music() {
    const response = await fetch('music_data.json');
    const jsonData = await response.json();
    const data = jsonData.data;

    const contents = document.querySelector('.contents');
    const box = document.querySelector('#main-menu');
    box.querySelector('.fa-youtube-play').closest('li').remove()

    data.sort((a, b) => {
        const dateA = new Date(a.release);
        const dateB = new Date(b.release);
        
        return dateB - dateA;
    });

    function highlightText(text, sptxt) {
        if (!sptxt) return text;
        const special = sptxt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${special})`, 'g');
        return text.replace(regex, '<mark>$1</mark>');
    }

    function createAlbumHTML(album, searchTerm = '') {
        return `
            <div class="col-md-2 col-sm-2 col-xs-2 product-grid">
                <div class="product-items ${album.category}">
                    <div class="project-eff">
                        <img class="img-responsive" src="images/${album.albumJaketImage}" alt="${album.albumName}">
                    </div>
                    <div class="produ-cost">
                        <h5>${highlightText(album.albumName, searchTerm)}</h5>
                        <span>
                            <i class="fa fa-microphone"> 아티스트</i>
                            <p>${highlightText(album.artist, searchTerm)}</p>
                        </span>
                        <span>
                            <i class="fa fa-calendar"> 발매일</i>
                            <p>${album.release}</p>
                        </span>
                        <span>
                            <i class="fa fa-money"> 가격</i>
                            <p>₩${parseInt(album.price.replace(/[^0-9]/g,"")).toLocaleString('en-US')}</p>
                        </span>
                        <span class="shopbtn">
                            <button class="btn btn-default btn-xs">
                                <i class="fa fa-shopping-cart"></i> 쇼핑카트담기
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    contents.innerHTML = data.map(album => createAlbumHTML(album)).join('');
    
    const $searchButton = document.querySelector('#search-button');
    const $searchInput = document.querySelector('.search-input');

    $searchButton.addEventListener('click', () => {
        const searchTerm = $searchInput.value;
        const filteredData = data.filter(item => item.artist.includes(searchTerm) || item.albumName.includes(searchTerm));
        if(filteredData.length === 0){
            contents.innerHTML = `<p style="text-align:center; font-size:20px;">검색된 앨범이 없습니다.</p>`;
        } else {
            contents.innerHTML = filteredData.map(album => createAlbumHTML(album, searchTerm)).join('');
        }
    });

    $searchInput.addEventListener('keydown', (k) => {
        if(k.key === 'Enter') {
            const searchTerm = $searchInput.value;
            const filteredData = data.filter(item => item.artist.includes(searchTerm) || item.albumName.includes(searchTerm));
            if(filteredData.length === 0) {
                contents.innerHTML = `<p style="text-align:center; font-size:20px;">검색된 앨범이 없습니다.</p>`;
            }else{
                contents.innerHTML = filteredData.map(album => createAlbumHTML(album, searchTerm)).join('');
            }
        }
    });

    const cksgur = data.map(item => item.category);
    const uniqueCategories = [...new Set(cksgur)];

    uniqueCategories.forEach(uni => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#"><i class="fa fa-youtube-play fa-2x"></i> <span>${uni}</span></a>`;
        box.appendChild(li);
    });

    const tabs = document.querySelectorAll('#main-menu > li:nth-child(n+2)');

    tabs.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            tabs.forEach(tab => {
                tab.querySelector('a').classList.remove('active-menu');
            });

            const clickLink = e.target.closest('a');
            if (clickLink) {
                clickLink.classList.add('active-menu');
            }

            const selectedCategory = e.target.closest('a').querySelector('span').textContent;
            
            if (selectedCategory === 'ALL') {
                contents.innerHTML = data.map(album => createAlbumHTML(album)).join('');
            }
            else {
                const filteredData = data.filter(item => item.category === selectedCategory);
                contents.innerHTML = filteredData.map(album => createAlbumHTML(album)).join('');
            }
        });
    });
}

function shoppingcart(){
    
}

Music();