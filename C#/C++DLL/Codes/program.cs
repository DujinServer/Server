using System.Runtime.InteropServices;

class Program
{
	[DllImport("test.dll")]
	static extern void greet ();

	public Program ()
	{
		greet();
	}

	static void Main ()
	{
		new Program();
	}
}
