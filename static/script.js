
function applyFilters() {
    var titleSearchTerm = document.getElementById("search-title").value.toLowerCase();
    var bodySearchTerm = document.getElementById("search-body").value.toLowerCase();
    var startDate = document.getElementById("start-date").value;
    var endDate = document.getElementById("end-date").value;

    var newsItems = document.getElementsByClassName("news-item");

    for (var i = 0; i < newsItems.length; i++) {
        var newsItem = newsItems[i];
        var title = newsItem.getAttribute("data-title").toLowerCase();
        var body = newsItem.getAttribute("data-body").toLowerCase();
        var createdDate = new Date(newsItem.getAttribute("data-created-date"));

        var matchesTitle = title.includes(titleSearchTerm);
        var matchesBody = body.includes(bodySearchTerm);
        var isInRange = isDateInRange(createdDate, startDate, endDate);

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

