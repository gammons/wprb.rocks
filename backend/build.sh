#docker rmi $(docker images |grep 'gammons1/ultralist-backend')
docker build -t gammons1/wprb-rocks:$1 .
docker push gammons1/wprb-rocks:$1
