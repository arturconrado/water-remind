# Water Reminder App - Aplicativo de Lembrete para Beber Água

Um aplicativo desenvolvido em React Native (Expo) que ajuda você a manter-se hidratado ao longo do dia.

## 🚀 Funcionalidades

- **Acompanhamento de ingestão diária de água** - Registre quantos ml de água você bebeu
- **Meta personalizável** - Defina sua meta diária de consumo de água (padrão: 2000ml)
- **Progresso visual** - Veja seu progresso em tempo real com um círculo de progresso
- **Lembretes por notificação** - Receba notificações para lembrar de beber água
- **Persistência de dados** - Seus dados são salvos localmente no dispositivo
- **Reset diário automático** - O progresso é resetado automaticamente a cada novo dia

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI (opcional, para rodar no dispositivo físico)
- Dispositivo móvel com Expo Go (iOS/Android) ou emulador

## 🛠️ Instalação

1. Clone o repositório ou navegue até a pasta do projeto:
```bash
cd /workspace
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

4. Escaneie o QR code com o Expo Go no seu dispositivo ou pressione:
   - `a` para abrir no Android (emulador)
   - `i` para abrir no iOS (simulador)
   - `w` para abrir no navegador web

## 📱 Como Usar

1. **Adicionar água**: Toque nos botões (+100ml, +200ml, etc.) para registrar o consumo
2. **Ver progresso**: O círculo central mostra sua porcentagem da meta diária
3. **Ativar lembretes**: Use o toggle "Ativar Lembretes" para receber notificações diárias às 09:00
4. **Resetar progresso**: Toque em "Resetar Progresso" para zerar o contador do dia

## 📁 Estrutura do Projeto

```
/workspace
├── App.js                 # Componente principal
├── app.json              # Configurações do Expo
├── package.json          # Dependências do projeto
├── assets/               # Imagens e ícones
└── src/
    ├── components/
    │   ├── WaterDrop.js      # Componente visual de gota d'água
    │   └── ProgressCircle.js # Círculo de progresso
    ├── screens/
    │   └── HomeScreen.js     # Tela principal
    └── utils/
        ├── waterStorage.js   # Funções de armazenamento local
        └── notifications.js  # Funções de notificação
```

## 🔧 Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma de desenvolvimento React Native
- **AsyncStorage** - Armazenamento local persistente
- **Expo Notifications** - Sistema de notificações push

## 🎨 Personalização

Você pode personalizar o aplicativo editando:

- **Meta diária**: Modifique a constante `DAILY_GOAL` em `src/utils/waterStorage.js`
- **Cores**: Altere as cores no arquivo de estilos em `HomeScreen.js`
- **Horário do lembrete**: Modifique os parâmetros em `scheduleWaterReminder()` em `notifications.js`

## 📝 Notas

- As notificações requerem permissão do usuário
- No Android, é necessário conceder permissão de notificação manualmente nas configurações
- Os dados são armazenados localmente e não são sincronizados entre dispositivos

## 🤝 Contribuição

Sinta-se à vontade para contribuir com melhorias! Algumas ideias:
- Adicionar múltiplos lembretes ao longo do dia
- Gráficos de histórico semanal/mensal
- Compartilhamento de conquistas
- Integração com Apple Health / Google Fit

## 📄 Licença

ISC

---

💧 **Mantenha-se hidratado e saudável!**