/*
 * 입력값이 현재일로부터 몇주차인지?
 * @param: inputDtm(입력일)
 * @TRUNC OPTION: D(주초를 일요일 기준으로 == dy), iw(주초를 월요일 기준으로)
 */
SELECT 
      CEIL(LEVEL/7) || '주차' 주차
    , ST_DT+(LEVEL-1) 일자
    , CASE WHEN ST_DT+(LEVEL-1) = :inputDtm THEN 'V' ELSE '' END 입력일
    , ST_DT 주초일
FROM (
    SELECT 
          TRUNC(TO_DATE(:inputDtm, 'YYYYMMDD'), 'D') ST_DT
    FROM DUAL) 
CONNECT BY LEVEL < (SYSDATE-ST_DT) + 1 
ORDER BY ST_DT+(LEVEL-1) DESC

/*
 * 현재일로부터 입력한 값에 해당하는 주차는 언제인지?
 * @param:inputWeeks (음수: 과거 주차, 양수: 미래 주차)
 */
SELECT 
      CEIL(LEVEL/7)||'주차' 주차
    , A
    , A+(CASE WHEN :inputWeeks >= 0 THEN LEVEL-1 ELSE -(LEVEL-1) END) B
    , CASE WHEN A+(CASE WHEN :inputWeeks >= 0 THEN LEVEL-1 ELSE -(LEVEL-1) END) = TO_CHAR(SYSDATE, 'YYYYMMDD') THEN 'V' ELSE '' END 입력일
FROM (SELECT TRUNC(TO_DATE(TO_CHAR(SYSDATE, 'YYYYMMDD')), 'D') A FROM DUAL)
WHERE :inputWeeks <> 0 -- optional
CONNECT BY LEVEL < ABS(:inputWeeks)*7 +1
ORDER BY B DESC