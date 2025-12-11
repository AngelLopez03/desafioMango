# 🔎 Pokémon List App (React Native)

Este proyecto es una aplicación móvil desarrollada con **React Native** para explorar y buscar información de Pokémon, utilizando la PokeAPI y gestionando el estado con Redux.

---

## ⚙️ Requisitos del Sistema

Para asegurar la correcta compilación y ejecución de la aplicación, necesitarás las siguientes herramientas en tu entorno de desarrollo.

| Herramienta | Versión Requerida | Notas |
| :--- | :--- | :--- |
| **Node.js** | `>= 18.x` | Verifica con `node -v` |
| **Java Development Kit (JDK)** | **JDK 17** | **CRUCIAL para Android Studio/React Native 0.73+** |
| **Android Studio** | Última versión estable | Necesario para SDK de Android y emuladores. |
| **Xcode** (macOS) | Última versión estable | Necesario para iOS y simuladores. |

## 🚀 Guía de Instalación y Ejecución

Sigue estos pasos para levantar la aplicación en tu entorno de desarrollo.

### 1. Clonar el Repositorio e Instalar Dependencias

```sh
# Clonar el repositorio
git clone https://github.com/AngelLopez03/desafioMango.git

#Entramos en la carpeta raíz del proyecto y luego instalamos las dependencias de JavaScript
npm install
```

### 2. Iniciar el Servidor Metro
```sh
npm run start
```

### 3. Configuración Nativa y Ejecución
Abre una nueva terminal para ejecutar el build nativo.

## 🤖 Android
Asegúrate de tener un emulador de Android (AVD) o un dispositivo físico conectado.
```sh
npm run android
```

### 🍏 iOS (Solo macOS)

1.  **Instalar dependencias de CocoaPods:**

    **Instalar dependencias de CocoaPods:** La gestión de dependencias nativas se realiza navegando al directorio `ios/` y ejecutando el siguiente comando:

    ```sh
    cd ios/
    pod install --repo-update
    cd ..
    ```

    > **Nota:** Este comando solo necesita ser ejecutado la primera vez que clonas el proyecto o cuando añades/actualizas dependencias nativas.

2.  **Ejecutar en el Simulador:**

    ```sh
    npm run ios
    ```