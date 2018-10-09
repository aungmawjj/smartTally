
/***************************************************
  Adafruit MQTT Library ESP8266 Example

  Must use ESP8266 Arduino from:
    https://github.com/esp8266/Arduino

  Works great with Adafruit's Huzzah ESP board & Feather
  ----> https://www.adafruit.com/product/2471
  ----> https://www.adafruit.com/products/2821

  Adafruit invests time and resources providing this open source code,
  please support Adafruit and open-source hardware by purchasing
  products from Adafruit!

  Written by Tony DiCola for Adafruit Industries.
  MIT license, all text above must be included in any redistribution
 ****************************************************/
#include <ESP8266WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

/************************* WiFi Access Point *********************************/

#define WLAN_SSID       "JJ"
#define WLAN_PASS       "12345678"

/************************* Adafruit.io Setup *********************************/

#define SERVER      "kaa.ninja"
#define SERVERPORT  8883                   // use 8883 for SSL
#define USERNAME    "amaw"
#define KEY         "amaw@kaa"

/************ Global State (you don't need to change this!) ******************/

// Create an ESP8266 WiFiClient class to connect to the MQTT server.
//WiFiClient client;/
// or... use WiFiFlientSecure for SSL
WiFiClientSecure client;

// Setup the MQTT client class by passing in the WiFi client and MQTT server and login details.
Adafruit_MQTT_Client mqtt(&client, SERVER, SERVERPORT, USERNAME, KEY);

/****************************** Feeds ***************************************/

Adafruit_MQTT_Publish crowdArea = Adafruit_MQTT_Publish(&mqtt, "smartTally/crowdArea");

// Setup a feed called 'onoff' for subscribing to changes.
//Adafruit_MQTT_Subscribe onoffbutton = Adafruit_MQTT_Subscribe(&mqtt, USERNAME "/feeds/onoff");/

/*************************** Sketch Code ************************************/

// Bug workaround for Arduino 1.6.6, it seems to need a function declaration
// for some reason (only affects ESP8266, likely an arduino-builder bug).
void MQTT_connect();



uint8_t WIFI_LED = 2;
uint8_t MQTT_LED = 16;

uint8_t deviceId = 1;
uint8_t defaultPushBtnDelay = 500;

struct PushBtn {
  uint8_t pinNo;
  bool prevState;
  bool triggerState;
  unsigned long prevTime;
  uint16_t delayDuration;
};

struct PushBtn increaseBtn = {
  4, true, 0, 0, defaultPushBtnDelay
};

struct PushBtn decreaseBtn = {
  5, true, 0, 0, defaultPushBtnDelay
};

unsigned long mqttPrevTime = 0;
uint16_t mqttReconnectDelay = 5000;

uint16_t population = 0;

void MQTT_connect() {

  uint8_t ret;
  
  // Stop if already connected.
  if (mqtt.connected()) {
    digitalWrite(MQTT_LED, LOW);
    return;
  }


  unsigned long currentTime = millis();
  
  if(currentTime - mqttPrevTime < mqttReconnectDelay) {
    return;
  }

  Serial.println("Connecting to MQTT... ");

  if ((ret = mqtt.connect()) != 0) { // connect will return 0 for connected
    Serial.println(mqtt.connectErrorString(ret));
    Serial.print("Retrying MQTT connection in ");
    Serial.print(mqttReconnectDelay / 1000);
    Serial.println(" seconds...");
    mqtt.disconnect();
  } else { 
    Serial.println("MQTT Connected!");
  }

  mqttPrevTime = currentTime;
  
}

bool readPushBtn(struct PushBtn *pushBtn) {
  
  unsigned long currentTime = millis();

//  Serial.println(currentTime - pushBtn->prevTime);/
  
  bool currentState = digitalRead(pushBtn->pinNo);
  
  if (currentTime - pushBtn->prevTime > pushBtn->delayDuration && currentState == pushBtn->triggerState && currentState != pushBtn->prevState) {

    pushBtn->prevTime = currentTime;
    return true;
    
  }

  pushBtn->prevState = currentState;
  return false;
}

void publishCrowd() {
  Serial.println("Publishing Crowd...");
  Serial.print("Payload:");
  String payload = "{\"deviceId\":" + String(deviceId) + ",\"population\":" + String(population) + "}";
  Serial.println(payload);
  if (! crowdArea.publish((char *)payload.c_str())) {
    Serial.println("Publish Failed");
  } else {
    Serial.println(F("Publish OK!"));
  }
}

void job_0() {

//  Serial.println("\nJob_0");/
  
  bool incBtnTrig = readPushBtn(&increaseBtn);
  bool decBtnTrig = readPushBtn(&decreaseBtn);
  
  if (incBtnTrig) {
    Serial.println("\nIncrease Btn Triggered");
    population++;
    publishCrowd();
  }

  if (decBtnTrig) {
    Serial.println("\nDecrease Btn Triggered");
    if(population > 0){
      population--;
    }
    publishCrowd();
  }
  
}

void loop() {
  
  job_0();
  MQTT_connect();
  delay(100);
  
}


void setup() {
  
  Serial.begin(115200);
  delay(10);
  
  pinMode(increaseBtn.pinNo, INPUT_PULLUP);
  pinMode(decreaseBtn.pinNo, INPUT_PULLUP);

  pinMode(MQTT_LED, OUTPUT);
  pinMode(WIFI_LED, OUTPUT);

  digitalWrite(MQTT_LED, HIGH);
  digitalWrite(WIFI_LED, HIGH);
  

  Serial.println("Smart Tally");

  // Connect to WiFi access point.
  Serial.println(); Serial.println();
  Serial.print("Connecting to ");
  Serial.println(WLAN_SSID);

  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  Serial.println("WiFi connected");
  digitalWrite(WIFI_LED, LOW);
  Serial.println("IP address: "); Serial.println(WiFi.localIP());
  
}
