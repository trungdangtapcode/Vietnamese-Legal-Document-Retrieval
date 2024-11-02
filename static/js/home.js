function search(text, k){
    k = parseInt(k);
    let url = '/search';
    let params = {text: text, k: k};
    let pstring = new URLSearchParams(params).toString();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + '?' + pstring, false);
    xhr.send(null);
    let response = xhr.responseText;
    
    text_boxes_el = document.querySelector('#text-boxes');
    text_boxes_el.innerHTML = response;
}

document.querySelector('#seach-box').addEventListener('keypress', function(){
    if (e.key==='Enter'){
        e.preventDefault();
        text = document.querySelector('#search-box').value;
        k = 10
        search(text, k);
    }
});