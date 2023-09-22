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

    /**
     * Null Check 
     */
    function isNull(value) {
        return value === null || typeof value === 'undefined';
    }

    /**
     * Array || Object Empty Check 
     */
    function isEmpty(obj) {
        // 배열 또는 객체가 주어지지 않았으면 비어있는 것으로 처리
        if (obj === null || obj === undefined) {
            return true;
        }
        
        // 배열이나 객체의 길이 또는 속성의 개수를 확인하여 비어있는지 여부를 반환
        if (Array.isArray(obj)) {
            return obj.length === 0;
        } else if (typeof obj === 'object') {
            return Object.keys(obj).length === 0;
        }
        
        return false; // 배열 또는 객체가 아닌 경우 비어있지 않음
    }
    
}
