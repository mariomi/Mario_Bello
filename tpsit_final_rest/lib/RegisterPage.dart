import 'dart:convert';
import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dao.dart';
import 'database.dart';
import 'model.dart';

String ip = "192.168.1.6";

class RegisterPage extends StatefulWidget {
  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  late final AppDatabase database;
  late final UserDao userDao;
  TextEditingController usernameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  String errorMessage = '';

  @override
  void initState() {
    super.initState();
    initDatabase();
  }

  Future<void> initDatabase() async {
    database = await $FloorAppDatabase.databaseBuilder('app_database.db').build();
    userDao = database.userDao;
  }

  Future<bool> registerUser(String username, String password, String email) async {
    // Check for duplicate entry
    var existingUser = await userDao.findUserByUsernameOrEmail(username, email);
    if (existingUser != null) {
      setState(() {
        errorMessage = 'Username or Email already exists. Please try a different one.';
      });
      return false;
    }

    final Map<String, dynamic> dataUser = {
      'Email': email,
      'username': username,
      'PasswordHash': password, // Password is plain text now
      'isAdmin': 0 // Set isAdmin to 0 by default
    };

    var url = Uri.parse('http://' + ip + ':3000/api/users');
    var response = await http.post(url,
        body: json.encode(dataUser),
        headers: {'Content-Type': 'application/json'});

    print('Registration response status: ${response.statusCode}');
    print('Registration response body: ${response.body}');

    if (response.statusCode == 201) {
      return true;
    } else {
      setState(() {
        errorMessage = 'Registration failed. Please try again.';
      });
      return false;
    }
  }

  void register() async {
    var username = usernameController.text;
    var password = passwordController.text;
    var email = emailController.text;

    bool isRegistered = await registerUser(username, password, email);

    if (isRegistered) {
      Navigator.pop(context, true);
    } else {
      setState(() {
        errorMessage = 'Failed to register. Please try again.';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Register'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: emailController,
              decoration: InputDecoration(
                labelText: 'Email',
              ),
            ),
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
            SizedBox(height: 8.0),
            ElevatedButton(
              child: Text('Register'),
              onPressed: register,
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
