document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('contentContainer');
    const topSentinel = document.getElementById('top-sentinel');
    const bottomSentinel = document.getElementById('bottom-sentinel');
    let contentCounterAbove = 0;  // Counter for content above
    let contentCounterBelow = 0;  // Counter for content below (after initial content)
    var cid_list = [current_cid]
    var isLoading = false

    const loadContentAbove = () => {
        get_textbox(cid_list[0], -1, (x)=>{
            container.insertBefore(x, topSentinel.nextSibling)
            cid_list.unshift(x.children[0].children[0].innerText)
        })
    };

    const loadContentBelow = () => {
        get_textbox(cid_list.at(-1), 1, (x)=>{
            container.insertBefore(x, bottomSentinel)
            cid_list.push(x.children[0].children[0].innerText)
        });
    };

    // Observer for the top sentinel
    const topObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            loadContentAbove();
        }
    }, {
        rootMargin: '0px',
        threshold: 1.0  // Trigger only when fully visible
    });

    // Observer for the bottom sentinel
    const bottomObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            loadContentBelow();
        }
    }, {
        rootMargin: '0px',
        threshold: 1.0  // Trigger only when fully visible
    });

    // Start observing both sentinels
    topObserver.observe(topSentinel);
    bottomObserver.observe(bottomSentinel);


    function string2html(string){
        let parser = new DOMParser();
        let doc = parser.parseFromString(string, 'text/html');
        return doc.body.firstChild;
    }
    function get_textbox(cid, x, callback){
        if (isLoading){
            setTimeout(()=>{get_textbox(cid, x, callback)}, 200)
            return
        }
        isLoading = true
        if (![-1,0,1].includes(x)){
            return
        }
        let url = '/cid';
        let params = {cid: cid, x: x};
        let pstring = new URLSearchParams(params).toString();
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url + '?' + pstring, true);
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200){
                callback(string2html(xhr.responseText));
                isLoading = false
            }
            if (xhr.readyState == 4 && xhr.status != 200){
                alert("Load failed")
            }
        }
        xhr.send(null);
    }

    get_textbox(current_cid, 0, (x)=> {
        x.children[0].classList.replace('bg-white','bg-cyan-100')
        container.insertBefore(x, bottomSentinel)
    })
    // loadContentAbove()
    // loadContentAbove()
    window.loadContentAbove = loadContentAbove;
    window.loadContentBelow = loadContentBelow;
});
