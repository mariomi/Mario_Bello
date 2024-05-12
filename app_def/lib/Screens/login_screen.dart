// lib/Screens/login_screen.dart

import 'package:flutter/material.dart';
import '../Services/api_service.dart';
import '../Widgets/custom_text_field.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  String _username = '';
  String _password = '';

  void _login() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      bool loggedIn = await ApiService().login(_username, _password);
      if (loggedIn) {
        Navigator.pushReplacementNamed(context, '/home');
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to log in')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login')),
      body: Form(
        key: _formKey,
        child: Column(
          children: <Widget>[
            CustomTextField(
              label: 'Username',
              onSaved: (value) => _username = value!,
              validator: (value) => value!.isEmpty ? 'Please enter username' : null,
            ),
            CustomTextField(
              label: 'Password',
              onSaved: (value) => _password = value!,
              validator: (value) => value!.isEmpty ? 'Please enter password' : null,
              isPassword: true,
            ),
            ElevatedButton(onPressed: _login, child: Text('Login'))
          ],
        ),
      ),
    );
  }
}
