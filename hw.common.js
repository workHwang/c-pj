
$(document).ready(function() {
    console.log("ready");
});


$('#asd').on('click', function(e) {
    e.prevendDefault();
    console.log("click");
});

/**
    Local Time <-> Utc Time
*/
function convertTime(param) {
    if (typeof param === 'string' && param.length === 12) {
        var year = param.slice(0, 4);
        var month = parseInt(param.slice(4, 6), 10) - 1;
        var day = param.slice(6, 8);
        var hour = param.slice(8, 10);
        var min = param.slice(10, 12);

        var date = new Date(year, month, day, hour, min);
        return date.getTime();
    } else if (typeof param === 'string' && param.length === 13) {
        var date = new Date(param);
        var year = String(date.getFullYear());
        var month = String(date.getMonth() + 1);
        var day = String(date.getDate());
        var hour = String(date.getHours());
        var min = String(date.getMinutes());

        year = padLeft(year, 4);
        month = padLeft(month, 2);
        day = padLeft(day, 2);
        hour = padLeft(hour, 2);
        min = padLeft(min, 2);

        return year + month + day + hour + min;
    } else {
        // 유효하지 않은 입력 처리
        return null;
    }
}

function padLeft(value, length) {
    value = String(value);
    while (value.length < length) {
        value = '0' + value;
    }
    return value;
}
