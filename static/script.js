function toggleNewsBody(index) {
    var newsBody = document.getElementById('news-body-' + index); // get news body element by id
    if (newsBody.style.maxHeight) { // check if it's visible
        newsBody.style.maxHeight = null; // if yes, set max height to null and hide it
    } else {
        newsBody.style.maxHeight = newsBody.scrollHeight + "px"; // if no, show it completely by setting max to scroll height
    }
}

function applyFilters() {
    var titleSearchTerm = document.getElementById("search-title").value.toLowerCase();
    var bodySearchTerm = document.getElementById("search-body").value.toLowerCase(); // formatting in lower case to search
    var startDate = document.getElementById("start-date").value;
    var endDate = document.getElementById("end-date").value;

    // catch for case when end-date is not entered, then it will be today's date
    if (!endDate) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); // january - 0
        var yyyy = today.getFullYear();

        endDate = yyyy + '-' + mm + '-' + dd;
    }

    var newsItems = document.getElementsByClassName("news-item");

    for (var i = 0; i < newsItems.length; i++) {
        var newsItem = newsItems[i];
        var title = newsItem.getAttribute("data-title").toLowerCase();
        var body = newsItem.getAttribute("data-body").toLowerCase(); // formatting json values to lowercase to search
        var createdDate = new Date(newsItem.getAttribute("data-created-date"));

        var matchesTitle = title.includes(titleSearchTerm);
        var matchesBody = body.includes(bodySearchTerm);
        var isInRange = isDateInRange(createdDate, startDate, endDate);
        
        //check if data matches entered text
        if ((matchesTitle || titleSearchTerm === '') && (matchesBody || bodySearchTerm === '') && isInRange) {
            newsItem.style.display = "block";
        } else {
            newsItem.style.display = "none";
        }
    }
}

function isDateInRange(date, startDate, endDate) {
    if (!startDate && !endDate) { // if no start date and end date are provided, the date is considered in range
        return true;
    }

    startDate = new Date(startDate); // convert dates to object for comparison
    endDate = new Date(endDate);

    /* check if the date is greater than or equal to the start date 
    and less than or equal to the end date (if provided) */
    return (!startDate || date >= startDate) && (!endDate || date <= endDate);
}

document.getElementById("filter-button").addEventListener("click", applyFilters);

