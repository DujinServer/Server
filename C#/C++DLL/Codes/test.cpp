#include <iostream>

using namespace std;

extern "C"
{
	__declspec(dllexport) void greet ()
	{
		cout << "Hello world" << endl;
	}
}
