import 'dart:convert';
import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'next_page.dart';
import 'dao.dart';
import 'database.dart';
import 'model.dart';
import 'Loginpage.dart';

/*TODO  togliere il pulsante di adozione quando un animale è stato adottato
        */

//install extensions the javascript server
//npm install express mysql body-parser cors bcrypt
void main() {
  runApp(MaterialApp(
    home: LoginPage(),
  ));
}
