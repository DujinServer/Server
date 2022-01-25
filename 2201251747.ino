#define TIME_OUT_DELAY 500

#include <SoftwareSerial.h>;

SoftwareSerial serial (2, 3);
unsigned long timer;

void setup ()
{
	serial.begin(9600);
	Serial.begin(9600);
}

void loop ()
{
	if (Serial.available())
	{
		return;
	}

	char c = Serial.read();

	if (c == '0')
	{
		Serial.println("Off");
		serial.println("~0000 0");
	}

	if (c == '1')
	{
		Serial.println("On");
		serial.println("~0000 1");
	}

	if (c == '2')
	{
		int state = GetPowerState();
		Serial.print("Power: ");
		Serial.println(state);
	}
}

char WaitAndRead ()
{
	char c;
	timer = millis();

	do
	{
		while (!serial.available())
		{
			if (timer + TIME_OUT_DELAY < millis())
			{
				return -1;
			}
		}

		c = serial.read();
	}
	while (c < 0);

	return c;
}

int GetPowerState ()
{
	while (serial.available())
	{
		serial.read();
	}

	serial.println("~00124 1");
	char prefix = WaitAndRead();

	if (prefix < 0)
	{
		return -1;
	}

	char state = WaitAndRead();

	if (state < 0)
	{
		return -1;
	}

	char sufix = WaitAndRead();

	if (sufix < 0)
	{
		return -1;
	}

	if (prefix != 106)
	{
		return GetPowerState();
	}

	if (sufix != 106)
	{
		return GetPowerState();
	}

	if (state == 11)
	{
		return 0;
	}

	if (state == 43)
	{
		return 1;
	}

	return GetPowerState();
}
