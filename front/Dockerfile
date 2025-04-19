# STEP1: ビルド用のイメージを作成
FROM node:22.12.0 AS builder

# 作業ディレクトリを作成
WORKDIR /app

# 依存ファイルだけを先にコピー（キャッシュを効かせるため）し，インストール
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

# 残りのソースコードをコピーしてビルド
COPY . .
RUN yarn build

# STEP2: デプロイ用のイメージを作成
FROM node:22.12.0 AS runner
ENV NODE_ENV=${NODE_ENV}
ENV API_URL=${API_URL}
ENV API_VERSION=${API_VERSION}

WORKDIR /app

# standalone モードを利用すると、publicと.next/staticはデフォルトでは含まれないので明示的にコピーする
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# standalone モードにより，yarn install は不要。
# node_modulesの内容は./next/standaloneに含まれるのでコピーする
COPY --from=builder /app/.next/standalone ./

# ポートを公開（Next.js デフォルトの standalone モードは 3000）
EXPOSE 3000

# アプリを起動(next.config.js で standalone モードを指定していること)
CMD ["node", "server.js"]
