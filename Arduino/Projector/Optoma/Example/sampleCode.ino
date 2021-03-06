#define BAUD_RATE 9600
#define TIME_OUT_DELAY 500

#define OFF "~0000 0"
#define ON "~0000 1"
#define GET_POWER_STATE "~00124 1"

#define RX 2
#define TX 3

#include <SoftwareSerial.h>;

SoftwareSerial serial (RX, TX);
unsigned long timer;

void setup ()
{
	Serial.begin(9600);
	serial.begin(BAUD_RATE);
}

void loop ()
{
	if (!Serial.available())
	{
		return;
	}

	char c = Serial.read();

	if (c == '0')
	{
		Off();
	}

	if (c == '1')
	{
		On();
	}

	if (c == '2')
	{
		int state = GetPowerState();
		Serial.print("Power: ");
		Serial.println(state);
	}

	if (c == 'p')
	{
		int state = GetPowerState();

		if (state == 0)
		{
			On();
		}
		else if (state == 1)
		{
			Off();
		}
		else
		{
			Serial.print("Power state ");
			Serial.println(state);
		}
	}
}

void Off ()
{
	Serial.println("Off");
	serial.println(OFF);
}

void On ()
{
	Serial.println("On");
	serial.println(ON);
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

	serial.println(GET_POWER_STATE);
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

	char suffix = WaitAndRead();

	if (suffix < 0)
	{
		return -1;
	}

	if (prefix != 106)
	{
		return GetPowerState();
	}

	if (suffix != 106)
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
