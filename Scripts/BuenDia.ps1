#Abre VS Code. Levanta servidores backend, frontend y una consola para git o lo que sea que quieras
$carpetaActual = $PSScriptRoot
code "${carpetaActual}\..\Frontend"
Start-Process wt "new-tab ""powershell"" powershell '${carpetaActual}\IniciarServidorBackend.ps1' `; new-tab ""powershell"" powershell '${carpetaActual}\IniciarServidorFrontend.ps1' `; split-pane ""powershell"" -noexit cd '${carpetaActual}\..'"
