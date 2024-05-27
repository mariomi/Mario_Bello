import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:http/http.dart' as http;
import 'dao.dart';
import 'database.dart';
import 'model.dart';

String ip = "192.168.196.155";

class PersonalAreaPage extends StatefulWidget {
  final int currentUserId;
  final AppDatabase database;

  PersonalAreaPage({required this.currentUserId, required this.database});

  @override
  _PersonalAreaPageState createState() => _PersonalAreaPageState();
}

class _PersonalAreaPageState extends State<PersonalAreaPage> {
  late final AnimalDao animalDao;
  late List<Animal> adoptedAnimals = [];
  String errorMessage = '';

  @override
  void initState() {
    super.initState();
    animalDao = widget.database.animalDao;
    fetchAdoptedAnimals();
  }

  Future<void> fetchAdoptedAnimals() async {
    try {
      var url = Uri.parse('http://$ip:3000/api/adoptions/${widget.currentUserId}/animals');
      var response = await http.get(url);

      if (response.statusCode == 200) {
        List<dynamic> data = jsonDecode(response.body);
        setState(() {
          adoptedAnimals = data.map((animalJson) => Animal(
            AnimalID: animalJson['AnimalID'],
            Name: animalJson['Name'],
            Species: animalJson['Species'],
            Breed: animalJson['Breed'],
            Age: animalJson['Age'],
            Gender: animalJson['Gender'],
            Description: animalJson['Description'],
            PhotoUrl: animalJson['PhotoUrl'],
            AdoptionStatus: animalJson['AdoptionStatus'],
            ArrivalDate: animalJson['ArrivalDate'],
          )).toList();
        });
      } else {
        setState(() {
          errorMessage = 'Error fetching adopted animals';
        });
      }
    } catch (e) {
      setState(() {
        errorMessage = 'Error fetching adopted animals';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Personal Area'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text(
              'Adopted Animals',
              style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
            ),
            if (errorMessage.isNotEmpty)
              Text(
                errorMessage,
                style: TextStyle(color: Colors.red),
              ),
            Expanded(
              child: ListView.builder(
                itemCount: adoptedAnimals.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    leading: CachedNetworkImage(
                      imageUrl: adoptedAnimals[index].PhotoUrl ?? '',
                      width: 50,
                      height: 50,
                    ),
                    title: Text(adoptedAnimals[index].Name),
                    subtitle: Text(adoptedAnimals[index].Species),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
