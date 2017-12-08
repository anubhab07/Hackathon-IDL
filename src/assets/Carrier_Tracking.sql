DROP TABLE USER_MASTER;
/
DROP TABLE TRACK_ORDER;
/
DROP SEQUENCE SEQ_ORDER_ID;
/
Begin
  Dbms_Scheduler.Drop_Job (Job_Name => 'Update_Tracker_Staging');
END;
/
CREATE TABLE
 USER_MASTER
           ( USER_ID            VARCHAR2(200) 
    ,LOCATION VARCHAR2(200) 
    ,MOBILE_NUMBER     VARCHAR2(20)
,ORDER_ID VARCHAR2(30)
,STEP NUMBER
,DELIVERY_TYPE VARCHAR2(30)
,LAST_MODIFIED_DATE DATE
,LAST_MODIFIED_TIME TIMESTAMP
)
;
/
CREATE TABLE
      TRACK_ORDER
     (
       STEPS NUMBER 
  ,CURRENT_LOC VARCHAR2(100) 
  ,FINAL_DESTINATION VARCHAR2(200)
  ,LONGITUDE VARCHAR2(30) 
  ,LATITUDE VARCHAR2(30)
  ,REMARKS VARCHAR2(50)
  )
  ;
/
CREATE SEQUENCE SEQ_ORDER_ID START WITH 1 MINVALUE 1 INCREMENT BY 1;
/


  INSERT INTO TRACK_ORDER
   VALUES
        (
        1
       ,'INFY PATIA'
       ,'JAYADEV VIHAR'
       ,'20.2997'
       ,'85.8173'
       ,'Order Despahed'
        )
/
   INSERT INTO TRACK_ORDER
     VALUES
          (
         2
         ,'INFY PATIA'
         ,'NALCO Square'
         ,'20.3148'
         ,'85.8155'
	 ,'In Transit'
  )
/
 INSERT INTO TRACK_ORDER
  VALUES
       (
       3
      ,'INFY PATIA'
      ,'DAMANAA Square'
      ,'20.334'
      ,'85.8249'
      ,'In Transit'
      );
/
 INSERT INTO TRACK_ORDER
  VALUES
       (
       4
      ,'INFY PATIA'
      ,'PATIA Square'
      ,'20.334'
      ,'85.8249'
      ,'In Transit'
      );
/
 INSERT INTO TRACK_ORDER
  VALUES
       (
       5
      ,'INFY PATIA'
      ,'INFY PATIA'
      ,'20.334'
      ,'85.8249'
      ,'Order Delivered'
      );
/
COMMIT;
/
--To Insert Record in User Master Table
create or replace PROCEDURE
   PRC_INSERT_USER_MASTER
   (
   P_USER_ID IN VARCHAR2,
   P_LOCATION IN VARCHAR2,
   P_MOBILE_NUMBER IN VARCHAR2,
   P_DELIVERY_TYPE    IN VARCHAR2,
   P_ERR_MSG          OUT VARCHAR2
   )
   AS
  V_CURRENT_TIME   varchar2(30);
  V_ORDER_DATE     VARCHAR2(20);
  V_ORDER_ID       NUMBER;
  V_ERR_MSG        VARCHAR2(300);
  
  BEGIN
  
  --SELECT TO_CHAR(sysdate + (1/1440*2),'HH24:MI:SS') INTO V_CURRENT_TIME FROM DUAL;
  
  SELECT TO_CHAR(SYSDATE,'DDMMYYHHMISS') INTO V_ORDER_DATE FROM DUAL;
  V_ORDER_ID:=SEQ_ORDER_ID.NEXTVAL;
  V_ORDER_ID:=V_ORDER_ID||V_ORDER_DATE;
  
  INSERT INTO USER_MASTER
  ( USER_ID
  ,LOCATION
  ,MOBILE_NUMBER
  ,ORDER_ID
  ,STEP
  ,DELIVERY_TYPE
  ,LAST_MODIFIED_DATE
  ,LAST_MODIFIED_TIME
  )
    VALUES
  (P_USER_ID
  ,P_LOCATION
  ,P_MOBILE_NUMBER
  ,V_ORDER_ID
  ,0
  ,P_DELIVERY_TYPE
  ,SYSDATE
  ,SYSTIMESTAMP
  );
  COMMIT;

P_ERR_MSG:='Success';

EXCEPTION
WHEN OTHERS
 THEN
 V_ERR_MSG:=SQLCODE;
 V_ERR_MSG:=V_ERR_MSG ||SUBSTR(SQLERRM,1,255);
 P_ERR_MSG:=V_ERR_MSG;
END;
 /
-- This procedure to update steps and last_modified time in User_Master table
create or replace PROCEDURE
   PRC_UPD_USER_MASTER
  AS
   BEGIN
     
UPDATE USER_MASTER
SET STEP=STEP+1,
LAST_MODIFIED_TIME = CURRENT_TIMESTAMP + interval '2' minute
WHERE STEP <5;

