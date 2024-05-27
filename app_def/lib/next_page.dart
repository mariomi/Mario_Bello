import 'dart:convert';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dao.dart';
import 'database.dart';
import 'model.dart';
import 'adopt_animal.dart';
import 'personal_area.dart';

String ip = "192.168.196.155";

class AnimalListWidget extends StatefulWidget {
  final int currentUserId;
  final AppDatabase database;

  AnimalListWidget({required this.currentUserId, required this.database});

  @override
  _AnimalListWidgetState createState() => _AnimalListWidgetState();
}

class _AnimalListWidgetState extends State<AnimalListWidget> {
  late final UserDao userDao;
  late final AnimalDao animalDao;
  late List<Animal> animals = [];
  String _searchSpecies = '';

  @override
  initState() {
    super.initState();
    initDatabase();
    fetchAnimals().then((value) {
      setState(() {
        animals = value;
      });
      print('Fetched animals: $animals');
    });
    fetchUsers();
  }

  Future<void> initDatabase() async {
    userDao = widget.database.userDao;
    animalDao = widget.database.animalDao;
  }

  Future<List<Animal>> fetchAnimals() async {
    var url = Uri.parse('http://$ip:3000/api/animals');
    var response = await http.get(url);
    List<dynamic> data = jsonDecode(response.body);
    List<Animal> animals = data
        .map((animalJson) => Animal(
            AnimalID: animalJson['AnimalID'],
            Name: animalJson['Name'],
            Species: animalJson['Species'],
            Breed: animalJson['Breed'],
            Age: animalJson['Age'],
            Gender: animalJson['Gender'],
            Description: animalJson['Description'],
            PhotoUrl: animalJson['PhotoUrl'],
            AdoptionStatus: animalJson['AdoptionStatus'],
            ArrivalDate: animalJson['ArrivalDate']))
        .toList();
    return animals;
  }

  Future<void> fetchUsers() async {
    var url = Uri.parse('http://$ip:3000/api/users');
    var response = await http.get(url);

    List<dynamic> data = jsonDecode(response.body);
    for (var element in data) {
      var supercontrol =
          await userDao.findUserById(int.parse(element['UserID'].toString()));
      if (supercontrol == null) {
        User user = User(
          UserID: int.parse(element['UserID'].toString()),
          username: element['Username'],
          Email: element['Email'],
          PasswordHash: String.fromCharCodes(
              (element['PasswordHash']['data'] as List<dynamic>).cast<int>()),
          isAdmin: element['IsAdmin'] == 1,
          RegistrationDate: element['RegistrationDate'],
        );
        await userDao.insertUser(user);
      }
    }
  }

  Future<List<Animal>> get _filteredAnimals async {
    if (_searchSpecies.isEmpty) {
      print('No search term entered, displaying all animals.');
      return animals;
    } else {
      print('Filtering animals by species: $_searchSpecies');
      List<Animal> filteredList = animals
          .where((animal) => animal.Species.toLowerCase()
              .contains(_searchSpecies.toLowerCase()))
          .toList();
      print('Filtered animals: $filteredList');
      return filteredList;
    }
  }

  Future<void> refreshAnimals() async {
    var updatedAnimals = await fetchAnimals();
    setState(() {
      animals = updatedAnimals;
    });
  }

  void navigateToAdoptAnimal(Animal animal) async {
    bool? result = await Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => AdoptAnimalPage(
            animal: animal, currentUserId: widget.currentUserId),
      ),
    );

    if (result == true) {
      refreshAnimals(); // Refresh the animals list if adoption was successful
    }
  }

  void navigateToPersonalArea() {
    Navigator.push(
      context,
      MaterialPageRoute(
          builder: (context) => PersonalAreaPage(
              currentUserId: widget.currentUserId, database: widget.database)),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Animals'),
        actions: [
          IconButton(
            icon: Icon(Icons.person),
            onPressed: navigateToPersonalArea,
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: EdgeInsets.all(8.0),
            child: TextField(
              onChanged: (value) {
                setState(() {
                  _searchSpecies = value;
                });
              },
              decoration: InputDecoration(
                labelText: 'Search by Species',
                border: OutlineInputBorder(),
              ),
            ),
          ),
          Expanded(
            child: FutureBuilder<List<Animal>>(
              future: _filteredAnimals,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return CircularProgressIndicator();
                } else if (snapshot.hasError) {
                  return Text('Error: ${snapshot.error}');
                } else {
                  print('Displaying animals: ${snapshot.data}');
                  return ListView.builder(
                    itemCount: snapshot.data?.length ?? 0,
                    itemBuilder: (context, index) {
                      if (snapshot.data != null) {
                        return GestureDetector(
                          onTap: () =>
                              navigateToAdoptAnimal(snapshot.data![index]),
                          child: AnimalCard(animal: snapshot.data![index]),
                        );
                      } else {
                        return Container();
                      }
                    },
                  );
                }
              },
            ),
          ),
        ],
      ),
    );
  }
}

class AnimalCard extends StatelessWidget {
  final Animal animal;

  AnimalCard({required this.animal});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4.0,
      margin: EdgeInsets.all(8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: EdgeInsets.all(8.0),
            child: CachedNetworkImage(
              imageUrl: animal.PhotoUrl ?? '',
              fit: BoxFit.cover,
              height: 200.0,
              width: double.infinity,
            ),
          ),
          Padding(
            padding: EdgeInsets.all(8.0),
            child: Text(
              'Name: ${animal.Name}',
              style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(8.0),
            child: Text(
              'Species: ${animal.Species}',
              style: TextStyle(fontSize: 16.0),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(8.0),
            child: Text(
              'Breed: ${animal.Breed ?? 'Unknown'}',
              style: TextStyle(fontSize: 16.0),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(8.0),
            child: Text(
              'Age: ${animal.Age ?? 'Unknown'}',
              style: TextStyle(fontSize: 16.0),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(8.0),
            child: Text(
              'Gender: ${animal.Gender}',
              style: TextStyle(fontSize: 16.0),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(8.0),
            child: Text(
              'Adoption Status: ${animal.AdoptionStatus}',
              style: TextStyle(fontSize: 16.0),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(8.0),
            child: Text(
              'Arrival Date: ${animal.ArrivalDate}',
              style: TextStyle(fontSize: 16.0),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(8.0),
            child: Text(
              animal.Description ?? '',
              style: TextStyle(fontSize: 16.0),
            ),
          ),
        ],
      ),
    );
  }
}
