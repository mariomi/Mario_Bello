import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'model.dart';

String ip = "192.168.1.6";

class AdoptAnimalPage extends StatelessWidget {
  final Animal animal;
  final int currentUserId;

  AdoptAnimalPage({required this.animal, required this.currentUserId});

  Future<void> adoptAnimal(BuildContext context) async {
    final Map<String, dynamic> data = {
      'AnimalID': animal.AnimalID,
      'UserID': currentUserId,
    };

    var url = Uri.parse('http://$ip:3000/api/adoptions');
    var response = await http.post(
      url,
      body: json.encode(data),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 200) {
      final updateUrl =
          Uri.parse('http://$ip:3000/api/animals/${animal.AnimalID}');
      final Map<String, dynamic> updateData = {
        'AdoptionStatus': 'Adopted',
      };

      var updateResponse = await http.put(
        updateUrl,
        body: json.encode(updateData),
        headers: {'Content-Type': 'application/json'},
      );

      if (updateResponse.statusCode == 200) {
        Navigator.pop(context, true); // Indicate successful adoption
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to update animal status')),
        );
      }
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to adopt animal')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Adopt ${animal.Name}'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Image.network(
                animal.PhotoUrl ?? '',
                height: 200.0,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
            ),
            SizedBox(height: 16.0),
            Text(
              'Name: ${animal.Name}',
              style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8.0),
            Text(
              'Species: ${animal.Species}',
              style: TextStyle(fontSize: 18.0),
            ),
            SizedBox(height: 8.0),
            Text(
              'Breed: ${animal.Breed ?? 'Unknown'}',
              style: TextStyle(fontSize: 18.0),
            ),
            SizedBox(height: 8.0),
            Text(
              'Age: ${animal.Age ?? 'Unknown'}',
              style: TextStyle(fontSize: 18.0),
            ),
            SizedBox(height: 8.0),
            Text(
              'Gender: ${animal.Gender}',
              style: TextStyle(fontSize: 18.0),
            ),
            SizedBox(height: 8.0),
            Text(
              'Adoption Status: ${animal.AdoptionStatus}',
              style: TextStyle(fontSize: 18.0),
            ),
            SizedBox(height: 8.0),
            Text(
              'Arrival Date: ${animal.ArrivalDate}',
              style: TextStyle(fontSize: 18.0),
            ),
            SizedBox(height: 8.0),
            Text(
              animal.Description ?? '',
              style: TextStyle(fontSize: 18.0),
            ),
            SizedBox(height: 16.0),
            Center(
              child: ElevatedButton(
                child: Text('Adopt ${animal.Name}'),
                onPressed: () => adoptAnimal(context),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
