import 'dart:convert';
import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'next_page.dart';
import 'dao.dart';
import 'database.dart';
import 'model.dart';
import 'Loginpage.dart';

void main() {
  runApp(MaterialApp(
    home: LoginPage(),
  ));
}
