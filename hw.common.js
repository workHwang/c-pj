/**
 * hw.common.js
 */
{
    $(document).ready(function() {
        console.log("ready");
    });
    
    $('#asd').on('click', function(e) {
        e.prevendDefault();
        console.log("click");
    });

    /**
     *  ajax POST function
     *  
     *  예시: POST 요청 보내기
     *  var postData = {
     *      key1: "value1",
     *      key2: "value2"
     *  };
     *  
     *  sendPostRequest("your_api_url", postData, function (response) {
     *      // 성공 시 처리
     *      console.log("성공: ", response);
     *  }, function (xhr, status, error) {
     *      // 오류 시 처리
     *      console.error("오류: ", error);
     *  });
     */
    function sendPostRequest(url, data, successCallback, errorCallback) {
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function (response) {
                // 성공 콜백 함수 호출
                if (typeof successCallback === "function") {
                    successCallback(response);
                }
            },
            error: function (xhr, status, error) {
                // 오류 콜백 함수 호출
                if (typeof errorCallback === "function") {
                    errorCallback(xhr, status, error);
                }
            }
        });
    }

    /**
     *  Local Time <-> Utc Time
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

    /**
     *  padStart 대용
     */
    function padLeft(value, length) {
        value = String(value);
        while (value.length < length) {
            value = '0' + value;
        }
        return value;
    }
    
}
