# syntax=docker/dockerfile:1

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Chỉ copy các file cần thiết để build app
COPY ["VTTH.csproj", "./"]
RUN dotnet restore "./VTTH.csproj"

# Copy lại chỉ những folders thực sự cần thiết
COPY ./wwwroot ./wwwroot
COPY ./Program.cs ./
COPY ./appsettings.json ./
# Copy thêm các file/directory cần thiết từ source của bạn vào đây nếu có (ví dụ các controllers/Pages/Models cần cho runtime minimal)

RUN dotnet publish "./VTTH.csproj" -c Release -o /app/publish --no-restore

FROM base AS final
WORKDIR /app

# Chỉ copy kết quả publish chứa wwwroot và các file bin, dll, runtime cần
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "VTTH.dll"]
