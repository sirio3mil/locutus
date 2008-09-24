function require( filename ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Michael White (http://getsprink.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // %        note 1: Force Javascript execution to pause until the file is loaded. Usually causes failure if the file never loads. ( Use sparingly! )
    // -    depends on: file_get_contents
    // *     example 1: require('http://www.phpjs.org/js/phpjs/_supporters/pj_test_supportfile_2.js');
    // *     returns 1: 2

    var js_code = file_get_contents(filename);
    var script_block = document.createElement('script');
    script_block.type = 'text/javascript';
    var client_pc = navigator.userAgent.toLowerCase();
    if((client_pc.indexOf("msie") != -1) && (client_pc.indexOf("opera") == -1)) {
        script_block.text = js_code;
    } else {
        script_block.appendChild(document.createTextNode(js_code));
    }

    if(typeof(script_block) != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(script_block);

        // save include state for reference by include_once and require_once()
        var cur_file = {};
        cur_file[window.location.href] = 1;

        if (!window.php_js) window.php_js = {};
        if (!window.php_js.includes) window.php_js.includes = cur_file;

        if (!window.php_js.includes[filename]) {
            window.php_js.includes[filename] = 1;
        } else {
            // Use += 1 because ++ waits until AFTER the original value is returned to increment the value.
            return window.php_js.includes[filename] += 1;
        }
    }
}