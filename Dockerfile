FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app
COPY tests/ui/package.json tests/ui/package-lock.json /app/
RUN npm install

COPY tests/ui/ /app/

CMD ["npm", "run", "test", "&&", "cp", "-r", "allure-results", "/app/allure-results"]
