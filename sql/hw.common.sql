/*
 * 입력값이 현재일로부터 몇주차인지?
 * @param: inputDtm(입력일)
 * @TRUNC OPTION: D(주초를 일요일 기준으로 == dy), iw(주초를 월요일 기준으로)
 */
SELECT 
      CEIL(LEVEL/7) || '주차' 주차
    , ST_DT+(LEVEL-1) 일자
    , ST_DT 주초일
    , IPT_DT 입력일 
FROM (
    SELECT 
          TRUNC(TO_DATE(:inputDtm, 'YYYYMMDD'), 'D') ST_DT
        , TO_DATE(:inputDtm, 'YYYYMMDD') IPT_DT
    FROM DUAL) 
CONNECT BY LEVEL < (SYSDATE-ST_DT) + 1 
ORDER BY ST_DT+(LEVEL-1) DESC
