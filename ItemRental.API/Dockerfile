#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["ItemRental.API/ItemRental.API.csproj", "ItemRental.API/"]
COPY ["ItemRental.Application/ItemRental.Application.csproj", "ItemRental.Application/"]
COPY ["ItemRental.Core/ItemRental.Core.csproj", "ItemRental.Core/"]
COPY ["ItemRental.Repositories/ItemRental.Repositories.csproj", "ItemRental.Repositories/"]
COPY ["ItemRental.Services/ItemRental.Services.csproj", "ItemRental.Services/"]
RUN dotnet restore "./ItemRental.API/ItemRental.API.csproj"
COPY . .
WORKDIR "/src/ItemRental.API"
RUN dotnet build "./ItemRental.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ItemRental.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ItemRental.API.dll"]