const data = [
    {
        "id":0,
        "img":"assets/images/AL220E-500x500.png",
        "hover-img":"assets/images/AL220E-500x500.png",
        "category": "Headsets",
        "Title":"AL220E",
        "Price":10
    },
    {
        "id":1,
        "img":"assets/images/V81-1000-X-1000-03-600x600.png",
        "hover-img":"assets/images/V81-1000-X-1000-03-600x600.png",
        "category": "speakers",
        "Title":"hello V81",
        "Price":13
    },
    {
        "id":2,
        "img":"assets/images/Aikkun-MX21-600x600.png",
        "hover-img":"assets/images/Aikkun-MX21-600x600.png",
        "category": "Mice",
        "Title":"MX21 Cordless",
        "Price":18.6
    },
    {
        "id":3,
        "img":"assets/images/Aikun-AX8000-500x500.png",
        "hover-img":"assets/images/Aikun-AX8000-500x500.png",
        "category": "keyboards",
        "Title":"BT 8000",
        "Price":23
    },
    {
        "id":4,
        "img":"assets/images/57e0d887Nf562412d.jpg",
        "hover-img":"assets/images/Aikun-AX8000-500x500.png",
        "category": "Gaming",
        "Title":"Morphus X300",
        "Price":42
    },
    {
        "id":5,
        "img":"assets/images/Aikun-Portable-Projectors-Ap200w.png",
        "hover-img":"assets/images/Aikun-Portable-Projectors-Ap200w.png",
        "category": "Portable Projector",
        "Title":"AP-200W",
        "Price":28
    },
    {
        "id":6,
        "img":"assets/images/S7-500x500.png",
        "hover-img":"assets/images/S7-500x500.png",
        "category": "Tablet",
        "Title":"solely S7",
        "Price":109.99
    },
    {
        "id":7,
        "img":"assets/images/Aikun-TWS-Speaker-V71-ADVE-02-1000X1000-copy-500x500.jpg",
        "hover-img":"assets/images/Aikun-TWS-Speaker-V71-ADVE-02-1000X1000-copy-500x500.jpg",
        "category": "Headsets",
        "Title":"hello V71",
        "Price":33
    }
]



    function addToProductPage(){
        const product = data.find(p => p.id === productId);
        const breadCrumb = document.querySelector("#bread-crumb")
        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = `
            <div class="thumb">
            <a href="single-product.html" class="image">
                <img src="${product.img}" alt="Product" />
                <img class="hover-image" src="${product['hover-img']}" alt="Product" />
            </a>
            </div>
            <div class="content">
                <span class="category"><a href="#">${product.category}</a></span>
                <h5 class="title"><a href="single-product.html">${product.Title}
                    </a>
                </h5>
                <span class="price">${product.Price}<strong>$</strong></span>   
                <button class="btn btn-add">add to cart</button>        
            </div>
            </div>
        `
    }


    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    if(!isNaN(productId)){
        addToProductPage()
    }
    
    //  add to cart 
    const cartCount = document.querySelector("#cart-count")
    let cartItemsCount = 0
    if(localStorage.getItem('cartItemsId'))
    {
        cartItemsCount = Array.from(localStorage.getItem('cartItemsId')).filter(i => i != ",").length
        cartCount.innerHTML = `${cartItemsCount}`
    }

    let cartItemsId = []
    cartItemsId.push(localStorage.getItem("cartItemsId"))
    let addToCartBtn = document.querySelectorAll(".btn-add")
    
    addToCartBtn.forEach(btn => {
        btn.addEventListener("click", function(e){
            if(localStorage.getItem('cartItemsId'))
            {
                cartItemsCount = Array.from(localStorage.getItem('cartItemsId')).filter(i => i != ",").length
            }
            cartItemsId.push(productId)
            localStorage.setItem('cartItemsId', cartItemsId)
            cartCount.innerHTML = `${cartItemsCount}`
        })
    })

    // shopping cart page
    const addContent = (cartId)=>{
        if(cartId == data[cartId].id){
    
            const productDetail = document.getElementById('shopping-cart-content');
            if(productDetail)
            productDetail.innerHTML += `
        <div class="product w-25" id="p-${data[cartId].id}">
                    <div class="thumb m-3" >
                        <a href="single-product.html" class="image">
                            <img class="" src="${data[cartId].img}" alt="Product" />
                            
                        </a>
                    </div>
                    <div class="content">
                        <span class="category"><a href="#">${data[cartId].category}</a></span>
                        <h5 class="title"><a href="single-product.html">${data[cartId].Title}
                            </a>
                        </h5>   
                        <span class="price">${data[cartId].Price}<strong>$</strong></span>
                        <button class="btn btn-danger removeItem">Remove from Cart List</button>
                    </div>
                </div>
            </div>
            `
        }
       
    }
    
const storedData = localStorage.getItem("cartItemsId")
if(storedData){
    const cartItemsArray = storedData.split(',').filter(i => i != "")
    cartItemsArray.forEach((item, index) => {
        addContent(item)
    })

}else {
    const productDetail = document.getElementById('shopping-cart-content');
    if(productDetail)
    productDetail.innerHTML += `
            <div class="thumb w-25 m-3">
            <span class="alert alert-info">There is no Items To Show</a></span>
            </div>`
}



// remove from cartlist
    const removeItem = document.querySelectorAll('.removeItem')
    if(removeItem.length > 0){
        removeItem.forEach(item => {
            item.addEventListener("click", function(e){
                const div = this.parentElement.parentElement
                const cartItemsArray = Array.from(localStorage.getItem('cartItemsId')).filter(i => i != ",")
                let newArr = []
                const divId =JSON.stringify(div.id).slice(3,4)
                const a = cartItemsArray.filter(i => i == divId)
                newArr = cartItemsArray.filter(c => c != a)
                localStorage.setItem("cartItemsId", newArr)
                window.location.reload()
            })
        })
    }


