// ADD PRODUCT DATA TO PAGE 
//grab product id from url parameters
var product = products[new URLSearchParams(window.location.search).get('product')];
function onload() {
    document.title = product.title;
    var $title = $('#title');
    $title.append(
        '<h1>' + product.title + '</h1>'
    );
    addProductStars();
}
onload();

// add product stars to page.
// (needs to be a function because the value may be updated when a new review is added)
function addProductStars() {
    $stars = $('#stars');
    $stars.empty();
    reviewRating = getAverageRating(product);
    addStars($stars, reviewRating);
    $number = $('#number');
    $number.empty();
    $number.append(reviewRating);
}

// add product reviews data to page
function addProductReviews() {
    var $reviews = $('#reviews');
    // empty the object because for when this function is called after a new review is added
    $reviews.empty();
    
    $.each(product.reviews, function(i, review) {
        $reviews.append(
        '<div class="review">' + 
            '<div class="reviewRating">' +
                '<div class="reviewStars" id="reviewStars' + i + '">' +
                //stars
                '</div>' +
                '<div class="reviewNumber">' +
                    review.rating +
                '</div>' +
            '</div>' +
            '<div class="reviewText">' +
                review.review +
            '</div>' +
        '</div>'
        );
    
        $reviewStars = $('#reviewStars' + i);
        addStars($reviewStars, review.rating);
    })
}
addProductReviews();

// global variable recording the rating the user clicked on the review modal
var ratingGiven = 0;
// adds event listeners to the stars when the window opens
function openProductReviewWindow() {
    const $modalStars = $('.userRatingStar');

    $modalStars.each(function(i, star) {
        star.addEventListener("click", () => {
            $modalStars.each(function(otherI, otherStar) {
                if (otherI <= i) {
                    otherStar.classList.add('active');
                } else {
                    otherStar.classList.remove('active');
                }
            });
            ratingGiven = i+1;
        })
    })
}

// submits a new review. has error handling
function submitRatingForm() {
    var review = document.forms["userRatingForm"]["review"].value;
    //check if review has text
    if (!review.trim().length) {
        //throw error
        showError();
    } else {
        let newReview = {
            "rating": ratingGiven,
            "review": review
        }
        product.reviews[product.reviews.length] = newReview;
        console.log("New product object:");
        console.log(product);
        //close modal
        $("#ex1 .close").click();
        //if theres an error, remove the prompt
        if (!$('#error')[0].classList.contains("dontShow")) {
            $('#error')[0].classList.add("dontShow");
        }
        //reset values so they can add a new review
        ratingGiven = 0;
        document.forms["userRatingForm"]["review"].value = "";
        console.log()
        $(".userRatingStar").each(function(i, star) {
            star.classList.remove('active');
        });
        //update the rating in case the new review changed it, and add the new rating to the page. 
        addProductReviews();
        addProductStars();
    }
}

// displays error message
function showError() {
    $errorDiv = $('#error');
    console.log($errorDiv);
    $errorDiv[0].classList.remove("dontShow");
}
