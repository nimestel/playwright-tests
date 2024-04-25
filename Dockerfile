FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci
RUN npx playwright install --with-deps
ENV CI=true

COPY . /app/
CMD ["npm test && cp -r allure-results /app/allure-results"]
