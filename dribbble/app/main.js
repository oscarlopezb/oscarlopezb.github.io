window.addEventListener('load', () => {
    renderSlider();
    mySlider();
    
    renderSubmenu();

    renderGallery();
    renderGalleryMenu();

    initIsotope();

    galleryMenuEvents();
    galleryFilterEvents();

    initTippy();
});

let iso = null;

const renderSlider = () => {
    const renderSlider = document.querySelector('.swiper-wrapper');
    let htmlString = "";
    for (let i = 0; i < data.slider.length; i++) {
        const sliderHTMLString = `
            <div class="swiper-slide">
                <img src="${data.slider[i].img}">
                <div class="slider_name">
                    <p>Project by <span>${data.slider[i].name}</span></p>
                </div>
            </div>
        `;
        htmlString += sliderHTMLString;
    }
    renderSlider.innerHTML = htmlString;
};

const mySlider = () => {
    const mySwiper = new Swiper('.swiper-container', {
        // Optional parameters

        direction: 'horizontal',
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
};

const renderSubmenu = () => {
    const submenuClick1 = document.querySelector('.click1');
    const submenuClick2 = document.querySelector('.click2');
    const submenuClick3 = document.querySelector('.click3');

    const inspiration = document.querySelector('.inspiration_menu');
    const findWork = document.querySelector('.findwork_menu');
    const hireDesigners = document.querySelector('.hire_menu');

    const header = document.querySelector('.header');
    
    ///

    submenuClick1.addEventListener('click', () => {
        inspiration.classList.toggle('opened');
    });

    submenuClick2.addEventListener('click', () => {
        findWork.classList.toggle('opened');
    });

    submenuClick3.addEventListener('click', () => {
        hireDesigners.classList.toggle('opened');
    });
    
    ///

    header.addEventListener("mouseleave", () => {
        inspiration.classList.remove("opened");
    });

    header.addEventListener("mouseleave", () => {
        findWork.classList.remove("opened");
    });

    header.addEventListener("mouseleave", () => {
        hireDesigners.classList.remove("opened");
    });

    /////

    window.addEventListener('click', (ev) => {
        if (!ev.composedPath().includes(submenuClick1) && !ev.composedPath().includes(inspiration)) {
            inspiration.classList.remove("opened");
        }
    });

    window.addEventListener('click', (ev) => {
        if (!ev.composedPath().includes(submenuClick2) && !ev.composedPath().includes(findWork)) {
            findWork.classList.remove("opened");
        }
    });

    window.addEventListener('click', (ev) => {
        if (!ev.composedPath().includes(submenuClick3) && !ev.composedPath().includes(hireDesigners)) {
            hireDesigners.classList.remove("opened");
        }
    });
};

const createCategories = (categories) => {
    // console.log(categories);
    return categories.join(" ");
};

const renderGallery = () => {
    const galleryHolder = document.querySelector('.gallery_items');
    let htmlString = "";
    for (let i = 0; i < data.gallery.length; i++) {
        const galleryHTMLString = `
                <article class="gallery_item ${createCategories(data.gallery[i].categories)}">
                    <div class="bg">
                        <div class="gradient"></div>
                        <img class="img_project" src="${data.gallery[i].img}"
                            alt="" width="20%">
                        <div class="content">
                            <div class="author">
                                <a href="#">
                                <div class="pic">
                                    <img class="img_author" src="${data.gallery[i].author.img}"
                                        alt="">
                                </div>
                                </a>
                                <a href="#"><div class="name">${data.gallery[i].author.name}</div></a>
                                <div class="type">
                                    <a href="#" class="pro ${data.gallery[i].author.pro ? "" : "type_none"}">PRO</a>
                                    <a href="#" class="team ${data.gallery[i].author.team ? "" : "type_none"}">TEAM</a>
                                </div>
                            </div>
                            <div class="meta">
                                <div class="likes">
                                    <a href="#"><div class="fa fa-heart"></div></a>
                                    <p>${data.gallery[i].likes}</p>
                                </div>
                                <div class="views">
                                    <div class="fa fa-eye"></div>
                                    <p>${data.gallery[i].views}</p>
                                </div>
                            </div>
                        </div>
                        <div class="gallery_hover">
                            <div class="hover_title">${data.gallery[i].hover_title}</div>
                            <div class="icons">
                                <a href="#"><div class="fa fa-folder"></div></a>
                                <a href="#"><div class="fa fa-heart"></div></a>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        htmlString += galleryHTMLString;
    }
    galleryHolder.innerHTML = htmlString;
};

const initIsotope = () => {
    const elem = document.querySelector('.gallery_items');
    iso = new Isotope(elem, {
        percentPosition: true,
        layoutMode: 'masonry',
    });
};

const getSingleCategories = () => {
    const categories = data.gallery.map(galleryItem => galleryItem.categories);
    const uniqueCategories = [];

    categories.forEach(categoryArr => {
        categoryArr.forEach(category => {
            if (!uniqueCategories.includes(category)) {
                uniqueCategories.push(category);
            }
        });
    });

    uniqueCategories.sort();
    return uniqueCategories;
};

const renderGalleryMenu = () => {
    const filters = document.querySelector('.filters');
    let htmlString = "";
    const categories = getSingleCategories();
    categories.unshift("All")

    categories.forEach(category => {
        htmlString += `
            <a class="filter_left_button ${category == "All" ? "actual" : ""}" data-category="${category}">${category}</a>
        `;
    });

    filters.innerHTML = htmlString;
};

const galleryMenuEvents = () => {
    const filters = document.querySelectorAll(".filters .filter_left_button");
    // const galleryItems = document.querySelectorAll(".gallery_item");

    filters.forEach(filter => {
        filter.addEventListener("click", () => {

            const category = filter.dataset.category;

            // console.log(category);
            // galleryItems.forEach(galleryItem => {
            //     if (galleryItem.classList.contains(category)) {
            //         galleryItem.classList.remove("hidden");
            //     } else {
            //         galleryItem.classList.add("hidden");
            //     }
            // });



            // if (category == "All") {
            //     galleryItems.forEach(galleryItem => {
            //         galleryItem.classList.remove("hidden");
            //     });
            // };

            if (category == "All") {
                iso.arrange({ filter: "*"})
            } else {
                iso.arrange({ filter: "." + category })
            };

            filters.forEach(filter_ => {
                filter_.classList.remove("actual");
            });

            filter.classList.add("actual")
        });
    });
};

const galleryFilterEvents = () => {
    const input = document.querySelector(".input input");
    const galleryItems = document.querySelectorAll(".gallery_item");

    input.addEventListener("keyup", () => {
        // console.log(input.value);
        const value = input.value;

        galleryItems.forEach(galleryItem => {
            const title = galleryItem.querySelector(".hover_title");

            if (title.innerHTML.includes(value) (input.value.toLowerCase() == galleryItem.value.toLowerCase())) {
                galleryItem.classList.remove("hidden");
            } else {
                galleryItem.classList.add("hidden");
            }
        });
    });
};

const initTippy = () => {
    tippy('.hasToolTip', {
        content: 'Come & enjoy!'
    }); 
};


// el filtrador por texto va ok, pero no sé como hacer que no haga distinción entre mayúsculas y minúsculas //
// el isotope no me afecta al filtrador por texto //