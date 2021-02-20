$carpetaActual = $PSScriptRoot
Start-Process wt "new-tab ""powershell"" powershell '${carpetaActual}\StartBackendServer.ps1' `; new-tab ""powershell"" powershell '${carpetaActual}\StartFrontendServer.ps1' `; split-pane ""powershell"" -noexit cd '${carpetaActual}\..'"