END;
/
--This procedure used to fetch current location by passing Order id
create or replace PROCEDURE
 PRC_FETCH_LOC(P_ORD_ID      IN VARCHAR2,
               P_FETCH_LOC   OUT SYS_REFCURSOR,
               P_ERR_MSG     OUT VARCHAR2
               )
 AS
V_DELIVERY_TYPE VARCHAR2(50);
V_LOCATION  VARCHAR2(50);
V_ERR_MSG        VARCHAR2(300);
  
BEGIN

SELECT DELIVERY_TYPE,LOCATION
 INTO  V_DELIVERY_TYPE,V_LOCATION
  FROM USER_MASTER
 WHERE ORDER_ID=P_ORD_ID ;
                   
      IF V_DELIVERY_TYPE  ='BIKE' 
      OR V_DELIVERY_TYPE ='MOPED'
       THEN
      OPEN P_FETCH_LOC 
                     FOR SELECT 
                             CURRENT_LOC
                            ,FINAL_DESTINATION
                            ,LONGITUDE
                            ,LATITUDE
                        FROM TRACK_ORDER
              WHERE STEPS=(SELECT STEP FROM USER_MASTER
                                 WHERE ORDER_ID=P_ORD_ID
                          )
                  AND FINAL_DESTINATION=V_LOCATION;
      ELSIF V_DELIVERY_TYPE  ='DRONE'
       THEN
          OPEN P_FETCH_LOC FOR 
                          SELECT 
                               CURRENT_LOC
                              ,FINAL_DESTINATION 
                          FROM TRACK_ORDER
                         WHERE STEPS=5
                      AND FINAL_DESTINATION=V_LOCATION;
      END IF;
EXCEPTION
WHEN OTHERS
 THEN
 V_ERR_MSG:=SQLCODE;
 V_ERR_MSG:=V_ERR_MSG ||SUBSTR(SQLERRM,1,255);
 P_ERR_MSG:=V_ERR_MSG;
END;
/
-- This procedure is used to get original,final and current location
create or replace PROCEDURE
 PRC_TRACK_ORDER(P_ORD_ID      IN VARCHAR2,
                 P_TRACKE_ORD  OUT SYS_REFCURSOR,
                 P_ERR_MSG     OUT VARCHAR2
                 )
   AS
V_STEP_NO NUMBER;
V_LOCATION  VARCHAR2(50);
V_ERR_MSG  VARCHAR2(300);
BEGIN
  SELECT STEP,LOCATION 
    INTO V_STEP_NO,V_LOCATION
    FROM USER_MASTER 
   WHERE ORDER_ID=P_ORD_ID;
  
  OPEN P_TRACKE_ORD
              FOR
                   SELECT P_ORD_ID
                         ,CURRENT_LOC
                         ,FINAL_DESTINATION
                         ,LONGITUDE
                         ,LATITUDE,
                         1 AS STEP_NO,
                         (SELECT REMARKS FROM TRACK_ORDER 
                                   WHERE STEPS=1 
                                     AND FINAL_DESTINATION=V_LOCATION
                          )
                      FROM TRACK_ORDER
                      WHERE STEPS=1
                   AND FINAL_DESTINATION=V_LOCATION
              UNION
                   SELECT P_ORD_ID
                         ,CURRENT_LOC
                         ,FINAL_DESTINATION
                         ,LONGITUDE
                         ,LATITUDE,
                         5 AS STEP_NO,
                         (SELECT REMARKS FROM TRACK_ORDER 
                                   WHERE STEPS=1 
                                     AND FINAL_DESTINATION=V_LOCATION
                          )
                      FROM TRACK_ORDER
                      WHERE STEPS=5
                      AND FINAL_DESTINATION=V_LOCATION
            UNION
                  SELECT P_ORD_ID
                         ,CURRENT_LOC
                         ,FINAL_DESTINATION
                         ,LONGITUDE
                         ,LATITUDE,
                         1 AS STEP_NO,
                         (SELECT REMARKS FROM TRACK_ORDER 
                                   WHERE STEPS=1 
                                     AND FINAL_DESTINATION=V_LOCATION
                          )
                      FROM TRACK_ORDER
                      WHERE STEPS=V_STEP_NO
                      AND FINAL_DESTINATION=V_LOCATION
                      ;
P_ERR_MSG:='Success';
EXCEPTION
WHEN OTHERS
 THEN
 V_ERR_MSG:=SQLCODE;
 V_ERR_MSG:=V_ERR_MSG ||SUBSTR(SQLERRM,1,255);
 P_ERR_MSG:=V_ERR_MSG;
END;
/
BEGIN
   DBMS_SCHEDULER.create_job (
     job_name        => 'Update_Tracker_Staging',
     job_type        => 'PLSQL_BLOCK',
     job_action      => 'BEGIN PRC_UPD_USER_MASTER; END;',
     start_date      => SYSTIMESTAMP,
     repeat_interval => 'freq=hourly; byminute=2; bysecond=0;',
     enabled         => TRUE
 );
 END;
/
--BEGIN
--PRC_INSERT_USER_MASTER(730398,'PATIA INFOSYS',123456,'BIKE');
--END;
/
