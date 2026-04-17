import 'package:flutter/material.dart';
import 'package:buscador_gif/view/home_page.dart';

void main() {
  runApp(MaterialApp(
    home: HomPage(),
    theme: ThemeData(hintColor: Colors.white),
    debugShowCheckedModeBanner: false,
  ));
}