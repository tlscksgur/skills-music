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

    contents.innerHTML = data.map((album) => {
        const albumHTML = `
            <div class="col-md-2 col-sm-2 col-xs-2 product-grid">
                <div class="product-items ${album.category}">
                    <div class="project-eff">
                        <img class="img-responsive" src="images/${album.albumJaketImage}" alt="${album.albumName}">
                    </div>
                    <div class="produ-cost">
                        <h5>${album.albumName}</h5>
                        <span>
                            <i class="fa fa-microphone"> 아티스트</i>
                            <p>${album.artist}</p>
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

        return albumHTML;
    }).join('');
    
    
    const $searchButton = document.querySelector('#search-button');
    const $searchInput = document.querySelector('.search-input');

    $searchButton.addEventListener('click',()=>{
        const filteredData = data.filter(item => item.artist.includes($searchInput.value) || item.albumName.includes($searchInput.value));
        contents.innerHTML = filteredData.map((album) => {
            const albumHTML = `
                <div class="col-md-2 col-sm-2 col-xs-2 product-grid">
                    <div class="product-items">
                        <div class="project-eff">
                            <img class="img-responsive" src="images/${album.albumJaketImage}" alt="${album.albumName}">
                        </div>
                        <div class="produ-cost">
                            <h5>${album.albumName}</h5>
                            <span>
                                <i class="fa fa-microphone"> 아티스트</i>
                                <p>${album.artist}</p>
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
            return albumHTML;
        }).join('');
    }
);
$searchInput.addEventListener('keydown',(k)=>{
    if(k.key === 'Enter'){
        const filteredData = data.filter(item => item.artist.includes($searchInput.value) || item.albumName.includes($searchInput.value));
        contents.innerHTML = filteredData.map((album) => {
            const albumHTML = `
                <div class="col-md-2 col-sm-2 col-xs-2 product-grid">
                    <div class="product-items">
                        <div class="project-eff">
                            <img class="img-responsive" src="images/${album.albumJaketImage}" alt="${album.albumName}">
                        </div>
                        <div class="produ-cost">
                            <h5>${album.albumName}</h5>
                            <span>
                                <i class="fa fa-microphone"> 아티스트</i>
                                <p>${album.artist}</p>
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
            return albumHTML;
        }).join('');
    }})

    const cksgur = data.map(item => item.category)

    const uniqueCategories = [...new Set(cksgur)];

    uniqueCategories.forEach(uni => {
    const li = document.createElement('li')
        li.innerHTML = `<a href="#" ><i class="fa fa-youtube-play fa-2x"></i> <span>${uni}</span></a>`;
        box.appendChild(li)
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
        });
    });
    
    const dataFliter = data.filter(item => item === '발라드')
    console.log(dataFliter);
}

Music();
