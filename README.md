# KanjiCloud

## 環境構築
以下 Docker は立ち上がっている前提。

1. ルートディレクトリに以下の内容で `.env` を作成する
```.env
DB_USER=(任意のユーザ名)
DB_PASSWORD=(任意のパスワード)
POSTGRES_DB=kanjiCloud # この DB 名は変更可

TZ=Asia/Tokyo
LANG=ja_JP.utf8
```

2. 以下のコマンドを実行する。
```sh
make up # 中身は docker-compose up
```
