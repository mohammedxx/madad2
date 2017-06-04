$(document).ready(function () {

    var isIE = DetectIE();
    var bodyEl = $(document.body);
    var internetExplorerModal = $('#internetExplorerModal');

    //Check if to show IE modal
    if (isIE && !sessionStorage.getItem("IEPopupClose")) {
        internetExplorerModal.show();
    }

    //Check if to show ad blocker modal
    //Check if the user has an extension that blocks google analytics(Disconnect)
    window.addEventListener('load', function () {
        if ((!window.ga.create && !sessionStorage.getItem("adBlockClose")) ||
                window.canRunAds === undefined && !sessionStorage.getItem("adBlockClose")) {
            $("#adBlockModal").show();
        }
    });


    // When the user clicks anywhere outside of the modal, close it
    bodyEl.click(function (e) {
        var target = $(e.target);

        //If pressed outside of the modal
        if (target.is('[data-role="modal"]')) {
            target.fadeOut(200);
            StoreInSessionStorage(target.attr("id"));
            return;
        }

        //If pressed on X button
        if (target.is('[data-action="close-modal"]')) {
            target.closest('[data-role="modal"]').fadeOut(200);
            StoreInSessionStorage(target.attr("id") || target.data("id"));
        }
    });

    //Store the event in the session storage.
    function StoreInSessionStorage(targetId) {
        switch (targetId) {
            case "internetExplorerModal":
                sessionStorage.setItem("IEPopupClose", true);
                break;
            case "adBlockModal":
                sessionStorage.setItem("adBlockClose", true);
                break;
        }
    }

    //Checks if the userAgent is IE.
    function DetectIE() {
        // IE 10 or older
        var ua = window.navigator.userAgent;
        // IE 11 
        var trident = ua.indexOf('Trident/');
        // Edge (IE 12+)
        var edge = ua.indexOf('Edge/');

        var msie = ua.indexOf('MSIE ');
        if (msie > 0 || trident > 0 || edge > 0) {
            return true;
        }

        return false;
    }

});
