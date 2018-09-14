(function () {

    var vm = {};
    var els = document.querySelectorAll('[twoWay]');
    // console.log(els);

    var vmBindingHook = function (propName) {
        if (!vm.hasOwnProperty(propName)) {
            var val;
            Object.defineProperty(vm, propName, {
                set: function (newVal) {
                    val = newVal;
                    console.log('inside define prop');
                    els.forEach(function (el) {
                        if (el.getAttribute('twoWay') === propName) {
                            if (el.type === 'text') {
                                el.value = newVal;
                            } else {
                                el.innerHTML = newVal;
                            }
                        }
                    });
                },
                get: function(){
                    return val;
                },
                enumerable: true
            });

        }

    };

    els.forEach(function (el) {
        let propName = el.getAttribute('twoWay');
        if (el.type === 'text') {
            console.log(el);
            vmBindingHook(propName);
            el.onkeyup = function () {
                vm[propName] = el.value;
                console.log(vm);
            }
        }
    });

})();
