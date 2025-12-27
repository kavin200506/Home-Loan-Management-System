@echo off
echo Starting Spring Boot Backend...
echo ==================================

cd springapp

if exist mvnw.cmd (
    call mvnw.cmd spring-boot:run
) else (
    mvn spring-boot:run
)

pause

