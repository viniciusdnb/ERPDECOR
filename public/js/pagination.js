function pagination(countRowData, url){
    var element = document.getElementById("pagination");
    var numPagination =  Number(countRowData / 20).toFixed(0);
    
    for(let i = 1; i <= numPagination; i++){
        var li = document.createElement("li");
        li.setAttribute("class", "page-item");
        var a = document.createElement("a");
        a.setAttribute("class", "page-link");
        a.setAttribute("href", `${url}/${i}`);
        a.innerText = i
        li.appendChild(a);
        element.appendChild(li)

    }


}