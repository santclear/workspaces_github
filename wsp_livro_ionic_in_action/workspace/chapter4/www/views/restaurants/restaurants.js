angular.module('App')
.controller('RestaurantsController', function ($scope, $http) {

  $scope.page = 0;
  $scope.total = 1;
  $scope.restaurants = [];

  $scope.getRestaurants = function () {
    // Incrementa valor de página e faz uma solicitação HTTP para os dados
    $scope.page++;
    $http.get('https://ionic-in-action-api.herokuapp.com/restaurants?page=' + $scope.page).success(function (response) {
      // Pega a lista de restaurantes e os adiciona à matriz restaurants[] para o ngRepeat
      angular.forEach(response.restaurants, function (restaurant) {
        $scope.restaurants.push(restaurant);
      });
      // Atualiza o total de páginas com base no valor enviado pelo API
      $scope.total = response.totalPages;
      // Evento Broadcast avisará quando o componente Infinite Scroll tiver terminado tudo
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }).error(function (err) {
      $scope.$broadcast('scroll.infiniteScrollComplete');
      console.log(err);
    });
  };
  
  // Carrega a primeira página dos restauradas da API de carregamento
  $scope.getRestaurants();
});
