import 'dart:convert';
import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'next_page.dart';
import 'dao.dart';
import 'database.dart';
import 'model.dart';
import 'registerpage.dart';

String ip = "192.168.1.6";

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  late final AppDatabase database;
  late final UserDao userDao;
  TextEditingController usernameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  String errorMessage = '';
  int? currentUserId;

  @override
  void initState() {
    super.initState();
    initDatabase();
  }

  Future<void> initDatabase() async {
    database =
        await $FloorAppDatabase.databaseBuilder('app_database.db').build();
    userDao = database.userDao;
  }

  Future<bool> authenticateUser(String username, String password) async {
    final Map<String, String> data = {
      'username': username,
      'password': password,
    };

    var url = Uri.parse('http://' + ip + ':3000/api/users/authenticate');
    var response = await http.post(url,
        body: json.encode(data), headers: {'Content-Type': 'application/json'});

    print('Login response status: ${response.statusCode}');
    print('Login response body: ${response.body}');

    if (response.headers['content-type']?.contains('application/json') ==
        true) {
      dynamic decodebody = jsonDecode(response.body);
      print('Decoded body: $decodebody');

      if (decodebody != null &&
          decodebody is Map<String, dynamic> &&
          decodebody.containsKey('UserID')) {
        currentUserId = decodebody['UserID'];
        final String? username = decodebody['Username'] as String?;
        final String? email = decodebody['Email'] as String?;
        final passwordHash =
            decodebody['PasswordHash']['data'] as List<dynamic>?;
        final bool isAdmin = decodebody['IsAdmin'] == 1;
        final String? registrationDate =
            decodebody['RegistrationDate'] as String?;

        if (currentUserId != null &&
            username != null &&
            email != null &&
            passwordHash != null &&
            registrationDate != null) {
          var user = await userDao.findUserById(currentUserId!);
          if (user == null) {
            user = User(
              UserID: currentUserId!,
              username: username,
              Email: email,
              PasswordHash: String.fromCharCodes(passwordHash.cast<int>()),
              isAdmin: isAdmin,
              RegistrationDate: registrationDate,
            );
            await userDao.insertUser(user);
          }
          return true;
        } else {
          print('One or more required fields are null');
          return false;
        }
      } else if (decodebody.containsKey('message')) {
        setState(() {
          errorMessage = decodebody['message'];
        });
      } else {
        setState(() {
          errorMessage = 'Unexpected response format';
        });
      }
    } else {
      setState(() {
        errorMessage = 'Unexpected response format: ${response.body}';
      });
    }
    return false;
  }

  void login() async {
    var username = usernameController.text;
    var password = passwordController.text;

    bool isAuthenticated = await authenticateUser(username, password);

    if (isAuthenticated) {
      Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) => AnimalListWidget(
                currentUserId: currentUserId!, database: database)),
      );
    } else {
      setState(() {
        errorMessage = 'Invalid credentials. Please try again.';
      });
    }
  }

  void navigateToRegister() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => RegisterPage()),
    ).then((value) {
      if (value != null && value == true) {
        setState(() {
          errorMessage = 'Registration successful. Please log in.';
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: usernameController,
              decoration: InputDecoration(
                labelText: 'Username',
              ),
            ),
            TextField(
              controller: passwordController,
              decoration: InputDecoration(
                labelText: 'Password',
              ),
              obscureText: true,
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              child: Text('Login'),
              onPressed: login,
            ),
            SizedBox(height: 8.0),
            ElevatedButton(
              child: Text('Register'),
              onPressed: navigateToRegister,
            ),
            SizedBox(height: 8.0),
            Text(
              errorMessage,
              style: TextStyle(
                color: Colors.red,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    home: LoginPage(),
  ));
}
