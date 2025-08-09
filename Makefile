up-infra:
	@docker compose up -d nginx-proxy nginx-proxy-acme

down-infra:
	@docker compose down nginx-proxy nginx-proxy-acme

start-infra:
	@docker compose start nginx-proxy nginx-proxy-acme

stop-infra:
	@docker compose stop nginx-proxy nginx-proxy-acme

docker-rollout:
	@docker-rollout app