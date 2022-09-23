# pi_reservatorio

## Projeto destinado ao controle e monitoramento do nível de chorume nos reservatórios

### Backend
Backend desenvolvido em NodeJS. Para seu funcionamento, deve-se criar um banco MYSQL e fazer sua parametrização no arquivo
- /src/config/banco.js

Após parametrização feita, poderá executar o projeto

Ele será o responsável por receber os dados lidos pelo ARDUINO e salvar no banco de dados para monitoramento no dashboard

### Arduino
Diretório onde está o código fonte que deverá ser gravado no ARDUINO.
Foi desenvolvido para funcionar utilizando dois sensores, caso queira utiliza mais ou menos, a qtde de leitura deverá ser atualizada 

```int valor1 = leitura(pinRead);
  enviaNotificacao(1, valor1);
  int valor2 = leitura(pinRead2);
  enviaNotificacao(2, valor2);
  if (valor1 >= valor2){
    emiteSinal(valor1);
  }else{
    emiteSinal(valor2);
  }
  ```
O código fará um POST em um endpoint com o payload igual ao do exemplo
```
{
 "dado":12,
 "sensor":1
}
```
Para que o POST seja feito, deve-se parametrizar a URL de forma correta, como no exemplo abaixo
```
String serverName = "http://192.168.1.10:8080"; // 
```
A url será obtida após execução do backend

### Grafana
Será criado um dashboard utilizando o grafana, para isso deve-se fazer o download do mesmo no site do GRAFANA (https://grafana.com/) e após importar o arquivo que encontra -se em
- /grafana

Esse dash tem como objetivo: 
 * Mostrar o nível atual dos sensores
 * Mostrar a média das leituras
 * O menor nível atingido
 * O Maior nível atingido
 * Um histórico dos dados coledados
 * Um gráfico de preciptação
 * Um gráfico de vazão
 * 
Todos esses dados poderão ser filtrados por data e sensor. Será atualizado automaticamente de acordo com o que o usário parametrizar.
![image](https://user-images.githubusercontent.com/69817325/191875685-3922b64d-f807-470d-8a9a-01b808385d9c.png)
