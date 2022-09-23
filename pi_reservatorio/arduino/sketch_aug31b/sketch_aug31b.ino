- #include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "XXXXX";   // substituir pelo nome da rede
const char* password = "XXXXX"; // substituir pela senha da rede
const int pinRead = 34; // Pino que o sensor1 está ligado
const int pinRead2 = 35; // Pino que o sensor2 está ligado
const int pinoAlerta = 27; // Pino para ligar o led amarelo
const int pinoUrgencia = 26; // Pino para ligar o led vermelho
const int pinoSirene = 32; // Pino para ligar a sirene
const int nivelAlerta = 20; // Parâmetro que configura o nivel do alerta
const int nivelUrgencia = 30; // Parâmetro que configura o nivel do alerta

float seno;

int frequencia;

/*
 * Deverá ser alterado para o IP e porta configurado no BACKEND
*/
String serverName = "http://192.168.100.6:8081"; // 

void setup() {
  Serial.begin(115200); 
  pinMode(pinRead, INPUT);
  pinMode(pinRead2, INPUT);
  pinMode(pinoAlerta, OUTPUT);
  pinMode(pinoUrgencia, OUTPUT);
  pinMode(pinoSirene, OUTPUT);
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
}

void loop() {
  // 
  /*
   * Leitura dos sinais. ATENÇÃO esse projeto visa trabalhar com 2 sensores, caso queira trabalhar com mais ou com menos
   * deve ser alterada a parte de leitura
   */
  int valor1 = leitura(pinRead);
  enviaNotificacao(1, valor1);
  int valor2 = leitura(pinRead2);
  enviaNotificacao(2, valor2);
  if (valor1 >= valor2){
    emiteSinal(valor1);
  }else{
    emiteSinal(valor2);
  }
  delay(5000);
}

bool wifiConectado(){
  /*
   * Função para validar se o WIFI está conectado
  */
  if(WiFi.status()== WL_CONNECTED){
    return true;
  }else{
    return false;
  }
}

String retornaJson(int sensor, int valor){
   /*
    * Função que irá pegar o valor lido, e transformar no seguinte json
    * {"dado": XXXX, "sensor": YYYY}
   */
   StaticJsonDocument<200> doc;
   doc["dado"] = valor;
   doc["sensor"] = sensor;
   String requestBody;
   serializeJson(doc, requestBody);
   return requestBody;
}

void enviaNotificacao(int sensor, int valor){

 /*
  *  Função para enviar notificação ao endpoint
 */
  if (wifiConectado()){
    WiFiClient client;
    HTTPClient http;
        
    String serverPath = serverName + "/medicao"; // Endpoint chamado
                 
    http.begin(client, serverPath);
    http.addHeader("Content-Type", "application/json");
    String requestBody = retornaJson(sensor, valor);
    Serial.print("body ");
    Serial.print(requestBody);
    /*
     * Post para o backend gravar no banco
     */
    int httpResponseCode = http.POST(requestBody); 
      
    if (httpResponseCode>0) {
       Serial.print("HTTP Response code: ");
       Serial.println(httpResponseCode);
    }else {
       Serial.print("Error code: ");
       Serial.println(httpResponseCode);
    }
    http.end();    
  }else{
    Serial.println("WiFi Disconnected");
  }  
}

void acendeLed(int pino){
  /* 
   * Acende o led passado por parâmetro 
   */
  digitalWrite(pino, HIGH);
}

void apagaLed(int pino){
  /*
   * Apaga o led passado por parâmetr
   */
  digitalWrite(pino, LOW);
}

void emiteSirene(int pinoSIRENE){
  /*
   * Emite o som da sirene 
   */
  for(int x=0;x<30;x++){
     //converte graus para radiando e depois obtém o valor do seno
     seno=(sin(x*3.1416/30));
     //gera uma frequência a partir do valor do seno
     frequencia = 2000+(int(seno*1000));
     tone(pinoSIRENE,frequencia);
     delay(2);
  }
}

void paraSirene(int pinoSIRENE){
  /*
   * Pára o som da sirene
   */
  noTone(pinoSIRENE);
}

void emiteAlerta(){
   /*
    * Acende o led de alerta e apaga o de emergencia, desligando tambem a sirene
   */
   acendeLed(pinoAlerta);
   apagaLed(pinoUrgencia);
   paraSirene(pinoSirene);
}

void emiteUrgencia(){
  /*
   * Se atingiu o nivel de urgencia, apaga alerta e liga urgencia
  */
  apagaLed(pinoAlerta);
  acendeLed(pinoUrgencia);
  emiteSirene(pinoSirene);
}


void paraAlerta(){
  /*
   * Para os alertas
   */
   apagaLed(pinoAlerta);
   apagaLed(pinoUrgencia);
   paraSirene(pinoSirene);
}

void emiteSinal(int valor){
  /*
   * De acordo com os níveis medidos, verifica se deve ou não emitir o alerta, a urgencia ou parar ambos
   */
  Serial.println(valor);
  if (valor >= nivelAlerta and valor < nivelUrgencia){
    emiteAlerta();
  }
  else if(valor>= nivelUrgencia){
      emiteUrgencia();
  }else{
    paraAlerta();
  }
}

int leitura(int pinoLeitura){
  /*
   * Realiza a leitura dos pinos
   */
  int valor = analogRead(pinoLeitura)/100;
  return valor;
}
