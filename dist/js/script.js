$(document).ready(function () {
    // Récupérer la liste des équipes depuis l'API balldontlie
    $.ajax({
        url: 'https://www.balldontlie.io/api/v1/teams',
        method: 'GET',
        success: function (teamData) {
            // Récupérer les joueurs depuis l'API balldontlie
            $.getJSON('https://www.balldontlie.io/api/v1/players', {
                per_page: 100
            }, function (data) {
                // Créer des éléments HTML à partir des données des joueurs
                var items = '';
                var teams = [];


// Ajouter les éléments HTML pour chaque joueur
$.each(data.data, function (index, player) {
    // Ajouter l'abbréviation de l'équipe à la liste des équipes
    if (!teams.includes(player.team.abbreviation)) {
        teams.push(player.team.abbreviation);
    }

    items += '<div class="item m-8 p-4 w-64 ' + player.team.abbreviation + ' bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">' +
    '<img src="./img/Basketball.png" alt="Player Image" class="w-32 h-32 object-center">' +
    '<h3 class="text-lg font-semibold mb-2">' + player.first_name + ' ' + player.last_name + '</h3>' +
    '<p class="text-gray-600">Position: ' + player.position + '<br>Team: ' + player.team.full_name + '</p>' +
    '</div>'; 
});



                // Ajouter les éléments au conteneur
                $('#container').append(items);

                // Initialiser Isotope après avoir ajouté les éléments
                var $container = $('#container').isotope({
                    itemSelector: '.item',
                    layoutMode: 'fitRows'
                });

                // Créer des boutons pour chaque équipe dans le menu
                var teamButtons = teams.map(function (teamAbbreviation) {
                    return '<button class="team-filter-button bg-black text-white px-4 py-2 rounded mr-2 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-300" data-filter=".' + teamAbbreviation + '">' + teamAbbreviation + '</button>';
                });

                // Ajouter les boutons au menu
               
                $('#team-menu').append(teamButtons);

                // Filtrer les éléments en fonction de la catégorie au clic sur les boutons de filtre
                $('.team-filter-button').on('click', function () {
                    var filterValue = $(this).attr('data-filter');
                    $container.isotope({ filter: filterValue });
                });
            });
        },
        error: function (error) {
            console.log('Erreur lors de la récupération des équipes : ', error);
        }
    });
});
