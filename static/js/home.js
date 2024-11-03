function search(text, k){
    k = parseInt(k);
    let url = '/search';
    let params = {text: text, k: k};
    let pstring = new URLSearchParams(params).toString();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + '?' + pstring, true);
    xhr.onreadystatechange = function(){
        {
            if (xhr.readyState == 4 && xhr.status == 200){
                let response = xhr.responseText;
                text_boxes_el = document.querySelector('#text-boxes');
                text_boxes_el.innerHTML = response;
            }
            if (xhr.readyState == 4 && xhr.status != 200){
                loadingFail()
            }
        }
    }
    loadingState()
    xhr.send(null);
}

function loadingState(){
    text_boxes_el = document.querySelector('#text-boxes');
    text_boxes_el.innerHTML = `
    <div class="grid min-h-[140px] w-full place-items-center rounded-lg p-6 lg:overflow-visible">
    <svg class="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
        width="24" height="24">
        <path
        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path
        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
        </path>
    </svg>
    </div>
    `;
}
function loadingFail(){
    text_boxes_el = document.querySelector('#text-boxes');
    text_boxes_el.innerHTML =`
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong class="font-bold">Error!</strong>
    <span class="block sm:inline">Something went wrong. Please try again.</span>
    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z"/></svg>
    </span>
    </div>
    `
}
loadingFail()

document.querySelector('#search-box').addEventListener('keypress', function(e){
    if (e.key==='Enter'){
        e.preventDefault();
        text = document.querySelector('#search-box').value;
        k = 10
        search(text, k);
    }
});