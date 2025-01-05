Самый простой проект для демонстрации работы k8s.

## K8s нужен для:

-   Автоматического развертывания приложений в контейнерах на разных серверах
-   Распределения нагрузки по нескольким серверам (Равномерная нагрузка между серверами)
-   Автоматическом масштабировании развернутых приложений (Нагрузка возрастает - создаются дополнитльеные контейнеры на серверах)
-   Мониторинга и проверке работоспособности контейнеров (Автоматическое пересоздание контейнеров)

## Терминология k8s:

-   Сервис (Service):
    Описание: Сервис в Kubernetes представляет собой абстракцию, позволяющую доступ к набору подов (Pods) через единый IP-адрес и DNS-имя. Он обеспечивает постоянный доступ к подам, даже если они перезапускаются или заменяются.
    Ответственность: Управляет балансировкой нагрузки и маршрутизацией запросов к подам, обеспечивая стабильный интерфейс для взаимодействия с ними.

-   Под (Pod):
    Описание: Под — это базовая единица развертывания в Kubernetes, представляющая собой один или несколько контейнеров, которые работают на одном узле и имеют общие ресурсы, такие как сетевые интерфейсы и хранилище.
    Ответственность: Позволяет группировать контейнеры, которые должны работать вместе, и управляет их жизненным циклом, включая масштабирование и обновление.

-   Деплоймент (Deployment):
    Описание: Деплоймент — это объект, который управляет созданием и обновлением подов. Он определяет желаемое состояние приложения и автоматически поддерживает это состояние.
    Ответственность: Обеспечивает управление версиями, обновлениями и откатами приложений, а также автоматическое масштабирование подов на основе заданных параметров.

-   Нода (Node):
    Описание: Нода — это физическая или виртуальная машина, на которой запускаются поды. Она содержит все необходимые компоненты для выполнения контейнеров, включая Kubelet, контейнерный движок и другие необходимые сервисы.
    Ответственность: Обеспечивает вычислительные ресурсы (ЦП, память, хранилище) для развертывания подов и управляет их состоянием в рамках кластера.
    Эти объекты и компоненты взаимодействуют друг с другом, обеспечивая высокую доступность, масштабируемость и управляемость приложений в Kubernetes.

## Среды запуска контейнеров

-   Docker
-   CRI-O
-   containerD

## Pod

В поде может быть несколько контейнеров. Есть общие тома для работы с данными. Т.е. несколько контейнеров могут записывать и считывать инофрмацию из них.
Так же есть общий IP адрес для всех контейнеров внутри пода.
\*Рекомендация: 1 под - 1 контейнер.

## Кластер

Состоит из узлов (нода). В каждом узле создаются поды.
Узлы конрольируются главным узлом.

## Общая схема роботы k8s

