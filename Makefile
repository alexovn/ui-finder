up-infra:
	@docker compose --env-file .env.prod up nginx-proxy nginx-proxy-acme

down-infra:
	@docker compose --env-file .env.prod down nginx-proxy nginx-proxy-acme

start-infra:
	@docker compose --env-file .env.prod start nginx-proxy nginx-proxy-acme

stop-infra:
	@docker compose --env-file .env.prod stop nginx-proxy nginx-proxy-acme

docker-rollout:
	@docker rollout --env-file .env.prod app