@echo off
setlocal

if %1. == . goto :eof

if not exist %1 (
	echo %1 not found
	goto :eof
)

set content=%1\content.html
set header=header.html
set output=%1\index.html

if not exist %header% (
	echo Header file not found
	goto :eof
)

if not exist %content% (
	echo Content file not found
	goto :eof
)

if exist %output% del %output%

copy %header% %output%

if exist %1\Detail\ echo ^<script^>AddDetail()^</script^>>>  %output%

copy /b %output% + %content% %output%
