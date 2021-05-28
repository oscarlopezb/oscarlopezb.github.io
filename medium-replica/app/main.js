window.addEventListener('load', () => {
    headerColorChanger();
    
    renderMenuItems();
    renderTrending();
    renderPost();
    renderTopics();

    modalEvents();
});

const headerColorChanger = () => {
    const header = document.querySelector(".header");
    const boton_verde = document.querySelector(".boton_verde")
    window.addEventListener("scroll", () => {
        if (scrollY > 300) {
            header.classList.add("goto_white");
            boton_verde.classList.add("goto_green");
        } else {
            header.classList.remove("goto_white");
            boton_verde.classList.remove("goto_green");
        }
    });
};

const renderMenuItems = () => {
    const menuItemsHolder = document.querySelector('.header_navigation_items');
    let htmlString = "";
    for (let i = 0; i < home.menu.length; i++) {
        const menuItemHTMLString = `
            <li class="header_navigation_item">
                <a href="${home.menu[i].link}">${home.menu[i].label}</a>
            </li>
        `;
        htmlString += menuItemHTMLString;
    }

    menuItemsHolder.innerHTML = htmlString;
};

const renderTrending = () => {
    const trendingHolder = document.querySelector('.home_grid_items');
    let htmlString = "";
    for (let i = 0; i < home.trending.length; i++) {
        const trendingHTMLString = `
            <article class="home_grid_item ${home.trending[i].star ? "" : "home_grid_nostar"}"
                    data-clicked="0">
                <div class="big_num">${home.trending[i].number}</div>

                <div class="content">
                    <div class="author">
                        <div class="pic">
                           <img src="${home.trending[i].author.img}" alt="${home.trending[i].author.name}">
                        </div>
                        <div class="name">${home.trending[i].author.name}</div>
                    </div>
                    <h3 class="title">${home.trending[i].title}</h3>

                    <div class="meta">
                        <div class="date">${home.trending[i].date}</div>
                        <div class="separator">
                            <div class="fa fa-circle"></div>
                        </div>
                        <div class="time_to_read">${home.trending[i].timeToRead} min read</div>
                        <div class="star">
                            <div class="fa fa-star"></div>
                        </div>
                    </div>
                </div>

            </article>
        `;
        htmlString += trendingHTMLString;
    }
    trendingHolder.innerHTML = htmlString;
};

const renderPost = () => {
    const postHolder = document.querySelector('.home_grid_2_items')
    let htmlString = ""

    for (let i = 0; i < home.post.length; i++) {
        const postHTMLString = `
        <article class="home_grid_2_item">
            <div class="content ${home.post[i].star ? "" : "home_post_nostar"}">
                <div class="author">
                    <div class="pic">
                        <a href="${home.post[i].author.url}"><img src="${home.post[i].author.img}" alt="${home.post[i].author.name}"></a>
                    </div>
                    <div class="name">${home.post[i].author.name}</div>
                </div>

                <h3 class="title">${home.post[i].title}</h3>
                <p class="text">${home.post[i].text}</p>

                <div class="meta">
                    <div class="left">
                        <div class="date">${home.post[i].date}</div>
                        <div class="separator">
                                <div class="fa fa-circle"></div>
                        </div>
                        <div class="time_to_read">${home.post[i].timeToRead} min read</div>
                        <div class="star">
                            <div class="fa fa-star"></div>
                        </div>
                    </div>
                    <div class="bookmark">
                        <div class="fa fa-bookmark"></div>
                    </div>
                </div>
            </div>

            <div class="post">
                <img src="${home.post[i].img}" alt="#">
            </div>

        </article>
        `;
        htmlString += postHTMLString;
    }
    postHolder.innerHTML = htmlString;
};

const renderTopics = () => {
    const topicsHolder = document.querySelector('.topics_items');
    let htmlString = "";
    for (let i = 0; i < home.topics.length; i++) {
        const topicsHolderHTMLString = `
            <li class="topics_item">
                <a href="${home.topics[i].link}">${home.topics[i].label}</a>
            </li>
        `;
        htmlString += topicsHolderHTMLString;
    }

    topicsHolder.innerHTML = htmlString;
};

const modalEvents = () => {
    const modal = document.querySelector('.modal_one');
    const modalToggles = document.querySelectorAll('.boton_verde');
    const closeButton = document.querySelectorAll('.cruz');
    const modalOverlay = document.querySelector('.modal_bg');

    const bookmark = document.querySelectorAll(".bookmark");
    const modalTwo = document.querySelector(".modal_two");
    const modalOverlayB = document.querySelector('.modal_bg_2');

    bookmark.forEach(bookmarkIcon => {
        bookmarkIcon.addEventListener("click", () => {
            modalTwo.classList.add("opened");
            document.body.style.overflow = "hidden";
        });
    });

    modalToggles.forEach(getStarted => {
        getStarted.addEventListener('click', () => {
            modal.classList.add("opened");
            document.body.style.overflow = "hidden";
        });
    });

    closeButton.forEach(cruz => {
        cruz.addEventListener('click', () => {
            modal.classList.remove("opened");
            modalTwo.classList.remove("opened");
            document.body.style.overflow = "visible";
        });
    });

    modalOverlay.addEventListener('click', () => {
        modal.classList.remove('opened');
        document.body.style.overflow = "visible";
    });

    modalOverlayB.addEventListener('click', () => {
        modalTwo.classList.remove('opened');
        document.body.style.overflow = "visible";
    });

    document.addEventListener('keyup', (ev) => {
        if (ev.key == "Escape") {
            modal.classList.remove('opened');
        }
        document.body.style.overflow = "visible";
    });
};