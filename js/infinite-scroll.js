let listElm = document.querySelector('.coupon-catalog');
let nextItem = 1;
let loadMore = function (page, name = null, description = null, tagNames = null) {
    loadCertificates(page, 6, name, description, tagNames);
}
function throttle(func, wait, options) {
    let context, args, result;
    let timeout = null;
    let previous = 0;
    if (!options) options = {};
    let later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function () {
        let now = Date.now();
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};
function showCertificate(certificate) {
    return `
   <div class="coupon"> 
    <div class="coupon-container">
    <div class="coupon__photo"></div>
    <div class="coupon__first-line">
    <div class="coupon__name">${certificate.name}</div>
    <span class="material-icons coupon__like">
     favorite
     </span>
     </div>
    <div class="coupon__second-line">
    <div class="coupon__description">${certificate.description}</div>
     <div class="coupon__exp-time">Expires in ${certificate.duration} days</div>
    </div>
    <div class="coupon__third-line">
    <div class="coupon__cost">$${certificate.price}</div>
    <button class="coupon__button">Add to Cart</button>
    </div> 
    </div>
    `;
}
let page = 0;
function scrollEvent() {
    let scrollY = window.scrollY;
    let innerHeight = window.innerHeight;
    let offsetHeight = document.body.offsetHeight;
    let certificateName = document.querySelector('.search-form__input').value;
    if (scrollY + innerHeight > offsetHeight - 100) {
        let criteria = getValueFromSelect('criteria-search');
        let tag = getValueFromSelect('category-search');
        if (criteria === 'name') {
            loadMore(page, certificateName, null, tag);
        } else {
            loadMore(page, null, certificateName, tag);
        }
        page++;
        console.log(page);
    }
}
let timeScroll = throttle(
    scrollEvent,
    100,
    {
        trailing: true,
        leading: true,
    }
);
const loadCertificates = async (page, limit, name = null, description = null, tagNames = null) => {
    try {
        const response = await findAllCertificates(page, limit, name, description, tagNames);
        showCertificates(response);
    } catch (error) {
        console.log(error.message);
    }
}
const showCertificates = (certificates) => {
    var coupon = document.createElement('div');
    coupon.className = 'coupons';
    certificates.forEach((certificate) => {
        coupon.innerHTML += showCertificate(certificate);
    });
    listElm.appendChild(coupon);
};
function isEmpty(str) {
    return (!str || str.length === 0);
}
async function findAllCertificates(page, size, name = null, description = null, tagNames = null) {
    let apiUrl = `https://localhost:8443/v3/certificates?page=${page}&size=${size}&sortType=DESC&orderType=CREATE_DATE`;
    console.log("name=" + name);
    console.log("page= " + page)
    if (!isEmpty(name)) {
        apiUrl += `&name=${name}`
    }
    if (!isEmpty(description)) {
        apiUrl += `&description=${description}`
    }
    if (!isEmpty(tagNames)) {
        apiUrl += `&tagNames=${tagNames}`
    }
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`An error occurred: ${response.status}`);
    }
    return await response.json();
}
function clearCertificates() {
    element = document.querySelector('.coupon-catalog');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
function loadThreeLines(name = null, description = null, tagNames = null) {
    let timerId = setInterval(() => { loadMore(page, name, description, tagNames); page++ }, 100);
    setTimeout(() => { clearInterval(timerId) }, 350);
}
function inputSearchEvent(e) {
    clearCertificates();
    page = 0;
    localStorage.setItem('input', e.target.value);
    let criteria = getValueFromSelect('criteria-search');
    let tag = getValueFromSelect('category-search');
    if (criteria === 'name') {
        loadThreeLines(e.target.value, null, tag);
    } else {
        loadThreeLines(null, e.target.value, tag);
    }
}
const tags = [null, 'formen', 'forwomen', 'sport', 'children', 'summer', 'food'];
function categorySearch(category) {
    for (let i = 0; i < tags.length; i++) {
        if (category === tags[i]) {
            document.getElementById("category-search").selectedIndex = i;
        }
    }
    clearCertificates();
    page = 0;
    loadThreeLines(null, null, category);
}
function getValueFromSelect(idOfSelect) {
    let select = document.getElementById(idOfSelect);
    return select.options[select.selectedIndex].value;

}
let input = document.querySelector('.search-form__input');
let button = document.querySelector('.search-form__button')
let certificateName = document.querySelector('.search-form__input').value;
input.addEventListener("input", inputSearchEvent);
document.addEventListener('scroll',
    timeScroll
);
let inputText = localStorage.getItem('input');
loadThreeLines();
