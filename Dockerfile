FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
RUN npx playwright install --with-deps
ENV CI=true

COPY . /app/
CMD ["npm", "run", "test", "&&", "cp", "-r", "allure-results", "/app/allure-results"]
