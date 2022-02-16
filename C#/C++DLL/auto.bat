@echo off
setlocal

set "tab=	"
set workingDirectory=%cd%

if exist Build\ rd /s /q Build
if exist Codes\ rd /s /q Codes

md Codes
cd Codes

echo Create test.cpp
echo #include ^<iostream^>> test.cpp
echo.>> test.cpp
echo using namespace std;>> test.cpp
echo.>> test.cpp
echo extern "C">> test.cpp
echo {>> test.cpp
echo %tab%__declspec(dllexport) void greet ()>> test.cpp
echo %tab%{>> test.cpp
echo %tab%%tab%cout ^<^< "Hello world" ^<^< endl;>> test.cpp
echo %tab%}>> test.cpp
echo }>>test.cpp

echo Create program.cs
echo using System.Runtime.InteropServices;> program.cs
echo.>> program.cs
echo class Program>> program.cs
echo {>> program.cs
echo %tab%[DllImport("test.dll")]>> program.cs
echo %tab%static extern void greet ();>> program.cs
echo.>> program.cs
echo %tab%public Program ()>> program.cs
echo %tab%{>> program.cs
echo %tab%%tab%greet();>> program.cs
echo %tab%}>> program.cs
echo.>> program.cs
echo %tab%static void Main ()>> program.cs
echo %tab%{>> program.cs
echo %tab%%tab%new Program();>> program.cs
echo %tab%}>> program.cs
echo }>> program.cs

echo.

md %workingDirectory%\Build

echo Build C++ DLL
start /min /wait cmd /c cl /EHsc /Fe:%workingDirectory%\Build\test.dll /LD /nologo test.cpp

del test.obj
del %workingDirectory%\Build\test.exp
del %workingDirectory%\Build\test.lib

echo Build C# program
csc /nologo /out:%workingDirectory%\Build\program.exe program.cs

echo.
cd %workingDirectory%

echo Execute program
Build\program
