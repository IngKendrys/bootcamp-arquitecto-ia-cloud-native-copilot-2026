FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS base
WORKDIR /app
EXPOSE 8080
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ./src ./
RUN dotnet restore && dotnet publish -c Release -o /out
FROM base
COPY --from=build --chown=10001:10001 /out .
RUN touch /app/data.db && chown -R 10001:10001 /app
USER 10001
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet","Api.dll"]
