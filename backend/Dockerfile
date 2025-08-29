FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["api.csproj", "./"]
RUN dotnet restore "./api.csproj"
COPY . .
RUN dotnet publish "./api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "api.dll"]
CMD ["/wait-for-it.sh", "db:1433", "--timeout=30", "--", "dotnet", "api.dll"]