![alt text](https://user-images.githubusercontent.com/53555895/82279296-29f9cd80-99c7-11ea-91f0-c83ec1acc703.jpg)

## Сервисы k8s

В узлах есть сервисы:

-   kubelet (Коммуникации между узлами) — это агент, который запускается на каждом узле (node) кластера Kubernetes. Его основная задача — следить за состоянием контейнеров и поддерживать их в нужном состоянии. Kubelet выполняет следующие функции:

1. Мониторинг состояния контейнеров: Kubelet регулярно проверяет состояние контейнеров, запущенных на узле, и сообщает об этом в API-сервер Kubernetes.

2. Запуск и остановка контейнеров: Kubelet отвечает за запуск и остановку контейнеров в соответствии с описанием подов, получаемым от API-сервера.

3. Управление ресурсами: Kubelet следит за использованием ресурсов (CPU, память и т. д.) и может применять ограничения на уровне контейнеров.

4. Отчет о состоянии: Kubelet отправляет информацию о состоянии узла и контейнеров в API-сервер, что позволяет Kubernetes управлять состоянием кластера

-   kube-proxy (Сетевые ресурсы в рамках каждого узла) — это компонент, который управляет сетевыми правилами на каждом узле кластера. Он обеспечивает сетевую связь между подами и внешними клиентами. Основные функции kube-proxy:

1. Сетевое маршрутизирование: Kube-proxy управляет маршрутизацией трафика к подам, используя правила iptables или IPVS. Он перенаправляет запросы к сервисам (Services) на соответствующие поды.

2. Обеспечение доступности: Kube-proxy позволяет обеспечить балансировку нагрузки между подами, которые обслуживают один и тот же сервис, распределяя входящий трафик по всем доступным подам.

3. Поддержка различных сетевых протоколов: Kube-proxy поддерживает как TCP, так и UDP протоколы, что позволяет работать с различными типами приложений.

-   container runtime (создание и контроь контейнеров -> Docker, CRI-O, ContainerD) — это программа, которая отвечает за выполнение контейнеров. Kubernetes поддерживает различные контейнерные runtimes, такие как Docker, containerd и CRI-O. Основные функции контейнерного runtime:

1. Запуск и управление контейнерами: Контейнерный runtime отвечает за создание, запуск, остановку и удаление контейнеров.

2. Изоляция и безопасность: Контейнерный runtime обеспечивает изоляцию между контейнерами, используя механизмы операционной системы, такие как cgroups и namespaces.

3. Управление образами контейнеров: Контейнерный runtime также отвечает за загрузку и хранение образов контейнеров, необходимых для запуска приложений.

-   Взаимодействие между компонентами:
    Kubelet взаимодействует с контейнерным runtime для управления контейнерами на узле.
    Kube-proxy настраивает сетевые правила, чтобы обеспечить доступ к сервисам, управляемым kubelet.
    Все три компонента работают вместе, чтобы обеспечить корректную работу приложений в кластере Kubernetes.

-   Дополнитлеьно в главном узле есть сервисы:
    API Server - рабочие узлы посредсвтом kubelet взаимодействуют с API Server главного узла.
    Scheduler - Планировщик. Планировать и распределять нагрузку между кластерами.
    Kube controller Manager - ?
    Cloud controller manager - ?
    etcd - Сохранение логов.

## Управление кластером k8s, но уже пользователем

Утилита kubectl позволяет управлять кластером.
Kubectl свзяывается с API Server главного узла по HTTPS.
Есть графическая надстрйока для kubectl - Dashboard.

## Локальный запуск кластера

Minikube — это упрощённый инструмент для запуска полноценного кластера Kubernetes на локальной машине. Он был разработан, чтобы облегчить разработку, тестирование и отладку приложений, работающих на Kubernetes, в локальной среде. Minikube позволяет быстро развернуть простой кластер Kubernetes на своей локальной машине. Такой кластер хорошо подойдёт для первого знакомства с Kubernetes или для локальной разработки приложений.

В качестве вирутальной машины можно использовать тот же Docker.
Т.е кластер будет создан в одном докер контейнере (контейнеры в контейнере).
Так же есть virtualbox, hyper-v, parallels и т.д.

После установки kubectl и minikube на ПК достаточно выполнить команду minikube start для запуска лоакльного кластера в Docker.

Полезный следующие команды:
Создание образов Docker:

-   docker build -t abdulovdb/service . (создаст образ файла докер лежащего в той же директории, где вызывается команда)
-   docker push abdulovdb/service (загрузит образ в docker-hub для дальнешей загрузки в деплойментах)

-   kubectl get namespaces (Получить пространства имен)
-   kubectl get nodes (получить узлы)
-   kubectl get pods --namespace=kube-system (получить поды в пространстве имен kube-system)
-   kubectl describe pod nginx (детальная информация о поде nginx)
-   kubectl delete pod nginx (удалить под nginx)
-   kubectl create deployment my-nginx-deploy --image=nginx создать деплоймент на основании образа nginx
-   kubectl describe deploy my-nginx-deploy (описание деплоймента. Стоит обратить внимание на поле replicas. Будут отображены кол-ва желамое кол-во подов|обновленные поды|всего подов|недостуцпные поды)
-   kubectl scale deploy my-nginx-deploy --replicas=5 (увеличение реплик пода до 5)
-   kubectl apply/delete -f ./deployment.yaml применение-удаление манифеста
-   minikube service --all - выдаст url по которым можно обращаться к подам

Имя пода состоит из:
namePod-id набора реплик-уникальный id пода

## Сервисы

При создании сервисов мы можем их создать трех видов:

-   Cluster IP:
    Если вывести команду kubectl describe service postgres (в моем случае данный сервис имеет тип Cluster IP) то можно будет увидеть следующую информацию:

| Name              | Values           |
| ----------------- | ---------------- |
| Name:             | postgres         |
| Namespace:        | default          |
| Selector:         | app=postgres     |
| Type:             | ClusterIP        |
| IP Family Policy: | SingleStack      |
| IP Families:      | IPv4             |
| IP:               | 10.105.115.171   |
| IPs:              | 10.105.115.171   |
| Port:             | <unset> 5432/TCP |
| TargetPort:       | 5432/TCP         |
| Endpoints:        | 10.244.0.3:5432  |

Из инофрмации следует, что сервис принимает запросы на
10.105.115.171 с портом 5432 и перенаправляет на целевой порт 5432(TargetPort)
В endpoints указаны то, куда идет перенаправление. Т.е
Обращаемся к 10.105.115.171:5432 -> нас перенаправит на один из endpoints с targetPort, а именно на 10.244.0.3:5432. Endpoints может быть несколько для балансировки нагрузки.
Таким образом, используя один ClusterIP мы можем подключатся к любому из подов в рамках
одного деплоймента. (Только внутри кластера)

-   NodePort:

| Name              | Values            |
| ----------------- | ----------------- |
| Name:             | users             |
| Namespace:        | default           |
| Selector:         | app=users         |
| Type:             | NodePort          |
| IP Family Policy: | SingleStack       |
| IP Families:      | IPv4              |
| IP:               | 10.107.239.116    |
| IPs:              | 10.107.239.116    |
| Port:             | <unset> 80/TCP    |
| TargetPort:       | 4000/TCP          |
| NodePort:         | <unset> 30000/TCP |
| Endpoints:        | 10.244.0.4:4000   |

В данном случае NodePort 30000 означает, что данный порт был открыт для данного узла для обращения извне.
Порядок такой:

-   для начала получим ip адрес ноды командой minikube ip (192.168.49.2)
-   обратясь по адресу к ноде 192.168.49.2:30000 нас перенаправит на сервис 10.107.239.116:80, что в свою очередь перенаправит нас с сервиса на один из endpoints, на один из подов, в данном случае, 10.244.0.4:4000

\*Очень важное замечание
Через команду curl 192.168.49.2:30000 или же через браузер мы ничего не получим в ответ
так как мы создали кластер k8s внутри контейнера docker.
Если вместо docker использовать другой менеджер виртуальных машин для minikube или же
создать публичный кластер, то каждая нода будет иметь публичный ip и следовательно
сервисы типа NodePort будут доступны через публичный ip адрес каждой ноды

Это ограничение можно обойти с помощью minikube tunnels
Если в терминале ввести команду:
minikube service users --url, то minikube создаст туннель для доступа к сервису (в данный момент http://127.0.0.1:51961/)

-

Иногда знать адреса кажого узла не совсем удобно. Потому существует следующий тип LoadBalancer

-   LoadBalancer:
    Создается отдельный external-ip адрес. Все запросы проходят через него.
    Командой minikube tunnel запустим тунелирование.
    Создадим сервис с таким типом и выведем о нем ифнормацию

| Name              | Values            |
| ----------------- | ----------------- |
| Name:             | users             |
| Namespace:        | default           |
| Selector:         | app=users         |
| Type:             | LoadBalancer      |
| IP Family Policy: | SingleStack       |
| IP Families:      | IPv4              |
| IP:               | 10.98.215.214     |
| IPs:              | 10.98.215.214     |
| Port:             | <unset> 80/TCP    |
| TargetPort:       | 4000/TCP          |
| NodePort:         | <unset> 30441/TCP |
| Endpoints:        | 10.244.0.11:4000  |

Что прозойдет ?
Есть кластер k8s. У него есть внешний IP с адресом 127.0.0.1:80 ->
Есть сервис внутри кластера с адресом 10.98.215.214:30441 -> в сервисе есть узлы
у одного из них адрес 10.244.0.11:4000, куда нас и перенаправит

http://127.0.0.1:80/

## Запуск с другим менджером вирутальных машин и другим рантаймом

-   minikube start --driver=hyperv --container-runtime=containerd
    Данной командой мы запустим кластер используя менеджер вирутальных машин Hyper-V, а в качества рантайма будет containerd

Для просмотра списка контейнеров необходимо:

-   провалится в клсастер командой minikube ssh
-   выполнить sudo ctr -n k8s.io containers list

Так же, конечно, доступен dashboard.

## Ingees-controllers и Traefik

-   Что такое Ingress ?
    Ingress — это объект API, который управляет внешним доступом к сервисам в кластере, главным образом через HTTP / HTTPS. Чтобы Ingress-ресурс заработал, нужен Ingress-контроллер.

-   Ingress-контроллеры
    Роль Ingress-контроллера могут выполнять NGINX Ingress Controller, Kong, Octavia Ingress Controller и Traefik.

-   Зачем ?
    Зачем использовать Ingress-контроллер, если можно предоставить доступ к каждому сервису через NodePort или LoadBalancer? Если кратко, это позволяет получить одну центральную точку для проксирования всего трафика. То есть, с использованием Ingress-контроллера вам понадобится всего один LoadBalancer для Traefik и ничего больше. Эта связка и будет разруливать весь трафик.

## Что изучить:

-   Перечислить отличия рантаймов. Запустить проект с использованием каждого. Изучить каждый.
-   Запустить фронт на реакте
-   Подключится к БД как на работе
