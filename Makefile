# 起動
up:
	docker-compose up

# コンテナを作り直して起動
init:
	docker-compose down
	docker-compose up

# コンテナ、イメージ、ボリューム、noneのイメージを削除
clean:
	docker-compose down --rmi all --volumes --remove-orphans
	docker system prune

##### db #####
db_psql:
	docker-compose exec db psql -h 127.0.0.1 -p 5432 -U postgres

##### backend #####
back:
	docker-compose exec backend bash

back_deploy:
	cd backend; \
	git add -A; \
	git commit -m 'commit for deploy'; \
	git push -f heroku master

back_heroku_db:
	heroku pg:psql postgresql-hogehoge-000000 -a kanji-cloud-backend

back_heroku_db_init:
	heroku pg:reset -a kanji-cloud-backend --confirm kanji-cloud-backend

##### frontend #####
front:
	docker-compose exec frontend sh

front_build:
	docker-compose exec frontend yarn run build