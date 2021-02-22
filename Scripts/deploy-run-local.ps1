# Yo creo que éste habría que revisarlo. Hoy no tuve ganas.

Set-Location ..
dotnet restore ./Backend/Api.sln --verbosity m
Set-Location Frontend
yarn install
yarn run build
Set-Location ..
Remove-Item -Recurse -Force "./Backend/Api/ClientApp/build"
Copy-Item -Path "./Frontend/build" -Destination "./Backend/Api/ClientApp/build" -Recurse
Set-Location Backend/Api
dotnet run