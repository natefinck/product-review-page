// PRODUCT DATA 
var products = [
    {
        "id": 0,
        "title" : "The Beginners Guide to Bitcoin", 
        "reviews" : [
            {
                "rating": 5,
                "review": "Lorem ipsum dolor sit amet consectetur"
            },
            {
                "rating": 3,
                "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores iusto est beatae obcaecati soluta ea quae impedit eaque esse, reiciendis, facere sequi numquam deserunt nemo iure illo quaerat vitae? Ad!"
            },
            {
                "rating": 5,
                "review": "Lorem ipsum dolor"
            },
            {
                "rating": 5,
                "review": "Lorem ipsum dolor"
            }
        ]
    },
    {
        "id": 1,
        "title" : "The Bitcoin Standard", 
        "reviews" : [
            {
                "rating": 2,
                "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores iusto est beatae obcaecati soluta ea quae impedit eaque esse, reiciendis, facere sequi numquam deserunt nemo iure illo quaerat vitae? Ad!"
            },
            {
                "rating": 5,
                "review": "Lorem ipsum dolor"
            },
            {
                "rating": 4,
                "review": "Lorem ipsum dolor sit amet consectetur"
            }
        ]
    },
    {
        "id": 2,
        "title" : "Divergent", 
        "reviews" : [
            {
                "rating": 3,
                "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores iusto est beatae obcaecati soluta ea quae impedit eaque esse, reiciendis, facere sequi numquam deserunt nemo iure illo quaerat vitae? Ad!"
            },
            {
                "rating": 2,
                "review": "Lorem ipsum dolor sit amet consectetur"
            },
            {
                "rating": 0,
                "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores iusto est beatae obcaecati soluta ea quae impedit eaque esse, reiciendis, facere sequi numquam deserunt nemo iure illo quaerat vitae? Ad!"
            }
        ]
    }
]
// END PRODUCT DATA

function onload() {
    $productContainer = $("#productContainer");
    let index = 0;
    products.forEach(product => {
        rating = getAverageRating(product);
        $productContainer.append(
            '<a href="/product-review-page/src/product/index.html?product=' + index + '">' +
                '<div class="productListing">' + 
                    '<div class="title">' +
                        '<h3>' +
                            product.title +
                        '</h3>' +
                    '</div>' +
                    '<div class="rating homeRating">' +
                        '<div class="ratingStars" id="ratingStars' + index + '">' +
                            //reviews
                        '</div>' +
                        '<div class="number">' +
                            rating +
                        '</div>' +
                    '</div>' +
                '</div>'+
            '</a>'
        );
        addStars($('#ratingStars' + index), rating)
        index = index + 1;
    });
}
onload();

// used to add a stars review to a container based on the rating (global function for both pages)
function addStars(container, rating) {
    var loc = window.location.pathname.split("/");
    var imgTag;
    var imgTagGray;
    if (loc[loc.length-2] == "product") {
        imgTag = '<img src="../img/star.svg" alt="">';
        imgTagGray = '<img src="../img/star.svg" class="grayStar" alt="">'
    } else {
        imgTag = '<img src="./img/star.svg" alt="">';
        imgTagGray = '<img src="./img/star.svg" class="grayStar" alt="">'
    }
    container.empty();
    for (let i = 1; i <= rating; i++) {
        container.append(imgTag);
    }
    for (let i = 1; i <= 5-rating; i++) {
        container.append(imgTagGray);
    }
}

// gets the overall rating of a product (global function for both pages)
function getAverageRating(product) {
    let total = 0
    for(let i = 0; i < product.reviews.length; i++) {
        total += product.reviews[i].rating;
    }
    return Math.round(total / product.reviews.length);
}