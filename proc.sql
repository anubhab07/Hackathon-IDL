 SELECT STEP,LOCATION
    FROM USER_MASTER 
   WHERE ORDER_ID=10091217083621;
   
select SEQ_ORDER_ID.NEXTVAL from dual;

create table USER_MASTER2 AS SELECT * FROM USER_MASTER;

TRUNCATE TABLE USER_MASTER; 

ALTER TABLE USER_MASTER MODIFY(ORDER_ID NUMBER);

INSERT INTO USER_MASTER SELECT * FROM USER_MASTER2;
SELECT UM.ORDER_ID
                         ,CURRENT_LOC
                         ,FINAL_DESTINATION
                         ,LONGITUDE
                         ,LATITUDE
                          ,1 AS STEP_NO,
                         (SELECT REMARKS FROM TRACK_ORDER 
                                   WHERE STEPS=1
                                     AND FINAL_DESTINATION='INFY PATIA'  
                          )
                      FROM TRACK_ORDER TR
                    INNER JOIN USER_MASTER UM
                      ON UM.STEP=(SELECT STEP FROM USER_MASTER WHERE ORDER_ID=10)
                      AND UM.LOCATION=TR.FINAL_DESTINATION
                      WHERE TR.STEPS=1
                      AND UM.ORDER_ID=10  
                   AND TR.FINAL_DESTINATION='INFY PATIA'  
              UNION
                    SELECT UM.ORDER_ID
                         ,CURRENT_LOC
                         ,FINAL_DESTINATION
                         ,LONGITUDE
                         ,LATITUDE
                          ,5 AS STEP_NO,
                         (SELECT REMARKS FROM TRACK_ORDER 
                                   WHERE STEPS=5
                                     AND FINAL_DESTINATION='INFY PATIA'  
                          )
                      FROM TRACK_ORDER TR
                    INNER JOIN USER_MASTER UM
                      ON UM.STEP=TR.STEPS
                      AND UM.LOCATION=TR.FINAL_DESTINATION
                      WHERE TR.STEPS=(SELECT STEP FROM USER_MASTER WHERE ORDER_ID=10)
                      AND UM.ORDER_ID=10 
                   AND TR.FINAL_DESTINATION='INFY PATIA' 
            UNION
                    SELECT UM.ORDER_ID
                         ,CURRENT_LOC
                         ,FINAL_DESTINATION
                         ,LONGITUDE
                         ,LATITUDE
                          ,2 AS STEP_NO,
                         (SELECT REMARKS FROM TRACK_ORDER 
                                   WHERE STEPS=5
                                     AND FINAL_DESTINATION='INFY PATIA'  
                          )
                      FROM TRACK_ORDER TR
                    INNER JOIN USER_MASTER UM
                      ON UM.STEP=TR.STEPS
                      AND UM.LOCATION=TR.FINAL_DESTINATION
                      WHERE TR.STEPS=(SELECT STEP FROM USER_MASTER WHERE ORDER_ID=10)
                      AND UM.ORDER_ID=10 
                   AND TR.FINAL_DESTINATION='INFY PATIA'
;
SELECT UM.ORDER_ID
                         ,CURRENT_LOC
                         ,FINAL_DESTINATION
                         ,LONGITUDE
                         ,LATITUDE
                          ,1 AS STEP_NO,
                         (SELECT REMARKS FROM TRACK_ORDER 
                                   WHERE STEPS=1
                                     AND FINAL_DESTINATION='INFY PATIA'  
                          ) AS REMARKS
                      FROM TRACK_ORDER TR
                    INNER JOIN USER_MASTER UM
                      ON UM.STEP=(SELECT STEP FROM USER_MASTER WHERE ORDER_ID=10)
                      AND UM.LOCATION=TR.FINAL_DESTINATION
                      WHERE TR.STEPS=1
                      AND UM.ORDER_ID=10  
                   AND TR.FINAL_DESTINATION='INFY PATIA'  
              UNION
                    SELECT UM.ORDER_ID
                         ,CURRENT_LOC
                         ,FINAL_DESTINATION
                         ,LONGITUDE
                         ,LATITUDE
                          ,5 AS STEP_NO,
                         (SELECT REMARKS FROM TRACK_ORDER 
                                   WHERE STEPS=5
                                     AND FINAL_DESTINATION='INFY PATIA'  
                          ) AS REMARKS
                      FROM TRACK_ORDER TR
                    INNER JOIN USER_MASTER UM
                      ON UM.STEP=TR.STEPS
                      AND UM.LOCATION=TR.FINAL_DESTINATION
                      WHERE TR.STEPS=(SELECT STEP FROM USER_MASTER WHERE ORDER_ID=10)
                      AND UM.ORDER_ID=10 
                   AND TR.FINAL_DESTINATION='INFY PATIA' 
            UNION
                    SELECT UM.ORDER_ID
                         ,CURRENT_LOC
                         ,FINAL_DESTINATION
                         ,LONGITUDE
                         ,LATITUDE
                          ,2 AS STEP_NO,
                         (SELECT REMARKS FROM TRACK_ORDER 
                                   WHERE STEPS=2
                                     AND FINAL_DESTINATION='INFY PATIA'  
                          ) AS REMARKS
                      FROM TRACK_ORDER TR
                    INNER JOIN USER_MASTER UM
                      ON UM.STEP=TR.STEPS
                      AND UM.LOCATION=TR.FINAL_DESTINATION
                      WHERE TR.STEPS=(SELECT STEP FROM USER_MASTER WHERE ORDER_ID=10)
                      AND UM.ORDER_ID=10 
                   AND TR.FINAL_DESTINATION='INFY PATIA'
;