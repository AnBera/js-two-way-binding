(function () {

    var vm = {};//short form of view model
    var els = document.querySelectorAll('[twoWay]');
    // console.log(els);

    //this hook will run each time you add or update anything in viewmodel
    var vmBindingHook = function (propName) {
        if (!vm.hasOwnProperty(propName)) {
            var val; //required to store the new val entered by user
            Object.defineProperty(vm, propName, {
                set: function (newVal) {
                    val = newVal;
                    console.log('inside define prop');
                    //update all dom elements related to the property of view model
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
                get: function(){ //required to show the actual propery of propName in the object
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
            //update the view model each time you are changing something
            el.onkeyup = function () {
                vm[propName] = el.value;
                console.log(vm);
            }
        }
    });

})();
